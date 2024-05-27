//authentication.controller.js

const dotenv = require('dotenv');
const { client } = require('../db.js');

dotenv.config();

async function login(req, res) {
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).send({ status: 'Error al iniciar sesión', message: 'Los campos están incompletos' });
    }

    try {
        const result = await client.query('SELECT * FROM user WHERE user_name = $1 AND password = $2', [user, password]);
        if (result.rows.length === 0) {
            return res.status(400).send({ status: 'Error al iniciar sesión', message: 'Usuario o contraseña incorrectos' });
        }

        

        res.send({ status: 'Login correcto', message: 'Login correcto', redirect: '/admin' });
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).send({ status: 'Error interno del servidor', message: 'Ocurrió un error al procesar la solicitud' });
    }
}

const methods = {
    login,
};
module.exports = { methods };
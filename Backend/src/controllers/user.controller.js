import { user } from "../models/user.js";

export const login = async (req, res) => {
  const { user_name, poswarrd } = req.body;
  try {
    const admin = await user.findOne({ where: { user_name, poswarrd } });

    if (admin) {
      res.status(200).json({ message: "Usuario autenticado" });
    } else {
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

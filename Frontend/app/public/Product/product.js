import { Pool } from 'pg';

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    user: 'usuario',
    host: 'localhost',
    database: 'basededatos',
    password: 'contraseña',
    port: 5432 // El puerto por defecto de PostgreSQL es 5432
});

// Función para ejecutar consultas SQL
const query = async (text, params) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query:', { text, duration, rows: res.rowCount });
    return res;
};

// Modelo de Producto
class Product {
    // Método para crear un nuevo producto
    static async create(product_id, name, category, quantity, sell_price, buy_price) {
        const sql = 'INSERT INTO products (product_id, name, category, quantity, sell_price, buy_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [product_id, name, category, quantity, sell_price, buy_price];
        const result = await query(sql, values);
        return result.rows[0];
    }



    static async getAll() {
        const sql = 'SELECT * FROM products';
        const result = await query(sql);
        return result.rows;
    }

    static async updateById(id, updatedFields) {
        const { name, category, quantity, sell_price, buy_price } = updatedFields;
        const sql = 'UPDATE products SET name=$1, category=$2, quantity=$3, sell_price=$4, buy_price=$5 WHERE id=$6 RETURNING *';
        const values = [name, category, quantity, sell_price, buy_price, id];
        const result = await query(sql, values);
        return result.rows[0];
    }

    static async deleteById(id) {
        const sql = 'DELETE FROM products WHERE id=$1';
        const result = await query(sql, [id]);
        return result.rowCount;
    }

}

export default Product;

// Función para crear una nueva fila de la tabla con los datos de un producto
function createProductRow(product) {
    const row = document.createElement('div');
    row.classList.add('table-row');

    const idCell = document.createElement('div');
    idCell.classList.add('cell');
    idCell.textContent = product.product_id;
    row.appendChild(idCell);

    const nameCell = document.createElement('div');
    nameCell.classList.add('cell');
    nameCell.textContent = product.name;
    row.appendChild(nameCell);

    const categoryCell = document.createElement('div');
    categoryCell.classList.add('cell');
    categoryCell.textContent = product.category;
    row.appendChild(categoryCell);

    const quantityCell = document.createElement('div');
    quantityCell.classList.add('cell');
    quantityCell.textContent = product.quantity;
    row.appendChild(quantityCell);

    const sellPriceCell = document.createElement('div');
    sellPriceCell.classList.add('cell');
    sellPriceCell.textContent = product.sell_price;
    row.appendChild(sellPriceCell);

    const buyPriceCell = document.createElement('div');
    buyPriceCell.classList.add('cell');
    buyPriceCell.textContent = product.buy_price;
    row.appendChild(buyPriceCell);

    const selectCell = document.createElement('div');
    selectCell.classList.add('cell');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    selectCell.appendChild(checkbox);
    row.appendChild(selectCell);

    return row;
}

// Obtener referencias a los elementos del DOM
const addProductForm = document.getElementById('addProductForm');
const tableBody = document.getElementById('tableBody');

// Función para obtener todos los productos y mostrarlos en la tabla
async function fetchAndDisplayProducts() {
    try {
        const response = await fetch('/admin/products');
        const data = await response.json();
        if (data.success) {
            const products = data.products;
            tableBody.innerHTML = ''; // Limpiar el cuerpo de la tabla
            products.forEach((product) => {
                const productRow = createProductRow(product);
                tableBody.appendChild(productRow);
            });
        } else {
            console.error('Error al obtener los productos');
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}

// Obtener los productos al cargar la página
fetchAndDisplayProducts();

// Agregar event listener al formulario de agregar producto
addProductForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const product = {
        product_id: formData.get('product_id'),
        name: formData.get('name'),
        category: formData.get('category'),
        quantity: formData.get('quantity'),
        sell_price: formData.get('sell_price'),
        buy_price: formData.get('buy_price'),
    };

    try {
        const response = await fetch('/admin/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            const newProduct = await response.json();
            if (newProduct.success) {
                const productRow = createProductRow(newProduct.product);
                tableBody.appendChild(productRow);
                // Reiniciar el formulario
                event.target.reset();
            } else {
                console.error('Error al agregar el producto');
            }
        } else {
            console.error('Error al agregar el producto');
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
});
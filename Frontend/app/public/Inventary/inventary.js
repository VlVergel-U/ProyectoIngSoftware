// Obtener referencia al elemento tableBody
const tableBody = document.getElementById('tableBody');

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

// Función para generar un PDF con los productos
function generatePDF() {
    // Lógica para generar un PDF con los productos
    console.log('Generando PDF...');
}

// Función para imprimir los productos
function printProducts() {
    // Lógica para imprimir los productos
    console.log('Imprimiendo productos...');
}

// Obtener referencias a los botones
const pdfButton = document.querySelector('.btn-secondary:nth-child(1)');
const printButton = document.querySelector('.btn-secondary:nth-child(2)');

// Agregar event listeners a los botones
pdfButton.addEventListener('click', generatePDF);
printButton.addEventListener('click', printProducts);
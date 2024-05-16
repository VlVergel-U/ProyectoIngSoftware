// Obtener referencias a los elementos del DOM
const tableBody = document.getElementById('tableBody');
const editButton = document.querySelector('.actions .btn-secondary:nth-child(4)');
const saveChangesButton = document.createElement('button');
saveChangesButton.textContent = 'Guardar cambios';
saveChangesButton.classList.add('btn', 'btn-primary');

// Función para crear un campo de entrada editable
function createEditableInput(value) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    return input;
}

// Función para reemplazar el contenido de una celda por un campo de entrada editable
function makeCellEditable(cell) {
    const input = createEditableInput(cell.textContent);
    cell.textContent = '';
    cell.appendChild(input);
}

// Función para manejar la edición de un producto
function editProduct(event) {
    const row = event.target.closest('.table-row');
    const cells = row.getElementsByClassName('cell');

    // Hacer que las celdas sean editables
    for (let i = 0; i < cells.length - 1; i++) {
        makeCellEditable(cells[i]);
    }

    // Agregar el botón "Guardar cambios" a la última celda
    const lastCell = cells[cells.length - 1];
    lastCell.textContent = '';
    lastCell.appendChild(saveChangesButton);

    // Agregar un event listener al botón "Guardar cambios"
    saveChangesButton.addEventListener('click', saveChanges.bind(null, row));
}

// Función para guardar los cambios en un producto
async function saveChanges(row) {
    const cells = row.getElementsByClassName('cell');
    const updatedProduct = {
        product_id: cells[0].firstChild.value,
        name: cells[1].firstChild.value,
        category: cells[2].firstChild.value,
        quantity: cells[3].firstChild.value,
        sell_price: cells[4].firstChild.value,
        buy_price: cells[5].firstChild.value,
    };

    try {
        const response = await fetch(`/admin/products/${updatedProduct.product_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                // Actualizar la fila con los nuevos datos
                for (let i = 0; i < cells.length - 1; i++) {
                    cells[i].textContent = updatedProduct[Object.keys(updatedProduct)[i]];
                }
            } else {
                console.error('Error al actualizar el producto');
            }
        } else {
            console.error('Error al actualizar el producto');
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}

// Agregar event listener al botón "Editar"
editButton.addEventListener('click', (event) => {
    const rows = tableBody.getElementsByClassName('table-row');
    for (let i = 0; i < rows.length; i++) {
        const checkboxCell = rows[i].getElementsByClassName('cell')[6];
        const checkbox = checkboxCell.firstChild;
        if (checkbox.checked) {
            editProduct(event);
            checkbox.checked = false; // Desmarcar la casilla después de editar
        }
    }
});
// Load table data from local storage
document.addEventListener('DOMContentLoaded', function() {
    var tableData = JSON.parse(localStorage.getItem('tableData'));
    if (tableData) {
        var tableBody = document.getElementById('tableBody');
        tableData.forEach(function(rowData) {
            var row = document.createElement('tr');
            rowData.forEach(function(cellData, index) {
                var cell = document.createElement('td');
                cell.textContent = cellData;
                row.appendChild(cell);
            });
            
            // Add edit button to the row
            var editCell = document.createElement('td');
            var editButton = document.createElement('button');
            editButton.textContent = 'تحرير';
            editButton.onclick = function() {
                editRow(row);
            };
            editCell.appendChild(editButton);
            row.appendChild(editCell);
            
            tableBody.appendChild(row);
        });
        
        // Recalculate result after loading table data
        recalculateResult();
    }
});

function calculate() {
    var a = parseFloat(document.getElementById('a').value);
    var b = parseFloat(document.getElementById('b').value);
    var c = parseFloat(document.getElementById('c').value);
    var result = c - (a + b);
    document.getElementById('result').innerHTML = "النتيجة: " + result;

    var name = prompt("أسم الدواء:");
    if (name != null) {
        var table = document.getElementById("resultsTable").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.rows.length);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        cell1.textContent = name;
        cell2.textContent = a;
        cell3.textContent = b;
        cell4.textContent = c;
        cell5.textContent = result;
        
        // Add edit button to the new row
        var editCell = document.createElement('td');
        var editButton = document.createElement('button');
        editButton.textContent = 'تحرير';
        editButton.onclick = function() {
            editRow(newRow);
        };
        editCell.appendChild(editButton);
        newRow.appendChild(editCell);
        
        // Save table data to local storage
        saveTableData();
        
        // Recalculate result after adding new row
        recalculateResult();
    }
}

function editRow(row) {
    var cells = row.getElementsByTagName('td');
    var newData = [];
    for (var i = 0; i < cells.length - 1; i++) {
        var newValue = prompt("Enter new value for " + cells[i].textContent + ":");
        if (newValue != null) {
            cells[i].textContent = newValue;
            newData.push(newValue);
        } else {
            newData.push(cells[i].textContent);
        }
    }
    
    // Recalculate the result and update the result cell
    var a = parseFloat(cells[1].textContent);
    var b = parseFloat(cells[2].textContent);
    var c = parseFloat(cells[3].textContent);
    var result = c - (a + b);
    cells[4].textContent = result;

    // Update the table data in local storage
    var tableData = JSON.parse(localStorage.getItem('tableData'));
    var rowIndex = Array.prototype.indexOf.call(row.parentNode.children, row);
    tableData[rowIndex] = newData;
    localStorage.setItem('tableData', JSON.stringify(tableData));
}

function recalculateResult() {
    var rows = document.getElementById('tableBody').getElementsByTagName('tr');
    var sumA = 0, sumB = 0, sumC = 0;
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        sumA += parseFloat(cells[1].textContent);
        sumB += parseFloat(cells[2].textContent);
        sumC += parseFloat(cells[3].textContent);
    }
    var result = sumC - (sumA + sumB);
    document.getElementById('result').innerHTML = "النتيجة: " + result;
}

function clearTable() {
    localStorage.removeItem('tableData');
    document.getElementById('tableBody').innerHTML = '';
}

function saveTableData() {
    var tableData = [];
    var rows = document.getElementById('tableBody').getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        var rowData = [];
        var cells = rows[i].getElementsByTagName('td');
        for (var j = 0; j < cells.length; j++) {
            rowData.push(cells[j].textContent);
        }
        tableData.push(rowData);
    }
    localStorage.setItem('tableData', JSON.stringify(tableData));
}

// Add event listeners to input fields for 'a', 'b', and 'c'
document.getElementById('a').addEventListener('input', function() {
    recalculateResult();
});

document.getElementById('b').addEventListener('input', function() {
    recalculateResult();
});

document.getElementById('c').addEventListener('input', function() {
    recalculateResult();
});

function saveAsPDF() {
    // Hide buttons and other unnecessary elements before printing
    var buttons = document.getElementById('actions');
    buttons.style.display = 'none';
    var result = document.getElementById('result');
    result.style.display = 'none';

    // Trigger browser print dialog
    window.print();

    // Show hidden elements after printing
    buttons.style.display = 'block';
    result.style.display = 'block';
}

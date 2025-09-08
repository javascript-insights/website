document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('multiplicationTable');
    const resultDiv = document.getElementById('result');
    
    // Create the multiplication table
    function createMultiplicationTable() {
        // Create header row
        const headerRow = table.insertRow();
        
        // Empty cell for top-left corner
        const emptyHeader = document.createElement('th');
        emptyHeader.textContent = '×';
        headerRow.appendChild(emptyHeader);
        
        // Column headers (1-10)
        for (let col = 1; col <= 10; col++) {
            const th = document.createElement('th');
            th.textContent = col;
            headerRow.appendChild(th);
        }
        
        // Create rows with data
        for (let row = 1; row <= 10; row++) {
            const tableRow = table.insertRow();
            
            // Row header
            const rowHeader = document.createElement('th');
            rowHeader.textContent = row;
            tableRow.appendChild(rowHeader);
            
            // Data cells
            for (let col = 1; col <= 10; col++) {
                const cell = tableRow.insertCell();
                cell.textContent = '?';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.dataset.result = row * col;
                
                // Add click event listener
                cell.addEventListener('click', function() {
                    handleCellClick(this);
                });
            }
        }
    }
    
    // Handle cell click
    function handleCellClick(cell) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const result = parseInt(cell.dataset.result);
        
        // Remove previous clicked class from all cells
        const allCells = table.querySelectorAll('td');
        allCells.forEach(c => c.classList.remove('clicked'));
        
        // Add clicked class to current cell
        cell.classList.add('clicked');
        
        // Show the result in the cell
        cell.textContent = result;
        
        // Update result display
        resultDiv.innerHTML = `<p>${row} × ${col} = <strong>${result}</strong></p>`;
        resultDiv.classList.add('show-result');
        
        // Remove the show-result class after animation
        setTimeout(() => {
            resultDiv.classList.remove('show-result');
        }, 500);
        
        // Optional: Hide the result after a few seconds and show "?" again
        setTimeout(() => {
            cell.textContent = '?';
            cell.classList.remove('clicked');
        }, 3000);
    }
    
    // Reset all cells to show "?"
    function resetTable() {
        const allCells = table.querySelectorAll('td');
        allCells.forEach(cell => {
            cell.textContent = '?';
            cell.classList.remove('clicked');
        });
        resultDiv.innerHTML = '<p>Click on a cell to see the result</p>';
        resultDiv.classList.remove('show-result');
    }
    
    // Create reset button
    function addResetButton() {
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset Table';
        resetButton.style.cssText = `
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 15px;
            transition: all 0.3s ease;
        `;
        
        resetButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
        
        resetButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
        
        resetButton.addEventListener('click', resetTable);
        
        document.querySelector('.container').appendChild(resetButton);
    }
    
    // Initialize the table
    createMultiplicationTable();
    addResetButton();
    
    // Add keyboard support
    document.addEventListener('keydown', function(event) {
        if (event.key === 'r' || event.key === 'R') {
            resetTable();
        }
    });
    
    console.log('Multiplication table initialized successfully!');
});

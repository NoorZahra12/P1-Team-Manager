function manageRows(count = 10) {
    const table = document.getElementById('excelTable');
    for (let i = 0; i < count; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td>
                <select class="dropdownChanger">
                    <option value=""></option>
                </select>
            </td>
            <td class="toggleable"></td>
            <td class="toggleable"></td>
            <td contenteditable="true" class="introGivers"></td>
            <td class="helped"></td>
        `;
        table.appendChild(row);
    }

    // Add event listeners for toggleable cells
    document.querySelectorAll('.toggleable').forEach(cell => {
        if (!cell.dataset.initialized) {
            cell.addEventListener('click', () => {
                if (!cell.textContent.trim()) {
                    cell.textContent = 'Yes';
                    cell.style.backgroundColor = 'lightgreen';
                } else {
                    cell.textContent = '';
                    cell.style.backgroundColor = '';
                }
            });
            cell.dataset.initialized = true; // Mark the cell as initialized
        }
    });
}

function dropdownChanger() {
    const introGivers = new Set(); // Unique intro giver values

    // Gather unique values from the "Intro Givers" column
    document.querySelectorAll('.introGivers').forEach(cell => {
        const value = cell.textContent.trim();
        if (value) {
            introGivers.add(value);
        }
    });

    // Update all dropdowns without losing their current selections
    document.querySelectorAll('.dropdownChanger').forEach(select => {
        const currentValue = select.value; // Save the selected value

        // Generate options dynamically
        const options = Array.from(introGivers)
            .map(value => `<option value="${value}">${value}</option>`)
            .join('');

        select.innerHTML = `<option value=""></option>` + options;
        select.value = currentValue; // Restore the selected value
    });

    // Update the assignment counts
    updateAssignmentCounts();
}

function updateAssignmentCounts() {
    const introGiverCounts = {};

    // Initialize counts for intro givers
    document.querySelectorAll('.introGivers').forEach(cell => {
        const introGiver = cell.textContent.trim();
        if (introGiver) {
            introGiverCounts[introGiver] = 0;
        }
    });

    // Count dropdown assignments
    document.querySelectorAll('.dropdownChanger').forEach(select => {
        const selectedValue = select.value;
        if (selectedValue && introGiverCounts[selectedValue] !== undefined) {
            introGiverCounts[selectedValue]++;
        }
    });

    // Update "Helped" column next to each intro giver
    document.querySelectorAll('.introGivers').forEach(cell => {
        const introGiver = cell.textContent.trim();
        const countCell = cell.nextElementSibling; // Adjacent "Helped" cell
        if (introGiver && countCell) {
            countCell.textContent = introGiverCounts[introGiver] || '';
        }
    });
}

// Initialize rows and attach listeners
manageRows();

// Add row and refresh dropdowns on button click
document.getElementById('addRowButton').addEventListener('click', () => {
    manageRows(1);
    dropdownChanger(); // Refresh dropdown options
});

// Update dropdown options and counts when "Intro Givers" is modified
document.addEventListener('focusout', (event) => {
    if (event.target.classList.contains('introGivers')) {
        dropdownChanger();
    }
});

// Update counts when dropdown selection changes
document.addEventListener('change', (event) => {
    if (event.target.classList.contains('dropdownChanger')) {
        updateAssignmentCounts();
    }
});
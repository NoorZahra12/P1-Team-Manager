function copyTableToClipboard() {
    // Get the form values
    const hostName = document.getElementById('hostName').value;
    const meetingDate = document.getElementById('meetingDate').value;
    const meetingTime = document.getElementById('meetingTime').value;

    // Get the table element
    const table = document.getElementById('excelTable');
    let tableText = '';

    // Add the main header with Date, Time, and Host
    tableText += 'Date\tTime\tHost\tRecruit\tBrief\tTeam\tAssigned to\tRegistered\tVerify\tIntro Givers\tPeople Helped\n';

    // Iterate over the table rows (skip both the table header and its content)
    for (let i = 1; i < table.rows.length; i++) { // Start from 1 to skip the <thead>
        const row = table.rows[i];
        const rowText = [];

        // Add Date, Time, and Host only for the first data row
        if (i === 1) {
            rowText.push(meetingDate || ''); // Add Date
            rowText.push(meetingTime || ''); // Add Time
            rowText.push(hostName || '');   // Add Host
        } else {
            rowText.push('', '', ''); // Leave these cells empty for other rows
        }

        // Process the rest of the row cells
        for (let j = 0; j < row.cells.length; j++) {
            const cell = row.cells[j];
            if (cell.querySelector('.dropdownChanger')) {
                // Get dropdown value
                rowText.push(cell.querySelector('.dropdownChanger').value || '');
            } else if (cell.classList.contains('toggleable')) {
                // Get Yes/No value
                rowText.push(cell.textContent.trim() || '');
            } else {
                // Get general text content
                rowText.push(cell.textContent.trim());
            }
        }

        tableText += rowText.join('\t') + '\n'; // Join row values with tab and add a new line
    }

    // Copy the text to the clipboard
    navigator.clipboard.writeText(tableText)
        .then(() => {
            alert('Table copied to clipboard!');
        })
        .catch((err) => {
            console.error('Failed to copy table:', err);
        });
}

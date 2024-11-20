function copyTableToClipboard() {
    // Get the form values
    const hostName = document.getElementById('hostName').value;
    const meetingDate = document.getElementById('meetingDate').value;
    const meetingTime = document.getElementById('meetingTime').value;

    // Get the table element
    const table = document.getElementById('excelTable');
    let tableText = '';

    // Add the labels for the first row (header)
    tableText += 'Date\tTime\tHost\tRecruit\tBrief\tTeam\tTeam Leader\tAssigned to\tRegistered\tVerify\tIntro Givers\tAssigned\n';

    // Add the form values (date, time, host) in the second row
    tableText += `${meetingDate}\t${meetingTime}\t${hostName}\t`;

    // Add the table rows
    for (let i = 1; i < table.rows.length; i++) { // Start from 1 to skip the header
        const row = table.rows[i];
        const rowText = [];
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
        tableText += rowText.join('\t') + '\n';
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

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function copyText() {
    const textElement = document.getElementById('popupText');
    const text = textElement.textContent;

    if (text) {
        // Create a temporary input element for copying
        const tempInput = document.createElement('textarea');
        document.body.appendChild(tempInput);
        tempInput.value = text;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        alert('Text copied to clipboard!');
    } else {
        alert('No text to copy!');
    }
}



function showPopup() {
    const popupTextElement = document.getElementById('popupText');
    const table = document.getElementById('excelTable');
    let recruitsText = 'Recruits:\n';
    let introGiversText = '\nIntro Givers:\n';

    const introGiverCounts = {}; // To count how many recruits each intro giver helped

    // Iterate through the rows in the table (skip the header)
    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        const recruitName = row.cells[0]?.textContent.trim(); // Recruit name
        const teamName = row.cells[2]?.textContent.trim(); // Team name
        const introGiver = row.cells[7]?.textContent.trim(); // Intro Giver name

        // Add recruit and team information to the text
        if (recruitName && teamName) {
            recruitsText += `${recruitName} --> ${teamName}\n`;
        }

        // Count the number of recruits helped by each intro giver
        if (introGiver) {
            if (!introGiverCounts[introGiver]) {
                introGiverCounts[introGiver] = 0;
            }
            introGiverCounts[introGiver]++;
        }
    }

    // Add intro giver summary to the text, but only include those with counts > 0
    for (const [giver, count] of Object.entries(introGiverCounts)) {
        if (count > 0) {
            introGiversText += `${giver} --> ${count}\n`;
        }
    }

    // Combine the texts and update the popup content
    const finalText = recruitsText + (introGiversText.trim() ? introGiversText : '');
    popupTextElement.textContent = finalText;

    // Show the popup
    document.getElementById('popup').style.display = 'block';
}
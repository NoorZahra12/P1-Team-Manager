function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function copyText() {
    const textElement = document.getElementById('popupText');
    const text = textElement.textContent;

    if (text) {
        // Temporary input element for copying
        const tempInput = document.createElement('textarea');
        document.body.appendChild(tempInput);
        tempInput.value = text;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        alert('You can now paste it in a ticket!');
    } else {
        alert('No text to copy!');
    }
}

function showPopup() {
    const popupTextElement = document.getElementById('popupText');
    const table = document.getElementById('excelTable');
    let recruitsText = 'Recruits:\n';
    let introGiversText = '\nIntro Givers:\n';

    // Iterate through the rows in the table (skip the header)
    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];

        // Recruits Section
        const recruitName = row.cells[0]?.textContent.trim(); // Rookie's name
        const teamName = row.cells[2]?.textContent.trim() || 'no team yet'; // Team name or "no team yet"
        if (recruitName) {
            recruitsText += `${recruitName} --> ${teamName}\n`;
        }

        // Intro Givers Section
        const introGiver = row.cells[6]?.textContent.trim(); // Intro Giver's name
        const peopleHelped = row.cells[7]?.textContent.trim(); // Number of people helped

        if (introGiver && peopleHelped && parseInt(peopleHelped) > 0) {
            introGiversText += `${introGiver} --> ${peopleHelped}\n`;
        }
    }

    // Combine the texts and update the popup content
    const finalText = recruitsText + (introGiversText.trim() ? introGiversText : '');
    popupTextElement.textContent = finalText;
    document.getElementById('popup').style.display = 'block';
}

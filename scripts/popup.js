// Show the popup and overlay
function showPopup() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}
    // Close the popup and overlay
function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
    // Copy text from the non-editable element
function copyText() {
    const textElement = document.getElementById('popupText');
    const text = textElement.textContent;
    // Create a temporary input element to copy the text
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = text;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Text copied to clipboard!');
}
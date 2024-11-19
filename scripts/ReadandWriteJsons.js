function addMeeting() {
    const hostName = document.getElementById('hostName').value;
    const meetingDate = document.getElementById('meetingDate').value;
    const meetingTime = document.getElementById('meetingTime').value;

    if (!hostName || !meetingDate || !meetingTime) {
        alert('Please fill out all fields.');
        return;
    }

    alert(`Meeting added:\nHost: ${hostName}\nDate: ${meetingDate}\nTime: ${meetingTime}`);
}
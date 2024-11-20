function changeSection() {
    // Get the sections by their IDs
    const introMeeting = document.getElementById('IntroMeeting');
    const teamNeeds = document.getElementById('TeamNeeds');
    
    // Check their display properties and toggle visibility
    if (introMeeting.style.display === 'block') {
        introMeeting.style.display = 'none';
        teamNeeds.style.display = 'block';
    } else if (teamNeeds.style.display === 'block') {
        teamNeeds.style.display = 'none';
        introMeeting.style.display = 'block';
    } else {
        // Default
        introMeeting.style.display = 'block';
        teamNeeds.style.display = 'none';
    }
}
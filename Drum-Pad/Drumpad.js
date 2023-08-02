// Get references to the HTML elements
const drumPadButtons = document.querySelectorAll('.drum-pad');
const audioElements = document.querySelectorAll('audio');

function playAudio(event) 
{
  const key = event.key.toUpperCase();
  const audio = document.getElementById(key);
  if (audio) 
  {
    const audioElement = audio.querySelector('audio');
    audioElement.currentTime = 0; // Reset audio to the beginning to allow rapid triggering
    audioElement.play();
    const description = audio.getAttribute('data-description');
    document.getElementById('display').innerText = description;
  }
}
function stopAudio(event) {
  const key = event.key.toUpperCase();
  const audio = document.getElementById(key);
  if (audio instanceof HTMLAudioElement) {
    audio.pause();
    audio.currentTime = 0; // Reset audio to the beginning to allow rapid triggering
  }
}

// Add click event listener to drum pad buttons
drumPadButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.id.toUpperCase();
    const audio = document.getElementById(key);
    if (audio) {
      const audioElement = audio.querySelector('audio');
      audioElement.currentTime = 0; // Reset audio to the beginning to allow rapid triggering
      audioElement.play();
      const description = button.getAttribute('data-description');
      document.getElementById('display').innerText = description;
    }
  });
});
// Add click event listener to drum pad buttons
drumPadButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.id.toUpperCase();
    const audio = document.getElementById(key);
    if (audio instanceof HTMLAudioElement) {
      audio.currentTime = 0; // Reset audio to the beginning to allow rapid triggering
      audio.play();
      const description = button.getAttribute('data-description');
      document.getElementById('display').innerText = description;
    }
  });
});
// Wait for all audio elements to finish loading
let loadedAudioCount = 0;
audioElements.forEach((audio) => {
  audio.addEventListener('loadeddata', () => {
    loadedAudioCount++;
    if (loadedAudioCount === audioElements.length) {
      // All audio elements are loaded, now add the keydown event listener
      document.addEventListener('keydown', playAudio);
    }
  });
});

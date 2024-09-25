// Select all video elements on the page
const videos = document.querySelectorAll('video');

// Loop through each video and add event listeners
videos.forEach(video => {
  const centerPlayPauseBtn = video.nextElementSibling;
  const videoControls = centerPlayPauseBtn.nextElementSibling;
  const seekBar = videoControls.querySelector('#seekBar');
  const fullscreenBtn = videoControls.querySelector('#fullscreenBtn');

  // Play/Pause Video and show central play/pause button
  video.addEventListener('click', function() {
    if (video.paused) {
      video.play();
      centerPlayPauseBtn.innerHTML = '&#10074;&#10074;'; // Change to pause icon
    } else {
      video.pause();
      centerPlayPauseBtn.innerHTML = '&#9658;'; // Change to play icon
    }
    
    // Show the play/pause button in the center briefly
    centerPlayPauseBtn.classList.add('show');
    setTimeout(function() {
      centerPlayPauseBtn.classList.remove('show');
    }, 1000); // Button will disappear after 1 second

    // Show the controls at the bottom
    videoControls.classList.add('show');
  });

  // Update seek bar as the video plays
  video.addEventListener('timeupdate', function() {
    const value = (100 / video.duration) * video.currentTime;
    seekBar.value = value;
  });

  // Seek when the user clicks on the seek bar
  seekBar.addEventListener('input', function() {
    const time = (seekBar.value / 100) * video.duration;
    video.currentTime = time;
  });

  // Fullscreen toggle on button click
  fullscreenBtn.addEventListener('click', toggleFullscreen.bind(video));

  // Double-click video to toggle fullscreen
  video.addEventListener('dblclick', toggleFullscreen.bind(video));

  // Fullscreen toggle function
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (this.requestFullscreen) {
        this.requestFullscreen();
      } else if (this.webkitRequestFullscreen) { // Safari/Chrome
        this.webkitRequestFullscreen();
      } else if (this.msRequestFullscreen) { // IE11/Edge
        this.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { // Safari/Chrome
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE11/Edge
        document.msExitFullscreen();
      }
    }
  }

  // Show/hide controls when mouse moves on the video
  let hideControlsTimeout;
  video.addEventListener('mousemove', function() {
    videoControls.classList.add('show'); // Show controls

    // Hide controls after 3 seconds of inactivity
    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(function() {
      videoControls.classList.remove('show');
    }, 3000);
  });
});

let lastScroll = 0;
      window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll) {
          document.querySelector('.header').classList.add('scrolled');
        } else {
          document.querySelector('.header').classList.remove('scrolled');
        }
        lastScroll = currentScroll;
      });

const toggleIcon = document.getElementById('toggle-icon');
const dropdown = document.getElementById('dropdown');
toggleIcon.addEventListener('click', () => {
dropdown.classList.toggle('show');
});
toggleIcon.addEventListener('touchstart', () => {
dropdown.classList.toggle('show');
});
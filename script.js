const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    navigation.classList.toggle('open', !expanded);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('open');
    }
  });
}

const profileVideo = document.querySelector('#profile-video');
const videoScreen = document.querySelector('.video-screen');
const tvPower = document.querySelector('#tv-power');
if (profileVideo && videoScreen) {
  profileVideo.addEventListener('loadeddata', () => videoScreen.classList.add('has-video'));
  profileVideo.addEventListener('error', () => videoScreen.classList.remove('has-video'));
}

if (tvPower && videoScreen && profileVideo) {
  tvPower.addEventListener('click', () => {
    const isOff = videoScreen.classList.toggle('power-off');
    tvPower.setAttribute('aria-pressed', String(!isOff));
    tvPower.textContent = isOff ? '◉ POWER ON' : '◉ POWER OFF';
    if (isOff) profileVideo.pause();
  });
}

const profileBanner = document.querySelector('#profile-banner');
const profileBannerVideo = document.querySelector('#profile-banner-video');
const profileBannerImage = document.querySelector('#profile-banner-image');
const profileAvatar = document.querySelector('#profile-avatar');
const avatarFallback = document.querySelector('.avatar-fallback');

if (profileBanner && profileBannerVideo && profileBannerImage) {
  profileBannerVideo.addEventListener('loadeddata', () => {
    profileBannerImage.hidden = true;
    profileBannerVideo.hidden = false;
    profileBanner.classList.add('has-wallpaper');
  });
  profileBannerVideo.addEventListener('error', () => {
    profileBannerVideo.hidden = true;
  });
  profileBannerImage.addEventListener('load', () => {
    if (profileBannerVideo.readyState < 2) {
      profileBannerImage.hidden = false;
      profileBanner.classList.add('has-wallpaper');
    }
  });
  profileBannerImage.addEventListener('error', () => {
    profileBannerImage.hidden = true;
  });
  if (profileBannerImage.complete && profileBannerImage.naturalWidth > 0) {
    profileBannerImage.hidden = false;
    profileBanner.classList.add('has-wallpaper');
  }
  if (profileBannerVideo.readyState >= 2) {
    profileBannerVideo.hidden = false;
    profileBanner.classList.add('has-wallpaper');
  }
}

if (profileAvatar && avatarFallback) {
  profileAvatar.addEventListener('load', () => {
    profileAvatar.hidden = false;
    avatarFallback.hidden = true;
  });
  profileAvatar.addEventListener('error', () => {
    profileAvatar.hidden = true;
    avatarFallback.hidden = false;
  });
  if (profileAvatar.complete && profileAvatar.naturalWidth > 0) {
    profileAvatar.hidden = false;
    avatarFallback.hidden = true;
  }
}

const currentFocus = document.querySelector('#current-focus');
const focusNext = document.querySelector('#focus-next');
const focusOptions = ['music', 'cozy games', 'books', 'something new'];
let focusIndex = 0;

if (currentFocus && focusNext) {
  focusNext.addEventListener('click', () => {
    focusIndex = (focusIndex + 1) % focusOptions.length;
    currentFocus.textContent = focusOptions[focusIndex];
  });
}

const surpriseButton = document.querySelector('#surprise-button');
const surpriseMessage = document.querySelector('#surprise-message');
const tinySurprises = [
  'You are cool if you find this.',
  'Tiny reminder: drink some water',
  'You found a little corner of the internet ✦',
  'Take a breath. You are doing just fine.',
  'The best playlist is the one you make yourself ♫',
  'Somewhere, a cat is having a very good nap ☼',
  'It is okay to be different.',
  'Everyone is cool btw.',
  'Keep Going even tho it is meaningless till you prove them wrong.'
];
let surpriseIndex = -1;

if (surpriseButton && surpriseMessage) {
  surpriseButton.addEventListener('click', () => {
    surpriseIndex = (surpriseIndex + 1) % tinySurprises.length;
    surpriseMessage.textContent = tinySurprises[surpriseIndex];
    surpriseMessage.classList.remove('surprise-pop');
    requestAnimationFrame(() => surpriseMessage.classList.add('surprise-pop'));
  });
}

const audio = document.querySelector('#favorite-song');
const playButton = document.querySelector('#play-button');
const seekBar = document.querySelector('#track-seek');
const currentTimeLabel = document.querySelector('#current-time');
const durationLabel = document.querySelector('#duration');
const musicHint = document.querySelector('#music-hint');

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

if (audio && playButton && seekBar) {
  playButton.addEventListener('click', async () => {
    if (audio.error) {
      musicHint.textContent = 'Tambahkan file media/favorite-song.mp3, lalu muat ulang halaman.';
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        musicHint.textContent = 'Now playing — enjoy the song ♡';
      } catch {
        musicHint.textContent = 'Tambahkan lagu ke folder media agar bisa diputar.';
      }
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', () => {
    playButton.textContent = 'Ⅱ';
    playButton.setAttribute('aria-label', 'Jeda lagu');
  });

  audio.addEventListener('pause', () => {
    playButton.textContent = '▶';
    playButton.setAttribute('aria-label', 'Putar lagu');
  });

  audio.addEventListener('loadedmetadata', () => {
    durationLabel.textContent = formatTime(audio.duration);
    musicHint.textContent = 'Press play to listen.';
  });

  audio.addEventListener('timeupdate', () => {
    currentTimeLabel.textContent = formatTime(audio.currentTime);
    seekBar.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  });

  seekBar.addEventListener('input', () => {
    if (audio.duration) audio.currentTime = (Number(seekBar.value) / 100) * audio.duration;
  });

  audio.addEventListener('error', () => {
    musicHint.textContent = 'Tambahkan file media/favorite-song.mp3 untuk mengaktifkan pemutar lagu.';
  });
}

//get elements
//build functions
//hook up event listeners

//pause/play
//slider 1
//slider 2
//back button
//forward button
const player = document.querySelector(".player");

const video = player.querySelector(".viewer");

const progress = player.querySelector(".progress");

const progressBar = player.querySelector(".progress__filled");

const toggle = player.querySelector(".toggle");

const skipButtons = player.querySelectorAll("[data-skip]");

const ranges = player.querySelectorAll(".player__slider");



function togglePlay(){
    if (video.paused){
        video.play();
    }else {
        video.pause();
    }
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    this.dataset.skip;
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    if (this.name === 'playbackRate'){
        video.playbackRate = this.value
    } else if (this.name === 'volume'){
        video.volume = this.value
    }
    //video[this.name] = this.value;
}

function handleProgress(){
    //make percentage of flex-basis value of bar; then correspond with where it is in the video
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    // console.log(e.offsetX);

}

video.addEventListener("click", togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton); video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach(button => button.addEventListener("click", skip));

ranges.forEach(slider => slider.addEventListener("change", handleRangeUpdate));

ranges.forEach(slider => slider.addEventListener("mousemove", handleRangeUpdate));

progress.addEventListener('click', scrub);

progress.addEventListener('mousemove', (e) => {
    if (isDragging){
        scrub(e);
    }
});

let isDragging = false;
progress.addEventListener('mousedown', ()=> isDragging = true);
progress.addEventListener('mouseup', () => isDragging = false);




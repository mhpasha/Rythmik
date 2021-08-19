function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function play(music){
  try{
    audio.pause()
    audio = null
  }
  catch(err){

  }
  var audioPlayer = document.querySelector(".music-player");
  var video_player = document.querySelector(".fixed-video-play");
  if(video_player == null){
    var video_player = document.querySelector(".single-video-box");
  }
  console.log(video_player)
  // if(!video_player.classList.contains('single-video-box')){
    all_video_elm = video_player.querySelectorAll('video')
    for(i = 0;i < all_video_elm.length;i++){
      console.log(all_video_elm[i])
      all_video_elm[i].remove()
    }
  // }
  if(typeof(music) != "object") {
    audio = document.createElement("video")

  if(video_player.classList.contains('single-video-box')){
    audio.setAttribute('controls','')
  }
  if(!video_player.classList.contains('single-video-box')){
    video_player.querySelector('a').appendChild(audio)
  }
  else{
    video_player.appendChild(audio)
  }
  console.log(audio)
  audio.addEventListener("loadeddata", () => {
    audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
      audio.duration
    );
    // audio.volume = 1;
  },
  false);
}
audio.setAttribute("src", music);

name_elm2 = document.querySelector('.responsive-player .head .info-holder .name')
singer_elm = document.querySelector('.audio-player .music-detail .singer')
singer_elm2 = document.querySelector('.responsive-player .head .info-holder .singer')
singer_image_elm_h = document.querySelectorAll('.audio-player .music-detail')
image_elm2 = document.querySelector('.responsive-player .head .img img')
image_elm3 = document.querySelector('.responsive-player .big-img img')

$(audio).bind('ended', function(){
    // done playing
    toggle_currecter_music()
    change_music('next')
    // alert("Player stopped");
});

// ID3.loadTags(music, function() {
//     var tags = ID3.getAllTags(music);


//       image = tags.picture
//       if (image) {
//         var base64String = "";
//         for (var i = 0; i < image.data.length; i++) {
//             base64String += String.fromCharCode(image.data[i]);
//         }
//         var base64 = "data:" + image.format + ";base64," +
//                 window.btoa(base64String);
//         for(i = 0;i < singer_image_elm_h.length; i++){
//             singer_image_elm_h[i].querySelector('img').setAttribute('src',base64);
//         }
//         image_elm2.setAttribute('src',base64);
//         image_elm3.setAttribute('src',base64);

//       } else {
//         image_elm.style.display = "none";
//       }
//       for(i = 0;i < singer_image_elm_h.length; i++){
//             singer_image_elm_h[i].querySelector('img').setAttribute('src',base64);
//         }
//       for(i = 0;i < singer_image_elm_h.length; i++){
//             singer_image_elm_h[i].querySelector('.name').innerHTML = tags.title
//         }
//       singer_elm.innerHTML = tags.artist
//       name_elm2.innerHTML = tags.title
//       // name_elm3.innerHTML = tags.title
//       singer_elm2.innerHTML = tags.artist
//       singer_elm3.innerHTML = tags.artist
// },
// {
//     tags: ['picture', "track", "lyrics"],

//  onError: function(reason) {
//         // if (reason.error === "xhr") {
//         // }
//        for(i = 0;i < singer_image_elm_h.length; i++){
//           singer_image_elm_h[i].querySelector('img').setAttribute('src','');
//       }
//       image_elm2.setAttribute('src','');
//       image_elm3.setAttribute('src','');

//       for(i = 0;i < singer_image_elm_h.length; i++){
//             singer_image_elm_h[i].querySelector('.name').innerHTML = 'Unknown'
//         }
//       singer_elm.innerHTML = 'Unknown'
//       name_elm2.innerHTML = 'Unknown'
//       singer_elm2.innerHTML = 'Unknown'
//       singer_elm3.innerHTML = 'Unknown'
//       }
// }
// );  
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);


setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);
}
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

// function clear(){
//   audio = null
// }

function toggle_currecter_music(){
  volume_box = document.querySelectorAll('.volume-box')  
  playBtn = document.querySelectorAll(".music-player .controls .toggle-play");
  for(i = 0;i < playBtn.length;i++){
    if (audio.paused) {
      playBtn[i].querySelector('i').classList.add("ri-play-fill");
      playBtn[i].querySelector('i').classList.remove("ri-pause-fill");
      playBtn[i].classList.add("play");
      playBtn[i].classList.remove("pause");
      }
     else {
        playBtn[i].querySelector('i').classList.add("ri-pause-fill");
        playBtn[i].querySelector('i').classList.remove("ri-play-fill");
        playBtn[i].classList.add("pause");
        playBtn[i].classList.remove("play");
    }
    }
  for(i = 0;i < volume_box.length;i++){
    if (audio.muted == true){
      volume_box[i].querySelector('i').classList.remove('ri-volume-up-fill')
      volume_box[i].querySelector('i').classList.add('ri-volume-mute-fill')
    }
    else{
      volume_box[i].querySelector('i').classList.remove('ri-volume-mute-fill')
      volume_box[i].querySelector('i').classList.add('ri-volume-up-fill')
    }
  }
  repeat_btn = document.querySelectorAll('.repeat-btn')
  for(i = 0;i < repeat_btn.length;i++){
    if(audio.hasAttribute('loop')){
      repeat_btn[i].classList.add('active')
    }
    else{
        repeat_btn[i].classList.remove('active')
    }
  }
  audio.volume = volume_box[0].querySelector('input').value / 100
}

function toggle_play_music(playBtn){
  console.log(playBtn)
  toggle_currecter_music()
  if (audio.paused) {
      playBtn.querySelector('i').classList.remove("ri-play-fill");
      playBtn.querySelector('i').classList.add("ri-pause-fill");
      playBtn.classList.remove("play");
      playBtn.classList.add("pause");
      console.log(audio.volume)
      document.querySelector('.music-player .volume-box input[type=range]').value = audio.volume * 100
      document.querySelector('.music-player .volume-box p').value = audio.volume * 100
      console.log(audio.volume)
      audio.play();
    } else {
      playBtn.querySelector('i').classList.remove("ri-pause-fill");
      playBtn.querySelector('i').classList.add("ri-play-fill");
      playBtn.classList.remove("pause");
      playBtn.classList.add("play");
      audio.pause();
    }
  toggle_currecter_music()


}
function play_music(music){
  play(music)
  audio.play()
  toggle_currecter_music()
}

play(all_video[0])
function change_music(way){
  index = all_video.indexOf(audio.src)
  if(index == -1){
    music = audio.src.split('/')
    music = music[music.length - 2] + '/' + music[music.length - 1]
    music = decodeURI(music)
    // music = music.replaceAll('%20',' ')
    index = all_video.indexOf(music)
  }
  if(way == 'next'){
    if (index + 1 < all_video.length){
      next_index = index + 1 
    }
    else{
      next_index = 0
    }
  }
  else if(way == 'previous'){
    if(index - 1 < 0){
      next_index = all_video.length - 1
    }
    else{
      next_index = index - 1
    }
  }
  else if(way == 'shuffle'){
    next_index = generateRandomIntegerInRange(0,all_video.length - 1)
  }
  play_music(all_video[next_index])
}

function toggle_repeat(elm){
  if(audio.hasAttribute('loop')){
      elm.classList.remove('active')    
      audio.removeAttribute('loop')
  }else{
      elm.classList.add('active')    
      audio.setAttribute('loop','')
  }
}

function audio_player_click(){
  target = event.target
  if(!(target.classList.contains('toggle-play') || target.parentNode.classList.contains('toggle-play'))){
    r_player = document.querySelector('.responsive-player')
    if(r_player.style.top.length == 0 || r_player.style.top == '100%'){
      r_player.classList.remove('display-none')
      r_player.style.top = 0;
    }
    else{
      r_player.classList.add('display-none')
      r_player.style.top = '100%';
    }
    
  }
}


// play_music()
function play_video(video,destination){
  try{

  document.querySelector('.fixed-video-play').classList.remove('display-none')
  document.querySelector('.fixed-video-play a').removeAttribute('href')
  document.querySelector('.fixed-video-play a').setAttribute('href',destination)
  document.querySelector('.music-player').classList.remove('display-none')
  }
  catch(err){
    
  }
  play_music(video)
}
function exit_fixed_video(){
  audio.pause()
  document.querySelector('.music-player').classList.add('display-none')
  document.querySelector('.fixed-video-play').classList.add('display-none')
}
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
  if(typeof(music) != "object") {
  //audio element does not exist yet:
  audio = document.createElement("audio");
  audio.addEventListener("loadeddata", () => {
    audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
      audio.duration
    );
    audio.volume = 1;
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
music_data = all_music[audio.src]
for(i = 0;i < singer_image_elm_h.length; i++){
  singer_image_elm_h[i].querySelector('.singer').innerHTML = music_data['artist']
  singer_image_elm_h[i].querySelector('img').setAttribute('src',music_data['music-cover']);
}
image_elm2.setAttribute('src',music_data['music-cover']);
image_elm3.setAttribute('src',music_data['music-cover']);
singer_elm2.innerHTML = music_data['artist']
name_elm2.innerHTML = music_data['name']
for(i = 0;i < singer_image_elm_h.length; i++){
  singer_image_elm_h[i].querySelector('.name').innerHTML = music_data['name']
}
$(audio).bind('ended', function(){
    toggle_currecter_music()
    change_music('next')
});
  
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
function toggle_currecter_music(){
  volume_box = document.querySelectorAll('.volume-box')  
  playBtn = document.querySelectorAll(".music-player .controls .toggle-play");
  for(i = 0;i < playBtn.length;i++){
    if (audio.paused) {
      playBtn[i].querySelector('i').classList.add("ri-play-fill");
      playBtn[i].querySelector('i').classList.remove("ri-pause-fill");
      playBtn[i].classList.add("play");
      playBtn[i].classList.remove("pause"); 
      all_play_btn_elm_icon = document.querySelectorAll('.music .play i')
        for(i = 0;i < all_play_btn_elm_icon.length;i++){
          all_play_btn_elm_icon[i].classList.remove('ri-pause-fill')
          all_play_btn_elm_icon[i].classList.add('ri-play-fill')
        }
        try{
          document.querySelector('.playing_music .play i').classList.remove('ri-pause-fill')
          document.querySelector('.playing_music .play i').classList.add('ri-play-fill')
        }
        catch(err){

        }
      }
     else {
        playBtn[i].querySelector('i').classList.add("ri-pause-fill");
        playBtn[i].querySelector('i').classList.remove("ri-play-fill");
        playBtn[i].classList.add("pause");
        playBtn[i].classList.remove("play");
        try{
          document.querySelector('.playing_music .play i').classList.remove('ri-play-fill')
          document.querySelector('.playing_music .play i').classList.add('ri-pause-fill')
        }
        catch(err){
          
        }
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
  toggle_currecter_music()
  if (audio.paused) {
      playBtn.querySelector('i').classList.remove("ri-play-fill");
      playBtn.querySelector('i').classList.add("ri-pause-fill");
      playBtn.classList.remove("play");
      playBtn.classList.add("pause");
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
function play_single_music(music){
  play(music)
  audio.play()
  toggle_currecter_music()
}
function play_music(music,music_list_index,music_index){
  try{
    all_music = {...all_music_holder}
  }
  catch(err){    
  }
  try{
    previous_music_index.lenght
  }
  catch(err){
    previous_music_index = -1
  }
  try{
    previous_music_list_index.length
  }
  catch(err){
    previous_music_list_index = -1
  }
  parent = findParentBySelector(event.target,'.music-list')
  if(parent == null){
    parent = findParentBySelector(event.target,'.music-list2')
  }
  if(parent == null){
    parent = findParentBySelector(event.target,'.all-artists')
  }
  all_musics = parent.querySelectorAll('.music')
  all_music_elm = document.querySelectorAll('.music')
  for(i = 0;i < all_music_elm.length;i++){
    all_music_elm[i].classList.remove('playing_music')
    if(all_music_elm[i] != all_musics[music_index]){
      all_music_elm[i].querySelector('.play i').classList.remove('ri-pause-fill')
      all_music_elm[i].querySelector('.play i').classList.add('ri-play-fill')
    }
  }
  try{

  play_btn = all_musics[music_index].querySelector('.play')
  if(play_btn.querySelector('i').classList.contains('ri-play-fill')){
    play_btn.querySelector('i').classList.remove('ri-play-fill')
    play_btn.querySelector('i').classList.add('ri-pause-fill')
  }
  else{
    play_btn.querySelector('i').classList.remove('ri-pause-fill')
    play_btn.querySelector('i').classList.add('ri-play-fill')
  }
  }
  catch(err){

  }
  try{

    previous_music = audio.src
    all_musics[music_index].classList.add('playing_music')
    if(previous_music != music){
      play(music)
      audio.play()
    }
    else if(previous_music_list_index+previous_music_index != music_list_index+music_index){
      play(music)
      audio.play()
    }
    else{
      if(audio.paused){
        audio.play()
      }
      else{
        audio.pause()
      }
    }
    toggle_currecter_music()
    previous_music_index = music_index
    previous_music_list_index = music_list_index
  }
  catch(err){
    play(Object.keys(all_music)[0])
    audio.play()
  }
}

play(Object.keys(all_music)[0])
function change_music(way){
  index = Object.keys(all_music).indexOf(audio.src)
  if(index == -1){
    music = audio.src.split('/')
    music = music[music.length - 2] + '/' + music[music.length - 1]
    music = decodeURI(music)
    index = Object.keys(all_music).indexOf(music)
  }
  if(way == 'next'){
    if (index + 1 < Object.keys(all_music).length){
      next_index = index + 1 
    }
    else{
      next_index = 0

    }
  }
  else if(way == 'previous'){
    if(index - 1 < 0){
      next_index = Object.keys(all_music).length - 1
    }
    else{
      next_index = index - 1
    }
  }
  else if(way == 'shuffle'){
    if(Object.keys(all_music).length > 1){
      while(true){
        next_index = generateRandomIntegerInRange(0,Object.keys(all_music).length - 1)
        if(next_index != index){
          break;
        }
      }
    }
    else{
      next_index = generateRandomIntegerInRange(0,Object.keys(all_music).length - 1)

    }
  }
  play(Object.keys(all_music)[next_index])
  audio.play()
  toggle_currecter_music()
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


function play_playlist(n_all_music){
  li = {}
  try{
    all_music_holder
  }
  catch(err){
    all_music_holder = {}
    Object.assign(all_music_holder, all_music);
  }
  n_all_music = n_all_music.split(',')
  for(i = 0;i < n_all_music.length;i++){
    console.log(n_all_music[i])
      li[n_all_music[i]] = (all_music_holder[n_all_music[i]])
  }
  all_music = {}
  Object.assign(all_music, li);
  // console.log(li)
  play(Object.keys(all_music)[0])
  audio.play()
  toggle_currecter_music()
}
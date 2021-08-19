$('input[type=range]').wrap("<div class='range'></div>");
var i = 1;

$('.range').each(function() {
  var n = this.getElementsByTagName('input')[0].value;
  var x = (n / 100) * (this.getElementsByTagName('input')[0].offsetWidth - 8) - 12;
  this.id = 'range' + i;
  if (this.getElementsByTagName('input')[0].value == 0) {
    this.className = "range"
  } else {
    this.className = "range rangeM"
  }
  console.log('test')
  this.innerHTML += "<style>#" + this.id + " input[type=range]::-webkit-slider-runnable-track {background:linear-gradient(to right, #9A00FF 0%, #9A00FF " + n + "%, #515151 " + n + "%)} #" + this.id + ":hover input[type=range]:after{left: " + x + "px}</style>";
  i++
});

$('input[type=range]').on("input", function() {
  var a = this.value;
  var p = (a / 100) * (this.offsetWidth - 8) - 12;
  if (a == 0) {
    this.parentNode.className = "range"
  } else {
    this.parentNode.className = "range rangeM"
  }
  audio.volume = a / 100;
  document.querySelector('.volume-box p').innerHTML = a
  this.parentNode.getElementsByTagName('style')[0].innerHTML = "#" + this.parentNode.id + " input[type=range]::-webkit-slider-runnable-track {background:linear-gradient(to right, #9A00FF 0%, #9A00FF " + a + "%, #515151 " + a + "%)} #" + this.parentNode.id + ":hover input[type=range]:after{left: " + p + "px}";
})
function volume_toggle(elm){
  if(audio.muted == false){
    elm.querySelector('i').classList.remove('ri-volume-up-fill')
    elm.querySelector('i').classList.add('ri-volume-mute-fill')

    
    
    audio.muted = true
  }
  else{
    audio.muted = false
    elm.querySelector('i').classList.remove('ri-volume-mute-fill')
    elm.querySelector('i').classList.add('ri-volume-up-fill')
  }
}
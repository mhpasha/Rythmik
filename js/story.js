function collectionHas(a, b) {
    for(var i = 0, len = a.length; i < len; i ++) {
        if(a[i] == b) return true;
    }
    return false;
}
function findParentBySelector(elm, selector) {
    var all = document.querySelectorAll(selector);
    var cur = elm.parentNode;
    while(cur && !collectionHas(all, cur)) {
        cur = cur.parentNode;
    }
    return cur;
}
var interval = ''
function fix_active(){
	active = document.querySelector('.stories .story-list .list .active')
	list = document.querySelector('.stories .story-list .list')
	rect = active.getBoundingClientRect();
	centerX = document.documentElement.clientWidth / 2;
	rect_av = (rect.right + rect.left) / 2
	out = centerX - rect_av
	right = list.style.right
	story = list.querySelector('.story:not(.active)')
	if(story == null){
		story = list.querySelector('.story')
	}
	var style = story.currentStyle || window.getComputedStyle(story);
	width = story.clientWidth
	margin = parseFloat(style.marginRight.replace('px','')) + parseFloat(style.marginLeft.replace('px',''))
	story_space = width + margin
	
		if(right.length == 0){
			list.style.right = out * -1 + 'px'
		}
		else{
			right = parseFloat(right.replace('px',''))
			if(out == 0){
				list.style.right = ((out - right)  * -1 )  + 'px'
			}
			else if(out < 0){
				list.style.right = ((out + 84 - right)  * -1 )  + 'px'
			}
			else{
				list.style.right = ((out - 84 - right)  * -1 )  + 'px'
			}
		}
	all_beffors = document.querySelectorAll('.story-list .story .timeline .beffor')
	for(i = 0;i < all_beffors.length;i++){
		all_beffors[i].removeEventListener("animationend", times_up);
	}
	beffor = document.querySelector('.story-list .active .timeline .beffor')
	beffor.addEventListener("animationend", times_up);
}


fix_active()
document.querySelector('body').onresize = function(){fix_active()};


function change_active(elm){
	all_more_box = document.querySelectorAll('.more-box')
	for(i = 0;i < all_more_box.length;i++){
		all_more_box[i].classList.add('display-none')
	}
	elm = elm.parentNode
	parent = elm.parentNode
	actives = parent.querySelectorAll('.active')
	for(i = 0;i < actives.length;i++){
		actives[i].classList.remove('active')
	}
	elm.classList.add('active')
	fix_active()
	beffor = document.querySelector('.story-list .active .timeline .beffor')
	beffor.addEventListener("animationend", function() {
		console.log('test')
		times_up()
		// change.innerHTML = "The animation has ended!";
	});
}
function change_active_btn(dir){
	all_more_box = document.querySelectorAll('.more-box')
	for(i = 0;i < all_more_box.length;i++){
		all_more_box[i].classList.add('display-none')
	}
	active = document.querySelector('.story-list .active')
	var nodes = Array.prototype.slice.call( active.parentNode.children );
	target_index = nodes.indexOf(active)
	if(dir == 'right'){
		target_index += 1
	}
	else if(dir == 'left'){
		target_index -= 1
	}
	active.classList.remove('active')
	active.parentNode.children[target_index].classList.add('active')
	fix_active()
	

}

function times_up(){
	console.log('test')
	active = document.querySelector('.story-list .active')
	var nodes = Array.prototype.slice.call( active.parentNode.children);
	target_index = nodes.indexOf(active)

	if(target_index < active.parentNode.children.length - 1){
		change_active_btn('right')
	}
	else{
		document.location.href = 'stories.html';
	}
}	
function more_box_toggle(elm){
	target = event.target
	more_btn = findParentBySelector(target,'.more-box')
	parent = findParentBySelector(target,'.more')
	if(more_btn == null){
		more_box = parent.querySelector('.more-box')
		more_box.classList.toggle('display-none')
	}
}
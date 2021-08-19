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
function text_toggle(){
	text_box = document.querySelector('.music-text-box')
	body = document.querySelector('body')
	body.classList.toggle('overflow-hidden')
	text_box.classList.toggle('display-none')
}
function single_play_list_toggle(){
	console.log(event.target.classList.toString())
	if (event.target.classList.toString().includes('clickable')){
		play_list = document.querySelector('.play-lists')
		play_list.classList.toggle('display-none')
	}
}
function toggle_edit_play_list_box(){
	edit_box = document.querySelector('.p-list-edit-box')
	edit_box.classList.toggle('display-none')
	body = document.querySelector('body')
	body.classList.toggle('overflow-hidden')
}
function toggle_add_play_list_box(){
	edit_box = document.querySelector('.p-list-edit-box.add-playlist')
	edit_box.classList.toggle('display-none')
	body = document.querySelector('body')
	body.classList.toggle('overflow-hidden')
	right_side_bar = document.querySelector('.right-sidebar')
	if(right_side_bar.classList.contains('right-0')){
		toggle_right_sidebar()
	}
}
function toggle_delete_play_list_box(){
	delete_box = document.querySelector('.p-list-delete-box')
	delete_box.classList.toggle('display-none')
	body = document.querySelector('body')
	body.classList.toggle('overflow-hidden')
}
function toggle_add_music(){
	add_box = document.querySelector('.add-music-box')
	body = document.querySelector('body')
	add_box.classList.toggle('display-none')
	body.classList.toggle('overflow-hidden')
}
function toggle_right_sidebar(){
	side_bar = document.querySelector('.right-sidebar')
	console.log(side_bar.style.right)
	shadow = document.querySelector('.shadow')
	if(side_bar.style.right.toString().length == 0 || side_bar.classList.toString().includes('righted') || side_bar.style.right == '-100%'){
		console.log('test1')
		side_bar.style.right = 0;
		shadow.classList.remove('display-none')
		side_bar.classList.remove('righted')
		side_bar.classList.add('right-0')
	}
	else{
		console.log('test2')
		side_bar.style.right = '-100%';
		shadow.classList.add('display-none')
		side_bar.classList.remove('right-0')
		side_bar.classList.add('righted')

	}
}
window.onresize = function(event) {
	s_width = $(document).width()
	r_sidebar = document.querySelector('.right-sidebar')
	shadow = document.querySelector('.shadow')
	if(s_width > 1000 && r_sidebar.style.right != 0){
		r_sidebar.style.right = 'unset'
	}
	else if(s_width < 1000 && r_sidebar.style.right != '-100%' && shadow.classList.contains('display-none'))
		r_sidebar.style.right = '-100%'
		console.log(r_sidebar.style.right)
}

function main_drodown_toggle(elm){
	target = event.target
	selector = '.res-ul'
	var parent = findParentBySelector(target, selector);
	if(parent == null){
		elm.querySelector(selector).classList.toggle('display-none')
	}
}

function user_dropdown(elm){
	var selector = ".user-drop-down";
	var parent = findParentBySelector(event.target, selector);
	if(parent == null){
		document.querySelector(selector).classList.toggle('display-none')
	}
}
function select_drop(elm){
	target = event.target
	parent = findParentBySelector(target,'.select-dropdown')
	if(! target.classList.contains('item')){
		elm.querySelector('.dropdown').classList.toggle('display-none')
		console.log(target)
	}
}
function item_changer_dropdown(elm){
	parent = findParentBySelector(elm,'.select-dropdown')
	parent.querySelector('span').innerHTML = elm.innerHTML
	parent.querySelector('.dropdown').classList.add('display-none')
}
function disply_account_fixed_box(selector){
	elm = document.querySelector(selector)
	elm.classList.toggle('display-none')
}

function delete_toggle(){
	musics = document.querySelector('.all-artists .musics')
	deleting_check_box = document.querySelector('.all-artists .deleting-check-box')
	musics.classList.toggle('display-none')
	deleting_check_box.classList.toggle('display-none')
}
function add_music_play_list(elm){
	target = event.target
	parent = findParentBySelector(target,'.add-list-box')
	console.log(parent)
	if(parent == null){
		all_add_list_box = document.querySelectorAll('.add-list-box')
		add_list_box = elm.querySelector('.add-list-box')
		for(i = 0;i < all_add_list_box.length;i++){
			if (all_add_list_box[i] != add_list_box){
			all_add_list_box[i].classList.add('display-none')
			}
		}
		add_list_box.classList.toggle('display-none')
	}
}
function display_not_empty_box(this_elm){
	this_elm.classList.add('display-none')
	document.querySelector('.not-empty-box').classList.remove('display-none')
}
function follow_btn(elm){
	icon = elm.querySelector('i')
	if(icon.classList.contains('ri-user-add-fill')){
		icon.classList.remove('ri-user-add-fill')
		icon.classList.add('ri-user-follow-fill')
	}
	else if(icon.classList.contains('ri-user-follow-fill')){
		music_elm = findParentBySelector(elm,'.music')
		music_list = findParentBySelector(music_elm,'.music-list')
		music_index = Array.prototype.slice.call(music_list.querySelectorAll('.music')).indexOf(music_elm)
		music_list_index = Array.prototype.slice.call(document.querySelectorAll('.music-list')).indexOf(music_list)
		console.log(music_list_index,music_index)
		document.querySelector('.account-fixed-box').querySelector('img').setAttribute('src',music_elm.querySelector('img').getAttribute('src'))
		document.querySelector('.account-fixed-box').querySelector('.q span').innerHTML = music_elm.querySelector('.name').innerHTML
		document.querySelector('.account-fixed-box').querySelector('.unfollow').setAttribute('onclick',`unfollow_btn(${music_list_index},${music_index})`)
		document.querySelector('.account-fixed-box').classList.remove('display-none')
	}
}
function unfollow_btn(music_list_index,music_index){
	elm = document.querySelector('.account-fixed-box')
	elm.classList.add('display-none')
	console.log(document.querySelectorAll('.music-list')[music_list_index].querySelectorAll('.music')[music_index])
	icon = document.querySelectorAll('.music-list')[music_list_index].querySelectorAll('.music')[music_index].querySelector('.follow-toggle i')
	icon.classList.remove('ri-user-follow-fill')
	icon.classList.add('ri-user-add-fill')
}
function follow_btn_toggle(elm){
	parent = findParentBySelector(elm,'.single-box')
	toggle = parent.querySelectorAll('.toggle')
	for(i = 0;i < toggle.length;i++){
		toggle[i].classList.toggle('display-none')
	}
}
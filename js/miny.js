function minify(parent){
	try{
	music_list = document.querySelectorAll(parent)
	if(parent == '.music-list2'){
		data_music_list = data_music_list2
	}
	else if(parent == '.all-artists'){
		data_music_list = all_artist_music_list
	}
	for(i = 0;i < data_music_list.length;i++){
		all_musics = music_list[i].querySelectorAll('.music')
		for(a = 0;a < data_music_list[i].length;a++){
			// console.log(i,a)
			clone_music = all_musics[0].cloneNode(true)
			try{
				music = all_musics[a]
				music.length
			}
			catch(err){
				if(parent == '.music-list'){
					music_list[i].querySelector('.list').appendChild(clone_music)
				}
				else if(parent == '.music-list2'){
					music_list[i].querySelector('.list ul').appendChild(clone_music)
				}
				else if(parent == '.all-artists' && !music_list[i].classList.contains('single-playlist')){
					music_list[i].querySelector('.container').appendChild(clone_music)
				}
				else if(parent == '.all-artists' && music_list[i].classList.contains('single-playlist')){
					music_list[i].querySelector('.musics').appendChild(clone_music)
				}
				all_musics = music_list[i].querySelectorAll('.music')
				music = all_musics[a]
			}
			if(parent != '.music-list2'){
				music.querySelector('a').setAttribute('href',data_music_list[i][a]['link'])
			}

			if(!music_list[i].classList.contains('all-playlists')){
				music.querySelector('img').setAttribute('src',data_music_list[i][a]['img'])
			}
			music.querySelector('.name').innerHTML = data_music_list[i][a]['name']
			try{
				music.querySelector('.singer').innerHTML = data_music_list[i][a]['singer']
			}
			catch(err){
				try{
					music.querySelector('.follower_count span').innerHTML = data_music_list[i][a]['follower_count']
				}
				catch(err){
					music.querySelector('.music_count span').innerHTML = data_music_list[i][a]['music_count']
				}
			}
			if(music.querySelector('.play').classList.contains('play-video')){
				console.log('play-video')
				li = data_music_list[i][a]
				music.querySelector('.play').setAttribute('onclick',`play_video('${li['m_link']}','${li['link']}')`)
			}
			else if(music.querySelector('.play').classList.contains('play-playlist')){
				li = data_music_list[i][a]
				music.querySelector('.play').setAttribute('onclick',`play_playlist('${li['all_music']}')`)
			}
			else if(!music.querySelector('.play').classList.contains('follow-toggle')){
				music.querySelector('.play').setAttribute('onclick',`play_music('${data_music_list[i][a]['m_link']}','${i}','${a}')`)
			}
			else{
				music.querySelector('.follow-toggle').setAttribute('onclick','follow_btn(this)')
			}
		}
	}
}
catch(err){
}

}
function minify_parent(container){
	try{
		if(container == '.music-list'){
			list_data = container_data_music_list
		}
		else if(container == '.music-list2'){
			list_data = container_data_music_list2

		}
		else if(container == '.story-list'){
			list_data = container_data_story_list
		}
		else if(container == '.all-artists'){
			list_data = container_data_all_artists
		}
		console.log(list_data)
		parent = document.querySelectorAll(container)
		console.log(parent)
		clone_inside = parent[0].innerHTML
		for(i = 0;i < parent.length;i++){
			parent[i].innerHTML = clone_inside
			console.log(parent[i])
			parent[i].querySelector('.name').innerHTML = list_data[i]['name']
			parent[i].querySelector('.continue').setAttribute('href',list_data[i]['link'])
		}
	}
	catch(err){
		
	}
}
function minify_story_list(container){
	stories = document.querySelectorAll('.story-list')
	for(i = 0;i < stories.length;i++){
		stories[i].querySelector('.story').setAttribute('href',data_story_list[i][0]['link'])
		stories[i].querySelector('.story img').setAttribute('src',data_story_list[i][0]['img'])
		for(a = 1;a < data_story_list[i].length ;a++){
			clone_story = stories[0].querySelector('.story').cloneNode(true)
			clone_story.setAttribute('href',data_story_list[i][a]['link'])
			clone_story.querySelector('img').setAttribute('src',data_story_list[i][a]['img'])
			stories[i].querySelector('.list').appendChild(clone_story)
		}
	}
}
minify_parent('.story-list')
minify_parent('.music-list')
minify_parent('.music-list2')
minify_parent('.all-artists')
minify('.music-list')
minify('.music-list2')
minify('.all-artists')
minify_story_list('ds')
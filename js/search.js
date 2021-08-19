url = window.location.href
result = url.split('search=')[1]
try{
	result = result.replaceAll('+','').replaceAll(' ','')
	if (result.length > 0){
		document.querySelector('.search-result-box').classList.remove('display-none')
		document.querySelector('.empty-box').classList.add('display-none')
	}
	else{
		console.log('test')
		document.querySelector('.search-result-box').classList.add('display-none')
		document.querySelector('.empty-box').classList.remove('display-none')
	}
}
catch(err){
	console.log('test')
		document.querySelector('.search-result-box').classList.add('display-none')
		document.querySelector('.empty-box').classList.remove('display-none')
}
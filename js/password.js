function password_toggle(elm){

	parent = elm.parentNode
	input = parent.querySelector('input')
	i_tag = parent.querySelector('i')
	if (input.type === "password") {
		input.type = "text";
		i_tag.classList.remove('ri-eye-fill')
		i_tag.classList.add('ri-eye-off-fill')
	} else {
		input.type = "password";
		i_tag.classList.remove('ri-eye-off-fill')
		i_tag.classList.add('ri-eye-fill')
	}
}
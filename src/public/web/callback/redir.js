document.addEventListener("DOMContentLoaded", function(event) {
	let access_token = window.location.hash;
	access_token = access_token.substr(1);
	access_token = access_token.split("&");
	access_token = access_token[0].split("=")[1];

	window.localStorage.setItem("spotify_token", access_token)

	document.location.href = "/";
});
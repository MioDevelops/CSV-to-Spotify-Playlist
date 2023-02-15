window.onload = async function() {
	let res = await fetch(`/api/parser?fileName=${window.localStorage.getItem("fileName")}&auth=${window.localStorage.getItem("spotify_token")}`)
	window.localStorage.removeItem("fileName")

	if(res.status === 400)
		window.location.href = `https://csv-to-spotify-playlist.mioyanaka.repl.co/home/#${encodeURI(await res.text())}`

	let songs = await res.text();
}
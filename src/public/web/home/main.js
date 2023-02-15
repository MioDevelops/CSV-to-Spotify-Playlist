const update_button_states = (enabled) => {
    if (enabled) {
        document.getElementById("auth-button").classList.add("disabled");
        document.getElementById("upload-button").classList.remove("disabled");
    } else {
        document.getElementById("auth-button").classList.remove("disabled");
        document.getElementById("upload-button").classList.add("disabled");
    }
}

const check_spotify_api_status = async () => {
    let result = await fetch(`/api/oauth?auth=${window.localStorage.getItem("spotify_token")}`)
    result = await result.text();

    if (result == "BAD") {
		console.log("OAuth token expired");
        return false;
    } else {
		console.log("OAuth token valid");
        return true;
    }
}

const change_states = async () => {
	let status = await check_spotify_api_status();
	update_button_states(status);

	if (!status) {
        document.getElementById("auth-button").addEventListener("click", () => {
            const CURRENT_URL = encodeURIComponent("https://csv-to-spotify-playlist.mioyanaka.repl.co/callback")
            const TARGET_URL = `https://accounts.spotify.com/en/authorize?scope=user-library-modify+user-read-playback-position+user-read-private+user-library-read+playlist-modify-public+playlist-read-private+playlist-read-collaborative+user-follow-read+user-read-currently-playing+user-read-playback-state+user-read-email+playlist-modify-private+user-top-read+ugc-image-upload+user-follow-modify+user-modify-playback-state+user-read-recently-played&response_type=token&redirect_uri=${CURRENT_URL}&state=0pps18&client_id=5e3495791cd94672965f2f5d25644543`        
            window.location.href = TARGET_URL;
        });
    } else {
        document.getElementById("upload-button").addEventListener("click", () => {
           document.getElementById("csv").click(); 
        });
    }
}

document.addEventListener("DOMContentLoaded", async function(event) {
	change_states();

	// check for page returns \\
	if(window.location.href.includes("#")) {
		let err = window.location.href.split("#")[1];
		document.getElementById("alert").style.display = "flex"
		document.getElementById("alert-text").innerText = decodeURI(err);

		document.getElementById("alert-close").addEventListener("click", () => {
			document.getElementById("alert").style.display = "none";
			window.location.href = "https://csv-to-spotify-playlist.mioyanaka.repl.co/home/"
		})
	}

	// listen for csv element change \\
	document.getElementById("csv").addEventListener("change", function(e) {
		const files = document.getElementById("csv").files;
		const csv = files[0];
		
		if(files.length === 0) {
			return;
		}

		const formData = new FormData();
		formData.append("file", csv);

		const upload_csv = async () => {
			const response = await fetch("/api/csv", {
				method: "POST",
				body: formData
			}).then((res) => { return res })

			window.localStorage.setItem("fileName", await response.text())

			if(response.status === 400) return;
			window.location.href = "https://csv-to-spotify-playlist.mioyanaka.repl.co/main/"
		}

		upload_csv();
	})

	// run spotify auth check every minute \\
	setInterval(function() {
		check_spotify_api_status();
		console.log("Checking OAuth token..")
	}, 25000)
});

function button_shake(button) {
	document.getElementById(button).style.animation = "shake .1s linear"
	setTimeout(() => {
		document.getElementById(button).style.animation = ""
	}, 100)
}

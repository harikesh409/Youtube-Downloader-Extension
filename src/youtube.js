const downloadVideo = (event) => {
	toggleListdisplay();
}

const toggleListdisplay = () => {
	let btn = document.querySelectorAll("#downloadVideo")[0];
    let dropdown = document.querySelector("#videoDownloadDropdown");
    if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show"); // = dropdown.className.replace("show", "");
    } else {
        //dropdown.classList += " show";
        dropdown.classList.add("show");
        dropdown.setAttribute("style", `left:${btn.offsetLeft}px`);
    }
}

const downloadURI = e => {
	//console.log('downloadURI');
	e.preventDefault();
	toggleListdisplay();
	let url = e.currentTarget.getAttribute("href");
	let name = document.getElementsByTagName("title")[0].innerText;
	let type = e.currentTarget.getAttribute("data-type");
	let ext = e.currentTarget.getAttribute("data-ext");
	let data = {
		url,
		name,
		type,
		ext,
		sender: "YTDL"
	};
	window.postMessage(data, "*");
}

window.onload = () => {
	// console.log("Loaded");
	let videoURLs = JSON.parse(window.ytplayer.config.args.player_response)
        .streamingData.formats;
	// console.log(videoURLs);
	setTimeout(() => {
		let container = document.querySelectorAll(
            "#info h1.ytd-video-primary-info-renderer"
		)[0];
		let btn = document.createElement("button");
		btn.id = "downloadVideo";
		btn.setAttribute("role", "button");
		btn.innerText = "Download";

		let dropdown = document.createElement("div");
		dropdown.id = "videoDownloadDropdown";

		let dropList = document.createElement("ul");

		dropdown.appendChild(dropList);
		container.appendChild(dropdown);
		container.appendChild(btn);
		// console.log("Download button appended");

		for (i in videoURLs) {
			let item = document.createElement("a");
			let ext = videoURLs[i]["mimeType"].split("/")[1].split(";")[0];
			item.innerText = `${videoURLs[i]["qualityLabel"]} (${ext})`;
			item.href = videoURLs[i]["url"];
			item.setAttribute("target", "_blank");
			item.setAttribute("data-type", videoURLs[i]["mimeType"]);
			item.setAttribute("data-ext", ext);
			item.addEventListener("click", downloadURI);
			dropList.append(item);
		}

		btn.addEventListener("click", downloadVideo);
		/*
		btn.addEventListener("blur", function(event){
			console.log('blur');
			if(event.target.id != dropdown.id)
				dropdown.classList.remove("show");
		});
		*/
	}, 5000)
}
const downloadVideo = () => {
	// console.log("Download this video");
	let dropdown = document.querySelector("#videoDownloadDropdown");
	if (dropdown.className.indexOf("show") > -1) {
		dropdown.className = dropdown.className.replace("show", "");
	} else {
		dropdown.classList += " show";
	}
}

const downloadURI = e => {
	e.preventDefault();
	let dropdown = document.querySelector("#videoDownloadDropdown");
	if (dropdown.className.indexOf("show") > -1) {
		dropdown.className = dropdown.className.replace("show", "");
	} else {
		dropdown.classList += " show";
	}
	let url = e.currentTarget.getAttribute("href");
	let name = document.getElementsByTagName("title")[0].innerText;
	let type = e.currentTarget.getAttribute("data-type");
	let data = {
		url,
		name,
		type,
		sender: "YTDL"
	};
	window.postMessage(data, "*");
}

window.onload = () => {
	// console.log("Loaded");
	let videoURLs = window.ytplayer.config.args.url_encoded_fmt_stream_map.split(",").map(item => {
		return item.split("&").reduce((pre, cur) => {
			// console.log("Prev: ", pre, "Curr: ", cur);
			cur = cur.split("=");
			return Object.assign(pre, {
				[cur[0]]: decodeURIComponent(cur[1])
			});
		}, {});
	});
	// console.log(videoURLs);
	setTimeout(() => {
		let container = document.querySelectorAll("#info")[2];
		let btn = document.createElement("button");
		// btn.className = "style-scope ytd-button-renderer style-default size-default";
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
			let ext = videoURLs[i]["type"].split("/")[1].split(";")[0];
			item.innerText = `${videoURLs[i]["quality"]} (${ext})`;
			item.href = videoURLs[i]["url"];
			item.setAttribute("target", "_blank");
			item.setAttribute("data-type", videoURLs[i]["type"]);
			item.addEventListener("click", downloadURI);
			dropList.append(item);
		}

		btn.addEventListener("click", downloadVideo);
	}, 5000)
}
script = document.createElement("script")
script.src = chrome.extension.getURL("src/youtube.js");

script.onload = function () {
	this.remove();
}

document.head.appendChild(script);

window.addEventListener("message", e => {
	//console.log(e);
	let ext = e.data.ext;//type.split("/")[1].split(";")[0];
	let filename = e.data.name + "." + ext;
	chrome.runtime.sendMessage({
		filename,
		url: e.data.url
	});
});
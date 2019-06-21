chrome.runtime.onMessage.addListener((request, sender, callback) => {
    let filename = request.filename.replace(/\?|:|"|~|<|>|\*|\|/g, "");
    let url = request.url;
    // console.log("received", request);
    // console.log(filename);
    chrome.downloads.download({
        filename,
        url
    });
});
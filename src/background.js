chrome.runtime.onMessage.addListener((request, sender, callback) => {
    let filename = request.filename.replace(/\?|:|"|~|<|>|\*|\|/g, "");
    let url = request.url;
    chrome.downloads.download({
        filename,
        url
    });
});
var loading = false;

function clearTweets() {
    let tweetList = document.getElementById("list-tweets");
    tweetList.replaceChildren();
}

function hideLoading() {
    let loadingImg = document.getElementById("loading-tweets");
    loadingImg.style.display = "none";
    loading = false;
}

function showLoading() {
    let loadingImg = document.getElementById("loading-tweets");
    loadingImg.style.display = "block";
    loading = true;
}

function fillTweets(tweets) {
    let tweetList = document.getElementById("list-tweets");
    for (let i = 0; i < tweets.length; i++) {
        let tweetCell = document.createElement("li");
        tweetCell.appendChild(document.createTextNode(tweets[i]));
        tweetList.appendChild(tweetCell);
    }
}

function generateTweets(context) {
    clearTweets();
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        hideLoading();
        if (this.readyState != 4) {
            return;
        }
    
        if (this.status == 200) {
            const tweets = JSON.parse(this.responseText);
            fillTweets(tweets["tweets"]);
        }
    };

    xhr.open("POST", "https://5a4ism7d0h.execute-api.us-east-1.amazonaws.com/dev/qa", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        context: context,
        numGen: 10
    }));
    showLoading();
}

function processContext() {
    if(loading) {
        return;
    }
    const context = document.getElementById("input-context").value;
    generateTweets(context);
}

function processRandom() {
    if(loading) {
        return;
    }
    generateTweets("");
}
function fillTweets(tweets) {
    let tweetList = document.getElementById("list-tweets");
    tweetList.replaceChildren();
    for (let i = 0; i < tweets.length; i++) {
        let tweetCell = document.createElement("li");
        tweetCell.appendChild(document.createTextNode(tweets[i]));
        tweetList.appendChild(tweetCell);
    }
}

function generateTweets(context) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;
    
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
}

function processContext() {
    const context = document.getElementById("input-context").value;
    generateTweets(context);
}

function processRandom() {
    generateTweets("");
}
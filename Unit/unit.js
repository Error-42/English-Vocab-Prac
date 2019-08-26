var json = null;
var cwID = null;
var hist = [];
var percent = [];
var firstTry = true;
function start() {
    document.getElementById("input").addEventListener("keyup", event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("btn1").click();
        }
    });

    const URL = window.location.href;
    const a = window.document.createElement('a');
    a.href = URL;
    let params = new URLSearchParams(a.search);
    var unit = params.get("unit");
    function loadJSON(callback) {   

        var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
        xobj.open('GET', 'unitData/' + unit + '.json', true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
              }
        };
        xobj.send(null);  
    }
    function init() {
        loadJSON(function(response) {
         // Parse JSON string into object
            json = JSON.parse(response);
            console.log(json);
            document.getElementById("updated").innerHTML = "Vocabulary last updated on: " + json.last_updated;
            newWord("Word: \"");
            document.getElementById("perin").value = Math.ceil(json.words.length / 2);
        });
    }
    init();
}
function newWord(text) {
    do{
        cwID = Math.floor(Math.random() * json.words.length);
    }while(hist.includes(cwID));
    hist.push(cwID)
    if(hist.length > json.words.length / 2) {hist.shift()}
    document.getElementById("text").innerHTML = text + json.words[cwID][0] + "\".";
    document.getElementById("btn1").innerHTML = "Submit answer";
    document.getElementById("btn2").innerHTML = "Show solution";
    document.getElementById("input").value = "";
    
}
function isCorrect() {
    if(json.words[cwID][1].includes((document.getElementById("input").value))) {
        if(firstTry) {
            percent.unshift(1);
            updatePercent();
        }else{
            firstTry = true;
        }
        newWord("Correct! New word: \"");
    }else if(json.words[cwID][2].includes((document.getElementById("input").value))) {
        document.getElementById("text").innerHTML = "Correct, but we've learnt another word for it! Your solution: \"" + document.getElementById("input").value + "\". Word: " + json.words[cwID][0] + ".";
        document.getElementById("btn1").innerHTML = "Try again";
        document.getElementById("btn2").innerHTML = "Show solution";
        document.getElementById("input").value = "";
    }
    else{
        if(firstTry) {
            percent.unshift(0);
            updatePercent();
            firstTry = false;
        }
        document.getElementById("text").innerHTML = "Incorrect! Your solution: \"" + document.getElementById("input").value + "\". Word: " + json.words[cwID][0] + ".";
        document.getElementById("btn1").innerHTML = "Try again";
        document.getElementById("btn2").innerHTML = "Show solution";
        document.getElementById("input").value = "";
    }
}
function updatePercent() {
    try {
        let perLength;
        if (document.getElementById("perin").value < percent.length) {
            perLength = document.getElementById("perin").value;
        }
        else {
            perLength = percent.length;
        }
        document.getElementById("perper").innerHTML = Math.round(percent.slice(0, document.getElementById("perin").value).reduce(getSum) / perLength * 1000) / 10;
    }
    catch {
        document.getElementById("perper").innerHTML = "??";
    }
}

function btn1(){
    isCorrect();
}
function getSum(total, num) {
    return total + num;
}
function btn2() {
    if(firstTry) {
        percent.unshift(0);
        updatePercent();
    }
    firstTry = true;
    switch (json.words[cwID][1].length) {
        case 1:
            var correctWords = "\"" + json.words[cwID][1][0] + "\"";
            break;
        case 2:
            var correctWords = "\"" + json.words[cwID][1][0] + "\" and \"" + json.words[cwID][1][1] + "\"";
            break;
        default:
            var correctWords = "\"" + json.words[cwID][1].slice(0, json.words[cwID][1].length - 1).join("\", \"") + "\" and \"" + json.words[cwID][1][json.words[cwID][1].length - 1] + "\"";
            console.log(correctWords);
            break;
    }
    var complexNewWordText = "The solution was: " + correctWords + ". New word: \"";
    newWord(complexNewWordText);
}
// Download files: https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
// Upload files: https://www.w3schools.com/tags/att_input_accept.asp
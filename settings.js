"use strict";

var savedName = "";

var helloDiv = document.getElementById("hello");

window.onload = function() {

    getSavedData();
    displayClock();
    
};

function getSavedData() {
    chrome.storage.sync.get(["name"], function(item) {
        if (item != null) {
            savedName = item.name;
            if (savedName == null) {
                askUsername();
            } else {
                var h1 = document.createElement("h1");
                h1.innerHTML = "What's up, " + "<span>" + savedName + "</span>?";
                h1.onclick = askUsername;
                helloDiv.innerHTML = "";
                helloDiv.appendChild(h1);
            }
        } else {
            askUsername();
        }
    });
}

function askUsername() {
    helloDiv.innerHTML = "";
    var input = document.createElement("input");
    input.id = "nameInput";
    input.placeholder = "What is your name?";
    var button = document.createElement("button");
    button.innerText = "Submit";
    button.onclick = changeHeader;
    helloDiv.appendChild(input);
    helloDiv.appendChild(button);
}

function changeHeader() {
    var nameInput = document.getElementById("nameInput");
    if (nameInput.length != 0 && nameInput.value != "What is your name?") {
        var h1 = document.createElement("h1");
        savedName = nameInput.value;
        h1.innerHTML = "What's up, " + "<span>" + savedName + "</span>?";
        h1.onclick = askUsername;
        helloDiv.innerHTML = "";
        helloDiv.appendChild(h1);
        chrome.storage.sync.set({"name": savedName}, function() {
        });
    }
}

function displayClock() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var ampm = getAMPM(h);
    m = checkTimeProperty(m); // Add leading 0 for minutes > 10
    h = convertToTwelveHr(h); // Convert to 12hr format
    document.getElementById("clock").innerHTML = h + "<span class='blink'>:</span>" + m + " " + ampm;
    var t = setTimeout(displayClock, 2000); // Run every 2 seconds
}
function checkTimeProperty(m) {
    if (m < 10)
        m = "0" + m;
    return m;
}
function convertToTwelveHr(h) {
    if (h > 12) {
        return h - 12;
    }
    if (h == 0)
        return 12;
    return h;
}
function getAMPM(h) {
    if (h < 12)
        return "AM";
    if (h >= 12)
        return "PM";
}

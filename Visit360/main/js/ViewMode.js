//Button to switch to Edition mode
function toggleMode() {
    window.location = "../html/index.html";
}

//============================================================================

//Load the edition_mode visit 
const config_edition_mode = localStorage.getItem('config_visit');
var importedConfig = JSON.parse(config_edition_mode);
var pan = pannellum.viewer('panorama', importedConfig);


// When we load the EditionMode configuration, we set a gateway function to each gateway in the scene
if(pan.getConfig()["hotSpots"]){
    for (let i = 0; i < pan.getConfig()["hotSpots"].length; i++){
        var hotspot = pan.getConfig()["hotSpots"][i];
        if(hotspot["type"]==="scene"){
            hotspot["clickHandlerFunc"] = myFunctionGateway;
        }
    }
}

 //Get the updated list miniMap containing circles added in EditionMap
const myVariableMiniMap = localStorage.getItem('miniMapDiv');
console.log(myVariableMiniMap)
    if (myVariableMiniMap) {
        const miniMapDiv = document.querySelector('#circles');
        miniMapDiv.innerHTML = myVariableMiniMap;
} 

//Array containing the scenes visited
var visitHistory = [];
//History of the scenes that will be printed in the html
var historyHtml = "";

const toggleButton = document.getElementById("console-toggle");
const consoleElement = document.getElementById("console");
const consoleContent = document.getElementById("console-content");
const clearHistory = document.getElementById("clear-history");

//This function is called whenever a gateway hotspot or a link in the history is clicked
//It adds the current scene to history
function myFunctionGateway(event, handlerArgs) {
    visitHistory.push(pan.getScene());
    historyHtml += "<a href='#' onclick='handleHistoryClick(\"" + pan.getScene() + "\")'> Visit " + pan.getScene() + "</a><br>";
    consoleContent.innerHTML = historyHtml;
}

// Code to execute when a link of the history is clicked -> Load the corresponding scene
function handleHistoryClick(handlerArgs) {
    pan.loadScene(handlerArgs)
}

//Button to show & hide history
toggleButton.addEventListener("click", function () {
    if (consoleElement.style.display === "none") {
        consoleElement.style.display = "block";
        toggleButton.innerHTML = "Hide History";
    } else {
        consoleElement.style.display = "none";
        toggleButton.innerHTML = "Show History";
    }
});

//Button to clear the history 
clearHistory.addEventListener("click", function () {
    visitHistory = [];
    historyHtml = "";
    consoleContent.innerHTML = "";
})

//MiniMap's Circles Behavior in View Mode
var lastSelectedCircle;

//Function that allows navigation through scenes using the miniMAp points
function circleClickHandler(circle) {
    if (lastSelectedCircle) {
        lastSelectedCircle.style.backgroundColor = "red";
    }
    circle.style.backgroundColor = "green";
    lastSelectedCircle = circle;
    console.log(circle.getAttribute("name"))
    pan.loadScene(circle.getAttribute("name"))
    myFunctionGateway()
    }

//Add a listener to every circle of the miniMap
const circlesDiv = document.getElementById("circles")

function setCirclesListener(){
    var circles = circlesDiv.querySelectorAll("circle");
    if(circles){
        for (const circle of circles) {
            circle.addEventListener("click", function() {
                circleClickHandler(circle);}
            );
        }
    };
}

setCirclesListener();
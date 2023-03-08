function toggleMode() {
    window.location = "../html/index.html";
}

//============================================================================

//Load the edition_mode visit 
const confing_edition_mode = localStorage.getItem('config_visit');
var importedConfig = JSON.parse(confing_edition_mode);
var pan = pannellum.viewer('panorama', importedConfig);


// When we load the EditionMode configuration, we set a getway function to each getway in the scene 
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


function myFunctionGateway(event, handlerArgs) {
    visitHistory.push(pan.getScene());
    historyHtml += "<a href='#' onclick='handleHistoryClick(\"" + pan.getScene() + "\")'> Visit " + pan.getScene() + "</a><br>";
    consoleContent.innerHTML = historyHtml;
}
function handleHistoryClick(handlerArgs) {
    // Code to execute when the link is clicked
    console.log("Link clicked!");
    console.log(handlerArgs)
    pan.loadScene(handlerArgs)
}

toggleButton.addEventListener("click", function () {
    if (consoleElement.style.display === "none") {
        consoleElement.style.display = "block";
        toggleButton.innerHTML = "Hide History";
    } else {
        consoleElement.style.display = "none";
        toggleButton.innerHTML = "Show History";
    }
});

clearHistory.addEventListener("click", function () {
    visitHistory = [];
    historyHtml = "";
    consoleContent.innerHTML = "";
})
        //MiniMap's Circles Behavior in View Mode
        var lastSelectedCircle;

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
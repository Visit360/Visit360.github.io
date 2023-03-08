//Get the updated list of images when we're on that we stored when leaving on edition Mode
const myVariableList = localStorage.getItem('imagesDiv');
if (myVariableList) {
    const imagesDiv = document.querySelector('#image-list');
    imagesDiv.innerHTML = myVariableList;
}
else {
    //ADD a small circle on each image
    //We add them so that we see the small circles if we load the miniMap before starting Edition

    const imageList = document.getElementById("image-list")
    // Get all the img elements on the imageList
    const images = imageList.getElementsByTagName('img');

    // Loop through each image and add a circle to its top left corner
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const circle = document.createElement("circle");
        circle.style.width = '10px';
        circle.style.height = '80px';
        circle.style.borderRadius = '5px';
        circle.style.backgroundColor = 'red';
        circle.style.position = 'absolute';
        circle.style.top = '50%';
        circle.style.transform= 'translate(+10%, -50%)';
        img.parentNode.insertBefore(circle, img);
    }
}

//Select one image
let selectedImage = null;
function selectImage(imageUrl) {
    if (selectedImage) {
        // Remove the selected class from the previously selected image
        selectedImage.classList.remove("selected");
    }
    // Set the selected image to the clicked image
    selectedImage = event.target;
    // Add the selected class to the clicked image
    selectedImage.classList.add("selected");
}

/* //-----------------------------------------------------------------------------------------
//Code to export the div called miniMap to the file mapExtraction.html
//-----------------------------------------------------------------------------------------
const exportDiv = document.getElementById("export-div")
exportDiv.addEventListener("click", function() {
const miniMap = document.getElementById("miniMap").cloneNode(true);
const targetWindow = window.open("./mapExtraction.html", "_blank");
targetWindow.addEventListener("load", function() {
    targetWindow.document.getElementById("miniMap").appendChild(miniMap);
});
}); */
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
//MINIMAP CODE 
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------

const miniMap = document.getElementById("miniMap");
const myVariableMiniMap = localStorage.getItem('miniMapDiv');
if (myVariableMiniMap) {
    miniMap.innerHTML = myVariableMiniMap;
}
//const modeButton = document.getElementById("mode-button");
const addAssociatedSceneForm = document.getElementById("add-scene-form")
const sceneAssociated = document.getElementById("sceneAssociated");
const addSceneOnMApButton = document.getElementById("add-scene-map")

const listOfScene = document.getElementById("listOfScene")
const myOldSceneDiv = localStorage.getItem('sceneDiv');
if (myOldSceneDiv) {
    listOfScene.innerHTML = myOldSceneDiv;
}

const items = listOfScene.getElementsByTagName('li');
Array.from(items).forEach((item) => {
    const itemName = item.textContent.toLowerCase();
    item.addEventListener('click', () => {
        sceneAssociated.value = itemName;
    })});

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const items = listOfScene.getElementsByTagName('li');
    Array.from(items).forEach((item) => {
        const itemName = item.textContent.toLowerCase();
        item.addEventListener('click', () => {
            sceneAssociated.value = itemName;
            console.log(sceneAssociated.value)
        });
        if (itemName.includes(searchText)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

var lastCreatedCircle = null

addSceneOnMApButton.addEventListener("click", function(e, arg){
    if(lastCreatedCircle){
        lastCreatedCircle.setAttribute("name", sceneAssociated.value)
    }
    searchInput.value=""
    sceneAssociated.value = ""
    addAssociatedSceneForm.style.display = "none"
    const items = listOfScene.getElementsByTagName('li');
    Array.from(items).forEach((item) => {
         item.style.display = 'block';
    });
})

function createCircle(){
    const circle = document.createElement("circle");
    circle.style.width = "2.5%";
    circle.style.paddingBottom = "2.5%";
    circle.style.borderRadius = "50%";
    circle.style.position = "absolute";
    circle.style.zIndex = 1;
    return circle;
}
var mapClickHandler = function(event) {
        var circle = createCircle();
        circle.style.backgroundColor = "red";
        circle.style.left = ((event.clientX - miniMap.getBoundingClientRect().left)/miniMap.clientWidth)*100 + "%";
        circle.style.top = ((event.clientY - miniMap.getBoundingClientRect().top)/miniMap.clientHeight)*100 + "%";
        //circle.style.left = event.clientX + "px";
        //circle.style.top = event.clientY + "px";
        miniMap.appendChild(circle);
        setDeletionListener(circle);
        lastCreatedCircle = circle
        addAssociatedSceneForm.style.display = "block";
};
var Hovercircle = createCircle();
var mapHoverHandler = function(event){
    Hovercircle.style.backgroundColor = "red";
    Hovercircle.style.left = ((event.clientX - miniMap.getBoundingClientRect().left)/miniMap.clientWidth)*100 + "%";
    Hovercircle.style.top = ((event.clientY - miniMap.getBoundingClientRect().top)/miniMap.clientHeight)*100 + "%";
    //Hovercircle.style.left = event.clientX + "px";
    //Hovercircle.style.top = event.clientY + "px";
    Hovercircle.style.opacity = 0.5;
    Hovercircle.setAttribute("class", "hover-circle");
    miniMap.appendChild(Hovercircle)
};

function setMapListener(){
    miniMap.addEventListener("click", mapClickHandler);
    miniMap.addEventListener("mousemove", mapHoverHandler);
}

var lastSelectedCircle;

function deletionHandler(event) {
    event.preventDefault();
    event.target.remove();
}

function setDeletionListener(circle) {
    if (circle) {
        circle.addEventListener('contextmenu', deletionHandler);
    }
}

function setDeletionListenerOnAll(){
    var circles = miniMap.querySelectorAll("circle");
    if(circles){
        circles.forEach(circle=>setDeletionListener(circle))
    }
}

mode = "Edition";
setMapListener();
setDeletionListenerOnAll()

window.addEventListener('beforeunload', function (event) {
    var tempMiniMap = miniMap.cloneNode(true);
    tempMiniMap.getElementsByClassName("hover-circle")[0].remove()
    console.log(tempMiniMap)
    const miniMapDiv = tempMiniMap.innerHTML;
    localStorage.setItem('miniMapDiv', miniMapDiv);
});

function toggleMode(){
    window.location="../html/index.html"
}
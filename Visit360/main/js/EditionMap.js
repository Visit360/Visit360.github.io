//-------------------------------------------------------------------------------------
//List of panoramical images
//-------------------------------------------------------------------------------------

//Get the updated list of images that we stored when leaving the Edition Mode page
const myVariableList = localStorage.getItem('imagesDiv');
//If this list is found in localStorage, then copy it into image-list div
//Else, set new the initial list of images 
if (myVariableList) {
    const imagesDiv = document.querySelector('#image-list');
    imagesDiv.innerHTML = myVariableList;
}
//ADD a red bar on each image because it wasn't added to the visit yet
else {
    const imageList = document.getElementById("image-list")
    // Get all the img elements on the imageList
    const images = imageList.getElementsByTagName('img');

    // Loop through each image and add a bar to its left side
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

//Select one image from the list
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

//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
//MINIMAP CODE 
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------

//If the corresponding miniMap has already been created, then get it from local Storage 
const miniMap = document.getElementById("miniMap");
const myVariableMiniMap = localStorage.getItem('miniMapDiv');
if (myVariableMiniMap) {
    miniMap.innerHTML = myVariableMiniMap;
}

//input form filled y the user
const addAssociatedSceneForm = document.getElementById("add-scene-form")
//Name of the associated scene
const sceneAssociated = document.getElementById("sceneAssociated");
//Button to submit the name of the scene associated
const addSceneOnMApButton = document.getElementById("add-scene-map")

//List of names of the scenes that have been added in the Edition Mode 
//These are the scenes suggested to the use when associating a scene to a point in the map
const listOfScene = document.getElementById("listOfScene")
const myOldSceneDiv = localStorage.getItem('sceneDiv');
if (myOldSceneDiv) {
    listOfScene.innerHTML = myOldSceneDiv;
}

const items = listOfScene.getElementsByTagName('li');
Array.from(items).forEach((item) => {
    const itemName = item.textContent;
    item.addEventListener('click', () => {
        sceneAssociated.value = itemName;
    })});

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value;
    const items = listOfScene.getElementsByTagName('li');
    Array.from(items).forEach((item) => {
        const itemName = item.textContent;
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

//The last created circle on the miniMap
var lastCreatedCircle = null

//Listener on the button Add scene to the mini Map
addSceneOnMApButton.addEventListener("click", function(e, arg){
    if(lastCreatedCircle){
        //Associate the last created circle to the corresponding scene
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

//Function to create a circle
function createCircle(){
    const circle = document.createElement("circle");
    circle.style.width = "2.5%";
    circle.style.paddingBottom = "2.5%";
    circle.style.borderRadius = "50%";
    circle.style.position = "absolute";
    circle.style.zIndex = 1;
    return circle;
}

//Function called by the listener on the mini Map div to create a circle with a responsive size
//And set a Deletion listener on the created circle
var mapClickHandler = function(event) {
        var circle = createCircle();
        circle.style.backgroundColor = "red";
        circle.style.left = ((event.clientX - miniMap.getBoundingClientRect().left)/miniMap.clientWidth)*100 + "%";
        circle.style.top = ((event.clientY - miniMap.getBoundingClientRect().top)/miniMap.clientHeight)*100 + "%";
        miniMap.appendChild(circle);
        setDeletionListener(circle);
        lastCreatedCircle = circle
        //Show the div to set a name to the created circle
        addAssociatedSceneForm.style.display = "block";
};

var Hovercircle = createCircle();
//Set a hover circle to help the user set the circle in the desired position
var mapHoverHandler = function(event){
    Hovercircle.style.backgroundColor = "red";
    Hovercircle.style.left = ((event.clientX - miniMap.getBoundingClientRect().left)/miniMap.clientWidth)*100 + "%";
    Hovercircle.style.top = ((event.clientY - miniMap.getBoundingClientRect().top)/miniMap.clientHeight)*100 + "%";
    Hovercircle.style.opacity = 0.5;
    Hovercircle.setAttribute("class", "hover-circle");
    miniMap.appendChild(Hovercircle)
};

//Set the map click handler and the map hover handler
function setMapListener(){
    miniMap.addEventListener("click", mapClickHandler);
    miniMap.addEventListener("mousemove", mapHoverHandler);
}

var lastSelectedCircle;

//Delete the targetted circle
function deletionHandler(event) {
    event.preventDefault();
    event.target.remove();
}

//Call the deletionHandler function to delete the circle when a right click on it is detected  
function setDeletionListener(circle) {
    if (circle) {
        circle.addEventListener('contextmenu', deletionHandler);
    }
}

//Get all the circles on the miniMap and set a DEeletion Listener for each one of them 
function setDeletionListenerOnAll(){
    var circles = miniMap.querySelectorAll("circle");
    if(circles){
        circles.forEach(circle=>setDeletionListener(circle))
    }
}

//Initial configuration
setMapListener();
setDeletionListenerOnAll()

//Code to execute when leaving the miniMap Edition Mode
//Store the current content of the miniMap
window.addEventListener('beforeunload', function (event) {
    var tempMiniMap = miniMap.cloneNode(true);
    tempMiniMap.getElementsByClassName("hover-circle")[0].remove()
    console.log(tempMiniMap)
    const miniMapDiv = tempMiniMap.innerHTML;
    localStorage.setItem('miniMapDiv', miniMapDiv);
});

//Function called to load the Edition Mode page 
function toggleMode(){
    window.location="../html/index.html"
}
//The basic initial configuration of visits
var initialConfig =
{
    "default": {
        "firstScene": "welcome",
        "sceneFadeDuration": 2000,
    },

    "scenes": {
        "welcome": {
            "title": "welcome",
            "panorama": "../../content/panorama/logo.jpg",
        },
    },

    "autoLoad": true
}

/*Check if there is a config_visit element (an available configuration of the visit)  in the localStorage,
if yes, set that configuration,
Else, create a new configuration*/
if (!localStorage.getItem('alreadyOpened')) {
    var pan = pannellum.viewer('panorama', initialConfig);
    localStorage.setItem('config_visit', JSON.stringify(initialConfig));
    localStorage.setItem("alreadyOpened", true);
}
else {
    console.log(localStorage.getItem('config_visit'))
    var importedConfig_view = JSON.parse(localStorage.getItem('config_visit'));
    var pan = pannellum.viewer('panorama', importedConfig_view)
}

//Set a listener to the window before unload
//The function is called whenever leaving the page EditionMode and whenever refreshing the page
window.addEventListener('beforeunload', function (event) {
    //Check if there isn't localStorage.getItem('goToZero') because the code shouldn't be run when 
    //the button "Clear Visit" is clicked
    if (!localStorage.getItem('goToZero')) {
        //Save the current visit's configuration before leaving the page or refreshing
        if (pan) {
            var configuration_visit = pan.getConfig();
            var partialConfig_visit = {}
            //Check whether the user chose a default scene for the visit or not
            if(localStorage.getItem("defaultScene")){
                partialConfig_visit["default"] = JSON.parse(localStorage.getItem("defaultScene"));
            }
            else{
                partialConfig_visit["default"] = configuration_visit.default;
            }
            partialConfig_visit["scenes"] = configuration_visit.scenes;
            partialConfig_visit["autoLoad"] = true;
            var textConfig = JSON.stringify(partialConfig_visit);
            localStorage.setItem('config_visit', textConfig);
        }

        if (imageList) {
            // Store the content of the images div in localStorage
            selectedImage.classList.remove("selected");
            const ImagesDiv = imageList.innerHTML;
            localStorage.setItem('imagesDiv', ImagesDiv);
        }

        if (listOfScene.childElementCount > 0) {
            // Store the content of the list of scene in localStorage
            const SceneDiv = listOfScene.outerHTML;
            localStorage.setItem('sceneDiv', SceneDiv);
        }
    }
});

//==============================================================================
// Get coordinates

var lastClickCoord = null

//Get coordinates of the mouse in pitch and yaw
const panoramaView = document.getElementById("panorama");

panoramaView.addEventListener("click", function (event) {
    lastClickCoord = null;
    lastClickCoord = pan.mouseEventToCoords(event)
})


//===============================================================================
//Button "Add information"
//This button adds a hotspot of information at the selected place in the panorama 

const informationButton = document.getElementById("information");
const popUp_Info = document.getElementById("hotspotInfoDesc");
var closeInfoDesc = popUp_Info.getElementsByClassName("closeInfoDesc")[0];

//Show a pop up to when adding an information hotspot to type its description
informationButton.onclick = function () {
    popUp_Info.classList.add("show");
}

// When the user clicks on the close button, hide the popup
closeInfoDesc.onclick = function () {
    popUp_Info.classList.remove("show");
}

//The description text
const infoText = document.getElementById("infoText");

const submitButtonInfo = document.getElementById("submitButtonInfo");

//Create a new information hotspot
submitButtonInfo.addEventListener("click", function () {
    var hotspotInformation = {}
    hotspotInformation["id"] = hotspotID += 1;
    hotspotInformation["pitch"] = lastClickCoord[0];
    hotspotInformation["yaw"] = lastClickCoord[1];
    hotspotInformation["type"] = "info";
    hotspotInformation["text"] = infoText.value;
    hotspotInformation["clickHandlerFunc"] = myFunctionInformation;
    pan.addHotSpot(hotspotInformation, pan.getScene());
    infoText.value = "";
    popUp_Info.classList.remove("show");
})

//===============================================================================
//Button "Add gateway"
//This button adds a hotspot gateway at the selected place in the panorama 

const gatewayButton = document.getElementById("gateway");
const popUp_Gateway = document.getElementById("gatewayInfo");
var closeGatewayInfo = popUp_Gateway.getElementsByClassName("closeGatewayInfo")[0];

    /*List of scenes already existing in the visit
    This list is used to remind the user of the scenes that were added to the visit so that he easily chooses
    the scene to associate to the gateway hotspot*/
    const listOfScene = document.getElementById('listOfScene');
    const myOldSceneDiv = localStorage.getItem('sceneDiv');
    if (myOldSceneDiv) {
        listOfScene.innerHTML = myOldSceneDiv;
    }


    //Search bar ===============================================
    const items = listOfScene.getElementsByTagName('li');
    Array.from(items).forEach((item) => {
        const itemName = item.textContent;
        item.addEventListener('click', () => {
            sceneIdField.value = itemName;
        })
    });

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value;
        const items = listOfScene.getElementsByTagName('li');
        Array.from(items).forEach((item) => {
            const itemName = item.textContent;
            item.addEventListener('click', () => {
                sceneIdField.value = itemName;
            });
            if (itemName.includes(searchText)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
    //==============================================================

//Show a pop up to when adding a gateway hotspot to select the next scene and add a description
gatewayButton.addEventListener("click", function () {
    popUp_Gateway.classList.add("show");
})

// When the user clicks on the close button, hide the popup
closeGatewayInfo.onclick = function () {
    searchInput.value = "";
    sceneIdField.value = "";
    gatewayText.value = "";
    const items = listOfScene.getElementsByTagName('li');
    Array.from(items).forEach((item) => {
        item.style.display = 'block';
    });
    popUp_Gateway.classList.remove("show");
}

const sceneIdField = document.getElementById("endSceneId");
const gatewayText = document.getElementById("gatewayText");
const submitButton = document.getElementById("submitButton");


/*Note : hotspotID is common to both gateway hotpots and information hotspots in order to delete them easily
by calling the function removeHotspot */
var hotspotID = 0;
//Create a new gateway hotspot
submitButton.addEventListener("click", function () {
    var hotspotGateway = {}
    hotspotGateway["id"] = hotspotID += 1;
    hotspotGateway["pitch"] = lastClickCoord[0];
    hotspotGateway["yaw"] = lastClickCoord[1];
    hotspotGateway["type"] = "scene";
    hotspotGateway["sceneId"] = sceneIdField.value;
    hotspotGateway["text"] = gatewayText.value;
    hotspotGateway["clickHandlerFunc"] = myFunctionGateway;
    pan.addHotSpot(hotspotGateway, pan.getScene());
    popUp_Gateway.classList.remove("show");
    sceneIdField.value = "";
    gatewayText.value = "";
    searchInput.value = "";
    const items = listOfScene.getElementsByTagName('li');
    Array.from(items).forEach((item) => {
        item.style.display = 'block';
    });
    popUp_Gateway.classList.remove("show");
})

//========================================================================================
//Button delete
//This button deletes the selected hotspot

var deletable = false;

const deleteHotspotButton = document.getElementById("deleteHotspot");
//When the button is clicked (color is light red), the next selected hotspot will be deleted
deleteHotspotButton.addEventListener("click", function () {
    if (deletable == false) {
        deletable = true;
        deleteHotspotButton.style.backgroundColor = '#ffcccb';
    }
    else {
        deletable = false;
        deleteHotspotButton.style.backgroundColor = '';
    }
})

//Function that's called when clicking on an information hotspot
//This function is used to remove the clicked hotspot from the visit when it's deletable
function myFunctionInformation(event, handlerArgs) {
    if (deletable == true) {
        pan.removeHotSpot(this.id)
        deleteHotspotButton.style.backgroundColor = ""
        deletable = false;
    }
}

//Function that's called when clicking on a gateway hotspot
//This function is used to remove the clicked hotspot from the visit when it's deletable
function myFunctionGateway(event, handlerArgs) {
    currentScene = pan.getScene();
    if (deletable == true) {
        this.sceneId = currentScene;
        pan.removeHotSpot(this.id);
        pan.loadScene(currentScene);
        deleteHotspotButton.style.backgroundColor = "";
        deletable = false;
        console.log("Hotspot deleted")
    }
}

//=======================================================================================================
//ADD a small bar on the left of each image
//This will help the user to know if a scene is already added in a visit or not
//=======================================================================================================

const imageList = document.getElementById("image-list")
// Get all the img elements on the imageList
const images = imageList.getElementsByTagName('img');


//If the list of images is already set in localStorage, then get it
const myOldImagesDiv = localStorage.getItem('imagesDiv');
if (myOldImagesDiv) {
    imageList.innerHTML = myOldImagesDiv;
}
else{
    // Loop through each image and add a bar to its top left corner
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const circle = document.createElement("circle");
        circle.style.width = '10px';
        circle.style.height = '80px';
        circle.style.borderRadius = '5px';
        circle.style.backgroundColor = 'red';
        circle.style.position = 'absolute';
        circle.style.top = '50%';
        circle.style.transform = 'translate(+10%, -50%)';
        img.parentNode.insertBefore(circle, img);
    }
}

//Button of Set panorama as default 
const setToDefault = document.getElementById("setToDefault");

//Select one image
let selectedImage = null;
let availabilityColor = null;

function selectImage(imageUrl) {
    if (selectedImage) {
        // Remove the selected class from the previously selected image
        selectedImage.classList.remove("selected");
    }
    // Set the selected image to the clicked image
    selectedImage = event.target;
    var selectedForDefault = selectedImage.parentNode.querySelector("circle");
    var selectedColor = window.getComputedStyle(selectedForDefault).getPropertyValue("background-color");
    availabilityColor = selectedColor;
    // Add the selected class to the clicked image
    selectedImage.classList.add("selected");

    /*selectedColor will be used to show or hide the button set to default
    Only scenes added to the visit can be set as default*/
    var selectedForDefault = selectedImage.parentNode.querySelector("circle");
    if(selectedForDefault){
        var selectedColor = window.getComputedStyle(selectedForDefault).getPropertyValue("background-color")
        if (selectedColor == "rgb(80, 200, 120)"){//If color of circle is green
            setToDefault.style.display = "block"
        }
        else {
            setToDefault.style.display = "none"
        }
    }
}

//=======================================================================================================
//Button Set scene to Default
setToDefault.addEventListener("click", function(){
    var defaultScene = {}
    defaultScene["firstScene"] = selectedImage.getAttribute('title');
    defaultScene["sceneFadeDuration"] = 2000;
    localStorage.setItem("defaultScene", JSON.stringify(defaultScene))
    setToDefault.style.display = "none"
})


//=======================================================================================================
//Button add panorama
//This button adds the selected panorama to the visit

const AddPanoButton = document.getElementById("addPano");
var popup_Panorma_info = document.getElementById("panoInfo");
/*These elements are called to manage exceptions : if the user tries to give the same name to two scenes,
  If the user tries to add a scene that has already been added or If he tries add a scene without selecting the
  corresponding image from the list*/
const sameNameDiv = document.getElementById("sameName");
const noPanorama = document.getElementById("noPanorama");
const alreadyAdded = document.getElementById("alreadyAdded");

// Get the close button
var closePano = popup_Panorma_info.getElementsByClassName("closePano")[0];

AddPanoButton.onclick = function () {
    if (selectedImage == null) { // if no panorama is selected
        popup_Panorma_info.classList.add("show");
        noPanorama.style.display = 'block';
    } else {
        sameNameDiv.style.display = 'none';
        alreadyAdded.style.display = 'none';
        noPanorama.style.display = 'none';
        popup_Panorma_info.classList.add("show");
    }
}

// When the user clicks on the close button, hide the popup
closePano.onclick = function () {
    popup_Panorma_info.classList.remove("show");
}

const IdsceneField = document.getElementById("endScenePano");
const subButton = document.getElementById("submitButtonPano");


//Add the scene with the panorama selected
subButton.addEventListener("click", function () {
    if (selectedImage == null) { // if no panorama is selected
        //No panorama selected
        noPanorama.style.display = 'block';
    } else if (availabilityColor === "rgb(80, 200, 120)") {
        //scene already added");
        alreadyAdded.style.display = 'block';
    } else {
        var SceneInfo = {}

        //items = child of listOfScene
        //Check if there is a scene that has the same name
        for (var i = 0; i < items.length; i++) {
            if (items[i].innerHTML === IdsceneField.value){
                sameNameDiv.style.display = 'block';
                return;
            }
          }
        sameNameDiv.style.display = 'none';
        alreadyAdded.style.display = 'none';
        noPanorama.style.display = 'none';
        SceneInfo["title"] = IdsceneField.value;
        SceneInfo["panorama"] = selectedImage.src;
        pan.addScene(SceneInfo.title, SceneInfo);

        //Add an element to the list of scene=================
        const itemName = IdsceneField.value;
        const newItem = document.createElement('li');
        newItem.textContent = IdsceneField.value;
        listOfScene.appendChild(newItem);
        //=================

        sceneIdField.value = "";
        //Deselect the added panorama
        selectedImage.classList.remove("selected");
        //pan.loadScene(SceneInfo["title"]);
        selectedImage.title = IdsceneField.value;
        IdsceneField.value = null;
        //Set the associated small circle's color to green when adding a sceneId to the selected image
        selectedImage.parentNode.getElementsByTagName("circle")[0].style.backgroundColor = "#50C878"
        //Set the image that we added to the visit in the first position of the list
        selectedImage.parentNode.parentNode.insertBefore(selectedImage.parentNode, selectedImage.parentNode.parentNode.firstChild);
        popup_Panorma_info.classList.remove("show");

    }
})

//=======================================================================================================
//Button export
//This button export the Visit into a JSON file 
const ExportButton = document.getElementById("ExportScene");

ExportButton.addEventListener("click", function () {
    //Convert the visit into JSON
    var config = pan.getConfig();
    var partialConfig = {}
    partialConfig["default"] = config.default;
    partialConfig["scenes"] = config.scenes;
    partialConfig["miniMapDiv"] = localStorage.getItem("miniMapDiv")
    console.log(partialConfig)
    var jsonFile = JSON.stringify(partialConfig);
    // Create a Blob object from the JSON string
    const blob = new Blob([jsonFile], { type: "application/json" });
    // Create a URL for the Blob object
    const url = URL.createObjectURL(blob);
    // Create a link element for downloading the file
    const link = document.createElement("a");
    link.href = url;
    link.download = "myData.json";
    // Add the link to the document and click it to download the file
    document.body.appendChild(link);
    link.click();
})

//=======================================================================================================
//Button import visit
//This button import a visit (which is a JSON file already imported in the gitHub repository)
const ImportButton = document.getElementById("importVisit");
const popUpImport = document.getElementById("importVisitDesc");
var closeImportInfo = popUpImport.getElementsByClassName("closeImportInfo")[0];

ImportButton.addEventListener("click", function () {
    popUpImport.classList.add("show");
})

//Close the import pop-up
closeImportInfo.onclick = function () {
    popUpImport.classList.remove("show");
}


const ButtonImportPolytech = document.getElementById('ButtonImportPolytech');
const ButtonImportFablab = document.getElementById('ButtonImportFablab');
const ButtonImportDomus = document.getElementById('ButtonImportDomus');
const ButtonImportCasemate = document.getElementById('ButtonImportCasemate');

//Json files of the demo visits
var polytechJson = '../../content/visit/visit_polytech.json';
var fablabJson = '../../content/visit/visit_Fablab.json';
var domusJson = '../../content/visit/visit_domus.json';
var casemateJson = '../../content/visit/visit_casemate.json';

ButtonImportPolytech.addEventListener("click", function(){ importVisit(polytechJson) })
ButtonImportFablab.addEventListener("click", function(){ importVisit(fablabJson) })
ButtonImportDomus.addEventListener("click", function(){ importVisit(domusJson) })
ButtonImportCasemate.addEventListener("click", function(){ importVisit(casemateJson) })

function importVisit(jsonFilePath){
    // Read the JSON file and parse its contents
    const request = new XMLHttpRequest();
    request.open('GET', jsonFilePath, false);
    request.send(null);
    const jsonData = JSON.parse(request.responseText);
    //===============================================================
    //Destroy the previous visit
    pan.destroy();
    //Load the new one
     const scenesJSON = { default: jsonData['default'], scenes: jsonData.scenes };
    console.log(scenesJSON)
    pan = pannellum.viewer('panorama',scenesJSON);
    // When we load the Imported configuration, we set an onClick listener function to each hotspot in the scene
    if(pan.getConfig()["hotSpots"]){
        for (let i = 0; i < pan.getConfig()["hotSpots"].length; i++){
            var hotspot = pan.getConfig()["hotSpots"][i];
            if(hotspot["type"]==="scene"){
                hotspot["clickHandlerFunc"] = myFunctionGateway;
            }
            else if(hotspot["type"]==="info"){  
                hotspot["clickHandlerFunc"] = myFunctionInformation;
            }
        }
    }
    //Check if there is a MiniMap made for this visit
    if(jsonData.miniMapDiv){
        localStorage.setItem("miniMapDiv", jsonData.miniMapDiv)
    } 
    else{
        localStorage.removeItem("miniMapDiv")
    }
    popUpImport.classList.remove("show");
}

//=======================================================================================================
//Button clear visit
//This button allow the user to start over their visit 

const ClearVisit = document.getElementById("clearVisit");

/*The boolean "goToZero" is used to make a difference between a window reload called when the button Clear Visit
  is clicked and a normal reload that's called when leaving the page or refreshing it */
ClearVisit.addEventListener("click", function () {
    pan.destroy();
    localStorage.clear();
    localStorage.setItem("goToZero", true)
    location.reload()
    localStorage.removeItem("goToZero")
})

//=======================================================================================================
//Button to switch to view mode
function toggleMode() {
    window.location = "../html/ViewMode.html";
}
//=======================================================================================================
//Button to go to map edition, it will also store the content of the ImagesDiv
function gotomap() {
    window.location = "../html/EditionMap.html"
}
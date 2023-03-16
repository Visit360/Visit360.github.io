# VISIT360 - Virtual Tour Editor  

# Demonstration  
<a href="https://visit360.github.io/Visit360/main/html/index.html">Click to go to the demonstration</a>

# Documentation 

## About 

Visit360 is a software that aims to create virtual visits of any building using panoramical 360° images.   
For the demonstration phase, we created a web page that allows you to edit and save the virtual visit of Polytech Grenoble and some other buildings taken as examples.  
The demonstration is based on a web page using HTML, JavaScript and CSS and most importantly the library Panellum which is a lightweight, free, and open source panorama viewer for the web. It's built using HTML5, CSS3, JavaScript, and WebGL.

## Getting Started 
### Hosted Examples 
To show the usability of Visit360, we chose to create 4 virtual visits of 4 different buildings that we could visit : Polytech Grenoble, Fablab, DOMUS smart apartmenet and La Casemate.  
These visits can be imported, navigated or modified and the stored in your local storage.  
You can use those visits to get familiar with the tool VISIT360 and with the navigation between scenes.  

## How to use 
The Visit360 web page is accessible via the following link : http://localhost:8000/Visit360.github.io/Visit360/main/EditionMode.html   

### Edition Mode

You'll arrive on the Edition Mode of the software. In the right side, you have a list of panoramical images that you can select to add to your visit.  
Adding a panorama to your visit requires selecting it, then clicking the button *Add Panorama*, this will open a pop-up where you can type an Id for your scene (a title), then click the button *Submit*. This will move your scene to the top of the list and turn the red mark to a green one. Hovering an added scene enables you to see the id id that you already set. Also, clicking on a scene that has already been added to your visit enables you to set it as the initial scene of that visit by clicking on the button "Set to Default".  

In the center of the page, you have the panorama that you're actually editing, you can drag the panorama using your mouse to navigate in it, you can zoom in or out and you can go to the full screen mode. Buttons allowing you to do that are in the top left corner. The title/ID of the current panorama (scene) is in the bottom left corner of the visualization.  

In the right side, we have a list of buttons allowing different features in our software :   
- To add an information to the current panorama, you have to click on the location where you want to add it in the panorama, then click the button *Add Information*, this will open a pop-up where you can type your description and submit it to be added. Later you can read that description once you hover the *Information Hotspot* icon in the panorama.
 - Follow the same process to add a *Gateway Hotspot*. So start by selecting the location in the panorama where you want to add your gateway, then click the button *Add Gateway* in the left. This will open a pop-up where you have to type the next Scene ID (the ID of a scene that has a green mark in the right side list, to avoid any possible mistake, you'll be provided a list of available scenes in the visit, where you can choose the scene to associate to that new gateway), you can also type the gateway text which is the text to show when you hover that hotspot. Finally, you click the *submit* button to add the created gateway.  
 Remember that youcan't add a scene twice to the visit, and two scenes can't have the same name, trying these two scenarios will give you a warning pop-up.  
 - In order to delete a hotspot (Gateway or Information hotspot), firstly, you have to click the button *Delete Hotspot*, its color will become red which means that you're ready to delete a hotspot, all you need now it so select the hotspot that you want to delete from the current panorama by clicking on it. This will delete the hotspot and refresh the current panorama.
- The button *Export Visit* enables you to export your current edited visit in a JSON format, you can find the downloaded visit in the Downloads repository of your local storage.  
Exporting a visit is exporting its configuration and the mini map associated to it, which means that you export the scenes, their information hotspots, their gateway hotspots and the mini map that you edited in the edition phase.  
- The button *Import Visit* enables importing an existing visit by selecting one of the available visits. There are 4 visits given as examples, that you can navigate and edit. 
- The button *Clear Visit* enables you to delete all the modifications that are made on the current visit. 
You have to click that button when you want to start a new visit creation.  
You can switch between Edition Mode, Map Edition Mode and View Mode :   
- To go to the view mode from the edition mode, you have to click on the *eye* button in the top left corner.
- To go to the edition map mode from the edition mode, you can click on the *hand* button in the top right corner.

### Mini Map Edition Mode

Once in the Mini Map Edition Mode, you'll have the same list of panoramas in the right side just like the Edition mode.   
In the center of the page, you'll have a map representing the floor map of Polytech Grenoble. On this map you can add points of interests (red circles) in the positions that you want. Those points can represent the panoramas that you have, that's why when you add one, you get a form under the map where you can type the id of the scene (panorama) to associate to the lastly added point.  
To help you avoid mistakes, you're provided a list of available scenes in your visit to associate them easily to the mini map.  
The points of interest on your mini map can easily be deleted any time, when you're in the Mini Map Edition Mode, with a mouse's right click.    
When you finish the edition of the mini map, you can go back to the Edition mode by clicking in the *pencil* top right corner button.

### View Mode 

The view mode contains 3 main parts:  

Fistly, the visit visualization part, that is in the right, and that allows us to view the whole edited visit by navigating in panoramas, reading information in the hotspots and navigating through the gateway hotspots to other panoramas of the visit.  

Secondly, the mini map visualization part, that allows us to navigate between panoramas by clicking on the points of interest that were added in the *Mini Map Edition Mode*. The green point represents the current panorama (scene), and clicking on one of the circles takes you to the corresponding scene by loading it.  

Thirdly, the history part that you can show and hide by clicking the button *Show History*/*Hide History*, this history contains clickable paths to the scenes you went throught in your visit when you went to the *View Mode*.  
The history is updated whenever you navigate through the panoramas (scenes) using the gateway hotspots or using the point of interest in the mini map, also the history is deletable by clicking on the button *Clear History*.  

To go back to the *Edition Mode*, you have to click on the *pencil* top left corner button.  

## Browser Compatibily 
Since Visit360 and Pannellum are built with web standards, they require a modern browser to function.  
Full support (with appropriate graphics drivers):  
* Firefox 23+  
* Chrome 24+  
* Safari 8+  
* Internet Explorer 11+  
* Edge  

The support list is based on feature support. As only recent browsers are tested, there may be regressions in older browsers.  
### Not officially supported:
Mobile / app frameworks are not officially supported in this version of Visit360. They may work, but they're not tested and are not the targeted platform.
## Licence
Visit360 is distributed under the MIT License.  
Pannellum is distributed under the MIT License.

## Credits 
Petroff, Matthew A. "Pannellum: a lightweight web-based panorama viewer." Journal of Open Source Software 4, no. 40 (2019):  
<a href="https://doi.org/10.21105/joss.01628" rel="nofollow">doi:10.21105/joss.01628</a>


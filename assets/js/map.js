
// Initialize LayerGroups for each category
var layerList = {}

// Initialize the map and set view to some coordinates and zoom level
var map = L.map('mapid', {}).setView([36.546769159758234, 0], 2);

var bm = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors   ',
	subdomains: 'abcd',
	minZoom: 0,
	ext: 'png'
})

bm.addTo(map);

var researchLayer1 = L.featureGroup().addTo(map);
var researchLayer2 = L.featureGroup().addTo(map);
var teachingLayer = L.featureGroup().addTo(map);
var fieldLayer = L.featureGroup().addTo(map);
var educationLayer = L.featureGroup().addTo(map);

// create a popup and add it to the map
var popup = L.popup({
    closeButton: true,
    autoClose: true,
    className: 'custom-popup'
  })
  .setLatLng(map.getCenter()) // set popup at the center of the map
  .setContent('<p>Click a point to learn more.</p>')
  .openOn(map); // open the popup immediately
  

// add a click event to the map to close the popup
map.on('click', function(e) {
    popup.removeFrom(map);
});
  
// Function to determine color based on category
function getColor(category) {
    switch(category) {
        case "Research (First Author)": return "#00EAD3";
        case "Research (Co-Author)": return "#96BAFF";
        case "Teaching": return "#FFF5B7";
        case "Field Work": return "#54E346";
        case "Education": return "#FF449F";
        default: return "black";
    }
}

// Fetch data from your Research JSON file
fetch('./assets/js/research.json')

    .then(response => response.json())

    .then(data => {

        // Get the width of the viewport in pixels
        var viewportWidth = window.innerWidth;
        var viewportHeight = window.innerHeight;

        // Calculate 90% of the viewport width
        var popupMaxWidth = viewportWidth * 0.4
        var popupMaxHeight = viewportHeight * 0.9;

        // Add points to the map
        for (var i = 0; i < data.length; i++) {

            var circle = L.circle([data[i].lat, data[i].lon], { radius: 200000, fillColor: getColor(data[i].category), fillOpacity: 1, color: "#666666", weight: 1})

            if (data[i].category == 'Research (First Author)') {
                circle.addTo(researchLayer1);
            } else if (data[i].category == 'Research (Co-Author)') {
                circle.addTo(researchLayer2);
            }
            circle.bindPopup("<div class='popup-content' style='max-height: 300px; overflow-y: scroll !important>'" +
                "<br><b><div style='text-align: center; font-size: 16px'>" + data[i].title + "</b></div>" +
                "<br><div class='image-container' style='text-align: center'><img class='small-image' src='" + data[i].image + "'></div>" +
                "<div style='text-align: center'><div style='text-align: center'>" + data[i].authors + "</div>" +
                "<br><div style='text-align: center'><b>Summary</b><br><div style='text-align: center'>" + data[i].summary + "</div>" +
                // "<br><div style='text-align: center'><b>Background</b><br><div style='text-align: center'>" + data[i].background + "</div>" +
                // "<br><div style='text-align: center'><b>Methodology</b><br><div style='text-align: center'>" + data[i].methodology + "</div>" +
                // "<br><div style='text-align: center'><b>Key Finding</b><br><div style='text-align: center'>" + data[i].finding + "</div>" +
                "<br><i>" + data[i].journal  + "</i>" +
                "<div style='text-align: center'><a href='" + data[i].doi + "'>Link to Article</a></div>" +
                "</div>", {maxWidth: popupMaxWidth} //, , , keepInView: true
            );

            circle.on('popupclose', function(e) {
                map.setView([36.546769159758234, 0], 2);
            });
        }

    });


// Event delegation for image click and 'x' button click
document.querySelector('#mapid').addEventListener('click', function(event) {
    var image;
    if (event.target.matches('.small-image')) {
        // The user clicked on an image
        event.target.classList.remove('small-image');
        event.target.classList.add('large-image');

        var closeButton = document.createElement('button');
        closeButton.classList.add('close-button');
        closeButton.textContent = 'x';

        event.target.parentElement.appendChild(closeButton);
        closeButton.style.display = "block";
    } else if (event.target.matches('.close-button')) {
        // The user clicked on the close button
        var image = event.target.parentElement.querySelector('img');
        image.classList.remove('large-image');
        image.classList.add('small-image');

        event.target.remove();
    } else {   
    // If user clicks anywhere other than the image or close button, close the image
    image = document.querySelector('.large-image');
    if (image) {
        image.classList.remove('large-image');
        image.classList.add('small-image');
        var closeButton = document.querySelector('.close-button');
        if (closeButton) {
            closeButton.remove();
        }
    }
  }
});

// Initialize image and close button styling
document.addEventListener('DOMContentLoaded', function() {
    var images = document.querySelectorAll('.small-image');
    images.forEach(function(image) {
    image.style.width = '100px';
    image.style.height = '100px';
    image.style.cursor = 'pointer';
});
var closeButton = document.createElement('style');
closeButton.textContent = `
.close-button {
    display: none;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100;
    background-color: white;
    color: black;
    font-size: 20px;
    border: none;
    cursor: pointer;
}

.large-image + .close-button {
    display: inline;
}
`;
document.head.appendChild(closeButton);
});



// Fetch data from your Workshop JSON file
fetch('./assets/js/workshops.json') 
    .then(response => response.json())
    .then(data => {
        // Get the width of the viewport in pixels
        var viewportWidth = window.innerWidth;
        var viewportHeight = window.innerHeight;

        // Calculate 90% of the viewport width
        var popupMaxWidth = viewportWidth * 0.4
        var popupMaxHeight = viewportHeight * 0.9;
        // Add points to the map
        for (var i = 0; i < data.length; i++) {
            
            var circle = L.circle([data[i].lat, data[i].lon], { radius: 200000, fillColor: getColor(data[i].category), fillOpacity: 1, color: "#666666", weight: 1});
            circle.addTo(teachingLayer);
            circle.bindPopup("<div style='max-height: 200px; overflow-y: auto>'" +
                "<br><b><div style='text-align: center; font-size: 14px'>" + data[i].workshop + "</b></div>" +
                "<br><div style='text-align: center'><img src='" + data[i].image + "' style='width:100%; max-width:100%;'></div>" +
                "<br><i><div style='text-align: center'>" + data[i].location + ', ' + data[i].date + "</div></i>" +

                "<br><div style='text-align: center'><a href='" + data[i].link + "'>Workshop Website</a></div>"
                +
                "</div>", {maxWidth: popupMaxWidth}
            );

            circle.on('popupclose', function(e) {
                map.setView([36.546769159758234, 0], 2);
            });
        }
    });

// Fetch data from your field JSON file
fetch('./assets/js/field.json') 
    .then(response => response.json())
    .then(data => {
        // Get the width of the viewport in pixels
        var viewportWidth = window.innerWidth;
        var viewportHeight = window.innerHeight;

        // Calculate 90% of the viewport width
        var popupMaxWidth = viewportWidth * 0.4
        var popupMaxHeight = viewportHeight * 0.9;
        // Add points to the map
        for (var i = 0; i < data.length; i++) {

            var circle = L.circle([data[i].lat, data[i].lon], { radius: 200000, fillColor: getColor(data[i].category), fillOpacity: 1, color: "#666666", weight: 1})
            circle.addTo(fieldLayer);
            circle.bindPopup("<div style='max-height: 200px; overflow-y: scroll>'" +
                "<br><b><div style='text-align: center; font-size: 14px'>" + data[i].title + "</b></div>" +
                "<br><div style='text-align: center'><img src='" + data[i].image + "' style='width:100%; max-width:100%;'></div>" +
                "<br><i><div style='text-align: center'>" + data[i].datelocation + "</div></i>" +
                "<br><div style='text-align: center'><li>" + "• " + data[i].summary + "</li></div>" +
                "<br><div style='text-align: center'><li>" + "• " + data[i].role + "</li></div>" +
                "<br><div style='text-align: center'><a href='" + data[i].doi + "'>Manuscript</a></div>"
                +
                "</div>", {maxWidth: popupMaxWidth, keepInView: true}
            );

            circle.on('popupclose', function(e) {
                map.setView([36.546769159758234, 0], 2);
            });
        }
    });



var layers = {
    'Manuscript (First Author)': researchLayer1, // FeatureGroup
    'Manuscript (Co-Author)': researchLayer2, // FeatureGroup
    'Teaching & Workshops': teachingLayer, // FeatureGroup
    'Field Work': fieldLayer, // FeatureGroup
}

var baseMaps = {
    "Basemap": bm, // TileLayer
};
var layerControls = L.control.layers(null, layerList, {position: 'topright'}).addTo(map);
layerControls.addOverlay(researchLayer1, 'Manuscript (First Author)');
layerControls.addOverlay(researchLayer2, 'Manuscript (Co-Author)');
layerControls.addOverlay(teachingLayer, 'Teaching & Workshops');
layerControls.addOverlay(fieldLayer, 'Field Work');

var legend = L.control({position: 'bottomright'});


legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        categories = ['Manuscripts (First Author)', 'Manuscripts (Co-Author)', 'Field Work', 'Teaching & Workshops'],
        colors = ['#00EAD3', '#96BAFF', '#54E346', '#FFF5B7'];

    for (var i = 0; i < categories.length; i++) {
        var item = document.createElement('div');
        item.innerHTML =
            '<i style="background:' + colors[i] + '"></i> ' +
            categories[i];
        div.appendChild(item);
    }

    return div;
};

legend.addTo(map);

// Remove info legend when a popup is opened
map.on('popupopen', function(e) {
    map.removeControl(legend);
});
// Add info legend when a popup is closed
map.on('popupclose', function(e) {
    legend.addTo(map);
});

// Initialize the Cesium Viewer
const viewer = new Cesium.Viewer('cesiumContainer');

// Keep track of the last index read
let lastIndex = 0;

// Function to plot a single coordinate
function plotCoordinate(coordinate, index) {
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(...coordinate),
    point: {
      pixelSize: 10,
      color: Cesium.Color.RED,
    },
    label: {
      text: `Point ${index + 1}`,
      font: '14pt monospace',
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      pixelOffset: new Cesium.Cartesian2(0, 0),
    },
  });
}

// Function to read the CSV file
function readCSV() {
  fetch('coordinates.csv')
    .then(response => response.text())
    .then(csvString => {
        const data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data;
      if (data.length > lastIndex) {
        const newEntries = data.slice(lastIndex);
        newEntries.forEach((entry, index) => {
          const gpsCoordinate = [int(entry.longitude), int(entry.latitude), entry.height];
          plotCoordinate(gpsCoordinate, lastIndex + index);
        });
        lastIndex = data.length;
      }
    })
    .catch(error => console.error(error));
}

// Poll the CSV file every 2 seconds
setInterval(readCSV, 2000);

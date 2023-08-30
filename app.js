// Initialize the Cesium Viewer
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5YjA1YzdmZi0yZThhLTQ2OWUtYTliMC0yZGJiOWYxYTkyNGYiLCJpZCI6MTYxMjc0LCJpYXQiOjE2OTIzNzQzNjJ9.hT8YKzgHaVEMYRdHLbWSJOGwSNMXCTgprWDAdAtoZ2c';

const viewer = new Cesium.Viewer('cesiumContainer');
const lastIndex = 0;
// Function to plot coordinates
function plotCoordinates(coordinates) {
  coordinates.forEach((coordinate, index) => {
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(...coordinate),
      point: {
        pixelSize: 10,
        color: Cesium.Color.RED,
      },
      label: {
        text: `Point ${index + 1}`,
        font: '14pt monospace',
        horizontalOrigin: Cesium.HorizontalOrigin.RIGHT,
        pixelOffset: new Cesium.Cartesian2(0, 0),
      },
    });
  });
}

// Read the CSV file and plot the coordinates
// Function to read the CSV file
function readCSV() {
  fetch('coordinates.csv')
    .then(response => response.text())
    .then(csvString => {
      const data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data;
      if (data.length > lastIndex) {
        const newEntries = data.slice(lastIndex);
        newEntries.forEach((entry, index) => {
          // Convert height from feet to meters
          const heightInMeters = entry.height * 0.3048;

          const gpsCoordinate = [entry.longitude, entry.latitude, heightInMeters];
          plotCoordinate(gpsCoordinate, lastIndex + index);
        });
        lastIndex = data.length;
      }
    })
    .catch(error => console.error(error));
}

// Poll the CSV file every 2 seconds
setInterval(readCSV, 2000);
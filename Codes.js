//Define the date range
var startDate = '2022-01-01';
var endDate = '2022-12-30';

// Define the coordinates for the pixel
//Make sure both numbers in point1 are smaller than point2
var point1 = ee.Geometry.Point(66.7365, 24.6548); //Karachi
var point2 = ee.Geometry.Point(67.5495, 25.2325); 
//var point1 = ee.Geometry.Point(-115.4726, 35.7251); //Las Vegas
//var point2 = ee.Geometry.Point(-114.728, 36.474);
var pixelGeometry = ee.Geometry.Rectangle([point1, point2]);
Map.centerObject(pixelGeometry.centroid(), 10);//Center Map on point1

// Load VIIRS image collection for 2022
var viirsCollection = ee.ImageCollection('NOAA/VIIRS/001/VNP46A2')
  .filterDate(startDate, endDate)
  .select(bandName); // Select the desired band

// Clip the data to the geometry region
var viirsCollection_clipped = viirsCollection.map(function(image) {
  return image.clip(pixelGeometry);
});

// Display the 1 date in the image collection
// Click on the pixels with the inspector tool to see a time series
Map.addLayer(viirsCollection_clipped, {min: 10, max: 150}, 'VIIRS Nighttime Lights - First Date');

// Calculate the average value for the time period
var viirsMean = viirsCollection_clipped.mean();
Map.addLayer(viirsMean, {min: 10, max: 150}, 'VIIRS Nighttime Lights - Average');

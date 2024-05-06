//Define the date range
var startDate = '2022-01-01';
var endDate = '2022-12-30';

// Select the band of interest
var bandName = 'DNB_BRDF_Corrected_NTL';

// Load VIIRS image collection
var viirsCollection = ee.ImageCollection('NOAA/VIIRS/001/VNP46A2')
  .filterDate(startDate, endDate)
  .select(bandName); // Select the desired band

// Define the coordinates around a city
//Make sure both numbers in point1 are smaller than point 2
var point1 = ee.Geometry.Point(66.7365, 24.6548); //Karachi
var point2 = ee.Geometry.Point(67.5495, 25.2325); 
//var point1 = ee.Geometry.Point(-115.4726, 35.7251); //Las Vegas
//var point2 = ee.Geometry.Point(-114.728, 36.474);
var regionGeometry = ee.Geometry.Rectangle([point1, point2]);
Map.centerObject(regionGeometry.centroid(), 10);//Center Map on point1

// Clip the data to the geometry region
var viirsCollection_clipped = viirsCollection.map(function(image) {
  return image.clip(regionGeometry);
});

// Display the 1st date in the image collection (ie startDate)
// Click on the pixels with the inspector tool to see a time series
Map.addLayer(viirsCollection_clipped, {min: 10, max: 150}, 'VIIRS Nighttime Lights - First Date');

// Calculate the average value for the time period
var viirsMean = viirsCollection_clipped.mean();
Map.addLayer(viirsMean, {min: 10, max: 150}, 'VIIRS Nighttime Lights - Average');


//-----------------------------------------------------------------------
// Define the country of interest
//Make sure both numbers in point1 are smaller than point 2
var regionGeometry = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
  .filter(ee.Filter.eq('country_na', 'Pakistan'));
Map.centerObject(regionGeometry, 4);//Center Map on point1


// Clip the data to the geometry region
var viirsCollection_clipped = viirsCollection.map(function(image) {
  return image.clip(regionGeometry);
});

// Display the 1 date in the image collection
// Click on the pixels with the inspector tool to see a time series
Map.addLayer(viirsCollection_clipped, {min: 0, max: 10}, 'VIIRS Nighttime Lights - First Date');

// Calculate the average value for the time period
var viirsMean = viirsCollection_clipped.mean();
Map.addLayer(viirsMean, {min: 0, max: 10}, 'VIIRS Nighttime Lights - Average');

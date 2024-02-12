## Load the VIIRS image collection
var viirsCollection = ee.ImageCollection('NOAA/VIIRS/001/VNP46A2');
## Define the date range
var startDate = '2022-01-01';
var endDate = '2022-12-30';

## Define the coordinates for the pixel
var point1 = ee.Geometry.Point(147.3250000, -42.89583335);
var point2 = ee.Geometry.Point(147.3291667, -42.9000000);
var pixelGeometry = ee.Geometry.Rectangle(point1, point2);

## Filter the image collection based on the date range and pixel geometry
var filteredCollection = viirsCollection.filterDate(startDate, endDate)
  .filterBounds(pixelGeometry);

## Select the band of interest
var bandName = 'DNB_BRDF_Corrected_NTL';
var imageWithBand = filteredCollection.select(bandName);

## Define a function to extract the date from the image metadata
var extractDate = function(image) {
  var dateString = ee.String(image.get('system:index'));
  var date = ee.Date.parse('YYYYMMdd', dateString);
  return image.set('date', date);
};

## Map the function over the image collection to extract the date
var imageCollectionWithDate = imageWithBand.map(extractDate);

## Create a daily composite by reducing the collection by date
var dailyComposite = imageCollectionWithDate.reduce(ee.Reducer.first());



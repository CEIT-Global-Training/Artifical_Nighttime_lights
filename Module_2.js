//Define the date range
var startDate = '2014';
var endDate = '2023';

// Select the band of interest
var bandName = 'median';

// Load VIIRS image collection
var viirsCollection = ee.ImageCollection('NOAA/VIIRS/DNB/ANNUAL_V21')
  .filterDate(startDate, endDate)
  .select(bandName); // Select the desired band


var regionGeometry = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
  .filter(ee.Filter.eq('country_na', 'Malaysia')); /// Change the country name
Map.centerObject(regionGeometry, 4);//Center Map on point1

// Clip the data to the geometry region
var viirsCollection_clipped = viirsCollection.map(function(image) {
  return image.clip(regionGeometry);
});


// Make

var chart =
    ui.Chart.image
        .series({
          imageCollection: viirsCollection_clipped,
          region: regionGeometry,
          reducer: ee.Reducer.sum(), // Specfic what stats you want
          scale: 500,
          xProperty: 'system:time_start'
        })
        .setSeriesNames(['Sum of radiance']) // Change based on the stats
        .setOptions({
          title: 'Date',
          hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Sum of radiance', // Change based on the stats
            titleTextStyle: {italic: false, bold: true}
          },
          lineWidth: 5,
          colors: ['e37d05'],
          curveType: 'function'
        });
        
print(chart);


// Display the 1st date in the image collection (ie startDate)
// Click on the pixels with the inspector tool to see a time series
//Map.addLayer(viirsCollection_clipped, {min: 0.2, max: 10}, 'VIIRS Nighttime Lights - First Date');

// Calculate the average value for the time period
var viirsMean = viirsCollection_clipped.mean();
Map.addLayer(viirsMean, {min: 0, max: 1}, 'VIIRS Nighttime Lights - Mean');



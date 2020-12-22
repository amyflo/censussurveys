var Airtable = require('airtable');
// Get a base ID for an instance of art gallery example
var base = new Airtable({ apiKey: 'keyYJ7zM4UWu6RYdT' }).base('appAzdZwdzJzHt494');

let records = []

// called for every page of records
const processPage = (partialRecords, fetchNextPage) => {
  records = [...records, ...partialRecords]
  fetchNextPage()
}

// called when all the records have been retrieved
const processRecords = (err) => {
  if (err) {
    console.error(err)
    return
  }
records.forEach(function(record) {
    console.log('Retrieved ', record.get('Name'));
    freqs = record.get('Frequency').join(', ');
    geos = record.get('Geography').join(', ');
    link = record.get('Link')
    text = record.get('Description');
    geofilters = createGeofilters(geos);

    // create cards
    var $cardInfo = $('<div/>', {
        "class":'card card-body show ' + freqs + ' ' +  geofilters
    });
    $cardInfo.append($('<h5>').text(record.get('Survey')));
    $cardInfo.append($('<div>').text(record.get('Description')));
    $cardInfo.attr('data-record-id', record.getId());
    $('#cards').append($cardInfo);
});
}

// selecting the base and appropriate fields
base('Surveys').select({
    view: "Developer",
    fields: ["Survey", "Description", "Link", "Frequency", "Geography", "Type", "TopicSelect"],
}).eachPage(processPage, processRecords)

// create class name text  for the geography to match selectors
function createGeofilters(geos){
    geofilters = geos.replace("Block Group", "BlockGroup");
    geofilters = geofilters.replace("Economic Place", "Economic");
    geofilters = geofilters.replace("Metro Area", "Metro");
    geofilters = geofilters.replace("Other", "OtherGeo");
    geofilters = geofilters.replace(/,/g, '');
    return geofilters;
}


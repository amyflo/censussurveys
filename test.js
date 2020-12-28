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
    subtopics = record.get('Subtopics').join(', ');
    geofilters = createGeofilters(geos);

    // create cards
    var $card = $('<div/>', {
        "class":'card mb-3 ' + freqs + ' ' +  geofilters
    });
    $card.append("<div class='card-header'>" + record.get('Survey').link(link) + "</div>");

    var $cardBody = $('<div/>', {
      "class":'card-body'
    });
    var $cardDividers = $('<ul/>', {
      "class": 'list-group list-group-flush'
    });

    $cardBody.append($("<p class='card-text'>").text(record.get('Description')));
    $card.append($cardBody);

    $card.append($cardDividers);
    $cardDividers.append("<li class='list-group-item'>" + '<b>Frequencies: </b>' + freqs + '</li>');
    $cardDividers.append("<li class='list-group-item'>" + '<b>Geographies: </b>' + geos + '</li>');
    $cardDividers.append("<li class='list-group-item'>" + '<b>Subtopics: </b>' + subtopics + '</li>');

    $('#cards').append($card);
});
}

// selecting the base and appropriate fields
base('Surveys').select({
    view: "Developer",
    fields: ["Survey", "Description", "Link", "Frequency", "Geography", "Subtopics"],
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



function viewChange() {
  var element = document.getElementById("cards");
  element.classList.toggle("card-columns");
}

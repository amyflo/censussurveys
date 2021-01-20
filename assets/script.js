var Airtable = require('airtable')
var base = new Airtable({apiKey: 'keyWfSmHAolRQJxTk'}).base('appAzdZwdzJzHt494');


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
  
function createFilters(category, record){
  recordText = record.get(category)
  var text = recordText.join(', ');
  var filter = recordText.map(str => str.replace(/\s/g, '')).join(' ');
  return [text, filter.toLowerCase()];
}

records.forEach(function(record) {
  // Card Text
  title = record.get('Survey');
  link = record.get('Link')
  text = record.get('Description');

  // Filters
  frequencies = createFilters('Frequency', record);
  geos = createFilters('Geography', record);
  topics = createFilters('Topic', record);
  subtopics = createFilters('Subtopics', record);

  // create cards
  var $card = $('<div/>', {
      "class":'card mb-3 ' + frequencies[1] + ' ' +  geos[1].replace('Other', 'OtherGeo') + ' ' + subtopics[1] + ' ' + topics[1] + ' '
  });
  
  var $cardBody = $('<div/>', {
    "class":'card-body'
  });

  var $cardDividers = $('<ul/>', {
    "class": 'list-group list-group-flush'
  });

  $cardBody.append("<h5 class='card-title'>" + (title + ' →').link(link) + "</h5>");
  $cardBody.append("<p class='card-text'>" + text + "</p>");
  $card.append($cardBody);

  $card.append($cardDividers);
  $cardDividers.append("<li class='list-group-item'>" + '<b>Frequencies: </b>' + frequencies[0] + '&nbsp;</li>');
  $cardDividers.append("<li class='list-group-item'>" + '<b>Geographies: </b>' + geos[0] + '&nbsp;</li>');
  $cardDividers.append("<li class='list-group-item'>" + '<b>Topics: </b>' + topics[0] + '&nbsp;</li>');
  $cardDividers.append("<li class='list-group-item'>" + '<b>Subtopics: </b>' + subtopics[0] + '&nbsp;</li>');

    $('#cards').append($card);
});
}

// selecting the base and appropriate fields
base('Surveys').select({
    view: "Developer",
    fields: ["Survey", "Description", "Link", "Frequency", "Geography", "Subtopics", "Topic"]
}).eachPage(processPage, processRecords)



base('All').select({
  // Selecting the first 3 records in Developer:
  view: "Grid view",
  fields: ["Filter", "Type", "Publish?"],
}).eachPage(function page(records, fetchNextPage) {
  // This function (`page`) will get called for each page of records.

  records.forEach(function(record) {
      recordText = record.get('Filter');
      recordType = record.get('Type');
      publish = record.get('Publish?');
      var filter = recordText.replace(/\s/g, '').toLowerCase();

      var $card = "<li><input type='checkbox' id=" + 
      filter + " class='filterCheckbox' /> " + recordText + "</li>";
    
      if (publish=="Yes"){
        if (recordType == "Subtopics"){
          $('#subtopicsFilters').append($card);
        }
        if (recordType == "Topics"){
          $('#topicFilters').append($card);
        }
        if (recordType == "Geographies"){
          $('#geographyFilters').append($card);
        }
        if (recordType == "Frequencies"){
          $('#frequencyFilters').append($card);
        }
      }
      console.log('#subtopicsFilters');
  });

  // To fetch the next page of records, call `fetchNextPage`.
  // If there are more records, `page` will get called again.
  // If there are no more records, `done` will get called.
  fetchNextPage();

}, function done(err) {
  if (err) { console.error(err); return; }
});

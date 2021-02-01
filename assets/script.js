var Airtable = require('airtable')
var base = new Airtable({apiKey: 'keyWfSmHAolRQJxTk'}).base('appAzdZwdzJzHt494');

// Alphabetized survey selections & creating cards
base('Surveys').select({
  // Selecting the first 3 records in Developer:
  view: "Developer",
  fields: ["Survey", "Description", "Link", "Frequency", "Geography", "Subtopics", "Topic"]
}).eachPage(function page(records, fetchNextPage) {
  // This function (`page`) will get called for each page of records.

  function createFilters(category, record){
    recordText = record.get(category);
    var text = recordText.join(', ');
    var filter = recordText.map(str => str.replace(/\s/g, '')).join(' ').replace("/", "");
    return [renameFilters(text), filter.toLowerCase()];
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
        "class":'card mb-3 ' + frequencies[1] + ' ' +  geos[1] + ' ' + subtopics[1] + ' ' + topics[1] + ' '
    });
    
    var $cardBody = $('<div/>', {
      "class":'card-body'
    });
  
    var $cardDividers = $('<ul/>', {
      "class": 'list-group list-group-flush'
    });
  
    $cardBody.append("<h5 class='card-title'><a target=_blank href=" + link + ">" + title + " →</a></h5>");
    $cardBody.append("<p class='card-text'>" + text + "</p>");
    $card.append($cardBody);
  
    $card.append($cardDividers);
    $cardDividers.append("<li class='list-group-item'>" + '<b>Frequencies: </b>' + frequencies[0] + '&nbsp;</li>');
    $cardDividers.append("<li class='list-group-item'>" + '<b>Geographies: </b>' + geos[0] + '&nbsp;</li>');
    $cardDividers.append("<li class='list-group-item'>" + '<b>Topics: </b>' + topics[0] + '&nbsp;</li>');
    $cardDividers.append("<li class='list-group-item'>" + '<b>Subtopics: </b>' + subtopics[0] + '&nbsp;</li>');
  
      $('#cards').append($card);
  });

  // To fetch the next page of records, call `fetchNextPage`.
  // If there are more records, `page` will get called again.
  // If there are no more records, `done` will get called.
  fetchNextPage();

}, function done(err) {
  if (err) { console.error(err); return; }
});


// Alphabetized topics and subtopics
base('Filters').select({
  // Selecting the first 3 records in Developer:
  view: "Topics",
  fields: ["Filter", "Type", "Publish?"],
}).eachPage(function page(records, fetchNextPage) {
  // This function (`page`) will get called for each page of records.

  records.forEach(function(record) {
      recordText = record.get('Filter');
      recordType = record.get('Type');
      publish = record.get('Publish?');
      var filter = recordText.replace(/\s/g, '').replace("/", "").toLowerCase();

      var $card = "<li><input type='checkbox' id=" + 
      filter + " value='" + recordText + "' title=" + recordText+ " class='filterCheckbox' /> " + recordText + "</li>";
    
      if (publish=="Yes"){
        if (recordType == "Subtopics"){
          $('#subtopicsFilters').append($card);
        }
        if (recordType == "Topics"){
          $('#topicFilters').append($card);
        }
      }
  });

  // To fetch the next page of records, call `fetchNextPage`.
  // If there are more records, `page` will get called again.
  // If there are no more records, `done` will get called.
  fetchNextPage();

}, function done(err) {
  if (err) { console.error(err); return; }
});

// Unalphabetized geographies and frequencies
base('Filters').select({
  // Selecting the first 3 records in Developer:
  view: "Geos & Freqs",
  fields: ["Filter", "Type", "Publish?"],
}).eachPage(function page(records, fetchNextPage) {
  // This function (`page`) will get called for each page of records.

  records.forEach(function(record) {
      recordText = record.get('Filter');
      recordType = record.get('Type');
      publish = record.get('Publish?');
      var filter = recordText.replace(/\s/g, '').replace("/", "").toLowerCase()

      var $card = "<li><input type='checkbox' id=" + 
      filter + " value='" + renameFilters(recordText) + "' title=" + renameFilters(recordText) + " class='filterCheckbox' /> " + renameFilters(recordText) + "</li>";
    
      if (publish=="Yes"){
        if (recordType == "Geographies"){
          $('#geographyFilters').append($card);
        }
        if (recordType == "Frequencies"){
          $('#frequencyFilters').append($card);
        }
      }
  });

  // To fetch the next page of records, call `fetchNextPage`.
  // If there are more records, `page` will get called again.
  // If there are no more records, `done` will get called.
  fetchNextPage();

}, function done(err) {
  if (err) { console.error(err); return; }
});

function renameFilters(text){
  text = text.replace('Other Geos', 'Other')
  text = text.replace('Other Freqs', 'Other');
  return text;
}
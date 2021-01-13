var Airtable = require('airtable')
var filter = "";
var base = new Airtable({apiKey: 'keyYJ7zM4UWu6RYdT'}).base('appAzdZwdzJzHt494');

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
    freqfilters = record.get('Frequency').join(' ');
    geos = record.get('Geography').join(', ');
    link = record.get('Link')
    text = record.get('Description');
    subtopics = record.get('Subtopics').join(', ');
    subtopicfilters = record.get('Subtopics').join(' ');
    geofilters = createGeofilters(geos);

    // create cards
    var $card = $('<div/>', {
        "class":'card mb-3 ' + freqfilters + ' ' +  geofilters + ' ' + subtopicfilters
    });
    
    var $cardBody = $('<div/>', {
      "class":'card-body'
    });

    var $cardDividers = $('<ul/>', {
      "class": 'list-group list-group-flush'
    });

    $cardBody.append("<h5 class='card-title'>" + record.get('Survey').link(link) + "&nbsp;</h5>");
    $cardBody.append($("<p class='card-text'>").text(record.get('Description')));
    $card.append($cardBody);

    $card.append($cardDividers);
    $cardDividers.append("<li class='list-group-item'>" + '<b>Frequencies: </b>' + freqs + '&nbsp;</li>');
    $cardDividers.append("<li class='list-group-item'>" + '<b>Geographies: </b>' + geos + '&nbsp;</li>');
    $cardDividers.append("<li class='list-group-item'>" + '<b>Subtopics: </b>' + subtopics + '&nbsp;</li>');

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

// changing view from card columns to horizontal layout
document.getElementById("viewChange").onclick = viewChange;
function viewChange() {
  var element = document.getElementById("cards");
  element.classList.toggle("card-columns");
}

// uncheck all checkboxes and clear checked filters
document.getElementById("uncheckAll").onclick = uncheckAll;
function uncheckAll() {
  $("input[type='checkbox']:checked").prop("checked", false)
  filter = "";
  filterSearch();
}

// add or remove filters on checkbox change
$("#filterCards input").change(function() {
  if ($(this).is(":checked")) {
    filter = filter + "." + this.id;
  } else {
    filter = filter.replace("." + this.id, "");
  }
  filterSearch();
})

// check whether inner text contains input
function searchText(input, x){
  for (i = 0; i < x.length; i++) { 
    x[i].style.display = "inline-block";
    var text = (x[i].textContent).toLowerCase();
    if (!text.includes(input)){
      x[i].style.display = "none";
    }    
  }
}

// hide or show cards based on filters
document.getElementById("quicksearch").onkeyup = filterSearch;

function filterSearch(){
  var input = document.getElementById("quicksearch");
  inputVal = input.value;
  inputVal = inputVal.toLowerCase().trim();
  if (filter){
    $(".card").hide();
    searchText(inputVal, $(filter));
  } else {
    searchText(inputVal, $('.card'));
  }
}

// function to filter through checkboxes of a dropdown
function filterCheckbox(ul, input) {
    li = ul.getElementsByTagName("li");
    filter = input.value.toUpperCase();
    for (i = 0; i < li.length; i++) {
        checkbox = li[i].innerHTML.replace(/<.*>/, '')
        if (checkbox.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

// filter through topics dropdown
document.getElementById("topicsInput").onkeyup = searchTopics;
function searchTopics() {
    input = document.getElementById("topicsInput");
    ul = document.getElementById("topics");
    filterCheckbox(ul, input);
}
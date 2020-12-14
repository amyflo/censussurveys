var grid=$("#grid");
var filter=$(".btn-group input");
var search=$(".quicksearch");
var qsRegex;
var buttonFilter;
var Airtable = require('airtable');
// Get a base ID for an instance of art gallery example
var base = new Airtable({ apiKey: 'keyYJ7zM4UWu6RYdT' }).base('appAzdZwdzJzHt494');


function createSurveys() {
    // $('#grid').empty();
    base('Surveys').select({
        view: "Developer",
        fields: ["Survey", "Description", "Link", "Frequency", "Geography", "Type", "TopicSelect"],
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log('Retrieved ', record.get('Name'));

            surveyname = record.get('Survey');
            freqs = record.get('Frequency').join(', ');
            geos = record.get('Geography').join(', ');
            link = record.get('Link')
            text = record.get('Description');

            geosfilter = geos.replace("Block Group", "BlockGroup");
            geosfilter = geosfilter.replace("Economic Place", "Economic");
            geosfilter = geosfilter.replace("Metro Area", "Metro");
            geosfilter = geosfilter.replace("Census Tract", "Census");
            geosfilter = geosfilter.replace("Zip Code", "Zip");
            geosfilter = geosfilter.replace("Other", "OtherGeo");
            geosfilter = geosfilter.replace(/,/g, '');

            var linktext = "Explore Now";
            

            var $card= $('<div/>', {
                "class":'card card-body ' + freqs + ' ' + geosfilter ,
            });
            
            $card.append($("<h5 class='card-title'>").text(surveyname));

            $card.append($("<h6 class='card-subtitle mb-2 text-muted'>").text('Frequency: ' + freqs)); 
            $card.append($("<h6 class='card-subtitle mb-2 text-muted'>").text('Geography: ' + geos)); 
            $card.append($("<p class='card-text'>").text(text)); 

            $card.append("<div class='btn btn-primary'" + linktext.link(link) + "</div>");
            $('#grid').append($card);
        });

        fetchNextPage();
    }, function done(error) {
        console.log(error);
    });
};

createSurveys();

// filter items 
grid.isotope({
    itemSelector: ".card",
    filter: function() {
      // console.log(searchResult);
      var searchResult = qsRegex ? $(this).text().match( qsRegex ) : true;
      var buttonResult = buttonFilter ? $(this).is( buttonFilter ) : true;
      return searchResult && buttonResult;
    }
  });
  
  // use value of search field to filter
  var quicksearch = search.keyup( debounce( function() {
    qsRegex = new RegExp( quicksearch.val(), "gi" );
    grid.isotope();
  }, 200 ) );
  
  // debounce so filtering doesn"t happen every millisecond
  function debounce( fn, threshold ) {
    var timeout;
    return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    timeout = setTimeout( delayed, threshold || 100 );
    };
  }
  
  // change filters
  filter.change(function(){
    var filters = [];
    filter.filter(":checked").each(function(){
      filters.push( this.value );
    });
    filters = filters.join("");
    buttonFilter = filters;
    grid.isotope();
  });
var grid=$(".container");
var filter=$(".btn-group input");
var filterfreq = $('.frequencies input');
var search=$(".quicksearch");
var qsRegex;
var buttonFilter;

var names = [
  "Annual Business Survey",
  "American Community Survey",
  "Annual Survey of Manufactures",
  "Business Dynamics Statistics",
  "Building Permits",
  "County Business Patterns",
  "Commodity Flow Survey",
  "Decennial Census",
  "e-Commerce Statistics",
  "Economic Census",
  "U.S. International Trade in Goods and Services",
  "Job-to-Job Flows",
  "LEHD Origin-Destination Employment Statistics",
  "Manufacturers' Shipments, Inventories, and Orders",
  "Monthly Retail Trade Survey",
  "Monthly Wholesale Trade Survey",
  "Nonemployer Statistics",
  "New Residential Construction",
  "New Residential Sales",
  "Quarterly Financial Report",
  "Quarterly Workforce Indicators"
]

var frequencies = [
  "Annual", 
  "Annual",
  "Annual",
  "Monthly",
  "Annual",
  "Other",
  "Decennial",
  "Annual",
  "Other",
  "Monthly",
  "Quarterly",
  "Annual",
  "Monthly",
  "Monthly",
  "Monthly",
  "Annual",
  "Monthly",
  "Monthly",
  "Quarterly",
  "Quarterly"
];

var geographies = [
  "National State Metro County Place",
  "National State Metro County Place ZCTA Tract BlockGroup OtherGeo",
  "National State",
  "National State Metro",
  "National State Metro County Place OtherGeo",
  "National State Metro County Zip OtherGeo",
  "National State OtherGeo",
  "National State County Place ZCTA Tract BlockGroup Block, OtherGeo",
  "National",
  "National State Metro, County, Economic, Place",
  "National State Metro OtherGeo",
  "National State Metro",
  "National State Metro County Place ZCTA Tract BlockGroup Block OtherGeo",
  "National",
  "National",
  "National",
  "National State, Metro, County",
  "National OtherGeo",
  "National OtherGeo",
  "National",
  "National State Metro County OtherGeo"
];

var links = [
  "https://www.census.gov/programs-surveys/abs/about.html",
  "https://www.census.gov/programs-surveys/acs.html",
  "https://www.census.gov/programs-surveys/asm.html",
  "https://www.census.gov/programs-surveys/bds.html",
  "https://www.census.gov/programs-surveys/bps.html",
  "https://www.census.gov/programs-surveys/cbp.html",
  "https://www.census.gov/programs-surveys/cfs.html",
  "https://www.census.gov/programs-surveys/decennial-census.html",
  "https://www.census.gov/programs-surveys/e-stats.html",
  "https://www.census.gov/programs-surveys/economic-census.html",
  "https://www.census.gov/foreign-trade/Press-Release/current_press_release/index.html",
  "https://lehd.ces.census.gov/data/#j2j",
  "https://lehd.ces.census.gov/data/#lodes",
  "https://www.census.gov/manufacturing/m3/index.html",
  "https://www.census.gov/retail/index.html",
  "https://www.census.gov/wholesale/index.html",
  "https://www.census.gov/programs-surveys/nonemployer-statistics.html",
  "https://www.census.gov/construction/nrc/index.html",
  "https://www.census.gov/construction/nrs/index.html",
  "https://www.census.gov/econ/qfr/",
  "https://www.census.gov/data/developers/data-sets/qwi.html"
]

var descriptions = [
  "The Annual Business Survey (ABS) provides information on selected economic and demographic characteristics for businesses and business owners by sex, ethnicity, race, and veteran status. Further, the survey measures research and development (for microbusinesses), new business topics such as innovation and technology, as well as other business characteristics.",
  "The American Community Survey (ACS) is an ongoing survey that provides vital information on a yearly basis about our nation and its people. The survey samples approximately 3.5 million addresses each year. Information from the survey generates data that help determine how more than $675 billion in federal and state funds are distributed each year.",
  "The Annual Survey of Manufactures (ASM) provides sample estimates of statistics for all manufacturing establishments with one or more paid employee.",
]

createItems();

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

// create items
function createItems() {
  var button = "button";
  var cardPadding = "cardPadding";

  var $items;

  for (var i=0; i<names.length; i++){
    var name = names[i];
    var freq = frequencies[i];
    var link = links[i];
    var geo = geographies[i];
    var $item = $("<div />", {
      "class": "card " + freq + " " + geo
    });
    $item.append("<div class=" + cardPadding + "><h3>" + name + "</h3>" + 
      "<a href=" + link + " class=" + button + ">Explore</a></div>");
    $items = $items ? $items.add( $item ) : $item;
  }
  $items.appendTo( $("#container") );
}

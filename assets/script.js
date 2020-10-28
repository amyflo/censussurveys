var grid=$('.cards');
var filter=$('.btn-group input');
var search=$('.quicksearch');
var qsRegex;
var buttonFilter;
  
grid.isotope({
  itemSelector: '.card',
  filter: function() {
    // console.log(searchResult);
    var searchResult = qsRegex ? $(this).text().match( qsRegex ) : true;
    var buttonResult = buttonFilter ? $(this).is( buttonFilter ) : true;
    return searchResult && buttonResult;
  }
});

// use value of search field to filter
var quicksearch = search.keyup( debounce( function() {
  qsRegex = new RegExp( quicksearch.val(), 'gi' );
  grid.isotope();
}, 200 ) );


// debounce so filtering doesn't happen every millisecond
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

filter.change(function(){
  var filters = [];
  filter.filter(':checked').each(function(){
    filters.push( this.value );
  });
  filters = filters.join('');
  buttonFilter = filters;
  grid.isotope();
});




SurveyNames = ["Annual Business Survey",
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
];

SurveyGeography = [
  "National, State, MetroArea, County, Place",
  "National, State, MetroArea, County, Place, ZCTA, Tract, BlockGroup, OtherGeo",
  "National, State",
  "National, State, MetroArea",
  "National, State, MetroArea, County, Place, Other",
  "National, State, MetroArea, County, ZipCode, Other",
  "National, State, Other",
  "National, State, County, Place, ZCTA, Tract, BlockGroup, Block, OtherGeo",
  "National",
  "National, State, MetroArea, County, EconomicPlace, Place",
  "National, State, MetroArea, OtherGeo",
  "National, State, MetroArea",
  "National, State, MetroArea, County, Place, ZCTA, Tract, BlockGroup, Block, OtherGeo",
  "National",
  "National",
  "National",
  "National, State, MetroArea, County",
  "National, Other",
  "National, Other",
  "National",
  "National, State, MetroArea, County, OtherGeo"
];



var colors = [ 'red', 'green', 'blue', 'orange' ];
var sizes = [ 'small', 'medium', 'large' ];
var prices = [ 10, 20, 30 ];

createItems();

function createItems() {
  var brand, productType, color, size;
  var items = '';
  // dynamically create content
  for (var i=0, len1 = data.brands.length; i < len1; i++) {
    brand = data.brands[i];
    for (var j=0, len2 = data.productTypes.length; j < len2; j++) {
      productType = data.productTypes[j];
        for (var l=0, len3 = data.colors.length; l < len3; l++) {
        color = data.colors[l];
        for (var k=0, len4 = data.sizes.length; k < len4; k++) {
          size = data.sizes[k];
          var itemHtml = '<div class="item ' + brand + ' ' +
            productType + ' ' + color + ' ' + size + '">' +
            '<p>' + brand + '</p>' +
            '<p>' + productType + '</p>' +
            '<p>' + size + '</p>' +
            '</div>';
            items += itemHtml;
        }
      }
    }
  }

  $container.append( items );
}

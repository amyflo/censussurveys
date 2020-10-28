var grid=$('.container');
var filter=$('.btn-group input');
var search=$('.quicksearch');
var qsRegex;
var buttonFilter;


// templating

createItems();

  
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

function createItems() {

  var names = [
    'Annual Business Survey',
    'American Community Survey',
    'Annual Survey of Manufactures',
    'Business Dynamics Statistics',
    'Building Permits',
    'County Business Patterns',
    'Commodity Flow Survey',
    'Decennial Census',
    'e-Commerce Statistics',
    'Economic Census',
    'U.S. International Trade in Goods and Services',
    'Job-to-Job Flows',
    'LEHD Origin-Destination Employment Statistics',
    'Manufacturers Shipments, Inventories, and Orders',
    'Monthly Retail Trade Survey',
    'Monthly Wholesale Trade Survey',
    'Nonemployer Statistics',
    'New Residential Construction',
    'New Residential Sales',
    'Quarterly Financial Report',
    'Quarterly Workforce Indicators'
  ]
  
  var frequencies = [
    'Annual', 
    'Annual',
    'Annual',
    'Monthly',
    'Annual',
    'Other',
    'Decennial',
    'Annual',
    'Other',
    'Monthly',
    'Quarterly',
    'Annual',
    'Monthly',
    'Monthly',
    'Monthly',
    'Annual',
    'Monthly',
    'Monthly',
    'Quarterly',
    'Quarterly'
  ];

  var geographies = [
    'National State Metro County Place',
    'National State Metro County Place ZCTA Tract BlockGroup OtherGeo',
    'National State',
    'National State Metro',
    'National State Metro County Place OtherGeo',
    'National State Metro County Zip OtherGeo',
    'National State OtherGeo',
    'National State County Place ZCTA Tract BlockGroup Block OtherGeo',
    'National',
    'National State Metro County Economic Place',
    'National State Metro OtherGeo',
    'National State Metro',
    'National State Metro County Place ZCTA Tract BlockGroup Block OtherGeo',
    'National',
    'National',
    'National',
    'National State Metro County',
    'National OtherGeo',
    'National OtherGeo',
    'National',
    'National State Metro County OtherGeo'
  ];

  var $items;

  for (var i=0; i<names.length; i++){
    var name = names[i];
    var freq = frequencies[i];
    var geo = geographies[i].replace(',', '');
    var $item = $('<div />', {
      'class': 'card ' + freq + ' ' + geo
    });
    $item.append('<p>' + name + '</p>');
    $items = $items ? $items.add( $item ) : $item;
  }
  $items.appendTo( $('#container') );
}
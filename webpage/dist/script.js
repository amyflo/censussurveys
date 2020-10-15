var grid=$('.all-surveys');
var filter=$('.btn-group input');
var search=$('.quicksearch');
var qsRegex;
var buttonFilter;
  
grid.isotope({
  itemSelector: '.survey',
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


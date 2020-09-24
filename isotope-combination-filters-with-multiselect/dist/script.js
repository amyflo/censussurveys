/*jshint browser:true, undef: true, unused: true, jquery: true */

// store filter per group
var filters = {};

// only used to dynamically generate items
var data = {
  brands: [ 'brand1', 'brand2', 'brand3', 'brand4' ],
  productTypes: [ 'alpha', 'beta', 'gamma', 'delta' ],
  colors: [ 'red', 'blue', 'green', 'yellow' ],
  sizes: [ 'size8', 'size9', 'size10', 'size11' ],
};

var $container = $('#container');

createContent();

//var $filterDisplay = $('#filter-display');

$container.isotope();
// do stuff when checkbox change
$('.options').on( 'change', function( event ) {

  var $select = event.target;
  var $selectVal = $( $select );
  
  var group = $selectVal.attr('value-group');

  // create array for filter group, if not there yet
  var filterGroup = filters[ group ];

  if ( !filterGroup ) {
    filterGroup = filters[ group ] = [];
  }

  //console.log(event.target.selectedOptions);

  if ( event.target.value != ''  ) {
    let collection = event.target.selectedOptions;
    if(filterGroup.length){
      clearGroup(filterGroup);
    }

    for (let i=0; i<collection.length; i++) {
        if(!filterGroup.includes(collection[i].value)){
          filterGroup.push( collection[i].value );
        }
      }
  } else {
    // remove filter
    clearGroup(filterGroup);
  }
 
  var comboFilter = getComboFilter();
  $container.isotope({ filter: comboFilter });
  //$filterDisplay.text( comboFilter );
  
});

function clearGroup(filterGroup){
  var filterCount = filterGroup.length;
    while(filterCount >= 0){
      filterGroup.splice( filterCount, 1 );    
      filterCount--;
    }
}

function getComboFilter() {
  var combo = [];
  for ( var prop in filters ) {
    var group = filters[ prop ];
    if ( !group.length ) {
      // no filters in group, carry on
      continue;
    }
    // add first group
    if ( !combo.length ) {
      combo = group.slice(0);
      continue;
    }
    // add additional groups
    var nextCombo = [];
    // split group into combo: [ A, B ] & [ 1, 2 ] => [ A1, A2, B1, B2 ]
    for ( var i=0; i < combo.length; i++ ) {
      for ( var j=0; j < group.length; j++ ) {
        var item = combo[i] + group[j];
        nextCombo.push( item );
      }
    }
    combo = nextCombo;
  }
  var comboFilter = combo.join(', ');
  return comboFilter;
}


// helper made to make items
function createContent() {
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
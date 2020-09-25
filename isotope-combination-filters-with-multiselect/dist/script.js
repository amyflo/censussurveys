/*jshint browser:true, undef: true, unused: true, jquery: true */



// store filter per group
var filters = {};

var $container = $('#container');
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

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}


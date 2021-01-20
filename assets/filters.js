var filter = "";

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

// // add or remove filters on btn-group click
$(".btn-group").click(function(){
    filter = "";
    var boxes = $(".filterCheckbox:checked");
    for (var i = 0; i < boxes.length; i++ ) {
        filter += ('.' + boxes[i].id);
    }
    filterSearch();
});

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
function filterCheckbox(div, input) {
    li = div.getElementsByTagName("li");
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
document.getElementById("topicsInput").onkeyup = searchSubtopics;
function searchSubtopics() {
    input = document.getElementById("topicsInput");
    div = document.getElementById("subtopics");
    filterCheckbox(div, input);
}

filterSearch();
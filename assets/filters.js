var filter = "";

/**
 * Searches text in each card by iterating through words in 
 * inputArray. Converts each card to text and shows 
 * card if any word in inputArray is present in card. 
 */
function searchText(inputArray, x) {
  for (i = 0; i < inputArray.length; i++) {
    for (j = 0; j < x.length; j++) {
      x[j].style.display = "none";
      var text = x[j].textContent.toLowerCase();
      if (text.includes(inputArray[i])) {
        x[j].style.display = "inline-block";
      }
    }
  }
}

/**
 * Whenever btn-group is clicked, writes into local variable filter
 * all the filters that are selected to use in filterSearch function. 
 * Shows the selected filters as pills below the hero and 
 * calls on filterSearch function to refilter surveys. 
 */
$(".btn-group").click(function () {
  filter = "";
  $("#filterPills").empty(); // clears filter pills from screen
  var boxes = $(".filterCheckbox:checked");
  for (var i = 0; i < boxes.length; i++) {
    filter += "." + boxes[i].id; // adds a id of a checkbox to the filter
    var $pill =
      "<span href='' class='filterpill badge badge-census m-1' id=" +
      boxes[i].id +
      " >" +
      boxes[i].value +
      "</span>";
    $("#filterPills").append($pill);
  }
  filterSearch();
});

/**
 * Whenever an input onkeyup is in the searchbar or a checkbox is checked 
 * (see above btn-group function), creates an array of all words in 
 * the input and calls on searchText to show/hide cards that is 
 * concatted with filter text written in above function. 
 */
document.getElementById("quicksearch").onkeyup = filterSearch;
function filterSearch() {
  var input = document.getElementById("quicksearch");
  inputVal = input.value;
  inputVal = inputVal.toLowerCase().trim();
  inputArray = inputVal.split(" ");
  if (filter) { // filter shows up as ".classname1 .classname2 .classname3"
    $(".card").hide();
    searchText(inputArray, $(filter));
  } else {
    searchText(inputArray, $(".card"));
  }
}

/**
 * Filters and shows/hides checkboxes in a list. 
 */
function filterCheckbox(div, input) {
  li = div.getElementsByTagName("li");
  filter = input.value.toUpperCase();
  for (i = 0; i < li.length; i++) {
    checkbox = li[i].innerHTML.replace(/<.*>/, "");
    if (checkbox.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

/**
 * Calls on filterCheckbox to show/hide 
 * filters in "Subtopics" based on user's input in the searchbar. 
 */
document.getElementById("topicsInput").onkeyup = searchSubtopics;
function searchSubtopics() {
  input = document.getElementById("topicsInput");
  div = document.getElementById("subtopics");
  filterCheckbox(div, input);
}

/**
 * Shows all checkboxes inside the subtopic dropdown.  
 */
function showCheckbox(div) {
  li = div.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    li[i].style.display = "";
  }
}

/**
 * Resets the search input, filters selected, and pills
 * on the page and clears all previous selected.  
 */
document.getElementById("uncheckAll").onclick = uncheckAll;
function uncheckAll() {
  $("input[type='checkbox']:checked").prop("checked", false);
  filter = "";
  $("#filterPills").empty();
  div = document.getElementById("subtopics");
  document.getElementById("topicsInput").value = "";
  showCheckbox(div);
  document.getElementById("quicksearch").value = "";
  filterSearch();
}

/**
 * Toggles view from card columns of three to horizontal layout. 
 */
document.getElementById("viewChange").onclick = viewChange;
function viewChange() {
  var element = document.getElementById("cards");
  element.classList.toggle("card-columns");
}
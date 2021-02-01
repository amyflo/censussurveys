var filter = "";

// changing view from card columns to horizontal layout
document.getElementById("viewChange").onclick = viewChange;
function viewChange() {
  var element = document.getElementById("cards");
  element.classList.toggle("card-columns");
}

// check whether inner text contains input
function searchText(inputArray, x) {
  console.log(inputArray[0]);
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

// add or remove filters on btn-group click
$(".btn-group").click(function () {
  filter = "";
  query = [];
  $("#filterPills").empty();
  var boxes = $(".filterCheckbox:checked");
  for (var i = 0; i < boxes.length; i++) {
    filter += "." + boxes[i].id;
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

// hide or show cards based on filters
document.getElementById("quicksearch").onkeyup = filterSearch;
function filterSearch() {
  var input = document.getElementById("quicksearch");
  inputVal = input.value;
  inputVal = inputVal.toLowerCase().trim();
  inputArray = inputVal.split(" ");
  if (filter) {
    $(".card").hide();
    searchText(inputArray, $(filter));
  } else {
    searchText(inputArray, $(".card"));
  }
}

// function to filter through checkboxes of a dropdown
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

// filter through topics dropdown
document.getElementById("topicsInput").onkeyup = searchSubtopics;
function searchSubtopics() {
  input = document.getElementById("topicsInput");
  div = document.getElementById("subtopics");
  filterCheckbox(div, input);
}

filterSearch();

// uncheck all checkboxes and clear checked filters
document.getElementById("uncheckAll").onclick = uncheckAll;
function uncheckAll() {
  $("input[type='checkbox']:checked").prop("checked", false);
  filter = "";
  $("#filterPills").empty();
  document.getElementById("quicksearch").value = "";
  filterSearch();
}

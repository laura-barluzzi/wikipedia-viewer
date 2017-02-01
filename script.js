
function updatePage(wikiJsonData) {
  console.log("in WikiJsonData");
  console.log(wikiJsonData);
  //results its an object containing many pages info, each page has a id
  var results = wikiJsonData.query.pages;
  //work with results  
  $("#search-results").empty();
  
  for (var pageId in results) {
    if (results.hasOwnProperty(pageId)) {
      console.log(pageId);
      var pageData = results[pageId];
      console.log(pageData);
      var pageUrl = "https://en.wikipedia.org/?curid=" + pageId;
      $("#search-results").append(
        "<a class='no-style' href='" + pageUrl + "' target='_blank'>" +
        "<div class='box'> " + pageData.title + "<div class='text-box'>" + pageData.extract + 
        "</div> </div> </a>")
    }
  }
}

function ajaxError() {
   alert("Ajax call didn't succeed");
}

function getWikiArticles(url) {
  console.log("in getWikiApi")  
  $.ajax({
    url: url, 
    dataType: 'jsonp',
    headers: { 'Api-User-Agent': 'Example/1.0' },
    error: ajaxError,
    success: updatePage,
  });
}

function buildURL(title) {
  console.log("in buildURL");
  title = encodeURI(title);
  var urlApi = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + title;
  getWikiArticles(urlApi)
}

function getTopic() {
  //console.log("in getTopic");
  var searchTitle = $("#search").val();
  console.log(searchTitle);
  if (searchTitle !== "") {
    buildURL(searchTitle);
  } else {
    $("#uploaded-page").text("You entered an empty string.")
  }
  
}

function main() {
  console.log("in main");
      
  $('.btn').on('click', function(){
      getTopic();
  })
  
  $(document).keypress(function(e) {
    //13 is enter on the keyboard.
    if(e.which == 13) {
        getTopic();
    }
  });
}

$(document).ready(main);
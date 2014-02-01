// For Esme with love and squalor
// v2.1 optimization 17.01.2014 22:35
var $statsButton  = $("#stats"),
    $searchInput  = $("input"),
    latestSearch  = "",
    dayStart      = 0

createNavigation()
checkForUpdates()

var $li           = $navigation.find("li"),
    $initial      = $li.eq(0),
    activeString  = $initial.data("string")
    
$initial.addClass("current history")
$("#x").on("click", resetSearch)
$statsButton.on("click", showStats)

$li.on("click", function(){
  activeString = $(this).data("string")
  resetSearch()
})

$searchInput.on("keyup", function(){
  var value = $(this).val()
  if (!value) resetSearch()
  if (value !== latestSearch && value.length > 2) {
    latestSearch = value
    search(value)
  }
})

filterMessages($initial.data("string"))
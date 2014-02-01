function setTemplate (element) {
  return Handlebars.compile($(element).html())
}

function resetSearch () {
  filterMessages(activeString)
  latestSearch = ""
  $li.filter(".current").removeClass("current")
  $("li[data-string='"+activeString+"']").addClass("history current")
  $searchInput.removeClass("search").val("")
  $statsButton.removeClass("act")
}

function correctChars (text) {
  return text.replace(/&lt;br \/&gt;/g, "<br />").replace(/&amp;#39;/g, "'")
}

function searchView () {
  $li.removeClass("current")
  $searchInput.addClass("search")
}

function convertDayToMS (day) {
  return day * 24 * 60 * 60 * 1000
}
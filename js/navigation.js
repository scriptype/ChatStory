var $navigation = $("#navigation"),
    $navigationTemplate = setTemplate("#navigation_template"),
    menuItems = [],
    months =
    ["Ocak", "Şubat", "Mart",
    "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül",
    "Ekim", "Kasım", "Aralık"]

function createNavigation () {
  for (var message in data) {
    var date = data[message].date,
        author = data[message].author,
        entry = data[message].entry
    if (parseInt(date) > 0 || parseInt(date) < 0) {
      var dateString = date.split(" ")[0],
          day = parseInt(dateString.slice(0, 2), 10)
      if (dayStart !== day) {
        var month = parseInt(dateString.slice(3, 5), 10) - 1,
            year = parseInt(dateString.slice(6, 10), 10),
            text = day + " " + months[month] + " " + year
        if (!text.match("undefined")) {
          dayStart = day
          menuItems.push({
            rawString: dateString,
            dateText: text
          })
        }
      }
    }
  }
  $navigation.html($navigationTemplate(menuItems))
}
var $messages = $("#messages"),
    $messageTemplate = setTemplate("#message_template"),
    search = _.debounce(function(term){
      searchView()
      filterMessages(term)
    }, 200)
    
function filterMessages (term, isSearch) {
    var searchTerm = RegExp(term, "gi"),
        results = [],
        i = 0
    for (i; i < data.length; i++) {
      if (isSearch && data[i]["entry"] && data[i]["entry"].match(searchTerm)) results.push(data[i])
      else {
        for (var prop in data[i]) {
          if (data[i][prop].match(searchTerm)) results.push(data[i])
        }
      }
    }
    var htmlData = correctChars($messageTemplate(results))
    $messages.html(htmlData)
}
var Messages = {
      longestMessage : null,
      shortestMessage: null
    },
    wordList = ["a", "e"],
    $statsTemplate = Handlebars.compile($("#stat_template").html()),
    $container = $("#messages")
  
function showStats () {
  $statsButton.addClass("act")
  $searchInput.val("# stats #")
  searchView()
  
  Messages.longestMessage = Messages.longestMessage || Message.filterByLength(true)
  Messages.shortestMessage = Messages.shortestMessage || Message.filterByLength(false)
  
  var i = 0
  for (i; i < wordList.length; i++) {
    Messages["messageByWord" + i] = Messages["messageByWord" + i] || Message.filterByWord(wordList[i])
  }
  
  var htmlData = correctChars($statsTemplate(Messages))
  $container.html(htmlData)
}

function Message (options) {
  this.author = options.author || ""
  this.date = options.date || ""
  this.content = options.content || ""
  this.title = options.title || ""
  this.description = options.description || ""
}

Message.filterByLength = function (longest) {
  var i = 0,
      msgLength = longest ? 0 : 9999,
      msg = null,
      dateText = "",
      author = ""
    
  for (i; i < data.length; i++) {
    if (data[i]["entry"]) {
      var _msg = data[i],
          _cont = _msg["entry"],
          _len = _cont.length
          
      if (longest) {
        if (_len > msgLength) {
          msgLength = _len
          msg = _cont
          dateText = _msg["date"]
          author = _msg["author"]
        }
      }
      else if (_len < msgLength && _len > 0) {
        msgLength = _len
        dateText = _msg["date"]
        author = _msg["author"]
        msg = _cont
      }
    }
      
  }
  return new Message({
    author: author,
    description: "Karakter Sayısı: " + msgLength,
    date: dateText,
    content: msg.split(/\n/g),
    title: longest ? "En uzun" : "En kısa"
  })
}

Message.filterByWord = function (term) {
  var i = 0,
      wordCount = 0,
      msg = null,
      word = RegExp(term, "gi"),
      dateText = "",
      author = ""
    
  for (i; i < data.length; i++) {
    if (data[i]["entry"]) {
      var _msg = data[i],
          _cont = _msg["entry"],
          _wordFound = _cont.match(word)
        
      if (_wordFound && _wordFound.length > wordCount) {
        wordCount = _wordFound.length
        msg = _cont
        dateText = _msg["date"]
        author = _msg["author"]
      }
    }
  }
  return new Message({
    author: author,
    description: wordCount + " kere " + "\"" + term + "\" geçiyor.",
    date: dateText,
    content: msg.split(/\n/g),
    title: "İçinde en çok \"" + term + "\" geçen"
  })
}
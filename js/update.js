function checkForUpdates (isFirstAccess) {
  var existingData = localStorage["ChatStory"],
      now = new Date().getTime(),
      $updateButton = $("#update"),
      _data,
      response,
      lastAccess,
      checkFrequency = 5000 // MS
  if (existingData) {
    _data = JSON.parse(existingData)
    lastAccess = isFirstAccess || _data.lastAccess
    
    if (lastAccess + checkFrequency <= now) {
      $.ajax({
        url: "http://enes.in/ChatStory/update.json"
      })
      .complete(function (data) {
        response = JSON.parse(data.responseText)
        if (response[_data.version + 1]) updateFound()
        else completeCheck(false)
      })
    }
  }
  else firstAccess()
  
  function updateFound () {
    $updateButton
    .addClass("pointer found")
    .text("Yeni güncelleme varmış, indirmek için tıq.")
    .slideDown(1000)
    .css("display", "block")
    .attr("href", response[response.length - 1])
    .on("click", update)
  }
  function update () {
    $updateButton.slideUp(1000)
    completeCheck(true)
  }
  function completeCheck (updated) {
    localStorage["ChatStory"] = JSON.stringify({
      lastAccess: now,
      version: updated ? response.length - 1 : _data.version
    })
  }
  function firstAccess () {
    localStorage["ChatStory"] = JSON.stringify({
      lastAccess: 0,
      version: -1
    })
    checkForUpdates(0)
  }
}
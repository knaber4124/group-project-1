$(document).ready(function () {
  console.log('ready');
  let topics = ['america', 'elections', 'presidential debate', 'Gabbard']
  let buttonDisplay = $('#buttonSection');
  let docDisplay = $('#articles');
  let uSearch = $('#userSearch');
  let uSubmit = $('#userSubmit');
  uSubmit.on('click', function (event) {
    userGives = uSearch.val().trim();
    if (userGives !== '') {
      topics.push(userGives);
      uSearch.val('');
      generateButtons();
    }
  });
  const generateButtons = function () {
    buttonDisplay.empty();
    topics.forEach(function (topic) {
      let button = $('<button>').addClass('buttonClass buttonSearch').on('click', function () {
        buttonDisplay.empty();
        let cnnQueryUrl = "https://newsapi.org/v2/everything?sources=cnn&q=" + topic + "&apiKey=d7144e0f89d24c7b9ef1f96d6f4cf7a3&pageSize=10";
        let foxQueryURL = 'https://newsapi.org/v2/everything?sources=fox-news&q=' + topic + '&apiKey=d7144e0f89d24c7b9ef1f96d6f4cf7a3&pageSize=10';
        console.log(cnnQueryUrl);
        console.log(foxQueryURL);
        $.ajax({
          url: cnnQueryUrl,
          method: "GET"
        }).then(function (response) {
          console.log(response);
          for (i = 0; i < 10; i++) {
            console.log(response.articles[i].title);
            console.log(response.articles[i].url);
            console.log(response.articles[i].urlToImage);
          }
        });
        $.ajax({
          url: foxQueryURL,
          method: 'GET'
        }).then(function (response) {
          console.log('success');
          console.log(response);
          for (i = 0; i < 10; i++) {
            console.log(response.articles[i].title);
            console.log(response.articles[i].url);
            console.log(response.articles[i].urlToImage);
          }
        })
        generateButtons();
      });
      buttonDisplay.append(button.text(topic));
    });
  }
  generateButtons();
});
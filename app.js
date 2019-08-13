$(document).ready(function () {

  let topics = []
  let buttonDisplay = $('#buttonSection');
  let docDisplay = $('#articles');
  let uSearch = $('#userSearch');
  let uSubmit = $('#userSubmit');

  function startOptions() {
    let trendSpotterQueryURL = 'http://api.trendspottr.com/v1.5/search?key=14a60eb3e939d55be739b830c3419a8b&q=Breaking%20News&w=twitter&resolve_urls=true&n=5'

    $.ajax({
      url: trendSpotterQueryURL,
      method: 'GET'
    }).then(function (response) {
      console.log('success');
      console.log(response);
      let responseArray=response.results.phrases;
      console.log('success');
      console.log(response);
    })
    for (let i = 0; i < length.responseArray; i++) {
      topics.push(responseArray[i].value);
    }
  }

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
        let cnnQueryUrl = "https://newsapi.org/v2/everything?sources=cnn&q=" + topic + "&apiKey=d7144e0f89d24c7b9ef1f96d6f4cf7a3";
        let foxQueryURL = 'https://newsapi.org/v2/everything?sources=fox-news&q=' + topic + '&apiKey=d7144e0f89d24c7b9ef1f96d6f4cf7a3';
        let trendSpotterQueryURL = 'http://api.trendspottr.com/v1.5/search?key=14a60eb3e939d55be739b830c3419a8b& q=breaking news& w=twitter & resolve_urls=true & n=5'
        console.log(queryUrl);
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


  startOptions();
  generateButtons();
});

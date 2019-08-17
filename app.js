$(document).ready(function () {

  let topics = [];
  let buttonDisplay = $('#buttonSection');
  let docDisplay = $('#articles');
  let uSearch = $('#userSearch');
  let uSubmit = $('#userSubmit');
  let genCol = $('#generalCol');

  genCol.hide();

  function startOptions() {
    let trendSpotterQueryURL = 'http://api.trendspottr.com/v1.5/search?key=e068b56c29a84a5e62c30bdba07cb6f7&q=Breaking News&w=twitter&resolve_urls=true&n=5';

    $.ajax({
      url: trendSpotterQueryURL,
      method: 'GET'
    }).then(function (response) {
      console.log('success');
      console.log(response);
      let responseArray = response.results.phrases;

      response.results.phrases.forEach(p => console.log(p));
      for (let j = 0; j < responseArray.length; j++) {
        topics.push(responseArray[j].value);
      }
      generateButtons();
    });
  }
  console.log(topics);
  uSubmit.on('click', function (event) {
    userGives = uSearch.val().trim();
    if (userGives !== '' && !topics.includes(userGives)) {
      topics.push(userGives);
      uSearch.val('');
      generateButtons();
    }
  });
  const generateButtons = function () {
    buttonDisplay.empty();
    topics.forEach(function (topic) {
      let button = $('<button>').addClass('buttonClass buttonSearch waves-effect waves-light btn').on('click', function () {
        genCol.hide();
        buttonDisplay.empty();
        let foxArticles = null;
        let cnnArticles = null;
        let cnnQueryUrl = "https://newsapi.org/v2/everything?sources=cnn&q=" + topic + "&apiKey=d7144e0f89d24c7b9ef1f96d6f4cf7a3&pageSize=5";
        let foxQueryUrl = 'https://newsapi.org/v2/everything?sources=fox-news&q=' + topic + '&apiKey=d7144e0f89d24c7b9ef1f96d6f4cf7a3&pageSize=5';
        let generalQueryUrl = 'https://newsapi.org/v2/everything?q=' + topic + '&apiKey=d7144e0f89d24c7b9ef1f96d6f4cf7a3&pageSize=5'
        console.log(generalQueryUrl);
        $.ajax({
          url: cnnQueryUrl,
          method: "GET"
        }).then(function (response) {
          cnnArticles = response.articles;
          console.log(cnnArticles);
          console.log(response);
          console.log(response.articles.length);
          if (response.articles.length < 1) {
            $('.cnnArticle').remove();
            $('#cnnCol').append('<div class="card cnnArticle"><h1>Topic so hot CNN has not reported on it yet</h1></div>');
            $.ajax({
              url: generalQueryUrl,
              method: "GET"
            }).then(function (response) {
              genCol.show();

              for (i = 0; i < 5; i++) {
                let url = response.articles[i].url;
                console.log(url);
                console.log(response.articles[i].title);
                console.log(response.articles[i].url);
                console.log(response.articles[i].urlToImage);
                $('#generalCol').append('<div class="card cnnArticle" style="cursor:pointer"><div class="card-panel hoverable">" ' + response.articles[i].title + '</div><div class="card-image"><img src="' + response.articles[i].urlToImage + '"></div></div>').on('click', function () {
                  window.open(url, '_blank');
                });

              }
              console.log(response);
            });
            console.log('no articles really');
          }

          function createCards(col, link, articleTitle) {
            let newDiv = $("<div>").addClass("card cnnArticle").append()
            let newLink = $("<a>").attr("href", link)
            let secondDiv = $("<div>").append(newLink)
            $(col).append
          }

          if (response.articles.length > 1) {

            $('.cnnArticle').remove();
            for (let i = 0; i < 5; i++) {
              // createCards("#cnnCol", response.articles[i].url, response.articles[i].title)
              let url = response.articles[i].url;
              console.log(url);
              $('#cnnCol').append('<a target="_blank" href=' + url + '><div class="card cnnArticle" style="cursor:pointer"><div class="card-panel hoverable"> ' + response.articles[i].title + '</div><div class="card-image"><img src="' + response.articles[i].urlToImage + '"></div></div></a>');
            }
          }

          $.ajax({
            url: foxQueryUrl,
            method: 'GET'
          }).then(function (response) {
            foxArticles = response.articles;
            console.log(response);
            if (response.articles.length < 1) {
              genCol.show();
              $('.foxArticle').remove();
              $('#foxCol').append('<div class="card foxArticle"><h1>Topic so hot FOX has not reported on it yet</h1></div>');
              console.log('no articles really');
            }
            if (response.articles.length > 1) {
              $('.foxArticle').remove();
              for (let i = 0; i < 5; i++) {
                $('#foxCol').append('<a target="_blank" href=' + response.articles[i].url + '><div class="card foxArticle" style="cursor:pointer"><div class="card-panel hoverable"> ' + response.articles[i].title + '</div><div class="card-image"><img src=' + response.articles[i].urlToImage + '></div></div></a>');
              }
            }
          });
          // if (foxArticles.length === 0 && cnnArticles.length === 0) {
          //   console.log('both empty');
          // }
        });
        generateButtons();
      });
      buttonDisplay.append(button.text(topic));
    });
  };


  startOptions();
});
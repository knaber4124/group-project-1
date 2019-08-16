$(document).ready(function () {

  let topics = []
  let buttonDisplay = $('#buttonSection');
  let docDisplay = $('#articles');
  let uSearch = $('#userSearch');
  let uSubmit = $('#userSubmit');

  // function startOptions() {
  //   let trendSpotterQueryURL = 'http://api.trendspottr.com/v1.5/search?key=14a60eb3e939d55be739b830c3419a8b&q=Breaking News&w=twitter&resolve_urls=true&n=5'

  //   $.ajax({
  //     url: trendSpotterQueryURL,
  //     method: 'GET'
  //   }).then(function (response) {
  //     console.log('success');
  //     console.log(response);
  //     let responseArray = response.results.phrases;

  //     response.results.phrases.forEach(p => console.log(p));
  //     for (let j = 0; j < responseArray.length; j++) {
  //       topics.push(responseArray[j].value);
  //     }
  //     generateButtons();
  //   })
  // }
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
      let button = $('<button>').addClass('buttonClass buttonSearch button waves-effect waves-light btn').on('click', function () {
        buttonDisplay.empty();
        let foxArticles = null;
        let cnnArticles = null;
        let cnnQueryUrl = "https://newsapi.org/v2/everything?sources=cnn&q=" + topic + "&sortBy=publishedAt&from2018-01-01&apiKey=d7144e0f89d24c7b9ef1f96d6f4cf7a3";
        let foxQueryUrl = 'https://newsapi.org/v2/everything?sources=fox-news&q=' + topic + '&sortBy=publishedAt&from2018-01-01&apiKey=d7144e0f89d24c7b9ef1f96d6f4cf7a3';
        let alternateQueryUrl = 'https://newsapi.org/v2/everything?q=receives' + topic + '&sortBy=publishedAt&from2018-01-01&apiKey=d7144e0f89d24c7b9ef1f96d6f4cf7a3';
        console.log(foxQueryUrl);
        $.ajax({
          url: cnnQueryUrl,
          method: "GET"
        }).then(function (response) {
          cnnArticles = response.articles;
          console.log(cnnArticles);
          console.log(response);
          for (let i = 0; i < 6; i++) {
            console.log(response.articles[i].title);
            console.log(response.articles[i].url);
            console.log(response.articles[i].urlToImage);
          }
          $.ajax({
            url: foxQueryUrl,
            method: 'GET'
          }).then(function (response) {
            foxArticles = response.articles;
            console.log(response);
            for (let k = 0; k < 6; k++) {
              console.log(response.articles[k].title);
              console.log(response.articles[k].url);
              console.log(response.articles[k].urlToImage);
            }
            if (foxArticles.length === 0 && cnnArticles.length === 0) {
              console.log('both empty');
              $('.foxDiv').hide();
              $('.cnnDiv').hide();
              $('.alternateDiv').show();
              $.ajax({
                url: alternateQueryUrl,
                method: 'GET'
              }).then(function (response) {
                alternateArticles = response.articles;
                for (let m = 0; m < 6; m++) {
                  console.log(response.articles[m].title);
                  console.log(response.articles[m].url);
                  console.log(response.articles[m].urlToImage);

                }
              })
            }
            else if (foxArticles.length === 0) {
              console.log('fox empty')
              $('.alternateDiv').hide();
              $('.foxDiv').text('No Articles From Fox Found');
            }
            else if (cnnArticles.length === 0) {
              console.log('cnn empty')
              $('.alternateDiv').hide();
              $('.cnnDiv').text('No Arcticles From CNN Found');
            }
            else {
              console.log('both have articles')
            };

          })

        }
        )
        generateButtons();
      });
      buttonDisplay.append(button.text(topic));
    });
  }


  // startOptions();
});

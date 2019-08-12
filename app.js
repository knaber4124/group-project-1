$(document).ready(function () {

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
        let queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json??q=" + topic + "&api-key=RwbBajpfHzkqWygBBYW3W35JGHAncHH1&begin_date=20181231&sort=newest";
        console.log(queryUrl);

        $.ajax({
          url: queryUrl,
          method: "GET"
        }).then(function (response) {
          console.log('success');
          console.log(response.response.docs);

          for (i = 0; i<10; i++){
            console.log('Article #: ' + i)
            console.log(response.response.docs[i].headline.main);
            console.log(response.response.docs[i].snippet);
            console.log(response.response.docs[i].web_url);
            let image = response.response.docs[i].multimedia[0].url;
            console.log('https://www.nytimes.com/'+image);
          }

        });
        generateButtons();
      });

      buttonDisplay.append(button.text(topic));
    });

  };


  generateButtons();













  // uSubmit.on('click', function(event) {
  //   console.log('clicked!');
  //   let searchTerm = uSearch.val().trim();
  //   console.log('search term: ' + searchTerm);
  //
  //   let searchButton = $("<button>");
  //   searchButton.addClass('buttonClass searchButton')
  //   searchButton.text(searchTerm);
  //   searchButton.data('search', searchTerm);
  //   searchButton.bind('click', function(){
  //     console.log($(this.data('search')))
  //   });
  //
  //   if (searchTerm !== '') {
  //
  //
  //     buttonDisplay.append(searchButton);
  //
  //   }
  //
  //   uSearch.val('');
  //
  // });
  //
  // $('#clear').on('click', function() {
  //   $('.buttonClass').remove();
  // });
  //
  //
  // console.log('ready');
});

$(document).ready(function() {

  let topics = ['america','elections','presidential debate','Gabbard']
  let buttonDisplay = $('#buttonSection');
  let docDisplay = $('#articles');
  let uSearch = $('#userSearch');
  let uSubmit = $('#userSubmit');

  uSubmit.on('click', function(event){
    userGives = uSearch.val().trim();

    if (userGives !== '') {
    topics.push(userGives);
    uSearch.val('');
    generateButtons();
  }
  });

  const generateButtons = function(){
    buttonDisplay.empty();
    topics.forEach(function(topic){
      let button = $('<button>').addClass('buttonClass buttonSearch').on('click', function(){
        buttonDisplay.empty();
        let queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json??q="+topic +"&api-key=RwbBajpfHzkqWygBBYW3W35JGHAncHH1";
        console.log(queryUrl);

        $.ajax({
          url: queryUrl,
          method: "GET"
        }).then(function(response){
          console.log('success');
          console.log(response);

        });
        generateButtons();
      });

      buttonDisplay.append(button.text(topic));
    });

  }


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
<<<<<<< HEAD
});
=======
});
>>>>>>> 9231cdd6f72db4ab49febeb0f6eaa03ad6427c48

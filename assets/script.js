moment().format('L');
var cityName = "New York";
//-----------------------Search Function for Current City Weather----------------------------------//
var apiKey= "40ea71f932558a6b52a82bff32c16d37";
// var userInput= ("#city-input").val().trim();

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    var queryUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

    $.ajax({
        url: queryUrl,
        cityName,
        method: 'GET',
        
    })
    // console.log(queryUrl);
    // console.log(cityName);
    function search() {
        $('#search-button').on('click', function() {
          citySearch = $('#city-input')
            .val()
            .trim();
            if (citySearch === '') {
                return;
              }
              $('#search-input').val('');
              getWeather('#city-input');
            });
          }
          $.ajax({
            url: queryUrlForecast,
            method: 'GET',
            
        })
        .then(function(response){
        console.log(cityName);
        console.log(queryUrl);
        console.log(response);

        })    
        
//     }).then(function (response) {
//         console.log(response);
//         console.log(queryURL);
//         //empty divs and ids that we need to dump content into.....
//         $("#current").empty();
//        var mainDate = moment().format('L');
//     });
// }
var cityName = " ";
var searchHistoryArr = [];
//-----------------------Search Function for Current City Weather----------------------------------//
var apiKey = "38bd3e1bcd10ebe74c740e701e06f2c5";
// var userInput= ("#city-input").val().trim();

// var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
// var queryUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
// var queryUrlUvindex = "https://openweathermap.org/api/uvi" + cityName + "&appid=" + apiKey;

// var sampleQuery = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=" + apiKey;

// function search() {
//   $('#search-button').on('click', function () {
//     citySearch = $('#city-input')
//       .val()
//       .trim();
//     if (citySearch === '') {
//       return;
//     }
//     $('#search-input').val('');
//     getWeather('#city-input');
//   });
// }

// $.ajax({
//   url: sampleQuery,
//   method: 'GET',

// })
//   .then(function (response) {
//     console.log(cityName);
//     console.log(queryUrl);
//     console.log(response);

$(document).ready(function () {
  $("#select-city").on("click", function (event) {
    event.preventDefault();
    var userInput = $("#city-input").val();


    console.log("---User Input this: ", userInput);
    $("#city-input").val("");

    getWeather(userInput)
  });

  $("#searchhistory").on("click", "li", function () {
    getWeather($(this).text());
  });
});
  function searchHistory(text) {
    var li = $("<li>").addClass("search-list").text(text);
    $("#searchhistory").append(li)
  }

  function getWeather(userInput) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + apiKey
    $.ajax({
      url: queryUrl,
      method: 'GET',
      dataType: "json",
      success: function (data) {

        console.log("Response from api  ",data);

        if (searchHistoryArr.indexOf(userInput) === -1) {
          searchHistoryArr.push(userInput)
          window.localStorage.setItem("#searchhistory", JSON.stringify(localStorage))

          searchHistory(userInput)
        }

              //   //this is where you should have code to show on html 
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("#current-weather-container");
        var iconURL = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        var imgDiv = $("<div>").attr("class", "col-md-4").append($("<img>").attr("src", iconURL).attr("class", "card-img"));
       
        var city = $("<p>").addClass("cardText").text("City:  " + data.name  +"        " + moment(data.dt_txt).format('LL'));
        var cTemp = data.main.temp;
        cTemp = Math.floor(( cTemp - 273.15) * 1.8 + 32);
        var temperature = $("<p>").addClass("cardText").text("Current Temp: " + cTemp  + " °F");
        
        var wind = $("<p>").addClass("cardText").text("Windspeed: " + data.wind.speed + " MPH");
        var humidity = $("<p>").addClass("cardText").text("Humidity: " + data.main.humidity + " %");
        
        //var wind, humidity, name of city
        cardBody.append(imgDiv);
        card.append(cardBody)
        $("#current-weather-container").append(card);

        cardBody.append(city);
        card.append(cardBody)
        $("#current").append(card);

        cardBody.append(temperature);
        card.append(cardBody)
        $("#current").append(card);

        cardBody.append(wind);
        card.append(cardBody)
        $("#current").append(card);

        cardBody.append(humidity);
        card.append(cardBody)
        $("#current").append(card);

        
        


      }
    });
        $("#current").empty();
        // $.ajax({
        //   url: "https://api.openweathermap.org/data/2.5/weather?q=40ea71f932558a6b52a82bff32c16d37",
        // }).done(function(data) {
        //   $('#city-input').append($("<p>").addClass("cardText").text("Temp: " + data.main.temp + " °F"));
        // });

      //   //this is where you should have code to show on html 
      //   var card = $("<div>").addClass("card");
      //   var cardBody = $("<div>").addClass("#current-weather-container");
      //   var temperature = $("<p>").addClass("cardText").text("Temp: " + data.main.temp + " °F");
      //   var wind = $("<p>").addClass("cardText").text("Temp: " + data.main.windspeed + " °F");
      //   var humidity = $("<p>").addClass("cardText").text("Temp: " + data.main.humidity + " °F");
      //   var city = $("<p>").addClass("cardText").text("Temp: " + data.main.temp + " °F");
      //   //var wind, humidity, name of city

      //   cardBody.append("#temperature");
      //   card.append(cardBody)
      //   $("#current-weather-container").append(card);

      //   //call function to get forecast (UserInput)
      //   //call function for UV
      // }
      // //   $.ajax({
      // //     url: queryUrl,
      // //     cityName,
      // //     method: 'GET',

      // // });
      // // // console.log(queryUrl);
      // console.log(cityName);

      //var userStorage = JSON.parse(window.localStorage.getItem("userStorage"))
      // if (userStorage.length > 0) {
      //getWeather(userStorage[userStorage.length-1])
      //}

      //for loop {searchHistory(userStorage[i])}


  }// ------ end getWeather fct def ------

    // })
  // }
// })
// console.log(event.target)
    // moment().format(mm.dd.yyyy);

  // })

//     }).then(function (response) {
//         console.log(response);
//         console.log(queryURL);
//         //empty divs and ids that we need to dump content into.....
//         $("#current").empty();
//        var mainDate = moment().format('L');
    // });
      // });
    // 
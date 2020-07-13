var cityName = " ";
var searchHistoryArr = [];
//-----------------------Search Function for Current City Weather----------------------------------//
var apiKey = "38bd3e1bcd10ebe74c740e701e06f2c5";
// var userInput= ("#city-input").val().trim();

// var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
// var queryUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
// var queryUrlUvindex = "https://openweathermap.org/api/uvi" + cityName + "&appid=" + apiKey;

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
    cityName = userInput;

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

function getUVIndex(lat, lon) {

  var queryUrlUvindex = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
  $.ajax({
    url: queryUrlUvindex,
    method: "GET",
    success: function (UVdata) {
      console.log(UVdata);

      var UVIndex = UVdata.value;
      // var pTag = $("#current").text("UV Index: " + UVIndex)
      //.append(pTag);
      // pTag.addClass("index");
      var UVcond;
      console.log(UVIndex);
      // UV Index color that indicates whether the conditions are favorable, moderate, or severe
      $("#uvl-display").text("UV Index: " + UVIndex);
      if (UVIndex > 2 && UVIndex <= 6) {
        $("#uvl-display").css("background-color", "#82E0AA");
      }
      else if (UVIndex > 6 && UVIndex < 8) {
        $("#uvl-display").css("background-color", "#FFF176");
      }
      else if (UVIndex >= 8 && UVIndex <= 10) {
        $("#uvl-display").css("background-color", "#FFB74D");
      }
      else if (UVIndex >= 11) {
        $("#uvl-display").css("background-color", "#DA240B");
      }
    }
  })
}
function getForecast() {
  var queryUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityName + "&appid=" + apiKey;

  //get 5 day forecast

  $.ajax({
    url: queryUrlForecast,
    method: "GET",
    data: "json",
  }).then(function (data) {
    console.log(data);
    //add container div for forecast cards
    var newrow = $("<p>").addClass("cardText").text(data.name + "   " + moment(data.dt_txt).format('LL'));


    //loop through array response to find the forecasts
    var fiveTemp = day.main.temp
    fiveTemp = Math.floor((fiveTemp - 273.15) * 1.8 + 32);
    var fiveHumid = day.main.humidity
    var icon = day.weather[0].icon;
    for (var i = 0; i < 5; i++) {
      if (data.list[i].dt_txt.indexOf([i]) !== -1) {
        var newCol = $("<div>").attr("class", "one-fifth");
        newrow.append(newCol);

        var newCard = $("<div>").attr("class", "card text-white bg-primary");
        newCol.append(newCard);

        var cardHead = $("<div>").attr("class", "card-header").text(moment(response.list[i].dt, "X").format("MMM Do"));
        newCard.append(cardHead);

        var cardImg = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
        newCard.append(cardImg);

        var bodyDiv = $("<div>").attr("class", "card-body");
        newCard.append(bodyDiv);

        bodyDiv.append($("<p>").attr("class", "card-text").html("Temp: " + data.list[i].main.temp + " &#8457;"));
        bodyDiv.append($("<p>").attr("class", "card-text").text("Humidity: " + data.list[i].main.humidity + "%"));
      }
    }
  });
}

function getWeather(userInput) {

  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + apiKey
  $.ajax({
    url: queryUrl,
    method: 'GET',
    dataType: "json",
    success: function (data) {

      console.log("Response from api  ", data);

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

      var city = $("<p>").addClass("cardText").text("City:  " + data.name + "        " + moment(data.dt_txt).format('LL'));
      var cTemp = data.main.temp;
      cTemp = Math.floor((cTemp - 273.15) * 1.8 + 32);
      var temperature = $("<p>").addClass("cardText").text("Current Temp: " + cTemp + " °F");

      var wind = $("<p>").addClass("cardText").text("Windspeed: " + data.wind.speed + " MPH");
      var humidity = $("<p>").addClass("cardText").text("Humidity: " + data.main.humidity + " %");
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      //-----append to DOM-------//
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
      getUVIndex(lat, lon);
      getForecast();
    } 
  })  


$("#select-city").on("click", function (event) {
  event.preventDefault();
  $("#current").empty();
})
}
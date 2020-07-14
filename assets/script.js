var cityName = " ";
var searchHistoryArr = [];
//-----------------------Search Function for Current City Weather----------------------------------//
var apiKey = "38bd3e1bcd10ebe74c740e701e06f2c5";

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
    localStorage.setItem(key, JSON.stringify());
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
      else if (UVIndex >= 8 && UVIndex < 11) {
        $("#uvl-display").css("background-color", "#FFB74D");
      }
      else if (UVIndex >= 11) {
        $("#uvl-display").css("background-color", "#DA240B");
      }
    }
  })
}
function getForecast() {
  var queryUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

  //get 5-day forecast

  $.ajax({
    url: queryUrlForecast,
    method: "GET",
    data: "json",
  }).then(function (data) {
    console.log(data);
    var icon1= data.list[1].weather.icon;
    var temp1 = (Math.floor(data.list[1].main.temp - 273.15) * 1.80 + 32);
    $("#date-1").text(moment(data.list[1].dt_txt).format('l'));
    $(".weather-image-container").html(icon1);
    $("#temp-1").text("Temperature:  " + temp1 + "°F");
    $("#humidity-1").text("Humidity: " + data.list[1].main.humidity +" %");
   
    var icon2= data.list[8].weather.icon;
    var temp2 = (Math.floor(data.list[8].main.temp - 273.15) * 1.80 + 32);
    $("#date-2").text(moment(data.list[8].dt_txt).format('l'));
    $("#weather-image-2").html(icon2);
    $("#temp-2").text("Temperature:  " + temp2 +"°F");
    $("#humidity-2").text("Humidity: " + data.list[8].main.humidity + " %");
   
    var temp3 = (Math.floor(data.list[16].main.temp - 273.15) * 1.80 + 32);
    var icon3= data.list[16].weather.icon;
    $("#date-3").text(moment(data.list[16].dt_txt).format('l'));
    $("#weather-image-3").html(icon3);
    $("#temp-3").text("Temperature:  " + temp3 + "°F");
    $("#humidity-3").text("Humidity: " + data.list[16].main.humidity + " %");
   
    var temp4 = (Math.floor(data.list[24].main.temp - 273.15) * 1.80 + 32);
    var icon4= data.list[24].weather.icon;
    $("#date-4").text(moment(data.list[24].dt_txt).format('l'));
    $("#weather-image-4").html(icon4);
    $("#temp-4").text("Temperature:" + temp4 + "°F");
    $("#humidity-4").text("Humidity: " + data.list[24].main.humidity + "%");
   
    var temp5 = (Math.floor(data.list[32].main.temp - 273.15) * 1.80 + 32);
    var icon5= data.list[32].weather.icon;
    $("#date-5").text(moment(data.list[32].dt_txt).format('l'));
    $("#weather-image-5").html(icon5);
    $("#temp-5").text("Temperature:  " + temp5 + "°F");
    $("#humidity-5").text("Humidity: " + data.list[32].main.humidity + " %");

    //loop through array response to find the forecasts
    // for (var i = 0; i < 5; i++) {
      
    //   var fiveTemp = day.list[i].main.temp
    //   fiveTemp = Math.floor((fiveTemp - 273.15) * 1.8 + 32);
    //  
    //   if (data.list[i].dt_txt.indexOf([i]) !== -1) {
    //     var newrow = $("<p>").addClass("card text-white bg-primary").text(data.name + "   " + moment(data.dt_txt).format('LL'));
    //     var newCol = $("<div>").attr("class", "one-fifth");
    //     newrow.append(newCol);

    //     var newCard = $("<div>").attr("class", "col-lg mx-1 pb-2");
    //     newCol.append(newCard);

    //     var cardHead = $("<div>").attr("class", "card-header").text(data.list[i].dt, "X").format("MMM Do");
    //     newCard.append(cardHead);

    //     var cardImg = $("<img>").attr("class", "col-lg mx-1 pb-2p").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
    //     newCard.append(cardImg);

    //     var bodyDiv = $("<div>").attr("class", "card-body");
    //     newCard.append(bodyDiv);

    //     bodyDiv.append($("<p>").attr("class", "card-text").html("Temp: " + fiveTemp + " °F"));
    //     bodyDiv.append($("<p>").attr("class", "card-text").text("Humidity: " + data.list[i].main.humidity + "%"));
      })
    
    
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
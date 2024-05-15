var apiKey = "c68d5d8c785960bb2a305c1354032b56";
var endPoint = "https://api.openweathermap.org/data/2.5/weather?";
function getWeatherAndTimeFor(lat, lon, city) {
    var weatherUrl = endPoint + "lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=" + apiKey;
    var timezoneUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    $.ajax({
        url: weatherUrl,
        dataType: "json",
        success: function(weatherResponse) {
            var temperature = Math.trunc(weatherResponse.main.temp) + '°C';
            var weather = weatherResponse.weather[0];
            var desc = weather.description;
            var iconCode = weather.icon;
            var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";

            $(".temperature").html(temperature);
            $(".weather").html(desc);
            $(".humidity").html(weatherResponse.main.humidity + '%');
            $(".wind-speed").html(weatherResponse.wind.speed + ' m/s');
            $(".visibility").html(weatherResponse.visibility + ' meters');
            $(".air-quality").html(weatherResponse.main.pressure + ' hPa');
            $("#weather-icon").attr("src", iconUrl);

            $.ajax({
                url: timezoneUrl,
                dataType: "json",
                success: function(timezoneResponse) {
                    var localTime = new Date();
                    var utc = localTime.getTime() + (localTime.getTimezoneOffset() * 60000);
                    var offset = timezoneResponse.timezone / 3600;
                    var timestamp = utc + (offset * 3600000);
                    var date = new Date(timestamp);
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var formattedTime = hours + ":" + (minutes < 10 ? "0" : "") + minutes;

                    $("#current-weather-text").html("Current Time: " + formattedTime);
                    $(".city").html('<svg id="location-logo" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/></svg>' + city);
                }
            });
        }
    });
}

$(document).ready(function() {

    getWeatherAndTimeFor(11.937114756487968, 79.83401330224204, "Puducherry");


    $(".dropdown-item").click(function() {
        var location = $(this).text();
        switch (location) {
            case "Beijing":
                getWeatherAndTimeFor(40.080054290694314, 116.60310136852245, "Beijing");
                break;
            case "Cape Town":
                getWeatherAndTimeFor(-33.96912283403572, 18.596903110632127, "Cape Town");
                break;
            case "Dubai":
                getWeatherAndTimeFor(25.2569357578328, 55.36433925455602, "Dubai");
                break;
            case "Los Angeles":
                getWeatherAndTimeFor(33.94295402889333, -118.40378759307117, "Los Angeles");
                break;
            case "Paris":
                getWeatherAndTimeFor(49.00410347313529, 2.569071040058015, "Paris");
                break;
            case "Moscow":
                getWeatherAndTimeFor(55.97552771944106, 37.41273344568409, "Moscow");
                break;
            case "New Delhi":
                getWeatherAndTimeFor(28.556792771607746, 77.08500269697304, "New Delhi");
                break;
            case "Rio de Janeiro":
                getWeatherAndTimeFor(-22.813437394778266, -43.24636770168812, "Rio de Janeiro");
                break;
            case "Sydney":
                getWeatherAndTimeFor(-33.93729575181128, 151.17482134725608, "Sydney");
                break;
            case "Tokyo":
                getWeatherAndTimeFor(35.550001402770896, 139.77976845669528, "Tokyo");
                break;
            default:

                getWeatherAndTimeFor(11.937114756487968, 79.83401330224204, "Puducherry");
                break;
        }
    });
});


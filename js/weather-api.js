var apiKey = "c68d5d8c785960bb2a305c1354032b56";
var endPoint = "https://api.openweathermap.org/data/2.5/weather?";

function getWeatherFor(lat, long) {
    var url = endPoint + "lat=" + lat + "&lon=" + long + "&units=metric" + "&appid=" + apiKey;

    $.ajax({
        url: url, 
        dataType: "json",
        success: function(response) {
            var city = response.name + ', ' + response.sys.country;
            var temperature = Math.trunc(response.main.temp) + '°C';
            var weather = response.weather[0];
            var desc = weather.description;
            var date = new Date(response.dt * 1000);

            $(".city").html(city);
            $(".temperature").html(temperature);
            $(".weather").html(desc);
            $(".date"). html(date.toLocaleString())
        }
    });
}

$( document ).ready(function() {
    getWeatherFor(11.937114756487968, 79.83401330224204);
});
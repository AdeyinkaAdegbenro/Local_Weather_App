$(document).ready(function() {  
   
 $.getJSON("https://ipapi.co/json",getLocation,'jsonp');
// this function handles the search box input

  
   function getWeatherPic(weatherId){
 var image,h;
    var  weatherUrls = {
      thunder:"https://res.cloudinary.com/adeyinka/image/upload/v1498806581/dbP9R9d_svzaos.jpg",
      lightRain:"https://res.cloudinary.com/adeyinka/image/upload/v1498806765/6Y5vsu7_n9phdh.jpg",
      snow:"https://res.cloudinary.com/adeyinka/image/upload/v1498806798/AcfiOr4_r5xphf.jpg",
      mist:"https://res.cloudinary.com/adeyinka/image/upload/v1498806827/NcGTfxX_l8lwgt.jpg",
      clear:"https://res.cloudinary.com/adeyinka/image/upload/v1498806854/U8EhZnn_r8jrtu.jpg",
      cloud:"http://res.cloudinary.com/adeyinka/image/upload/v1498806877/F1ReO4O_ogtvwd.jpg",
      rain:"http://res.cloudinary.com/adeyinka/image/upload/v1498806912/q2c9BTe_ajmvbz.jpg",
      hot:"http://res.cloudinary.com/adeyinka/image/upload/v1498806945/kNUA3oo_j7sa5y.jpg"
    };

  if (weatherId >= 200 && weatherId < 300){
    image = weatherUrls.thunder;
  h = 'black';
  }

        else if (weatherId >= 300 && weatherId < 400) {
          image = weatherUrls.lightRain;
h = 'grey';        
        }
     else if (weatherId >= 500 && weatherId < 600) {
       image = weatherUrls.rain;
    h = 'grey';
     }
        else if (weatherId >= 600 && weatherId < 800) {
          image = weatherUrls.snow;                           h = 'black';
          
        }
        else if (weatherId === 800) {
     image = weatherUrls.clear;
      h = 'black';
        }
        else if (weatherId > 800 && weatherId < 900) {
          image = weatherUrls.cloud;
  h= 'black';       
        }
        else {
          image = weatherUrls.mist;
             h = 'black';
        }
 
     
 $('body').css("background-image","url('" + image + "')");
   
    $('body').css("color", h);
         
 
  }

function getWeather(url){
  $.getJSON(url,processWeather
,'jsonp' );  
}
 
  // the functions
  function processWeather(json){
   
   var temp = json.main.temp;
     
  var  humidity = json.main.humidity + '%',
 wind_speed = json.wind.speed + ' m/s',
  weatherId  = json.weather[0].id;

         
 var   description = json.weather[0].description,     
 city = json.name,
 country = json.sys.country,
 tempC = Math.round(temp) + ' &deg;C',
 tempF  = Math.round(temp * 9 / 5 + 32) + " &deg;F";
    
var day = new Date().toLocaleDateString(),
      
 time = new Date().toLocaleTimeString();
    
 day = processDate(day);
 //var html = tempC +' </p>' + '<p id="describe">Description: ' + description +'</p>';
 getWeatherPic(weatherId);
    $('.weather').html('<h1 style="text-align:center;">Weather Forecast for ' + city + ', ' + country + '</h1><br>');
    
 $('#date').html(day);
    
$('#time').html( time + '<br>');
    
    $('#temp').html('<i class="wi wi-day-sunny"></i>   Temperature: ' + tempC);
    
$('#temp').click(function(){
  if ($('#temp').text().endsWith('C')){
  $('#temp').html('<i class="wi wi-day-sunny"></i>   Temperature: ' + tempF);
}
    else{
      $('#temp').html("<i class='wi wi-day-sunny'></i>   Temperature: " + tempC);
    }  
});
$('#wind').html("<i class='wi wi-day-light-wind'></i>   Wind Speed:  " + wind_speed );
    $('#humidity').html("<i class='wi wi-humidity'></i>   Humidity: "+ humidity);
$('#descr').text('Outlook: ' + description);
   
  }

  
function getLocation(data){
 
  
   var
   lat = data.latitude,
   lon = data.longitude,
   api_key = 'bbf2b7efdc83209cb2bf9a749babf98a';

  var  url =  'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?' + 'lat=' + lat + '&lon=' + lon + '&appid=' + api_key +'&units=metric' ;

  getWeather(url);

 
 }

  
  function processDate(){
   var year, month, months = ['January', 'February', 'March','April','May','June','July','August', 'September','October','November','December'], day, date = moment().format();
    var dt =   date.split('T');
    date = dt[0].split('-');
    year = date[0];
    month = date[1];
    day = date[2];
   var days = months[month - 1] + ' ' + day + ', ' + year;
    return days;
  }
  
  function handleSearch(){ $('#searchfield').keypress(function(event){
 var  searchString = $('#searchfield').val(),
 api_key = 'bbf2b7efdc83209cb2bf9a749babf98a';    
//searchString.focus();
 var  url =  'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=' +  searchString + '&appid=' + api_key + '&units=metric';
 if (event.which == 13 && searchString !== null ){
  event.preventDefault(); 

$.getJSON(url,processWeather,'jsonp');
    }
  });
  }
 
  
    handleSearch(); 
  
});
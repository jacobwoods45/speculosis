
var zipcode;

document.addEventListener('DOMContentLoaded', startTime);


//get modal element

var modal = document.getElementById("simplemodal");

var modalBtn= document.getElementById("modal-btn");

var closeBtn =document.getElementsByClassName("closeBtn");

var nighttoggle = document.getElementById("autonighttoggle");




modalBtn.addEventListener('click', openModal);
closeBtn[0].addEventListener('click', closeModal);

nighttoggle.addEventListener('click', function(){
  var nightToggle = true
});


function openModal(){
  console.log("Modal opened");
  modal.style.display= 'block';
}


function closeModal(){
  console.log("Modal closed");
  modal.style.display= 'none';
}





  async function getWeather(x,y){
    const response = await fetch(`https://crossorigin.me/api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&units=imperial&appid=9fd71d0ecc15fa3563d8f5d7d9feb29c`);
    const responseData= await response.json();
    
 
    document.getElementById('currentCondition').textContent = responseData.weather[0].description ;
    document.getElementById('currentTemp').textContent = "Actual: " + responseData.main.temp + " °F";
    document.getElementById('feelsTemp').textContent = "Feels: "+responseData.main.feels_like + " °F" ;

    document.getElementById('city').textContent = responseData.name ;

    console.log(responseData.weather[0].description);
    console.log(responseData.main.temp);
    console.log(responseData.main.feels_like);
    


    }

  



  async function getPrice(){
    const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
    const responseData= await response.json();
    

    var currentPrice = responseData.bpi.USD.rate;
    
    document.getElementById("bitprice").textContent= "BTC: " + currentPrice;
    console.log(currentPrice)
    }




    function darkMode() {
      var element = document.body;
      element.classList.toggle("darkmode");
   }






getPrice();
setInterval(getPrice, 60000);










function startTime() {
    var today = new Date();
    
    var weekday =  ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var day = weekday[today.getDay() ];
    var month = months[today.getMonth() ];
    var dayofMonth = today.getDate();
    var year = today.getFullYear();
    var h = today.getHours();
    var nightTogglebool;

    nighttoggle.addEventListener('click', function(){
     nightTogglebool = true
    });

    if (h > 12){
      h= h-12;
      nightToggle= true;
    }
    else{
      nightToggle = false;
    }
    if(nightTogglebool==true && h >=8 && nightToggle == true){
      

    }
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("todaysDate").textContent = day + ", "+ month + " "+ dayofMonth + "  , "+ year;
    document.getElementById('time').textContent = h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
  }
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }




 
  if('geolocation' in navigator){
    console.log("geolocation available")
    navigator.geolocation.getCurrentPosition(position =>{
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);

      var lon = position.coords.latitude;
      var lat = position.coords.longitude;
      
      getWeather(position.coords.latitude,position.coords.longitude);
    });
 
    
  }
  else{
    console.log("geo not available")
  }

 
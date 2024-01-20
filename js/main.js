var z = new XMLHttpRequest();
z.open(
  "GET",
  "https://api.weatherapi.com/v1/search.json?key=aff765a12f074d15a44214155233112&q=lond"
);
z.send();

console.log(z.response);

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
//   const monthName = months[new Date().getMonth()];

//   console.log(monthName)
//   document.getElementById("month").innerHTML=monthName

async function search(a) {
  var xml = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=aff765a12f074d15a44214155233112&q=${a}&days=3`
  );
  if (xml.ok && 400 != xml.status) {
    var a = await xml.json();
    display(a.location, a.current), displayForecast(a.forecast.forecastday);
  }
}
document.getElementById("search").addEventListener("keyup", (a) => {
  search(a.target.value);
});
function display(a, xml) {
  if (null != xml) {
    var e = new Date(xml.last_updated.replace(" ", "T"));
    var cartona = `<div class="today forecast">   <div class="forecast-header"  id="today"> 
          <div class="day">${days[e.getDay()]}</div>  
            <div class=" date">${e.getDate() + months[e.getMonth()]}</div>
              </div> 
                <div class="forecast-content" id="current"> 
                 <div class="place">${a.name}</div>
                    <div class="degree">     
                       <div class="num">${xml.temp_c}<sup>o</sup>C</div>  
                        <div class="forecast-icon">
                                 <img src="https:${
                                   xml.condition.icon
                                 }" alt="" width=90>    
                      </div>  
                       </div>
                          <div class="all">${xml.condition.text}</div>
                         <span> <img src="imgs/icon-umberella@2x.png" width="22" alt=""> 20%</span>
                         <span><img src="imgs/icon-wind@2x.png" width="22" alt="">18km/h</span>
                         <span><img src="imgs/icon-compass@2x.png" width="22" alt="">East</span>
                             </div>
                             </div>`;
    document.getElementById("forecast").innerHTML = cartona;
  }
}
function displayForecast(a) {
  var cartona = "";
  for (var e = 1; e < a.length; e++)
    cartona += `<div class="forecast">      
 <div class="forecast-header">
             <div class="day">${
               days[new Date(a[e].date.replace(" ", "T")).getDay()]
             }</div>  
                  </div>    
                    <div class="forecast-content">  
                       <div class="forecast-icon">     
                              <img src="https:${
                                a[e].day.condition.icon
                              }" alt="" width=48>
                                       </div>
                                                  <div class="degree">${
                                                    a[e].day.maxtemp_c
                                                  }<sup>o</sup>C</div> 
                                                <small>${
                                                  a[e].day.mintemp_c
                                                }<sup>o</sup></small>    
                                                <div class="custom">${
                                                    a[e].day.condition.text
                                                  }</div>    
                                                      </div>
                                                            </div>`;
  document.getElementById("forecast").innerHTML += cartona;
}
search("cairo");

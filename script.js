const searchBtn = document.querySelector("#search");
const searchInput = document.querySelector("input");
const imgIcon = document.querySelector(".emoji");
const temperaturElem = document.querySelector(".temperature")
const conditionElem = document.querySelector(".condition");
const humidityElem = document.querySelector(".humidity");
const cloudElem = document.querySelector(".cloud");
const uvElem = document.querySelector(".uv");
const locationElem = document.querySelector(".location-name");

searchBtn.addEventListener("click",async function(){
    const location = searchInput.value;
    if(location != null){
        const data = await fetchWeather(location);
    
    if(data != null){
        updateDom(data);
    }
        searchInput.value="";
}
})


function updateDom(data){
    const iconLink = data.current.condition.icon;
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;
    const humidity = data.current.humidity;
    const cloud = data.current.cloud;
    const uv = data.current.uv;
    const location = data.location.name;


    temperaturElem.textContent = temp + "°C"
    imgIcon.src=`https:${iconLink}`;
    locationElem.textContent = location;
    conditionElem.textContent = condition;
    humidityElem.textContent = "Humidity: "+humidity+"%"
    cloudElem.textContent = "Cloud: "+cloud+"%"
    uvElem.textContent = "UV Rays: "+uv+"%"


}



async function fetchWeather(location){
    const url = `https://api.weatherapi.com/v1/current.json?key=72f93df440484bf29ee82327241507&q=${location}&aqi=no`
    const response = await fetch(url);
    console.log(response);
    if(response.status==400){
        alert("Input is Invalid");
        return null;
    }
    else if(response.status==200){
        const json = await response.json()
        console.log(json);
        return json;
    }
}



// {
//     "location": {
//         "name": "Agra",
//         "region": "Uttar Pradesh",
//         "country": "India",
//         "lat": 27.18,
//         "lon": 78.02,
//         "tz_id": "Asia/Kolkata",
//         "localtime_epoch": 1721116362,
//         "localtime": "2024-07-16 13:22"
//     },
//     "current": {
//         "last_updated_epoch": 1721115900,
//         "last_updated": "2024-07-16 13:15",
//         "temp_c": 38.9,
//         "temp_f": 102,
//         "is_day": 1,
//         "condition": {
//             "text": "Sunny",
//             "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
//             "code": 1000
//         },
//         "wind_mph": 8.3,
//         "wind_kph": 13.3,
//         "wind_degree": 102,
//         "wind_dir": "ESE",
//         "pressure_mb": 998,
//         "pressure_in": 29.46,
//         "precip_mm": 0,
//         "precip_in": 0,
//         "humidity": 36,
//         "cloud": 24,
//         "feelslike_c": 44.5,
//         "feelslike_f": 112.2,
//         "windchill_c": 38.9,
//         "windchill_f": 102,
//         "heatindex_c": 44.5,
//         "heatindex_f": 112.2,
//         "dewpoint_c": 21.3,
//         "dewpoint_f": 70.3,
//         "vis_km": 10,
//         "vis_miles": 6,
//         "uv": 9,
//         "gust_mph": 9.5,
//         "gust_kph": 15.3
//     }
// }
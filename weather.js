const COORDS="coords";
const API_KEY="f0ca4cae769efdb95398b56f90b5ff12";
const weather=document.querySelector(".js-weather");

function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature=json.main.temp;
        const place=json.name;
        weather.innerText=`${temperature} @ ${place}`;
    });//then은 요청한 자료가 올바르게 전달완료 될 때까지 기다려줌 


}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj={
        latitude,
        longitude
    };
    //latitude:latitude같이 변수와 key값이 같으면 하나로 적고 콤마로 구분 가능
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
    const loadedCoords=localStorage.getItem(COORDS);
    if(loadedCoords===null){
        askForCoords();
    }else{
        const parsedCoords=JSON.parse(loadedCoords);//string을 javascriptObjectNotation으로 바꿈
        getWeather(parsedCoords.latitude,parsedCoords.longitude);//object이므로 key값을 이용해 value가져옴

    }
}

function init(){
    loadCoords();
}

init();
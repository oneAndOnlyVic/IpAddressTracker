let ipAddress_txtBox = document.querySelector('.ipAddress');
let location_txtBox = document.querySelector('.location');
let timezone_txtBox = document.querySelector('.timezone');
let isp_txtBox = document.querySelector('.isp');

let submit_btn = document.querySelector('.submit');
let search_bar = document.querySelector('#search-bar')

let ipData; //create variable that will be used to hold geo data returned from ipgeo server


let firstLoad = false;

const Http = new XMLHttpRequest();


let map ; //creating map object
const myIcon = L.icon({iconUrl: 'icon-location.svg',iconAnchor: [22, 60],popupAnchor: [1, -65],}) //creating custom icon object




let url = "https://geo.ipify.org/api/v2/country,city?apiKey=at_1AO4yi3u4Zo0WoKcXjLtRsPFLfMtr";


    Http.open("GET", url);
    Http.send();
    
    Http.onreadystatechange = (e) => {
      //  console.log(Http.response);
    
        ipData = JSON.parse(Http.responseText);
        refreshDisplayTexts();  //change content of the ip address location timezone and isp
        
       
        

        map = L.map('map').setView([ipData.location.lat, ipData.location.lng], 13)
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWZlYW55aXh5eiIsImEiOiJjbDJvcGlyeDEwMmJ3M25vMmxoOXN2MnI2In0.d27Szw3vuPUsPt-gUVB1uQ', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiaWZlYW55aXh5eiIsImEiOiJjbDJvcGlyeDEwMmJ3M25vMmxoOXN2MnI2In0.d27Szw3vuPUsPt-gUVB1uQ'
        }).addTo(map);

        L.marker([ipData.location.lat, ipData.location.lng], {icon: myIcon}).addTo(map).bindPopup("a marker");


        
        
        
    }


function refreshDisplayTexts() {
    ipAddress_txtBox.textContent = ipData.ip;
    location_txtBox.textContent = ipData.location.country + ',' + ipData.location.region;
    timezone_txtBox.textContent = ipData.location.timezone;
    isp_txtBox.textContent = ipData.isp;
    console.log(ipData);
}

function getIp(){

    //function that is called during the buttons Onclick event
    console.log('yeah')
    if(search_bar.value){
        //check first if user inputed any value
        let url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_1AO4yi3u4Zo0WoKcXjLtRsPFLfMtr&ipAddress=${search_bar.value}`
        console.log(url)


        Http.open("GET", url);
        Http.send();
        
        Http.onreadystatechange = (e) => {
          // only run this code if the server has returned something
        
            ipData = JSON.parse(Http.responseText);
            

            if(ipData.code) //check if an Error code was returned by the server, if true print the message associated with it using an alert
            {
                alert(ipData.messages)
            }
            else{
                refreshDisplayTexts()
                map.setView([ipData.location.lat, ipData.location.lng], 13)
                L.marker([ipData.location.lat, ipData.location.lng], {icon: myIcon}).addTo(map).bindPopup("a marker").openPopup();
            }
           
        }
    }
    else{
        alert('please input a value')

    }

}

    






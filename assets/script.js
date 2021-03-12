// Variables



// set click event for dropdown menu
var dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function(event) {
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});

$("path, circle").hover(function(e) {
  $('#info-box').css('display','block');
  $('#info-box').html($(this).data('info'));
});

$("path, circle").mouseleave(function(e) {
  $('#info-box').css('display','none');
});

$(document).mousemove(function(e) {
  $('#info-box').css('top',e.pageY-$('#info-box').height()-680);
  $('#info-box').css('left',e.pageX-($('#info-box').width())/2 );
}).mouseover();


//Yelp Api
let YelpApiKey = 'EeR6NirnQfOfnuwRkrjEiVbIU0Ik9uAvE8u0Y61gWxPC9aCE88gzTeMoUmbN8kuVi7V2bKqr4ytbD2ZlZcafYawBJ0ZKTkQTQggA1O0Y-Y3RCLNKh0W1rgba5J1DYHYx'
let apiID = '8LQ2i3BiP9enfShN1zI6IA'

let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + YelpApiKey);

fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=restaurant&limit=10&location=New York", {
  headers: myHeaders 
}).then((res) => {
  return res.json();
}).then((json) => {
  console.log(json);
});


let subbtn = document.querySelector('#submit-btn');
let selectEl = document.querySelector('#selectPark')
let cardEl = document.querySelector('#parkList');
let target; 
subbtn.addEventListener('click', function(event) {
    event.preventDefault;
    console.log(selectEl.value);
    state= selectEl.value;
    getParks(state);
})

function stateParks(element) {
    return document.createElement(element);
}

function append(parent, selectEl) {
  return parent.appendChild(selectEl);
}

// let apiKey = 'evgZSRmp1QB2J4yPr1xzabZ2pjAaMHZHVRCWa1GX';
// const url = ('https://developer.nps.gov/api/v1/parks?' + 'stateCode=' + state + '&api_key=' + apiKey)

// const ul = document.getElementById('parks');

//fetch API
let apiKey = 'evgZSRmp1QB2J4yPr1xzabZ2pjAaMHZHVRCWa1GX';
//let state = '';

function getParks(state) {
    fetch('https://developer.nps.gov/api/v1/parks?' + 'stateCode=' + state + '&api_key=' + apiKey) 
    .then(response=>{
        return response.json();
    })
    .then(data=> {
        console.log(data.data);
        const html= data.data
        for (i = 0; i < html.length; i++) {
            let parkName = html[i].name;
            let description = html[i].description;
            let weather = html[i].weatherInfo;
            let admission = html[i].entranceFees[0].cost;
            // let hours = JSON.stringify(html[i].operatingHours[0].standardHours);
            let latitude = html[i].latitude;
            let longitude = html[i].longitude;

            let parkCard = document.createElement("div");
            parkCard.classList.add("tile");
            

            let cardTitle = document.createElement("h4");
            cardTitle.innerHTML = parkName;
            console.log(cardTitle);

            let descr = document.createElement("div");
            descr.innerHTML = description;
            let weatherNow = document.createElement("div");
            weatherNow.innerHTML = weather;
            let fees = document.createElement("div");
            fees.innerHTML = admission;
            // let opHours = document.createElement("div");
            // opHours.innerHTML = hours;
            let lat = document.createElement("div");
            lat.innerHTML = latitude;
            let lon = document.createElement("div");
            lon.innerHTML = longitude;

            parkCard.appendChild(cardTitle);
            parkCard.appendChild(descr);
            parkCard.appendChild(weatherNow);
            parkCard.appendChild(fees);
            // parkCard.appendChild(opHours);

            cardEl.appendChild(parkCard);
        }

        
    

        // .map(user => {
        //     return `
        //     <div class="park">
        //     <p>Park: ${fullname}</p>
        //     <p>Description:${description}</p>
        //     <p>Weather:${weatherInfo}</p>
        //     <p>Admission Cost:${fees}</p>
        //     <p>Hours:${standardHours}</p>
        //     </div>
        //     `;
        // })
    })
}


cardEl.addEventListener("click", function(event) {
    let parkChosen = event.target.innerHTML;
    let parkCode = parkChosen.substring(0,4);
    console.log(parkCode);
    parkInfo(parkCode);
})

function parkInfo(parkCode) {
    let apiTwo = ('https://developer.nps.gov/api/v1/parks?' + 'parkCode=' + parkCode + '&parkCode=&api_key=' + apiKey);
    console.log(apiTwo);
    fetch(apiTwo)
    .then(response=>{
        return response.json();
    })
    .then(data=> {
        console.log(data);
        var parkData = {
            parkCode: parkCode,
            lat: data.data[0].latitude,
            lon: data.data[0].longitude,
        }
        
        localStorage.setItem('selectedPark', JSON.stringify(parkData));
    })
    
}
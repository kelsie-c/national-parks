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
  $('#info-box').css('top',e.pageY-$('#info-box').height()-730);
  $('#info-box').css('left',e.pageX-($('#info-box').width())/2 + 20);
}).mouseover();

let mapArea = document.querySelector('.map-select');
mapArea.addEventListener("click", function(event) {
  let stateCode = event.target.id;
  console.log(stateCode);
  getParks(stateCode);
})

let dropState = document.querySelector(".dropdown-content")
let cardEl = document.querySelector('.park-cards');
let target; 
dropState.addEventListener('click', function(event) {
  let choiceState = event.target.innerHTML;
    console.log(choiceState);
    let stateCode = choiceState.substring(0,2);
    console.log(stateCode);
    getParks(stateCode);
})

let apiKey = 'evgZSRmp1QB2J4yPr1xzabZ2pjAaMHZHVRCWa1GX';
let parkCode2;

function getParks(stateCode) {
    fetch('https://developer.nps.gov/api/v1/parks?' + 'stateCode=' + stateCode + '&api_key=' + apiKey) 
    .then(response=>{
        return response.json();
    })
    .then(data=> {
        console.log(data.data);
        var div = document.querySelector('.park-cards');
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
        const html= data.data
        
        for (i = 0; i < html.length; i++) {
            let parkName = html[i].name;
            parkCode2 = html[i].parkCode;
            let description = html[i].description;
            // let weather = html[i].weatherInfo;
            let admission = html[i].entranceFees[0].cost;
            let latitude = html[i].latitude;
            let longitude = html[i].longitude;
            let imageURL = html[i].images[0].url;

            let parkCard = document.createElement("div");
            parkCard.classList.add("tile"); 
            parkCard.classList.add("is-vertical");
            parkCard.setAttribute('id', parkCode2);

            let columnContain = document.createElement("div");
            columnContain.classList.add("columns");
            columnContain.classList.add("is-desktop");
            columnContain.setAttribute('id', parkCode2);

            let column1 = document.createElement("div");
            column1.classList.add("column");
            column1.classList.add("is-one-quarter");
            column1.setAttribute('id', parkCode2);

            let column2 = document.createElement("div");
            column2.classList.add("column");
            column2.setAttribute('id', parkCode2);

            let cardTitle = document.createElement("h4");
            cardTitle.setAttribute('id', parkCode2);
            cardTitle.innerHTML = parkName;
            console.log(cardTitle);

            let cardImage = document.createElement("img");
            cardImage.setAttribute('id', parkCode2);
            cardImage.src = imageURL;

            let descr = document.createElement("div");
            descr.setAttribute('id', parkCode2);
            descr.innerHTML = description;
            let lineBreak = document.createElement('br');

            let fees = document.createElement("div");
            fees.setAttribute('id', parkCode2);
            fees.innerHTML = "Adult Day Pass Cost: $" + admission;

            let lat = document.createElement("div");
            lat.innerHTML = latitude;
            let lon = document.createElement("div");
            lon.innerHTML = longitude;

            parkCard.appendChild(cardTitle);
            column1.appendChild(cardImage);
            column2.appendChild(descr);
            column2.appendChild(lineBreak);
            column2.appendChild(fees);
            columnContain.appendChild(column1);
            columnContain.appendChild(column2);
            parkCard.appendChild(columnContain);

            cardEl.appendChild(parkCard);
        }
    })
}

cardEl.addEventListener("click", function(event) {
    console.log(parkCode2);
    let parkCode = event.target.id;
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
        window.location.replace("./parks.html");
    })
}
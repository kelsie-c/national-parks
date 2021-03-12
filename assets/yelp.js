//Yelp Api
let YelpApiKey = 'EeR6NirnQfOfnuwRkrjEiVbIU0Ik9uAvE8u0Y61gWxPC9aCE88gzTeMoUmbN8kuVi7V2bKqr4ytbD2ZlZcafYawBJ0ZKTkQTQggA1O0Y-Y3RCLNKh0W1rgba5J1DYHYx'
let apiID = '8LQ2i3BiP9enfShN1zI6IA'



let park = JSON.parse(localStorage.getItem('selectedPark'));
let lat = park.lat;
let lon = park.lon;
console.log(park);
let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + YelpApiKey);
fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=restaurant&limit=10&latitude=' + lat + '&longitude=' + lon +'&radius=40000',{
  headers: myHeaders
}) .then((res) => {
  return res.json();
}).then((data) => { 
  let rest = data.businesses;
  console.log(rest);
  for (let i = 0; i < rest.length; i++) {
    let restName = rest[i].name;
    let restPrice=rest[i].price;
    let restLocation= rest[i].location.address1 + ' ' +rest[i].location.city +' ' + rest[i].location.state +' ' + rest[i].location.zip_code;
    let restRating=rest[i].rating;
    let restCuisine = rest[i].categories[0].alias;

  let yelpDiv = document.createElement('div');
  yelpDiv.classList.add('tile');
  let yelpTitle = document.createElement('h4');
  yelpTitle.innerHTML = restName;
  let yelpPrice = document.createElement('div');
  yelpPrice.innerHTML = restPrice;
  let yelpLocation = document.createElement('div');
  yelpLocation.innerHTML = restLocation;
  let yelpCuisine = document.createElement('div');
  yelpCuisine.innerHTML = restCuisine;

  let yelpRating = document.createElement('div');
  yelpRating.innerHTML = restRating;

  yelpDiv.appendChild(yelpTitle);
  yelpDiv.appendChild(yelpPrice);
  yelpDiv.appendChild(yelpLocation);
  yelpDiv.appendChild(yelpRating); 
  yelpDiv.appendChild(yelpCuisine);

  let yelpEl = document.querySelector('.nearby-food');

  yelpEl.append(yelpDiv);

  

  console.log(data);
};
// 'latitude=' + lat + '&longitude=' + lon +'&radius=40000'
            
           
                // let restname = document.createElement('h2') 
                // console.log(day)
                // let month = (new Date().getMonth() + 1)
                // let year = new Date().getFullYear()
                // let date = document.createElement('p')
                // let temp = document.createElement('p')
                // temp.textContent = 'Temperature: ' +
                // date.textContent = month + '/' + day + '/' + year
                // forecastDiv.appendChild(date)
                // forecastDiv.appendChild(hello)
                // sevenDayDiv.appendChild(Div)
            }) 

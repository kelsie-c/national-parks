//Yelp Api
let YelpApiKey = 'EeR6NirnQfOfnuwRkrjEiVbIU0Ik9uAvE8u0Y61gWxPC9aCE88gzTeMoUmbN8kuVi7V2bKqr4ytbD2ZlZcafYawBJ0ZKTkQTQggA1O0Y-Y3RCLNKh0W1rgba5J1DYHYx'
let apiID = '8LQ2i3BiP9enfShN1zI6IA'

// get lat & lon from local storage and call yelp api
let park = JSON.parse(localStorage.getItem('selectedPark'));
let lat = park.lat;
let lon = park.lon;
console.log(park);
let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + YelpApiKey);
fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=restaurant&limit=50&latitude=' + lat + '&longitude=' + lon +'&radius=40000',{
  headers: myHeaders

}) .then((res) => {
  return res.json();
}).then((data) => { 
  let rest 
  // assign data to variables and append to page
  rest = data.businesses.sort(function(a, b) {
    return b.rating - a.rating
  })
 
  rest = rest.slice(0 , 10)
  console.log(rest)

  for (let i = 0; i < rest.length; i++) {
    let restName = rest[i].name;
    let restPrice=rest[i].price;
    if (restPrice === undefined) {
      restPrice = " ";
    }
    let restLocation= rest[i].location.address1 + ' ' +rest[i].location.city +' ' + rest[i].location.state +' ' + rest[i].location.zip_code;
    let restRating=rest[i].rating;
    let restCuisine = rest[i].categories[0].alias;

  let yelpDiv = document.createElement('div');
  yelpDiv.classList.add('tile');
  yelpDiv.classList.add('is-vertical');
  
  let yelpContain = document.createElement('div');
  yelpContain.classList.add('columns');
  yelpContain.classList.add("is-desktop");
  let yelpColumn1 = document.createElement('div');
  yelpColumn1.classList.add('column');
  let yelpColumn2 = document.createElement('div');
  yelpColumn2.classList.add('column');
  let yelpColumn3 = document.createElement('div');
  yelpColumn3.classList.add('column');
  let yelpColumn4 = document.createElement('div');
  yelpColumn4.classList.add('column');
  let yelpColumn5 = document.createElement('div');
  yelpColumn5.classList.add('column');
  

  let yelpTitle = document.createElement('a');
  yelpTitle.href = 'https://www.google.com/search?q=' + restName + '-' + rest[i].location.city;
  yelpTitle.target = "_blank";
  yelpTitle.innerHTML = restName;
  let yelpPrice = document.createElement('div');
  yelpPrice.innerHTML = restPrice;
  let yelpLocation = document.createElement('div');
  yelpLocation.innerHTML = restLocation;
  let yelpCuisine = document.createElement('div');
  yelpCuisine.classList.add("cuisine");
  yelpCuisine.innerHTML = "Cuisine: " + restCuisine;



  let yelpReview = document.createElement('a');
  yelpReview.href = rest[i].url;
  yelpReview.target = "_blank";
  yelpReview.innerHTML = 'Read Reviews'
  yelpColumn1.appendChild(yelpTitle);
  yelpColumn1.appendChild(yelpPrice);

  let yelpRating = document.createElement('div');
  yelpRating.innerHTML = "Rating: " + restRating;


  yelpColumn1.appendChild(yelpTitle);
  yelpColumn1.appendChild(yelpPrice);
  yelpColumn2.appendChild(yelpLocation);
  yelpColumn3.appendChild(yelpRating); 
  yelpColumn4.appendChild(yelpCuisine);
  yelpColumn5.appendChild(yelpReview)
  yelpContain.appendChild(yelpColumn1);
  yelpContain.appendChild(yelpColumn2);
  yelpContain.appendChild(yelpColumn3);
  yelpContain.appendChild(yelpColumn4);
  yelpContain.appendChild(yelpColumn5)

  yelpDiv.appendChild(yelpContain);

  let yelpEl = document.querySelector('.nearby-food');

  yelpEl.append(yelpDiv);

  console.log(data);
};
}) 

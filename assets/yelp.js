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
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

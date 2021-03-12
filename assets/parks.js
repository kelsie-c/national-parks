let parksCardEl = document.querySelector('.park-data');
let parkObj = JSON.parse(localStorage.getItem('selectedPark'));
let parkCode = parkObj.parkCode;
console.log(parkCode);
parkInfo(parkCode);

function parkInfo(parkCode) {
    let apiTwo = ('https://developer.nps.gov/api/v1/parks?' + 'parkCode=' + parkCode + '&parkCode=&api_key=' + 'evgZSRmp1QB2J4yPr1xzabZ2pjAaMHZHVRCWa1GX');
    fetch(apiTwo)
    .then(response=>{
        return response.json();
    })
    .then(data=> {
        console.log(data.data);
        let parksName = data.data[0].name;
        let parksImgURL = data.data[0].images[0].url;
        let parksDescr = data.data[0].description;
        let parksWeather = data.data[0].weatherInfo;
        let parksAdmission = data.data[0].entranceFees.cost;
        if (parksAdmission == undefined) {
            parksAdmission = "Unknown. Please visit national park website for further information.";
        }
        let parksOpHoursDescr = data.data[0].operatingHours[0].description;
        let parksOpSun = data.data[0].operatingHours[0].standardHours.sunday;
        let parksOpMon = data.data[0].operatingHours[0].standardHours.monday;
        let parksOpTue = data.data[0].operatingHours[0].standardHours.tuesday;
        let parksOpWed = data.data[0].operatingHours[0].standardHours.wednesday;
        let parksOpThu = data.data[0].operatingHours[0].standardHours.thursday;
        let parksOpFri = data.data[0].operatingHours[0].standardHours.friday;
        let parksOpSat = data.data[0].operatingHours[0].standardHours.saturday;
            
        let parksCard = document.createElement("div");
        parksCard.classList.add("tile");
        parksCard.classList.add("is-vertical");

        let cardTitle = document.createElement("h4");
        cardTitle.innerHTML = parksName;

        let parkContain = document.createElement("div");
        parkContain.classList.add("columns");
        parkContain.classList.add("is-desktop");
        parkContain.classList.add("is-full-mobile");
        let parkColumn1 = document.createElement("div");
        parkColumn1.classList.add("column");
        parkColumn1.classList.add("is-one-quarter");
        let parkColumn2 = document.createElement("div");
        parkColumn2.classList.add("column");

        let parksImg = document.createElement("img");
        parksImg.src = parksImgURL;
        let descr = document.createElement("div");
        descr.innerHTML = "Park Description: " + parksDescr;

        let lineBreak1 = document.createElement("br");

        let weatherNow = document.createElement("div");
        weatherNow.innerHTML = "Weather: " + parksWeather;

        let lineBreak2 = document.createElement("br");

        let fees = document.createElement("div");
        fees.innerHTML = "Adult Day Pass Cost: " + parksAdmission;
        let opHoursDescr = document.createElement("div");
        opHoursDescr.innerHTML = "Operating Hours: " + parksOpHoursDescr;
        let opHoursSun = document.createElement("div");
        opHoursSun.innerHTML = "Sunday: " + parksOpSun;
        let opHoursMon = document.createElement("div");
        opHoursMon.innerHTML = "Monday: " + parksOpMon;
        let opHoursTue = document.createElement("div");
        opHoursTue.innerHTML = "Tuesday: " + parksOpTue;
        let opHoursWed = document.createElement("div");
        opHoursWed.innerHTML = "Wednesday: " + parksOpWed;
        let opHoursThu = document.createElement("div");
        opHoursThu.innerHTML = "Thursday: " + parksOpThu;
        let opHoursFri = document.createElement("div");
        opHoursFri.innerHTML = "Friday: " + parksOpFri;
        let opHoursSat = document.createElement("div");
        opHoursSat.innerHTML = "Saturday: " + parksOpSat;

        parksCard.appendChild(cardTitle);
        parkColumn1.appendChild(parksImg);
        parkColumn2.appendChild(descr);
        parkColumn2.appendChild(lineBreak1);
        parkColumn2.appendChild(weatherNow);
        parkColumn2.appendChild(lineBreak2);
        parkColumn2.appendChild(fees);
        parkColumn1.appendChild(opHoursSun);
        parkColumn1.appendChild(opHoursMon);
        parkColumn1.appendChild(opHoursTue);
        parkColumn1.appendChild(opHoursWed);
        parkColumn1.appendChild(opHoursThu);
        parkColumn1.appendChild(opHoursFri);
        parkColumn1.appendChild(opHoursSat);

        parkContain.appendChild(parkColumn1);
        parkContain.appendChild(parkColumn2);

        parksCard.appendChild(parkContain);

        parksCardEl.appendChild(parksCard);
    })
}
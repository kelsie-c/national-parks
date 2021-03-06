const nps = new XMLHttpRequest();
const url = "https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=evgZSRmp1QB2J4yPr1xzabZ2pjAaMHZHVRCWa1GX";
const output = document.querySelector("#output");
nps.onreadystatechange = function () {
    console.log(nps.readyState);
    if (nps.readyState == 4 && nps.status == 200) {
        console.log(nps.responseText);
        let str = nps.responseText;
        let obj = JSON.parse(str);
        output.innerHTML = obj.value;
        console.log(obj);
    }
};
nps.open("GET", url);
nps.send();
console.log(nps);
}

const nps = new XMLHttpRequest();
  const url = "https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=evgZSRmp1QB2J4yPr1xzabZ2pjAaMHZHVRCWa1GX";
  const output = document.querySelector("#output");
  const data= {username: "example"}
  
  function getParks(){
    fetch(url, {
        method:"GET",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })  
        .then()
        .then()
        .catch((error)=> {
          console.error("error", error)
        })  
    }

    function getLongLat(){
        fetch(url, {
            method:"GET",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })  
            .then()
            .then()
            .catch((error)=> {
              console.error("error", error)
            })  
        }

   

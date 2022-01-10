console.log('hello');
//var covid_data = require('./Delhi');
async function details(){

    console.log('here');
    $.getJSON("https://coronabeds.jantasamvad.org/covid-info.js?callback=?", function(data) {
        gnctd_covid_data = data;
        console.log(data[0]);
      });
    try{
        let res = await fetch('https://api.steinhq.com/v1/storages/5e732accb88d3d04ae0815ae/StateWiseHealthCapacity');
        //console.log(res);
        let data = await res.json();
        //let arr = data.split(',');
        //console.log('hello', data[36].TotalBedsCount);
        document.getElementById("total").innerText = data[33].TotalBedsCount;
        document.getElementById("RuralBeds").innerText = data[33].RuralBeds;
        document.getElementById("UrbanBeds").innerText = data[33].UrbanBeds;
        document.getElementById("TotalHospitalsCount").innerText = data[33].TotalHospitalsCount;
        document.getElementById("RuralHospitalsCount").innerText = data[33].RuralHospitalsCount;
        document.getElementById("UrbanHospitals").innerText = data[33].UrbanHospitals;
    }catch(err){
        console.log(err);
    }

}


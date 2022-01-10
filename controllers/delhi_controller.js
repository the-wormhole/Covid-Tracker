//const e = require('express');
const puppeteer = require('puppeteer');
const url = "https://coronabeds.jantasamvad.org/beds.html";

module.exports.delhiScraper = async function(req,res){

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url);

    try{
        var hospitalsA = await page.$$eval('.table-success', allAs => allAs.map(a => a.innerText));
        hospitalsA.shift();
        var hospitalsB = await page.$$eval('.table-warning', allAs => allAs.map(a => a.innerText));
        hospitalsB.shift();
        var hospitalsC = await page.$$eval('.table-danger', allAs => allAs.map(a => a.innerText)); 
        hospitalsC.shift();
        var finList = hospitalsA.concat(hospitalsB,hospitalsC);
        console.log(finList,finList.length);

        const scrapedData = [];
        finList.forEach(hospital => {
            var temp = hospital.split("\t");
            var ind;
            for(let i=0;i<temp[4].length;i++){
                if(temp[4][i] == "n"){
                    ind = i;
                    break;
                }
            }
            let vacant = temp[4].slice(0,ind-5);
            //console.log(vacant,ind);
            var Hospdet = {
                'Hospital/Covid Centre':temp[0],
                'Last Updated':temp[1],
                'Total Beds':temp[2],
                'Occupied':temp[3],
                'Vacant':vacant,
                'Oxygen Left for':temp[5]
            }
            scrapedData.push(Hospdet);
            //console.log(Hospdet);
        });
        
        console.log(scrapedData);
        await browser.close();
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return;
    }

}

//delhiScraper();
const Org = require('../models/org');
const puppeteer = require('puppeteer'); 
async function govScraper(){

    let url = "https://coronabeds.jantasamvad.org/";
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url);

    try{

        var beds = {
            Total:await page.$eval('#beds_total', p=>p.innerText),
            Occupied:await page.$eval('#beds_occupied', p=>p.innerText),
            Vacant:await page.$eval('#beds_vacant', p=>p.innerText),
        };

        var OxygenBeds = {
            Total:await page.$eval('#oxygen_beds_total', p=>p.innerText),
            Occupied:await page.$eval('#oxygen_beds_occupied', p=>p.innerText),
            Vacant:await page.$eval('#oxygen_beds_vacant', p=>p.innerText)
        };

        var ICUBeds = {
            Total:await page.$eval('#covid_icu_beds_total', p=>p.innerText),
            Occupied:await page.$eval('#covid_icu_beds_occupied', p=>p.innerText),
            Vacant:await page.$eval('#covid_icu_beds_vacant', p=>p.innerText)   
        };

        var icuBWV = {
            Total:await page.$eval('#ventilators_total', p=>p.innerText),
            Occupied:await page.$eval('#ventilators_occupied', p=>p.innerText),
            Vacant:await page.$eval('#ventilators_vacant', p=>p.innerText)
        };

        var completeList = {
            Beds:beds,
            Oxygen:OxygenBeds,
            ICU:ICUBeds,
            Ventilator:icuBWV
        };
        //console.log(completeList);
        await browser.close();
        return completeList;
    }catch(err){

        console.log(err,"Error in scraping Delgi Govt. Home!");
        return;
    }

}
module.exports.home = async function(req,res){
    
    let allOrgs = await Org.find();
    let covidList = await govScraper();
    return res.render('home'
        ,{
        //     success:null,
        //     err:null
            orgs:allOrgs,
            BedList:covidList
        }
    );
}



module.exports.wip = function(req,res){
    
    return res.render('wip');
}

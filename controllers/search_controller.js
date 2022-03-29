//const puppeteer = require('puppeteer');
const fetch = require("node-fetch");
//const url = 'https://www.google.com/search?q=hello'

module.exports.search = async function(req,res){

    // const browser = await puppeteer.launch({headless: false});
    // const page = await browser.newPage();
    // await page.goto(url);
    const api_key = `bff9f435a40e5f05c3e148b32a3b07dc`;
    const q = req.query.search;
    const url = `http://api.serpstack.com/search?access_key=${api_key}&query=${q}&num=1000&images_page=0`;

    let json;
    try{
        let response = await fetch(url);
        json = await response.json();
        console.log(json.organic_results);

        return res.render('search',{
            s:q,
            results:json.organic_results
        });
    }catch(err){
        console.log(err,'Error in google scrapping!!');
        return;
    }
}

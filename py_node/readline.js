/*var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('USA100.csv'),
    //output: process.stdout,
    console: false
});

rd.on('line', function(line) {
    console.log(line);
});
*/

//copy-paste the websites here inside const pups
// use terminal or cmd to convert the output into a json file.
// mac terminal command - $ node load_cookies.js > filename.json
// first try runnig this code for test and then import top 50 websites of a country for data retrieval.
// sometimes the code dosen't finish executing due to some error while connecting to a website, give it some time like (10-15 mins), keep montoring your connection speed in task-manager aslo..
// check the location where you are making the json file to check if the file has already been created or not.


var fs = require('fs');
fs.readFile('sample.csv', function(err, data) {
    if(err) throw err;
    var pups = data.toString().split("\n");

    var i;
  
    const puppeteer = require('puppeteer');
    const jsonexport = require('jsonexport');
    //const fs = require('fs');
    require('events').EventEmitter.defaultMaxListeners = 50;
  
  
  
  
    for(i=0; i<pups.length ;i++){
  
      (async () => {
        try {
  
          const urls = [pups[i]+""];
          console.log(pups[i]);
  
  
          const browser = await puppeteer.launch();
  
          console.log("1");
  
  
  
          const reports = urls.map(async (url, k) => {
            const page = await browser.newPage();
            console.log("new page");
  
  
            await page.goto(url, {
              waitUntil: 'networkidle2',
              timeout: 0,
            });
  
            // ********************** line 46 shows urls with cookies while retrieving data, only for testing purpose.
  
            console.log(url);
            var content = await page._client.send('Network.getAllCookies');
            console.log("2");
            //console.log(JSON.stringify(content, null, 4));
  
            //fs.writeFile('hmm.json', content);
            //console.log(content);
  
  
  
  
            //jsonexport(content, function(err,csv){
              //if (err) return console.error(err);
              //console.log(csv);
  
          //  });
  
  
  
  
            //console.log(await page._client.send('Network.getAllCookies'));
  
            //console.log(url);
            //console.log(fs.writeFileSync('humma.json', content));
            await page.close();
            console.log("3");
          });
  
  
          Promise.all(reports).then(() => {
            browser.close();
            console.log("4");
            });
  
        } catch (error) {
          console.log(error);
        }
  
      })();
  
  
  
    }
  
    //for(i in pups) {
      //  console.log(pups[i]);
    }
);


//const pups = [
  //  "http://www.qq.com",
    //"http://www.amazonaws.com"
    //];
  
  
    
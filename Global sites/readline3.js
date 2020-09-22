// use the CLI flag `--unhandled-rejections=strict`
// ... 
// '\x1b[0m' for normal color

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
fs.readFile('urls/temp.csv', function(err, data) {
    if(err) throw err;
    var pups = data.toString().split("\n");
    //console.log('total number of urls in file: ',pups.length)

    var i;
    //var count = 0;
    //var page_count = 0
  
    const puppeteer = require('puppeteer');
    //const jsonexport = require('jsonexport');
    //const fs = require('fs');
    require('events').EventEmitter.defaultMaxListeners = pups.length;
  
  
  
  
    for(i=0; i<pups.length ;i++){
  
      (async () => {
        try {
  
          const urls = [pups[i]+""];
          //console.log(pups[i]);
  
  
          const browser = await puppeteer.launch();
  
          //console.log("puppeteer launched");
  
  
  
            const reports = urls.map(async (url, k) => {
            const page = await browser.newPage();
            //page_count += 1
            //console.log("new page",url);
  
            try
            {await page.goto(url, {
              waitUntil: 'networkidle2',
              timeout: 0
            });
            }
            catch (error) {
              console.log("*****************************EARLY error while loading url",url);
              browser.close();
            }
            
  
            // ********************** line 46 shows urls with cookies while retrieving data, only for testing purpose.
  
            //console.log('on this url..',url);
            var content = await page._client.send('Network.getAllCookies');
            //console.log("got cookies for", url);
            

            console.log(JSON.stringify(content, null, 4));
  
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
            //count += 1;
            //console.log("page closed", url);
          });
  
  
          Promise.all(reports).then(() => {
            browser.close();
            //console.log("all promises made check.\n");
            });
  
        } catch (error) {
          console.log("******************************LATE ERROR while laoding some page");
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
  
  
    
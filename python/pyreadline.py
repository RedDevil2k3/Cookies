import json
import sys
import asyncio
import os
import sys
from pyppeteer import launch

in_file = open("urls/temp2.csv", 'r')

out_cookies = open("py_cookies.json", "a+")
out_success = open("py_success.csv", "a+")
out_failure = open("py_failure.csv", "a+")


async def main():
    browser = await launch(headless=False)
    page = await browser.newPage()

    for line in in_file:
        values = line.split()
        print(values)
        for url in values:
            try:
                await page.goto(url,waitUntil='networkidle2',timeout=0)
                #content = await page._client.send('Network.getAllCookies')

                #Success

                try:
                    result_success = str(url+"\n")
                    out_success.write(result_success)
                    print("url appened to success file.")

                    #Cookies

                    try:
                        content = await page._client.send('Network.getAllCookies')
                        print('on this url.. ', url)
                        print("got cookies for.. ", url)
                        
                    except:

                        print("******* Error retrieving cookies for... ", url)

                    
                except:
                    print("******** Error while writing urls into success file for ", url) 

            #Failure          
            except:
                print('******** Error while trying to open the page.. ', url)
                result_failure = str(url+"\n")
                out_failure.write(result_failure)
                print("******** url appended in failure file", url)


            #with open("py_cookies.json", "a+") as out_cookies:
                #json.dump(content, out_cookies)
            final_result = json.dumps(content, indent=4, sort_keys=True)
            out_cookies.writelines(final_result)    
            


                

            

    #await browser.close()

asyncio.get_event_loop().run_until_complete(main())

in_file.close()
out_cookies.close()
out_failure.close()
out_success.close()

dom = os.system("cat py_cookies.json | jq '.cookies[].domain' > py_domain.csv")
name = os.system("cat py_cookies.json | jq '.cookies[].name' > py_name.csv")  
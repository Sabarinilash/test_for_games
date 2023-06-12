import { type Page, Request } from '@playwright/test';

export default class MainPage {
    page:Page;
    constructor(page: Page){
        this.page = page;
    }

    /**
     * Games for the brain main page 
     */
    public async goto(url) {
        
        await this.page.goto(url);
        
        try {
        // Accept the cookies alert
        await this.page.waitForSelector("//span[text()='AGREE']", {timeout: 10000});
        await this.page.click("//span[text()='AGREE']");
            
        } catch (error) {
            console.debug(error)
        }
        
    }

    public async waitformove(){
        try {
            await this.page.waitForSelector("//p[text()='Make a move.']", { timeout: 5000 });
            console.debug('the checker is moved, as expected');
          } catch (error) {
            console.debug('the checker is not moved, as not expected');
          }
    }

// public async createPersonDeck(url){
        //  Create a deck for Person1
        // const response = await request.post(baseUrl + "/api/deck/new/");
        // const responseData = JSON.parse(await response.text());
        // expect(response.status()).toBe(200)
        // expect(responseData.success).toBeTruthy
         
        // console.debug("responseData is " + responseData.deck_id),
        // person2_deck_id = responseData.deck_id;

    // }
}

import { Page } from '@playwright/test';


export default class MainPage{
    page:Page;
    constructor(page: Page){
        this.page = page;
    }

    /**
     * Games for the brain main page 
     */
    public async goto() {
        
        // const mainPage = new  MainPage(page);
    
        // await page.waitForSelector("#board > div > img", {timeout: 5000})
        // const storyElements = await page.$$('selector'); // Replace 'selector' with your desired CSS selector
    
        // const stories = [];
        // for (const element of storyElements) {
        //   const story = {
        //     title: await element.innerText(),
        //     link: await element.getAttribute('href')
        //   };
        //   stories.push(story);
        // }
    
        // console.log('Story Elements:', stories);
        
    }
}

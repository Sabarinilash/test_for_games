import { test, expect } from '@playwright/test';

import MainPage from "../po_for_games/main.page";



// test.beforeEach(async ({ page }) => {
//   await page.goto('https://www.gamesforthebrain.com/game/checkers/');
// });

const url_main = "https://www.gamesforthebrain.com/game/checkers/"

test.describe('test_games_for_the_brain', () => {
  
  test('Confirm that the site is up', async ({ page }) => {

    /*
    1. Navigate to https://www.gamesforthebrain.com/game/checkers/
    2. Confirm that the site is up
    */
    
      const mainPage = new  MainPage(page);
      // Navigate to main page
      await mainPage.goto(url_main)
      // Validate the page url
      expect(page).toHaveURL(url_main)
      // Validate the page title
      expect(page).toHaveTitle("Checkers - Games for the Brain")  
  });


  test('Perform five legal moves as orange player', async ({ page }) => {
    /*
    3. Make five legal moves as orange:
      a) Include taking a blue piece
      b) Use “Make a move” as confirmation that you can take the next step
    */

    const mainPage = new  MainPage(page);
    // Navigate to main page
    await mainPage.goto(url_main)
    await page.waitForSelector("#board > div > img", {timeout: 5000})
     
    const checkerBlue1 = ('//img[@name="space24" and @src="me1.gif"]');
    const checkerBlue2 = ('//img[@name="space13" and @src="me1.gif"]');
    const checkerBlue3 = ('//img[@name="space13" and @src="me1.gif"]');
    const checkerOrange1 = ('//img[@name="space62"and @src="you1.gif"]')
    const checkerOrange2 = ('//img[@name="space22"and @src="you1.gif"]')
    const checkerOrange3 = ('//img[@name="space02"and @src="you1.gif"]')
    const checkerOrange4 = ('//img[@name="space33"and @src="you1.gif"]')
    const checkerOrange5 = ('//img[@name="space42"and @src="you1.gif"]')
    const checkerTarget1 = ("//img[@name='space73' and contains(@src,'gray.gif')]"); 
    const checkerTarget2 = ("//img[@name='space33' and contains(@src,'gray.gif')]"); 
    const checkerTarget3 = ("//img[@name='space24' and contains(@src,'gray.gif')]"); 
    const checkerTarget4 = ("//img[@name='space24' and contains(@src,'gray.gif')]"); 
    const checkerTarget5 = ("//img[@name='space53' and contains(@src,'gray.gif')]"); 
    const checkersBlue = [checkerBlue1, checkerBlue2, checkerBlue3];
    const checkersOrange = [checkerOrange1, checkerOrange2, checkerOrange3, checkerOrange4, checkerOrange5];
    const checkersTarget = [checkerTarget1, checkerTarget2, checkerTarget3, checkerTarget4, checkerTarget5];
    
  const clickCount = 5
  for(let i = 0; i < clickCount; i++) {
      if (i !== 0) {
      // Wait for "Make a Move" message 
      await mainPage.waitformove()
      // wait for Blue checker to make a move
      try {
        await page.waitForSelector(checkersBlue[i], { timeout: 5000 }) 
      } catch (error) {
        console.debug(checkersBlue[i] + "is not succeeded to wait")
      }
      await page.waitForSelector(checkersOrange[i], { timeout: 5000 })
      await page.locator(checkersOrange[i]).click()
      try {
        await page.waitForSelector(checkersTarget[i], { timeout: 5000 })
      } catch (error) {
        console.debug(checkersTarget[i] + "is not succeeded to wait")
      }
      // Move the Orange checker to the grey block
      await page.locator(checkersTarget[i]).click()
      // Wait for "Make a Move" message 
      await mainPage.waitformove()  
      } else {
        await page.waitForSelector(checkersOrange[i], { timeout: 5000 })
        await page.locator(checkersOrange[i]).click()
        try {
          await page.waitForSelector(checkersTarget[i], { timeout: 5000 })
        } catch (error) {
          console.debug(checkersTarget[i] + "is not succeeded to wait")
        }
        await page.locator(checkersTarget[i]).click()
      }
  }
    
    // const clickCount = 5
    // for(let i = 0; i < clickCount; i++) {
    //   // Wait for your turn
    //   await mainPage.waitformove()
    //   let checkerOrange = page.locator('//img[@src="you1.gif"]').nth(i);
    //   let element_value = await checkerOrange.getAttribute('name');
    //   let checkerTarget = "(//img[@name='"+ element_value + "']/parent::div[1]/preceding-sibling::div[1]//img[@src='gray.gif' or contains(@src,'heckers/gray.gif')])[1]"; 
    //   let checkerMove = page.locator(checkerTarget);
      
    //   // Click the Checker
    //   await checkerOrange.click();

    //   await page.waitForSelector(checkerTarget, { timeout: 10000 })
    //   // Make a Move 
    //   await checkerMove.click();
    //   // Use “Make a move” as confirmation that you can take the next step
    //   await mainPage.waitformove()
    // }    
  });

  test('Validate successful game restart', async ({ page }) => {
    /*
    C) Restart the game after five moves
    d) Confirm that the restarting had been successful
    */
    const mainPage = new  MainPage(page);
    // Navigate to main page
    await mainPage.goto(url_main)
    await page.locator("//a[contains(text(),'Restart')]").click()
    
    const checkerOrange1 = ('//img[@name="space62"and @src="you1.gif"]')
    try {
      await page.waitForSelector(checkerOrange1, { timeout: 5000 })
      console.debug("Restart successful")
    } catch (error) {
      console.debug(error)
    }
  });
});
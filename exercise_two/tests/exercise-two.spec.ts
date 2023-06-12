import { test, expect, request } from '@playwright/test';

test.describe('test_deck_of_cards_api', () => {

  const baseUrl = "//https://deckofcardsapi.com"; 
  let person1_deck_id;
  let person2_deck_id;
  test('Confirm that the site is up', async ({ request }) => {

    /*
    1. Navigate to https://deckofcardsapi.com/
    2. Confirm the site is up
    3. Get a new deck
    4. Shuffle it
    5. Deal three cards to each of two players
    6. Check whether either has blackjack
    7. If either has, write out which one does
    */
    const response = await request.get(baseUrl)
    // Confirm the site is up
    expect(response.status()).toBe(200)
      
  });


  test('Make five legal moves as orange', async ({ request }) => {
    /*
    3. Get a new deck
    Create two new decks 
    */

  //  Create a deck for Person1
  const response = await request.post(baseUrl + "/api/deck/new/");
  const responseData = JSON.parse(await response.text());
  expect(response.status()).toBe(200)
  expect(responseData.success).toBeTruthy
   
  console.debug("responseData is " + responseData.deck_id),
  person1_deck_id = responseData.deck_id;

  // //  Create a deck for Person2
  // const response = await request.post(baseUrl + "/api/deck/new/");
  // const responseData = JSON.parse(await response.text());
  // expect(response.status()).toBe(200)
  // expect(responseData.success).toBeTruthy
   
  // console.debug("responseData is " + responseData.deck_id),
  // person2_deck_id = responseData.deck_id;
   

  });

  test('should append new items to the bottom of the list', async ({ request }) => {
    /*
    4. Shuffle it
    5. Deal three cards to each of two players
    6. Check whether either has blackjack
    7. If either has, write out which one does
    */
    
    // Shuffle it
    const response = await request.post(baseUrl + "/api/deck/"+person1_deck_id+"/shuffle/?remaining=true")
    
    const responseData = JSON.parse(await response.text());
    expect(response.status()).toBe(200)
    expect(responseData.shuffled).toBeTruthy

    // Deal three cards to each of two players



   
  });

});
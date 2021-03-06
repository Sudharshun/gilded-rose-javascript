"use strict"

describe("Give Gilded Rose ", function() {

  // Setup:All items have a sell_in value which denotes the number of days we have to sell the item
  // Setup:All items have a quality value which denotes how valuable the item is
  // * Assertion Done and refactored Normal Case: At the end of each day our system lowers both values for every item
  //
  // Pretty simple, right? Well this is where it gets interesting:
  // * Assertion done and refactored :Normal Case: Once the sell_in days is less then zero, quality degrades twice as fast
  // * Aessertion done and refactored: The quality of an item is never negative
  // * Assertion done and (refactored?) "Aged Brie" actually increases in quality the older it gets
  // * Assertion done and Tested The quality of an item is never more than 50
  // * Assertion done and Tested Sulfuras", being a legendary item, never has to be sold nor does it decrease in quality
  // * Assertion done and tested "Backstage passes", like aged brie, increases in quality as it's sell_in value decreases; quality increases by
  //    2 when there are 10 days or less and by 3 when there are 5 days or less but quality drops to 0 after the concert
  // We have recently signed a supplier of conjured items. This requires an update to our system:
  //    "Conjured" items degrade in quality twice as fast as normal items


  // Normal Item

  items=[]

  it("Normal Item: should decrement both sell in and quality after running update_quality", function() {
    var currSize=items.length;
    console.log('-->'+currSize)
    items.push(new Item('Test', 2, 10));

    update_quality();

    expect(items[currSize].sell_in).toEqual(1);
    expect(items[currSize].quality).toEqual(9);
  });

  it("should test for for sell_in less than zero, quality degrades twice as fast", function () {
    var currSize=items.length;
    items.push(new Item('Test for negative sell in', -2, 5));

    update_quality();

    expect(items[currSize].sell_in).toEqual(-3);
    expect(items[currSize].quality).toEqual(3);
  })

  it("Quality of an item is never negative", function () {
    // (item name, sell_in, quality)
    var currSize=items.length;
    items.push(new Item('Zero Quality Item', 2, 0));

    update_quality();

    expect(items[currSize].quality).toEqual(0);
  })

  it("Quality of an item is never negative when quality is decreasing at twice the rate", function () {
    // (item name, sell_in, quality)
    var currSize=items.length;
    items.push(new Item('Zero Quality Item And Zero Date', -2, 0));

    update_quality();

    expect(items[currSize].quality).toEqual(0);
  })

  it("Aged Brie actually increases in quality the older it gets", function () {
    var currSize=items.length;
    // (item name, sell_in, quality)
    items.push(new Item('Aged Brie', 2, 2));
    var previousQuality = items[currSize].quality;

    update_quality();

    //new quality rating should be 3
    expect(items[currSize].quality).toBeGreaterThan(previousQuality);
  })

  it("The quality of an item is never more than 50", function() {
    var currSize = items.length;
    // (item name, sell_in, quality)
    items.push(new Item('Aged Brie', 2, 50));
    var previousQuality = items[currSize].quality;

    update_quality();
    expect(items[currSize].quality).toBeLessThanOrEqual(50);
  })

  it("Sulfuras, being a legendary item, never has to be sold nor does it decrease in quality", function() {
    var currSize = items.length;
    // (item name, sell_in, quality)
    items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 48));
    update_quality();
    expect(items[currSize].quality).toEqual(48);
    expect(items[currSize].sell_in).toEqual(0);
  })

  it("Backstage passes quality increases by 2 when there are 10 days or less", function() {
    var testArray = [];
    testArray.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20));

    items=testArray;
    update_quality();

    expect(items[0].quality).toEqual(22);
    expect(items[0].sell_in).toEqual(9);
  })

  it("Backstage passes quality increases by 3 when there are 5 days or less", function() {
    var testArray = [];
    testArray.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20));

    items=testArray;
    update_quality();

    expect(items[0].quality).toEqual(23);
    expect(items[0].sell_in).toEqual(4);
  })

  it("Backstage passes quality drops to 0 after the concert", function() {
    var testArray = [];
    testArray.push(new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20));

    items=testArray;
    update_quality();

    expect(items[0].quality).toEqual(0);
    expect(items[0].sell_in).toEqual(-1);
  })

  it("Backstage passes quality decrements normally if sell in is above 10", function() {
    var testArray = [];
    testArray.push(new Item('Backstage passes to a TAFKAL80ETC concert', 12, 20));

    items=testArray;
    update_quality();

    expect(items[0].quality).toEqual(21);
    expect(items[0].sell_in).toEqual(11);
  })

  it("Conjured items degrade in quality twice as fast as normal items", function() {
    var testArray = []
    testArray.push(new Item('Conjured Mana Cake', 10, 10));

    items = testArray;
    update_quality();

    expect(items[0].quality).toEqual(8);
    expect(items[0].sell_in).toEqual(9);
  })

  it("Conjured items degrade in quality twice as fast as normal items even when sell in is negative", function() {
    var testArray = []
    testArray.push(new Item('Conjured Mana Cake', -1, 10));

    items = testArray;
    update_quality();

    expect(items[0].quality).toEqual(6);
    expect(items[0].sell_in).toEqual(-2);
  })
  it("Loads Items and Strategy arrays into and Inventory array", function() {
    new_update_quality();
  })

});

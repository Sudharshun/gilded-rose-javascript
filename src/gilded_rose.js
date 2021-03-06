function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}


var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function update_quality() {
  var degradeFactor
  var sellinDecrementor
  var resetFactor

  for (var i = 0; i < items.length; i++) {

    degradeFactor=1
    sellinDecrementor=1
    resetFactor=1

    if (items[i].name.includes("Conjured")) {
      degradeFactor=2

    }else if(items[i].name == "Aged Brie"){
      degradeFactor=-1
    }else if(items[i].name == "Sulfuras, Hand of Ragnaros"){
      degradeFactor=0
      sellinDecrementor=0
    }else if(items[i].name.includes("Backstage")){

      if(items[i].sell_in<=10 && items[i].sell_in>5){
        degradeFactor = - 2
      }
      else if(items[i].sell_in<=5 && items[i].sell_in>0){
        degradeFactor = - 3
      }
      else if(items[i].sell_in<=0){
        resetFactor = 0
      }
      else {
        degradeFactor = - 1
      }
    }
    if(items[i].sell_in < 0) {
      degradeFactor*=2
    }


    //Heart of our Function
    items[i].sell_in -= sellinDecrementor
    items[i].quality -= degradeFactor
    items[i].quality*=resetFactor

    // Gaurad at the end to ensure quality never gets below zero
    if(items[i].quality < 0){
      items[i].quality = 0
    }else if(items[i].quality >50){
      items[i].quality = 50
    }
  }
}
function new_update_quality() {

//Strategy 1
    // var Backside = function() {
    //     this.degradeFactor = function(package) {
    //         // calculations...
    //         return "$43.20";
    //     }
    // };
//End Strategy 1

    //Build Inventory List
    var inventory = [];
    var items2 = [];
    //build out strategies for each item

    items2.push(new Item('+5 Dexterity Vest', 10, 20));
    items2.push(new Item('Aged Brie', 2, 0));
    items2.push(new Item('Elixir of the Mongoose', 5, 7));
    items2.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
    items2.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
    items2.push(new Item('Conjured Mana Cake', 3, 6));

    var strategies = [];
    strategies.push({item2[0]:[ 1, 1, 1]});
    strategies.push({item2[1]:[-1, 1, 1]});
    strategies.push({item2[2]:[ 1, 1, 1]});
    strategies.push({item2[3]:[ 0, 0, 1]});
    strategies.push({item2[4]:[ 0, 0, 1]});//TODO update later
    strategies.push({item2[5]:[ 0, 0, 1]});//TODO update later

    //Make 1 to 1 associations between strategies and product list
     items2.forEach(function(element) {
       inventory.push(element, strategies[element])
     })
     console.log(inventory);
}

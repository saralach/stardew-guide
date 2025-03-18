/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database & collection to use.
use('stardew');
const collection = db.getCollection('tracker_reqs');

/* ============= tracker_reqs Schema Validation ============= */
db.createCollection('tracker_reqs', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['category'],
      properties: {
        category: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        subcategory: {
          bsonType: 'string',
          description: 'optional; must be a string'
        },
        subcategory_id: {
          bsonType: 'int',
          description: 'optional; must be an int'
        },
        label: {
          bsonType: 'string',
          description: 'optional; must be a string'
        },
        gold_reqd: {
          bsonType: 'int',
          description: 'optional; must be an int'
        },
        icon_src: {
          bsonType: 'string',
          description: 'optional; must be a string'
        },
        reqs: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: ['req_id'],
            properties: {
              req_id: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              label: {
                bsonType: 'string',
                description: 'optional; must be a string'
              },
              gold_reqd: {
                bsonType: 'int',
                description: 'optional; must be an int'
              },
              icon_src: {
                bsonType: 'string',
                description: 'optional; must be a string'
              },
              id_num: {
                bsonType: 'int',
                description: 'optional; must be an int'
              },
              qty: {
                bsonType: 'int',
                description: 'optional; must be an int'
              },
              items_reqd: {
                bsonType: 'array',
                items: {
                  bsonType: 'object',
                  required: ['item'],
                  properties: {
                    item: {
                      bsonType: 'string',
                      description: 'must be a string and is required'
                    },
                    qty: {
                      bsonType: 'int',
                      description: 'optional; must be an int'
                    }
                  }
                }
              }
            }
          }
        },
      }, 
      additionalProperties: true
    }
  }
});

/* ============= Insert Perfection Requirements =============*/
collection.insertMany([
  {
    "category": "Perfection", 
    "subcategory": "Items Shipped",
    "label": "Ship every item in the 'Items Shipped' collection.",
    "subcategory_id": 1,
    "reqs": [
      { "req_id": "Wild Horseradish", "id_num": 1 }, 
      { "req_id": "Daffodil", "id_num": 2 }, 
      { "req_id": "Leek", "id_num": 3 }, 
      { "req_id": "Dandelion", "id_num": 4 }, 
      { "req_id": "Parsnip", "id_num": 5 }, 
      { "req_id": "Cave Carrot", "id_num": 6 }, 
      { "req_id": "Coconut", "id_num": 7 }, 
      { "req_id": "Cactus Fruit", "id_num": 8 }, 
      { "req_id": "Banana", "id_num": 9 }, 
      { "req_id": "Sap", "id_num": 10 }, 
      { "req_id": "Large Egg (white)", "id_num": 11 }, 
      { "req_id": "Egg (white)", "id_num": 12 }, 
      { "req_id": "Large Egg (brown)", "id_num": 13 }, 
      { "req_id": "Egg (brown)", "id_num": 14 }, 
      { "req_id": "Milk", "id_num": 15 }, 
      { "req_id": "Large Milk", "id_num": 16 }, 
      { "req_id": "Green Bean", "id_num": 17 }, 
      { "req_id": "Cauliflower", "id_num": 18 }, 
      { "req_id": "Potato", "id_num": 19 }, 
      { "req_id": "Garlic", "id_num": 20 }, 
      { "req_id": "Kale", "id_num": 21 }, 
      { "req_id": "Rhubarb", "id_num": 22 }, 
      { "req_id": "Melon", "id_num": 23 }, 
      { "req_id": "Tomato", "id_num": 24 }, 
      { "req_id": "Morel", "id_num": 25 }, 
      { "req_id": "Blueberry", "id_num": 26 }, 
      { "req_id": "Fiddlehead Fern", "id_num": 27 }, 
      { "req_id": "Hot Pepper", "id_num": 28 }, 
      { "req_id": "Wheat", "id_num": 29 }, 
      { "req_id": "Radish", "id_num": 30 }, 
      { "req_id": "Red Cabbage", "id_num": 31 }, 
      { "req_id": "Starfruit", "id_num": 32 }, 
      { "req_id": "Corn", "id_num": 33 }, 
      { "req_id": "Unmilled Rice", "id_num": 34 }, 
      { "req_id": "Eggplant", "id_num": 35 }, 
      { "req_id": "Artichoke", "id_num": 36 }, 
      { "req_id": "Pumpkin", "id_num": 37 }, 
      { "req_id": "Bok Choy", "id_num": 38 }, 
      { "req_id": "Yam", "id_num": 39 }, 
      { "req_id": "Chanterelle", "id_num": 40 }, 
      { "req_id": "Cranberries", "id_num": 41 }, 
      { "req_id": "Holly", "id_num": 42 }, 
      { "req_id": "Beet", "id_num": 43 }, 
      { "req_id": "Ostrich Egg", "id_num": 44 }, 
      { "req_id": "Salmonberry", "id_num": 45 }, 
      { "req_id": "Amaranth", "id_num": 46 }, 
      { "req_id": "Pale Ale", "id_num": 47 }, 
      { "req_id": "Hops", "id_num": 48 }, 
      { "req_id": "Void Egg", "id_num": 49 }, 
      { "req_id": "Mayonnaise", "id_num": 50 }, 
      { "req_id": "Duck Mayonnaise", "id_num": 51 }, 
      { "req_id": "Void Mayonnaise", "id_num": 52 }, 
      { "req_id": "Clay", "id_num": 53 }, 
      { "req_id": "Copper Bar", "id_num": 54 }, 
      { "req_id": "Iron Bar", "id_num": 55 }, 
      { "req_id": "Gold Bar", "id_num": 56 }, 
      { "req_id": "Iridium Bar", "id_num": 57 }, 
      { "req_id": "Refined Quartz", "id_num": 58 }, 
      { "req_id": "Honey", "id_num": 59 }, 
      { "req_id": "Pickles", "id_num": 60 }, 
      { "req_id": "Jelly", "id_num": 61 }, 
      { "req_id": "Beer", "id_num": 62 }, 
      { "req_id": "Wine", "id_num": 63 }, 
      { "req_id": "Juice", "id_num": 64 }, 
      { "req_id": "Poppy", "id_num": 65 }, 
      { "req_id": "Copper Ore", "id_num": 66 }, 
      { "req_id": "Iron Ore", "id_num": 67 }, 
      { "req_id": "Coal", "id_num": 68 }, 
      { "req_id": "Gold Ore", "id_num": 69 }, 
      { "req_id": "Iridium Ore", "id_num": 70 }, 
      { "req_id": "Wood", "id_num": 71 }, 
      { "req_id": "Stone", "id_num": 72 }, 
      { "req_id": "Nautilus Shell", "id_num": 73 }, 
      { "req_id": "Coral", "id_num": 74 }, 
      { "req_id": "Rainbow Shell", "id_num": 75 }, 
      { "req_id": "Spice Berry", "id_num": 76 }, 
      { "req_id": "Sea Urchin", "id_num": 77 }, 
      { "req_id": "Grape", "id_num": 78 }, 
      { "req_id": "Spring Onion", "id_num": 79 }, 
      { "req_id": "Strawberry", "id_num": 80 }, 
      { "req_id": "Sweet Pea", "id_num": 81 }, 
      { "req_id": "Common Mushroom", "id_num": 82 }, 
      { "req_id": "Wild Plum", "id_num": 83 }, 
      { "req_id": "Hazelnut", "id_num": 84 }, 
      { "req_id": "Blackberry", "id_num": 85 }, 
      { "req_id": "Winter Root", "id_num": 86 }, 
      { "req_id": "Crystal Fruit", "id_num": 87 }, 
      { "req_id": "Snow Yam", "id_num": 88 }, 
      { "req_id": "Sweet Gem Berry", "id_num": 89 }, 
      { "req_id": "Crocus", "id_num": 90 }, 
      { "req_id": "Red Mushroom", "id_num": 91 }, 
      { "req_id": "Sunflower", "id_num": 92 }, 
      { "req_id": "Purple Mushroom", "id_num": 93 }, 
      { "req_id": "Cheese", "id_num": 94 }, 
      { "req_id": "Goat Cheese", "id_num": 95 }, 
      { "req_id": "Cloth", "id_num": 96 }, 
      { "req_id": "Truffle", "id_num": 97 }, 
      { "req_id": "Truffle Oil", "id_num": 98 }, 
      { "req_id": "Coffee Bean", "id_num": 99 }, 
      { "req_id": "Goat Milk", "id_num": 100 }, 
      { "req_id": "Large Goat Milk", "id_num": 101 }, 
      { "req_id": "Wool", "id_num": 102 }, 
      { "req_id": "Duck Egg", "id_num": 103 }, 
      { "req_id": "Duck Feather", "id_num": 104 }, 
      { "req_id": "Caviar", "id_num": 105 }, 
      { "req_id": "Rabbit's Foot", "id_num": 106 }, 
      { "req_id": "Aged Roe", "id_num": 107 }, 
      { "req_id": "Ancient Fruit", "id_num": 108 }, 
      { "req_id": "Mead", "id_num": 109 }, 
      { "req_id": "Tulip", "id_num": 110 }, 
      { "req_id": "Summer Spangle", "id_num": 111 }, 
      { "req_id": "Fairy Rose", "id_num": 112 }, 
      { "req_id": "Blue Jazz", "id_num": 113 }, 
      { "req_id": "Apple", "id_num": 114 }, 
      { "req_id": "Green Tea", "id_num": 115 }, 
      { "req_id": "Apricot", "id_num": 116 }, 
      { "req_id": "Orange", "id_num": 117 }, 
      { "req_id": "Peach", "id_num": 118 }, 
      { "req_id": "Pomegranate", "id_num": 119 }, 
      { "req_id": "Cherry", "id_num": 120 }, 
      { "req_id": "Bug Meat", "id_num": 121 }, 
      { "req_id": "Hardwood", "id_num": 122 }, 
      { "req_id": "Maple Syrup", "id_num": 123 }, 
      { "req_id": "Oak Resin", "id_num": 124 }, 
      { "req_id": "Pine Tar", "id_num": 125 }, 
      { "req_id": "Slime", "id_num": 126 }, 
      { "req_id": "Bat Wing", "id_num": 127 }, 
      { "req_id": "Solar Essence", "id_num": 128 }, 
      { "req_id": "Void Essence", "id_num": 129 }, 
      { "req_id": "Fiber", "id_num": 130 }, 
      { "req_id": "Battery Pack", "id_num": 131 }, 
      { "req_id": "Dinosaur Mayonnaise", "id_num": 132 }, 
      { "req_id": "Roe", "id_num": 133 }, 
      { "req_id": "Squid Ink", "id_num": 134 }, 
      { "req_id": "Tea Leaves", "id_num": 135 }, 
      { "req_id": "Ginger", "id_num": 136 }, 
      { "req_id": "Taro Root", "id_num": 137 }, 
      { "req_id": "Pineapple", "id_num": 138 }, 
      { "req_id": "Mango", "id_num": 139 }, 
      { "req_id": "Cinder Shard", "id_num": 140 }, 
      { "req_id": "Magma Cap", "id_num": 141 }, 
      { "req_id": "Bone Fragment", "id_num": 142 }, 
      { "req_id": "Radioactive Ore", "id_num": 143 }, 
      { "req_id": "Radioactive Bar", "id_num": 144 }, 
      { "req_id": "Smoked Fish", "id_num": 145 }, 
      { "req_id": "Moss", "id_num": 146 }, 
      { "req_id": "Mystic Syrup", "id_num": 147 }, 
      { "req_id": "Raisins", "id_num": 148 }, 
      { "req_id": "Dried Fruit", "id_num": 149 }, 
      { "req_id": "Dried Mushrooms", "id_num": 150 }, 
      { "req_id": "Carrot", "id_num": 151 }, 
      { "req_id": "Summer Squash", "id_num": 152 }, 
      { "req_id": "Broccoli", "id_num": 153 }, 
      { "req_id": "Powdermelon", "id_num": 154 },          
    ]
  },
  {
    "category": "Perfection", 
    "subcategory": "Obelisks",
    "label": "Build the Earth, Water, Desert, and Island Obelisks.",
    "subcategory_id": 2,
    "reqs": [
      {
        "req_id": "Earth Obelisk",
        "id_num": 1,
        "gold_reqd": 500000,
        "items_reqd": [
          { "item": "Iridium Bar", "qty": 10 },
          { "item": "Earth Crystal", "qty": 10 }
        ]
      },
      {
        "req_id": "Water Obelisk",
        "id_num": 2,
        "gold_reqd": 500000,
        "items_reqd": [
          { "item": "Iridium Bar", "qty": 5 },
          { "item": "Clam", "qty": 10 },
          { "item": "Coral", "qty": 10 }
        ]
      },
      {
        "req_id": "Desert Obelisk",
        "id_num": 3,
        "gold_reqd": 1000000,
        "items_reqd": [
          { "item": "Iridium Bar", "qty": 20 },
          { "item": "Coconut", "qty": 10 },
          { "item": "Cactus Fruit", "qty": 10 }
        ]
      },
      {
        "req_id": "Island Obelisk",
        "id_num": 4,
        "gold_reqd": 1000000,
        "items_reqd": [
          { "item": "Iridium Bar", "qty": 10 },
          { "item": "Dragon Tooth", "qty": 10 },
          { "item": "Banana", "qty": 10 }
        ]
      }
    ]
  },
  {
    "category": "Perfection", 
    "subcategory": "Golden Clock",
    "label": "Build the Golden Clock (10,000,000g).",
    "subcategory_id": 3,
  },
  {
    "category": "Perfection", 
    "subcategory": "Monster Slayer",
    "label": "Complete the monster eradication goals in the Adventurer's Guild.",
    "subcategory_id": 4,
    "reqs": [
      {
        "req_id": "Slay 1000 Slimes",
        "icon_name": "Slime",
        "id_num": 1
      },
      {
        "req_id": "Slay 150 Void Spirits",
        "icon_name": "Shadow Shaman",
        "id_num": 2
      },
      {
        "req_id": "Slay 200 Bats",
        "icon_name": "Bat",
        "id_num": 3
      },
      {
        "req_id": "Slay 50 Skeletons",
        "icon_name": "Skeleton",
        "id_num": 4
      },
      {
        "req_id": "Slay 80 Cave Insects",
        "icon_name": "Bug",
        "id_num": 5
      },
      {
        "req_id": "Slay 30 Duggies",
        "icon_name": "Duggy",
        "id_num": 6
      },
      {
        "req_id": "Slay 500 Dust Sprites",
        "icon_name": "Dust Sprite",
        "id_num": 7
      },
      {
        "req_id": "Slay 60 Rock Crabs",
        "icon_name": "Rock Crab",
        "id_num": 8
      },
      {
        "req_id": "Slay 100 Mummies",
        "icon_name": "Mummy",
        "id_num": 9
      },
      {
        "req_id": "Slay 50 Pepper Rex",
        "icon_name": "Pepper Rex",
        "id_num": 10
      },
      {
        "req_id": "Slay 250 Serpents",
        "icon_name": "Serpent",
        "id_num": 11
      },
      {
        "req_id": "Slay 150 Magma Sprites",
        "icon_name": "Magma Sprite",
        "id_num": 12
      }
    ]
  },
  {
    "category": "Perfection", 
    "subcategory": "Great Friends",
    "label": "Reach maximum hearts with every villager.",
    "subcategory_id": 5,
    "reqs": [
      { "req_id": "Alex Max Hearts", "label": "Alex", "id_num": 1, "qty": 8 },
      { "req_id": "Elliott Max Hearts", "label": "Elliott", "id_num": 2, "qty": 8 },
      { "req_id": "Harvey Max Hearts", "label": "Harvey", "id_num": 3, "qty": 8 },
      { "req_id": "Sam Max Hearts", "label": "Sam", "id_num": 4, "qty": 8 },
      { "req_id": "Sebastian Max Hearts", "label": "Sebastian", "id_num": 5, "qty": 8 },
      { "req_id": "Shane Max Hearts", "label": "Shane", "id_num": 6, "qty": 8 },
      { "req_id": "Abigail Max Hearts", "label": "Abigail", "id_num": 7, "qty": 8 },
      { "req_id": "Emily Max Hearts", "label": "Emily", "id_num": 8, "qty": 8 },
      { "req_id": "Haley Max Hearts", "label": "Haley", "id_num": 9, "qty": 8 },
      { "req_id": "Leah Max Hearts", "label": "Leah", "id_num": 10, "qty": 8 },
      { "req_id": "Maru Max Hearts", "label": "Maru", "id_num": 11, "qty": 8 },
      { "req_id": "Penny Max Hearts", "label": "Penny", "id_num": 12, "qty": 8 },
      { "req_id": "Caroline Max Hearts", "label": "Caroline", "id_num": 13, "qty": 10 },
      { "req_id": "Clint Max Hearts", "label": "Clint", "id_num": 14, "qty": 10 },
      { "req_id": "Demetrius Max Hearts", "label": "Demetrius", "id_num": 15, "qty": 10 },
      { "req_id": "Dwarf Max Hearts", "label": "Dwarf", "id_num": 16, "qty": 10 },
      { "req_id": "Evelyn Max Hearts", "label": "Evelyn", "id_num": 17, "qty": 10 },
      { "req_id": "George Max Hearts", "label": "George", "id_num": 18, "qty": 10 },
      { "req_id": "Gus Max Hearts", "label": "Gus", "id_num": 19, "qty": 10 },
      { "req_id": "Jas Max Hearts", "label": "Jas", "id_num": 20, "qty": 10 },
      { "req_id": "Jodi Max Hearts", "label": "Jodi", "id_num": 21, "qty": 10 },
      { "req_id": "Kent Max Hearts", "label": "Kent", "id_num": 22, "qty": 10 },
      { "req_id": "Krobus Max Hearts", "label": "Krobus", "id_num": 23, "qty": 10 },
      { "req_id": "Leo Max Hearts", "label": "Leo", "id_num": 24, "qty": 10 },
      { "req_id": "Lewis Max Hearts", "label": "Lewis", "id_num": 25, "qty": 10 },
      { "req_id": "Linus Max Hearts", "label": "Linus", "id_num": 26, "qty": 10 },
      { "req_id": "Marnie Max Hearts", "label": "Marnie", "id_num": 27, "qty": 10 },
      { "req_id": "Pam Max Hearts", "label": "Pam", "id_num": 28, "qty": 10 },
      { "req_id": "Pierre Max Hearts", "label": "Pierre", "id_num": 29, "qty": 10 },
      { "req_id": "Robin Max Hearts", "label": "Robin", "id_num": 30, "qty": 10 },
      { "req_id": "Sandy Max Hearts", "label": "Sandy", "id_num": 31, "qty": 10 },
      { "req_id": "Vincent Max Hearts", "label": "Vincent", "id_num": 32, "qty": 10 },
      { "req_id": "Willy Max Hearts", "label": "Willy", "id_num": 33, "qty": 10 },
      { "req_id": "Wizard Max Hearts", "label": "Wizard", "id_num": 34, "qty": 10 }
    ]
  },
  {
    "category": "Perfection", 
    "subcategory": "Level 10 Skills",
    "label": "Reach level 10 in all skills.",
    "subcategory_id": 6,
    "reqs": [
      {
        "req_id": "Level 10 Farming",
        "icon_name": "Farming Skill",
      },
      {
        "req_id": "Level 10 Mining",
        "icon_name": "Mining Skill",
      },
      {
        "req_id": "Level 10 Foraging",
        "icon_name": "Foraging Skill",
      },
      {
        "req_id": "Level 10 Fishing",
        "icon_name": "Fishing Skill",
      },
      {
        "req_id": "Level 10 Combat",
        "icon_name": "Combat Skill",
      }
    ]
  },
  {
    "category": "Perfection", 
    "subcategory": "Stardrops",
    "icon_src": "Stardrop",
    "label": "Collect all Stardrops.",
    "subcategory_id": 7,
    "reqs": [
      {
        "req_id": "Fair Stardrop",
        "label": "Buy at the Stardew Valley Fair."
      },
      {
        "req_id": "Mines Chest Stardrop",
        "label": "Open the Treasure Chest on Floor 100 of The Mines."
      },
      {
        "req_id": "Spouse Stardrop",
        "label": "Reach 12.5 hearts with your spouse."
      },
      {
        "req_id": "Krobus Stardrop",
        "label": "Buy from Krobus.",
        "gold_reqd": 20000
      },
      {
        "req_id": "Gem Berry Stardrop",
        "label": "In the Secret Woods, give Master Cannoli a Sweet Gem Berry."
      },
      {
        "req_id": "Fishing Mastery Stardrop",
        "label": "Catch every fish (delivered in the mail the following day)."
      },
      {
        "req_id": "Museum Completion Stardrop",
        "label": "Donate every mineral and artifact to the museum."
      },
    ]
  },
  {
    "category": "Perfection", 
    "subcategory": "Cooking",
    "label": "Cook every recipe.",
    "subcategory_id": 8,
    "reqs": [] /* get them from recipes upon query */
  },
  {
    "category": "Perfection", 
    "subcategory": "Crafting",
    "label": "Craft every item.",
    "subcategory_id": 9,
    "reqs": [] /* get them from recipes upon query */
  },
  {
    "category": "Perfection", 
    "subcategory": "Fishing",
    "label": "Catch every fish.",
    "subcategory_id": 10,
    "reqs": [
      { "req_id": "Pufferfish", "id_num": 1 },
      { "req_id": "Anchovy", "id_num": 2 },
      { "req_id": "Tuna", "id_num": 3 },
      { "req_id": "Sardine", "id_num": 4 },
      { "req_id": "Bream", "id_num": 5 },
      { "req_id": "Largemouth Bass", "id_num": 6 },
      { "req_id": "Smallmouth Bass", "id_num": 7 },
      { "req_id": "Rainbow Trout", "id_num": 8 },
      { "req_id": "Salmon", "id_num": 9 },
      { "req_id": "Walleye", "id_num": 10 },
      { "req_id": "Perch", "id_num": 11 },
      { "req_id": "Carp", "id_num": 12 },
      { "req_id": "Catfish", "id_num": 13 },
      { "req_id": "Pike", "id_num": 14 },
      { "req_id": "Sunfish", "id_num": 15 },
      { "req_id": "Red Mullet", "id_num": 16 },
      { "req_id": "Herring", "id_num": 17 },
      { "req_id": "Eel", "id_num": 18 },
      { "req_id": "Octopus", "id_num": 19 },
      { "req_id": "Red Snapper", "id_num": 20 },
      { "req_id": "Squid", "id_num": 21 },
      { "req_id": "Seaweed", "id_num": 22 },
      { "req_id": "Green Algae", "id_num": 23 },
      { "req_id": "Sea Cucumber", "id_num": 24 },
      { "req_id": "Super Cucumber", "id_num": 25 },
      { "req_id": "Ghostfish", "id_num": 26 },
      { "req_id": "White Algae", "id_num": 27 },
      { "req_id": "Stonefish", "id_num": 28 },
      { "req_id": "Crimsonfish", "id_num": 29 },
      { "req_id": "Angler", "id_num": 30 },
      { "req_id": "Ice Pip", "id_num": 31 },
      { "req_id": "Lava Eel", "id_num": 32 },
      { "req_id": "Legend", "id_num": 33 },
      { "req_id": "Sandfish", "id_num": 34 },
      { "req_id": "Scorpion Carp", "id_num": 35 },
      { "req_id": "Flounder", "id_num": 36 },
      { "req_id": "Midnight Carp", "id_num": 37 },
      { "req_id": "Clam", "id_num": 38 },
      { "req_id": "Mutant Carp", "id_num": 39 },
      { "req_id": "Sturgeon", "id_num": 40 },
      { "req_id": "Tiger Trout", "id_num": 41 },
      { "req_id": "Bullhead", "id_num": 42 },
      { "req_id": "Tilapia", "id_num": 43 },
      { "req_id": "Chub", "id_num": 44 },
      { "req_id": "Dorado", "id_num": 45 },
      { "req_id": "Albacore", "id_num": 46 },
      { "req_id": "Shad", "id_num": 47 },
      { "req_id": "Lingcod", "id_num": 48 },
      { "req_id": "Halibut", "id_num": 49 },
      { "req_id": "Lobster", "id_num": 50 },
      { "req_id": "Crayfish", "id_num": 51 },
      { "req_id": "Crab", "id_num": 52 },
      { "req_id": "Cockle", "id_num": 53 },
      { "req_id": "Mussel", "id_num": 54 },
      { "req_id": "Shrimp", "id_num": 55 },
      { "req_id": "Snail", "id_num": 56 },
      { "req_id": "Periwinkle", "id_num": 57 },
      { "req_id": "Oyster", "id_num": 58 },
      { "req_id": "Woodskip", "id_num": 59 },
      { "req_id": "Glacierfish", "id_num": 60 },
      { "req_id": "Void Salmon", "id_num": 61 },
      { "req_id": "Slimejack", "id_num": 62 },
      { "req_id": "Midnight Squid", "id_num": 63 },
      { "req_id": "Spook Fish", "id_num": 64 },
      { "req_id": "Blobfish", "id_num": 65 },
      { "req_id": "Stingray", "id_num": 66 },
      { "req_id": "Lionfish", "id_num": 67 },
      { "req_id": "Blue Discus", "id_num": 68 },
      { "req_id": "River Jelly", "id_num": 69 },
      { "req_id": "Cave Jelly", "id_num": 70 },
      { "req_id": "Sea Jelly", "id_num": 71 },
      { "req_id": "Goby", "id_num": 72 },      
    ]
  },
  {
    "category": "Perfection", 
    "subcategory": "Golden Walnuts",
    "icon_src": "Golden Walnut",
    "label": "Collect all 130 Golden Walnuts on Ginger Island.",
    "subcategory_id": 11,
  },
  
]);

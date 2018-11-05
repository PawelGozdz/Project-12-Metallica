// import '../scss/main.scss';
// import 'bootstrap';
import { glowing, expandListItems, dropdowns } from './cssEffects';
import { asideMenu, asideSlider } from './asideMenu';
import { Event } from './EventApi';
import { EventUI } from './EventUI';
import { topNavbar } from './topNavigation';
import { shoppingTabs } from './shoppingTabs';
import { Popular } from './PopularConstr';
import { updatePopular } from './popularUI';
import { SHOP } from './ShopConstr';
import { buildDropdowns, insertIntoHTML, displayInTheDom } from './shopUI';

const event = new Event();
const eventUi = new EventUI();
const popular = new Popular();
const shop = new SHOP();

async function main() {
  eventListeners();
  // Run aside Slider
  asideSlider();
  // Run glowing effect
  setInterval(() => glowing(), 1900);
  // Run API
  runApi();
  // Adding listener to topNavbar
  topNavbar();
  // Run popular section with random numbers
  popular.displayRandomRecords();
  // Query DB for the above random numbers
  updatePopular();

  /**
   * Query dropdowns with app start
   */
  // Query Albums
  const initialList = await shop.initiateStaticDropdown();
  // Build albums dropdowns
  const albumStr = await buildDropdowns(initialList[0], 'album');
  // // Inserting dropdown elements into 'album' dropdowns in sections 'album' and 'song'
  insertIntoHTML(albumStr, ['album', 'song']);
  // Build Type dropdown
  // const typeStr = await buildDropdowns(initialList[1], 'type');
  // // Insert into type
  // insertIntoHTML(typeStr, ['cloth'], 'type');
  // // Build Size dropdown
  // const sizeStr = await buildDropdowns(initialList[2], 'size');
  // // Insert into size
  // insertIntoHTML(sizeStr, ['cloth'], 'size');
  // // Build Gender dropdown
  // const genderStr = await buildDropdowns(initialList[3], 'sex');
  // // Insert into gender
  // insertIntoHTML(genderStr, ['cloth'], 'sex');
  // Build Results dropdown
  // const clothStr = await buildDropdowns(initialList[4], 'cloth');
  // Insert into cloth
  // insertIntoHTML(clothStr, ['cloth']);
  // // Build Other dropdown
  const otherStr = await buildDropdowns(initialList[1], 'other');
  // Insert into other
  insertIntoHTML(otherStr, ['other'], 'other');
  // Adding listeners to newly inserted 'album' dropdowns and then run function which will retrive the data from DB
  document.querySelectorAll('.shopping__dropdown input[type="checkbox"]').forEach(input => input.addEventListener('change', queryForSpecificSection));
}

function eventListeners() {
  document.querySelectorAll('.aside__icon').forEach(el => el.addEventListener('click', asideMenu));
  document.querySelectorAll('.albums__img').forEach(el => el.addEventListener('click', expandListItems));
  document.querySelectorAll('.shopping__tab').forEach(el => el.addEventListener('click', shoppingTabs));
  document.querySelectorAll('.shopping__dropdownToggle').forEach(el => el.addEventListener('click', dropdowns));
}

async function queryForSpecificSection(e) {
  // If any dropdown changes within a particular section, query runs again
  // It returns new shop.list
  const modifydropdowns = await shop.queryForDropdowns(e);

  // console.log('shop', shop);
  // console.log('shop.list', shop.list);
  // console.log('modifydropdowns', modifydropdowns);
  // console.log('shop.selected', shop.selected);
  const curListCategory = await modifydropdowns[shop.curCategory];
  // console.log('shop.list[shop.curCategory', shop.list[shop.curCategory]);

  const newArray = [];
  if (shop.curCategory === 'song') {
    if (Object.entries(curListCategory).length > 0) {
      Object.entries(curListCategory)
        // Filter for array. There can be also object for a specific product (song etc)
        .filter(onlyArray => Array.isArray(onlyArray[1]))
        // Concatenating multiple arrays from song section
        .forEach((arr) => {
          newArray.push(...arr[1]);
        });
    }

    const newHtml = await buildDropdowns(newArray, shop.curCategory);
    insertIntoHTML(newHtml, [shop.curCategory]);
    document.querySelectorAll(`.shopping__dropdown--${shop.curCategory}`).forEach(input => input.addEventListener('change', queryitem));
    
    // After new list is displayed, make sure that previously selected songs will be checked
    if (Object.entries(curListCategory).length > 0) {
      Object.entries(curListCategory)
        // Filter for array. There can be also object for a specific product (song etc)
        .filter(each => each[0].includes('song'))
        // Concatenating multiple arrays from song section
        .forEach((arr) => {
          // console.log('Select to', arr);
          document.querySelector(`input[value="${arr[0]}"]`).checked = true;
          // arr[1].checked = true;
          // arr[1].style.color = 'red';
        });
    }
    
    // .filter(onlyArray => !Array.isArray(onlyArray[1]))
    // .forEach(i => {
    //   // if (i[0].includes('song')) i[0].checked;
    //   console.log('Checking selected', i);
    //   i.checked;
    // });
  }
  // Passing shop.list for display
  displayInTheDom(modifydropdowns);
}

async function queryitem(e) {
  const modifydropdowns = await shop.queryForDropdowns(e);
  displayInTheDom(modifydropdowns);
}

function runApi() {
  // Print categories list to the <select> (if exists)
  event.getCategoriesAPI()
    .then((list) => {
      // Printing categories
      eventUi.printCategories(list);
    });

  // Read the values if input exists. If not assign defaults
  // let eventName = '';
  const eventName = document.querySelector('#event-name') !== null
    ? document.querySelector('#event-name').value
    : 'Metallica';

  const category = document.querySelector('#category') !== null
    ? document.querySelector('#category').value
    : 103;

  if (eventName !== '') {
    event.queryAPI(eventName, category)
      .then((events) => {
        // Checking events
        const eventList = events.events.events;
        if (eventList.length > 0) {
          // Printing events to the DOM
          eventUi.displayEvents(eventList);
        } else {
          // No events
          console.log('No events found');
        }
      });
  }
}

document.addEventListener('DOMContentLoaded', main);

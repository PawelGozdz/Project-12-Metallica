// import '../scss/main.scss';
// import 'bootstrap';
import { glowing, expandListItems, dropdowns } from './cssEffects';
import { asideMenu, asideSlider } from './asideMenu';
// import { Event } from './EventApi';
// import { EventUI } from './EventUI';
import { topNavbar } from './topNavigation';
import { shoppingTabs } from './shoppingTabs';
import { Popular } from './PopularConstr';
import { updatePopular } from './popularUI';
import { SHOP } from './ShopConstr';
import { buildDropdowns, insertIntoHTML } from './shopUI';

// const event = new Event();
// const eventUi = new EventUI();
const popular = new Popular();
const shop = new SHOP();

async function main() {
  eventListeners();
  // Run aside Slider
  asideSlider();
  // Run glowing effect
  setInterval(() => glowing(), 1900);
  // runApi();
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
  insertIntoHTML(albumStr, ['album', 'song'], 'album');
  // Build Type dropdown
  const typeStr = await buildDropdowns(initialList[1], 'type');
  // Insert into type
  insertIntoHTML(typeStr, ['cloth'], 'type');
  // Build Size dropdown
  const sizeStr = await buildDropdowns(initialList[2], 'size');
  // Insert into size
  insertIntoHTML(sizeStr, ['cloth'], 'size');
  // Build Gender dropdown
  const genderStr = await buildDropdowns(initialList[3], 'sex');
  // Insert into gender
  insertIntoHTML(genderStr, ['cloth'], 'sex');
  // Build Results dropdown
  // const clothStr = await buildDropdowns(initialList[4], 'cloth');
  // Insert into cloth
  // insertIntoHTML(clothStr, ['cloth']);
  // // Build Other dropdown
  const otherStr = await buildDropdowns(initialList[4], 'other');
  // Insert into other
  insertIntoHTML(otherStr, ['other'], 'gadget');
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
  console.log(shop);
  // const queryResults = [];
  await shop.queryForDropdowns(e);

  const newArray = [];

  Object.entries(shop.list[shop.curCategory]).forEach(arr => {
    newArray.push(...arr[1]);
  });
  console.log('New Arr', newArray);

  const newHtml = await buildDropdowns(newArray, shop.curCategory);
  insertIntoHTML(newHtml, [shop.curCategory]);
    
  // Reasign Listeners
  document.querySelectorAll('.shopping__dropdown input[type="checkbox"]').forEach(input => input.addEventListener('change', queryForSpecificSection));


  // console.log('build', build);
  // values.map(el => el.then(data => dataArray.push(data)));
  // const query = await buildDropdowns(queryPromise, shop.curCategory);
  // .then(records => console.log(records));
  // console.log(await query);
  // const checkSection = (e) => { shop.queryForDropdowns(e); } !== undefined
  //   ? (e) => { shop.queryForDropdowns(e); }
  //   : '';
  // Query cloth

  // Query other
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

// import '../scss/main.scss';
// import 'bootstrap';
import { glowing, expandListItems } from './cssEffects';
import { asideMenu, asideSlider } from './asideMenu';
import { Event } from './eventapi';
import { UI } from './eventui';
import { topNavbar } from './topNavigation';
import { shoppingTabs } from './shoppingTabs';
import { Shop } from './shoppingui';

const event = new Event();
const ui = new UI();
const shop = new Shop();
// let ui = '';
// console.log(ui);

function main() {
  eventListeners();
  asideSlider();
  setInterval(() => glowing(), 1900);
  runApi();
  topNavbar();
  shop.displayRandomRecords();
}

function eventListeners() {
  document.querySelectorAll('.aside__icon').forEach(el => el.addEventListener('click', asideMenu));
  document.querySelectorAll('.albums__img').forEach(el => el.addEventListener('click', expandListItems));
  document.querySelectorAll('.shopping__tab').forEach(el => el.addEventListener('click', shoppingTabs));
  document.querySelectorAll('.shopping__a').forEach(el => el.addEventListener('click', fetchFromDB));
}


function runApi() {
  // Print categories list to the <select> (if exists)
  event.getCategoriesAPI()
    .then((list) => {
      // Printing categories
      ui.printCategories(list);
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
          ui.displayEvents(eventList);
        } else {
          // No events
          console.log('No events found');
        }
      });
  } else {
    // Print message
  }
}

function readRegularVariablesFromDB() {
  return new Promise((resolve, reject) => {
    // const dataFomDB = fetch(`/?song=5`);

    // resolve('Resolve', resolve);
    // reject('reject', reject);
    console.log('From Promise');
  });
}

document.addEventListener('DOMContentLoaded', main);

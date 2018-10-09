import '../scss/main.scss';
import 'bootstrap';
import glowing from './cssEffects';
import { asideMenu, asideSlider } from './asideMenu';
import { Event } from './eventapi';
import { UI } from './eventui';

const event = new Event();
const ui = new UI();
// let ui = '';
// console.log(ui);

function main() {
  eventListeners();
  asideSlider();
  setInterval(() => glowing(), 1900);
  runApi();
}

function eventListeners() {
  document.querySelectorAll('.aside__icon').forEach(el => el.addEventListener('click', asideMenu));
}

function runApi() {
  // Print categories list to the <select> (if exists)
  event.getCategoriesAPI()
    .then((list) => {
      
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

document.addEventListener('DOMContentLoaded', main);

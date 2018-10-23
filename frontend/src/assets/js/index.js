// import '../scss/main.scss';
// import 'bootstrap';
import { glowing, expandListItems } from './cssEffects';
import { asideMenu, asideSlider } from './asideMenu';
import { Event } from './eventapi';
import { EventUI } from './eventui';
import { topNavbar } from './topNavigation';
import { shoppingTabs } from './shoppingTabs';
import { Shop } from './shoppingui';
import { updateShopping } from './updateShopping';

// const event = new Event();
// const ui = new EventUI();
const shop = new Shop();
// let ui = '';
// console.log(ui);

function main() {
  eventListeners();
  asideSlider();
  setInterval(() => glowing(), 1900);
  // runApi();
  topNavbar();
  shop.displayRandomRecords();
  updateShopping();
}

function eventListeners() {
  document.querySelectorAll('.aside__icon').forEach(el => el.addEventListener('click', asideMenu));
  document.querySelectorAll('.albums__img').forEach(el => el.addEventListener('click', expandListItems));
  document.querySelectorAll('.shopping__tab').forEach(el => el.addEventListener('click', shoppingTabs));
}

// // Update dynamically inserted records fron shopping section
// function updateShopping() {
//   /**
//    * Data format (album.11, song.55 etc)
//    * where word (album) is a category and number (11) is an id
//    */
//   const elements = [...document.querySelectorAll('.shopping__category')];
//   const imgAttributes = [...document.querySelectorAll('.shopping__img')];
//   // Getting values from html and preparing them for fetch
//   const modifyArr = elements.map(el => el.textContent.replace(/{|}/g, ''))
//     .map(str => str.split('.'));

//   const fetchArr = [];
//   // Start all 16 promises at once and requesting data from DB
//   modifyArr.forEach(ele => fetchArr.push(fetch(`/?${ele[0]}=${ele[1]}`)));

//   // Returning all data at the same tie
//   const runPromises = Promise.all([...fetchArr]);
//   runPromises.then(response => response.map(val => val.json()))
//     .then((values) => {
//       const dataArray = [];
//       values.map(el => el.then(data => dataArray.push(data)));
//       return dataArray;
//     })
//     // Formating data for interpolation (ie. album.1, song.66, cloth.5 etc)
//     .then((dataArr) => {
//       return dataArr.reduce((acc, val, i, arr) => {
//         const x = Object.keys(val);
//         const category = x[1];
//         const subCategory = x[2] ? x[2] : undefined;

//         acc[`${category}.${val.id}`] = {
//           category: val[category],
//           subCategory: val[subCategory]
//         };
//         return acc;
//       }, {});
//     })
//     .then((data) => {
//       elements.forEach((element, index) => {
//         const el = element.textContent.replace(/{|}/g, '');

//         const alt = imgAttributes[index]
//           .getAttribute('alt')
//           .replace(`{${el}}`, `${data[el].category}`);

//         const title = imgAttributes[index]
//           .getAttribute('title')
//           .replace(`{${el}}`, `${data[el].category}`);

//         imgAttributes[index].setAttribute('alt', alt);
//         imgAttributes[index].setAttribute('title', title);

//         element.textContent = el.replace(el, `${data[el].category}`);
//       });
//     })
//     .catch(err => console.log(Error(err)));
// }

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

document.addEventListener('DOMContentLoaded', main);

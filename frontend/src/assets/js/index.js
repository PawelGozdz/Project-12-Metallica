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
  // Query Albums
  const initialList = await shop.initiateStaticDropdown();
  // Build albums dropdowns
  const albumStr = await buildDropdowns(initialList[0], 'album');
  // // Inserting dropdown elements into 'album' dropdowns in sections 'album' and 'song'
  insertIntoHTML(albumStr, ['album', 'song']);
  // Build Clothes dropdown
  const clothStr = await buildDropdowns(initialList[1], 'cloth');
  // Insert into cloth
  insertIntoHTML(clothStr, ['cloth']);
  // Build Other dropdown
  const otherStr = await buildDropdowns(initialList[2], 'other');
  // Insert into cloth
  insertIntoHTML(otherStr, ['other']);
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
  // const queryResults = [];
  const returnPromiceWithDBRecords = shop.queryForDropdowns(e);
  // const newArr = returnPromiceWithDBRecords.then(data => data.map(el => el));
  // const returnPromiceWithDBRecords = shop.queryForDropdowns(e).then(arr => arr.map(el => el)).length > 1 
  //   ? shop.queryForDropdowns(e).then(arr => arr.map(el => el))
  //   : [];
  // const newHtml = buildDropdowns(shop.list[shop.curCategory], shop.curCategory);
  // for (const [key, val] of Object.entries(shop.list)) {
  //   console.log('Przed przekazaniem', key, val);
  // }

  // const curCategorySelection = Object.entries(shop.list)
  //   .filter(cat => cat[0] === shop.curCategory)[0][1];
  const newAr = [];
  const curCategorySelection = Object.entries(shop.list)
    .filter(cat => cat[0] === shop.curCategory);

    const ab = curCategorySelection[0][1];

    const newHtml = buildDropdowns(curCategorySelection[0][1], shop.curCategory);

    // for (const [a, b] in curCategorySelection[0][1]) {
    //   console.log('inside loop', a);
    // }
    
    // const iii = Object.entries(ab);
    // iii.forEach(i => console.log('i print', i));
    
    // console.log('smienna', curCategorySelection[0][1]);
    // console.log('ab', Object.keys(ab));
    // console.log('iii', iii);
    // console.log('ab', ab);

    //   return acc;
    // });
    // const newD = Object.entries(curCategorySelection[0]);
    // console.log(newD);

    // for (const x of newD) {
    //   newAr.push(...x[1]);
    // }

    // const newHtml = await buildDropdowns(newAr, shop.curCategory);

    // .reduce((acc, val, i, arr) => {

    //   // acc.push(...val[1]);
    //   // console.log(val[1]);
    //   acc += Object.values(val);
    //   console.log('acc', acc);

    //   return acc;
    // });
    // .map(ell => {
    //   // let iii = Object.entries(ell);
    //   console.log(iii);
      
    // });


    // console.log(Array.isArray(curCategorySelection));

    // .map(a => {
    //   console.log(a[0]);
    // });
    // .reduce((acc, val, i, arr) => {

      

    //   return acc;
    // });


    // for (const [a, b] of Object.entries(curCategorySelection[0])) {
    //   // const [x, y] = b;
    //   console.log(a, b);
    //   newAr.push(...b);
    // }


    // const ob = curCategorySelection.reduce((acc, val, i, arr) => {
    //   console.log('Tutaj val', val);
    //   console.log(Object.entries(val[1]))
    //   console.log('Tutaj acc', acc);
    //   // console.log('Tutaj', Object.entries(val));
    //   return acc;
    // });

    

    // for (const a in curCategorySelection[0]) {
    //   console.log(a);
    // }
    // const ab = [];
    // Object.entries(curCategorySelection[0]).forEach(ell => {
    //   const [key, val] = ell;
    //   console.log('key', key, 'val', val);
    //   ab.push(...val);
    // });

    // Object.entries(data).forEach((el) => {
    //   const [key, val] = el;
    //   if (typeof (key) === 'string') str = str.replace(`{${key}}`, val);
    // });
    // Object.entries(curCategorySelection[0]).forEach(ev => ab.push(ev));
    
    // .map(ell => ell);
    // curCategorySelection.forEach(aa => );
    // .map(ell => newAr.push(...Object.values(ell)));
    

    // console.log(Object.values(curCategorySelection));
    
    // console.log('ab',ab);
    // console.log('newAr', newAr);
    // console.log('joinArr', joinAllCategoryArrays);


    
    
    // Object.entries(curCategorySelection)
    //   .forEach(el => console.log('el', el));
      // .reduce((acc, val, i, arr) => {
      //   console.log(val);
      //   // acc = [].push(...val);
      //   acc.push(...val[1]);
      //   return acc;
      // });
      // console.log('End', newSelectionArray);
    // .reduce((acc, val, i, arr) => {

    //   acc.push(...val);
    //   // console.log('To jest value', val);
    //   val.forEach(el => console.log(el));
    //   for (const insideObj in val)

    //   return acc;
    // }, []);
    // console.log('aaa', aaa);

  // shop.list.then(li => console.log(li));
  
  // console.log(shop);
  // .then((values) => {
  //   const dataArray = [];
  //   values.map(el => el.then(data => dataArray.push(data)));
  //   return dataArray;
  // })

  // const buildDropdown = await buildDropdowns(shop.list, shop.curCategory);
  // await buildDropdowns(shop.list, shop.curCategory);
  // const returnPromiceWithDBRecords = await shop.queryForDropdowns(e).then(arr => arr.map(el => el));
  // console.log(returnPromiceWithDBRecords);
    // .then(data => data.map(el => el))
    // .catch((e) => Error(e));

  // const queryResults = await shop.currentQuery || 0;
  // const buildDropdown = await buildDropdowns(returnPromiceWithDBRecords, shop.curCategory);
  // console.log('str', buildDropdown);
  // insertIntoHTML(buildDropdown, ['song']);
  // await console.log('SELECTED', shop.selected);
  // await console.log('LIST', shop.list);
  // await console.log('QUERY', shop.currentQuery);

  // Reasign Listeners
  // document.querySelectorAll('.shopping__dropdown input[type="checkbox"]').forEach(input => input.addEventListener('change', queryForSpecificSection));

  // console.log('Build index', buildDropdown);

  // console.log(queryResults);
  // console.log(shop.curCategory);

  // const build = await buildDropdowns(queryPromise);
  // console.log('build', build);
  // values.map(el => el.then(data => dataArray.push(data)));
  // const query = await buildDropdowns(queryPromise, shop.curCategory);
  // .then(records => console.log(records));
  // console.log(await query);
  // const checkSection = (e) => { shop.queryForDropdowns(e); } !== undefined
  //   ? (e) => { shop.queryForDropdowns(e); }
  //   : '';
  // const returnQuery = buildDropdowns(shop.currentQuery, shop.curCategory);
  // Query songs based on chosen albums
  // const songList = await buildDropdowns(shop.selected.song);
  // console.log('shop.selected', shop.selected);
  // console.log('shop.currentQuery', shop.currentQuery);
  // console.log('shop.category', shop.curCategory);
  // console.log('return input str', await returnQuery);
  // console.log('Song list - index.js', songList);
  // const songList = await shop.queryForDropdowns();
  // const songStr = await await buildDropdowns(songList);
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

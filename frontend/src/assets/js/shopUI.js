async function buildDropdowns(data, curCategory) {
  const newArr = await data;

  // Each category has different output
  /**
   * Album - img src as album
   * Song - img src as album cover(don't have song pictures)
   * Cloth - img src as one of 7 available pictures or cloth-0 as default
   * Other - img src as one of 6 available pictures
   */

  let returnStr = '<p>Choose album</p>';
  if (newArr.length < 1) return returnStr;

  returnStr = newArr.reduce((acc, val, i, array) => {
    const [key, v] = Object.keys(val);

    let imgCat;
    let imgNum;

    imgCat = curCategory === 'song' ? 'album' : curCategory;
    imgNum = curCategory === 'song' ? val.albumId : val[key];

    const image = `<img src="./assets/img/${imgCat}-${imgNum}.jpg" alt="${val[curCategory]} ${curCategory}">`;

    acc += `
      <label title="${val[curCategory]} ${curCategory}">
        <input type="checkbox" value="${curCategory}.${val[key]}">${val[curCategory].substring(0, 8)}
        <span>${image}</span>
      </label>
    `;
    return acc;
  }, '');

  return returnStr;
}

function insertIntoHTML(str, categoryTab, subCategory = false) {
  /**
   * categoryTab - 1 of 3 (album, song, other)
   */
  categoryTab.forEach((element) => {
    if (document.querySelector(`#${element} .shopping__dropdown--${categoryTab}`)) {
      document.querySelector(`#${element} .shopping__dropdown--${categoryTab}`).innerHTML = str;
    }
  });
}


function displayInTheDom(list) {
  // Print summary
  const summaryData = Object.entries(list);
  summaryData.forEach((category) => {
    let index = 0;

    if (Object.keys(category[1]).length > 0) {
      // Category 'song' contains sub category 'album' & 'song', therefore further filter is needed
      // because we want to count only 'song'. 'album' is just for display song list
      Object.keys(category[1]).forEach((el) => {
        if (el.split('.')[0] === category[0]) index += 1;
      });
    }
    // Insert into summary
    document.querySelector(`#summary-${category[0]}`).textContent = index;
  });

  // Album
  summaryData.forEach((category) => {
    const [key, val] = category;
    
    // If statement to aviod looping through empty section and throwing errors
    // or adding empty strings to the DOM
    if (Object.keys(category[1]).length > 0) {
      let html = '';
  
      for (const x in val) {
        let imgCat;
        let imgNum;

        imgCat = category[0] === 'song' ? 'album' : x.split('.')[0];
        imgNum = category[0] === 'song' ? val[x]['albumId'] : x.split('.')[1];

        // Additional logic. 
        // Want to aviod adding elements from 'album' dropdown from 'song' section to the DOM        
        if (imgNum !== undefined) {
          // 'album' / 'song' / 'other' title
          const content = val[x][category[0]];
          const image = `<img src="./assets/img/${imgCat}-${imgNum}.jpg" alt="${content}" title="${content}">`;

          html += `
            <figure class="shopping__component">
              ${image}
              <figcaption>${content}</figcaption>
            </figure>
          `;
        }
      }

      document.querySelector(`.shopping__container--${category[0]} .shopping__components`).innerHTML = html;
    }
  });
}

export { buildDropdowns, insertIntoHTML, displayInTheDom };

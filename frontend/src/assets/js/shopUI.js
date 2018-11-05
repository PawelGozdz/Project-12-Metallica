

async function buildDropdowns(data, curCategory) {
  const newArr = await data;
  // console.log('BBB', newArr);
  // console.log('Category', curCategory);

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

    // console.log(key, v);

    let imgCat;
    let imgNum;
    
    imgCat = curCategory === 'song' ? 'album' : curCategory;
    imgNum = curCategory === 'song' ? val.albumId : val[key];
    // imgCat = curCategory === 'cloth' || curCategory === 'song' ? 'album' : curCategory;
    // imgNum = curCategory === 'cloth' || curCategory === 'song' ? val.albumId : val[key];
    
    // console.log('2...imgCat', imgCat, 'imgNum', imgNum);
    // imgCat = curCategory === 'cloth' ? 'cloth' : curCategory;
    // imgNum = curCategory === 'cloth' ? val.albumId : val[key];

    const image = `<img src="./assets/img/${imgCat}-${imgNum}.jpg" alt="${val[curCategory]} ${curCategory}">`;

    // Categories 'type', 'size' and 'gender, don't need image
    // const ab = curCategory === ('type', 'sex', 'size')
    // if (curCategory === 'size' || curCategory === 'sex') image = '';
    // console.log('link:', image);
    // if (curCategory === 'song') const { id, song, albumId, album, price } = val;
    // Choosing category
    // if (curCategory === 'song') curCategory = 'album'

    acc += `
      <label title="${val[curCategory]} ${curCategory}">
        <input type="checkbox" value="${curCategory}.${val[key]}">${val[curCategory].substring(0, 8)}
        <span>${image}</span>
      </label>
    `;
    return acc;
  }, '');

  // console.log('Ret.str', returnStr);
  return returnStr;
  // try {
  // } catch (e) {
  //   return Error(e);
  // }
}

function insertIntoHTML(str, categoryTab, subCategory = false) {
  // console.log('to jest string', str);
  /**
   * categoryTab - 1 of 4 (album, song, cloth, other)
   * subCategory - dropdown name in categoryTab. cloth's subCategory (type, size, gender, results)
   */
  // console.log('STRING', str);
  // console.log('GRAB', document.querySelector(`#${categoryTab} .shopping__dropdown--${categoryTab}`));
  categoryTab.forEach(element => document.querySelector(`#${element} .shopping__dropdown--${subCategory || categoryTab}`).innerHTML = str);
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
        // console.log('el', el);
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
      // console.log('html', html);
  
      for (const x in val) {
        let imgCat;
        let imgNum;

        console.log('imgCat', x.split('.')[0]);
        console.log('imgNum', x.split('.')[1]);
        
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
      console.log('Before entry', html);
      console.log('Element', `.shopping__container--${category[0]}`);
      // console.log()
      document.querySelector(`.shopping__container--${category[0]} .shopping__components`).innerHTML = html;
    }
  });

  // const insertHMTL = summaryData.reduce((acc, val, i) => {

  //   if (Object.keys(val[1]).length > 0) {
      
  //     Object.entries(val).forEach((el) => {
  //       console.log('el', el);
  //       // if (el.split('.')[0] === category[0]) index += 1;
  //     });
  //   }

  //   // acc += `
  //   //   <figure class="shopping__component">
  //   //     <img src="./assets/img/${}.jpg" alt="">
  //   //     <figcaption>Master of Puppets</figcaption>
  //   //   </figure>
  //   // `;

  //   return acc;
  // }, '');

  // console.log('category', category[1]);

  // Build shopping component to display


  // const html = '';
  // Object.entries(category).forEach(el => {
  //   console.log('el', el);
  //   // console.log('el 1', el[1]);
  //   // html += `
  //   //   <figure class="shopping__component">
  //   //     <img src="./assets/img/${el[0].replace(".", "-")}.jpg" alt="">
  //   //     <figcaption>Master of Puppets</figcaption>
  //   //   </figure>
  //   // `;

  // });
  // console.log(html);

}

export { buildDropdowns, insertIntoHTML, displayInTheDom };

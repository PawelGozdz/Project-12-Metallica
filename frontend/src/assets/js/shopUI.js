

async function buildDropdowns(data, curCategory) {
  /**
   * 
   * arr - it's an array with arrays
   */
  // console.log('See', data[curCategory]);
  // // const chooseArray = data || data[curCategory];
  console.log('Arr for building Label', data, curCategory);
  // // const responseArray = await chooseArray;
  // if (data.length === undefined) {
  //   console.log('To jest object');
  // } else {
  //   console.log('To jest arrajka');

  
  
  // }
  let newArr = await data;
  console.log('BBB', newArr);
  
  if (!Array.isArray(newArr)) {
    console.log('DATA', newArr);
    console.log('DATA', Object.keys(newArr).length);

    // for (const x in newArr) {
    //   console.log('aaaa', x);
    // }
  }

  //*************************
    // Sprawdzic dlaczego nie drukuje obiektu, oraz przerobic obiekt shop.list na tablice z elementami wszystkimi w jednej array
    // zeby moc to wydrukowac w inpucie
  //*/

  // if (!Array.isArray(newArr)) {
  //   console.log('Trzeba to przerobic na array');
  //   const ccc = [];
  //   for (const x in newArr) {
  //     console.log('record z obiektu', x);
  //   }
  //   // Object.entries(newArr).forEach(each => {
  //   //   console.log(each);
  //   // });
  //   // const abc = [...newArr];
  //   // console.log(abc);
  //   // for (const x in newArr) {
  //   //   x.forEach(el => ccc.push(el));
  //   // }
  //   // console.log('inside', ccc);
  // } else {
  //   newArr = newArr;
  // }


  // const extendedArr = [];

  // newArr.forEach(each => {
  //   console.log(each);
  //   each.forEach(el => extendedArr.push(el));
  // });

  // newArr.forEach(each => {
  //   for (const x of each) {
  //     // // const { key, val } = x.entries();
  //     // // console.log(key, val);
  //     // console.log(x);
  //     extendedArr.push(x);
  //   };
  // });


  // console.log('ExtendedArr', extendedArr);

  // Each category has different output
  /**
   * Album - img src as album
   * Song - img src as album cover(don't have song pictures)
   * Cloth - img src as one of 7 available pictures or cloth-0 as default
   * Other - img src as one of 6 available pictures
   */

  const returnStr = newArr.reduce((acc, val, i, array) => {
    const [key, v] = Object.keys(val);
    // console.log('val', val);

    // const category = v === ('album' || 'song' || 'clothe' || 'other') && v !== undefined
    //   ? ('album' || 'song' || 'clothe' || 'other')
    //   : '';

    let imgCat;
    let imgNum;
    imgCat = curCategory === 'song' ? 'album' : curCategory;
    imgNum = curCategory === 'song' ? val.albumId : val[key];

    imgCat = curCategory === 'cloth' ? 'album' : curCategory;
    imgNum = curCategory === 'cloth' ? val.albumId : val[key];
    
    // imgCat = curCategory === 'cloth' ? 'cloth' : curCategory;
    // imgNum = curCategory === 'cloth' ? val.albumId : val[key];

    const image = `<img src="./assets/img/${imgCat}-${imgNum}.jpg" alt="${val[curCategory]} ${curCategory === 'cloth' ? '' : curCategory}">`;
    // if (curCategory === 'song') const { id, song, albumId, album, price } = val;
    // Choosing category
    // if (curCategory === 'song') curCategory = 'album'

    console.log('curCategory', curCategory);

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

function insertIntoHTML(str, categoryTab) {
  // console.log('STRING', str);
  // console.log('GRAB', document.querySelector(`#${categoryTab} .shopping__dropdown--${categoryTab}`));
  categoryTab.forEach(element => document.querySelector(`#${element} .shopping__dropdown--${categoryTab}`).innerHTML = str);
}


export { buildDropdowns, insertIntoHTML };

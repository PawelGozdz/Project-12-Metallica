

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

  const returnStr = newArr.reduce((acc, val, i, array) => {
    const [key, v] = Object.keys(val);

    // console.log(key, v);

    let imgCat;
    let imgNum;
    
    imgCat = curCategory === 'cloth' || curCategory === 'song' ? 'album' : curCategory;
    imgNum = curCategory === 'cloth' || curCategory === 'song' ? val.albumId : val[key];
    
    // console.log('2...imgCat', imgCat, 'imgNum', imgNum);
    // imgCat = curCategory === 'cloth' ? 'cloth' : curCategory;
    // imgNum = curCategory === 'cloth' ? val.albumId : val[key];

    let image = `<img src="./assets/img/${imgCat}-${imgNum}.jpg" alt="${val[curCategory]} ${curCategory === 'cloth' ? '' : curCategory}">`;

    // Categories 'type', 'size' and 'gender, don't need image
    // const ab = curCategory === ('type', 'sex', 'size')
    if (curCategory === 'size' || curCategory === 'sex') image = '';
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
  console.log('to jest string', str);
  /**
   * categoryTab - 1 of 4 (album, song, cloth, other)
   * subCategory - dropdown name in categoryTab. cloth's subCategory (type, size, gender, results)
   */
  // console.log('STRING', str);
  // console.log('GRAB', document.querySelector(`#${categoryTab} .shopping__dropdown--${categoryTab}`));
  categoryTab.forEach(element => document.querySelector(`#${element} .shopping__dropdown--${subCategory || categoryTab}`).innerHTML = str);
}


export { buildDropdowns, insertIntoHTML };

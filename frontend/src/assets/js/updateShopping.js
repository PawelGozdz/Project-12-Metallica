// Update dynamically inserted records fron shopping section
function updateShopping() {
  /**
   * Data format (album.11, song.55 etc)
   * where word (album) is a category and number (11) is an id
   */
  const elements = [...document.querySelectorAll('.shopping__category')];
  const imgAttributes = [...document.querySelectorAll('.shopping__img')];
  // Getting values from html and preparing them for fetch
  const modifyArr = elements.map(el => el.textContent.replace(/{|}/g, ''))
    .map(str => str.split('.'));

  const fetchArr = [];
  // Start all 16 promises at once and requesting data from DB
  modifyArr.forEach(ele => fetchArr.push(fetch(`/?${ele[0]}=${ele[1]}`)));

  // Returning all data at the same tie
  const runPromises = Promise.all([...fetchArr]);
  runPromises.then(response => response.map(val => val.json()))
    .then((values) => {
      const dataArray = [];
      values.map(el => el.then(data => dataArray.push(data)));
      return dataArray;
    })
    // Formating data for interpolation (ie. album.1, song.66, cloth.5 etc)
    .then((dataArr) => {
      return dataArr.reduce((acc, val, i, arr) => {
        const x = Object.keys(val);
        const category = x[1];
        const subCategory = x[2] ? x[2] : undefined;
        const subCategoryId = x[3] ? x[3] : undefined;

        acc[`${category}.${val.id}`] = {
          category: val[category],
          subCategory: val[subCategory],
          subCategoryId: val[subCategoryId]
        };
        return acc;
      }, {});
    })
    // Interpolating variables
    .then((data) => {
      elements.forEach((element, index) => {
        // Removing '{}' from variable
        const el = element.textContent.replace(/{|}/g, '');

        // Interpolating attributes
        const alt = imgAttributes[index]
          .getAttribute('alt')
          .replace(`{${el}}`, `${data[el].category}`);

        const title = imgAttributes[index]
          .getAttribute('title')
          .replace(`{${el}}`, `${data[el].category}`);

        const src = imgAttributes[index]
          .getAttribute('src')
          .replace(`${el.replace('.', '-')}`, `album-${data[el].subCategoryId}`);

        imgAttributes[index].setAttribute('alt', alt);
        imgAttributes[index].setAttribute('title', title);

        // No photos for each songs, therefore album cover instead
        if (el.includes('song') && data[el].subCategoryId) {
          imgAttributes[index].setAttribute('src', src);
        }

        // element.textContent = el.replace(el, `${data[el].category}`);
        
        // Truncating song title if it's too long
        const trimmedTitle = data[el].category
          .split(' ')
          .reduce((acc, word) => {
            const arrMaxLength = 17;

            word.length + acc.length < arrMaxLength
              ? acc.push(...word, ' ')
              : acc.push(...'...');

            return acc;
          }, [])
          .join('');

        element.textContent = el.replace(el, trimmedTitle);
      });
    })
    .catch(err => console.log(Error(err)));
}

export { updateShopping };

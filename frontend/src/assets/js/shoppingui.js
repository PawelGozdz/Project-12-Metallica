class Shop {
  constructor() {
    this.displayRecords = 4;
    this.random = [];
    this.cart = {};
    this.topAlbums = this.assignarray(this.displayRecords, 11) || [];
    this.topSongs = this.assignarray(this.displayRecords, 6) || [];
    this.topClothes = this.assignarray(this.displayRecords, 6) || [];
    this.topOther = this.assignarray(this.displayRecords, 6) || [];
  }

  // Range - it's a maximum number which is going to be put into an array
  // It's because, I wanted to avoid uploading too many images onto the server
  assignarray(number = this.displayRecords, range) {
    return this.getRandomArray(number, range);
  }

  // Calculate a range and a size of the array
  getRandomArray(size, maxNr) {
    const randomNr = {};

    for (let i = 0; Object.keys(randomNr).length < size; i++) {
      const random = Math.floor(Math.random() * `${maxNr}`) + 1;
      // Adding 'value' and remove later on to avoid default sorting inside an object
      randomNr[`value${random}`] = (randomNr[random] || 0) + 1;
    }

    const arr = [];
    for (let key in randomNr) {
      // Removing 'value' from the string
      arr.push(Number(key.replace('value', '')));
    }

    return arr;
  }

  displayRandomRecords() {
    // Grapping all tabs together (albums, songs, clothes, other)
    const shoppingBottom = Array.from(document.querySelectorAll('.shopping__body .shopping__bottom .row'));

    shoppingBottom.forEach((tab, index) => {
      let builtString = '';
      if ((index + 1) === 1) builtString = this.buildRandomDisplay(this.topAlbums, 'album');
      if ((index + 1) === 2) builtString = this.buildRandomDisplay(this.topSongs, 'song');
      if ((index + 1) === 3) builtString = this.buildRandomDisplay(this.topClothes, 'cloth');
      if ((index + 1) === 4) builtString = this.buildRandomDisplay(this.topOther, 'other');

      tab.innerHTML = builtString;
    });
  }

  buildRandomDisplay(arrNumbers, subjectType) {
    let elementHMTL = ''
    arrNumbers.forEach((number, index) => {
      elementHMTL += `
        <div class="col-6 col-sm-3">
          <figure class="shopping__position shopping__position--${index + 1}">
            <img src="./assets/img/${subjectType}-${number}.jpg" alt="${subjectType}-${number}" class="shopping__img">
            <figcaption>{${subjectType}.${number}}</figcaption>
            <a href="/?albums=2&?song=13" class="shopping__a">link</a>
          </figure>
        </div>
      `;
    });

    return elementHMTL;
  }
} 

export { Shop };

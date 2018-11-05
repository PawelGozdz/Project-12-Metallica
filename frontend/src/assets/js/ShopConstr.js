class SHOP {
  constructor() {
    this.list = {
      album: {},
      song: {},
      other: {}
    };
    this.deleteItem = '';
  }

  // Static dropdowns are the ones, which are loading with page start
  async initiateStaticDropdown() {
    try {
      const fetchAlbums = fetch('/?category=album&album=all');
      const fetchOther = fetch('/?category=other&other=all');
      this.initiate = Promise.all([fetchAlbums, fetchOther])
        .then(response => response.map(val => val.json()))
        .then((values) => {
          const dataArray = [];
          values.map(el => el.then(data => dataArray.push(data)));
          return dataArray;
        });
      return this.initiate;
    } catch (e) {
      return Error(e);
    }
  }

  // These dropdowns are the ones, which are called after clicking static dropdown (the one mentioned above)
  async queryForDropdowns(e) {
    /**
     * SCHEMA
     * albums & other need no parameters. Pul 'all' as default
     * ALBUMS - albums load with page start
     * SONGS - album.id needed
     * OTHER - no parameters needed
     */

    const curValue = e.target.getAttribute('value');
    const ancestor = e.target.closest('.shopping__body');
    this.curCategory = ancestor.getAttribute('id');

    // If section clicked, each 'checked' input will be added to list
    /** */

    // If section === album, no action to be taken. Will query DB for all available albums 
    /**
     * EXAMPLE URL: http://localhost:3000/?category=album&album=all
     * Grab all 'checked elements' and add them to the DOM
     * * Unchecked remove
     */
      
    // this query runs when checkbox is clicked and 'checked'
    if (this.curCategory === 'album' && curValue.includes('album')) {
      this.queryUrl = `/?${this.curCategory}=${curValue.split('.')[1]}`;
    }

    // If section === song, query DB for songs based on what album has been chosen.
    /**
     * EXAMPLE URL: http://localhost:3000/?category=song&album=2
     * Grab all 'albums' which are checked, and query songs based on that
     * Add checked songs to the DOM
     * Unchecked remove
    //  */


    // There are two dropdowns in 'song' section. 'album' & 'song'
    // 'album' doesn't add any elements to the DOM. It adds only records to the 'song' dropdown
    // This is a query for all song for a specific album
    if (this.curCategory === 'song') {
      this.queryUrl = `/?category=${this.curCategory}&album=${curValue.split('.')[1]}`;
    }

    // this query runs when checkbox in 'album' dropdown is 'checked' and request DB for a specific song
    if (this.curCategory === 'song' && curValue.includes('song')) {
      this.queryUrl = `/?${this.curCategory}=${curValue.split('.')[1]}`;
    }

    // If section === other, no action to be taken. Will query DB for all available other items 
    /**
     * EXAMPLE URL: http://localhost:3000/?category=other&other=all
     * Add checked to the DOM
     * Unchecked remove
     */
    //

    // this query runs when checkbox in 'other' dropdown is 'checked' and request DB for a specific other item
    if (this.curCategory === 'other' && curValue.includes('other')) {
      this.queryUrl = `/?${this.curCategory}=${curValue.split('.')[1]}`;
    }


    // Build URL
    this.currentQuery = await new Promise((resolve, reject) => {
      const fetchData = fetch(this.queryUrl);
      if (fetchData) {
        // console.log('FETCH DATA', fetchData);
        return resolve(fetchData);
      }
    })
      .then(data => data.json())
      .catch(e => {});


    // ADDING / DELETING items to/from the list
    if (!this.list[this.curCategory][curValue]) {
      // Adds a new property to the 'list' object
      this.list[this.curCategory][curValue] = this.currentQuery;
    } else {
      // If album gets deleted, songs assosiated to this album need to be removed
      if (this.list[this.curCategory]) {
        Object.entries(this.list[this.curCategory])
          .filter(ctgy => ctgy[0].split('.')[0] === this.curCategory)
          .forEach((el) => {
            this.deleteItem = el;

            if (this.deleteItem[1].albumId === Number(curValue.split('.')[1])) {
              delete this.list[this.curCategory][this.deleteItem[0]];
            }
          });
      }
      // Deleting item from the list if the checkbox is unchecked
      delete this.list[this.curCategory][curValue];
    }

    return this.list;
  }
}

export { SHOP };

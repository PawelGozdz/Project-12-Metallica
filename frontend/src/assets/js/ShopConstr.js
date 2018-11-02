class SHOP {
  constructor() {
    this.selected = {
      album: {},
      song: {},
      cloth: {},
      other: {}
    };
    this.list = {
      album: {},
      song: {},
      cloth: {},
      other: {}
    };
  }

  async initiateStaticDropdown() {
    try {
      const fetchAlbums = fetch('/?category=album&album=all');
      const fetchType = fetch('/?category=type&type=all');
      const fetchSize = fetch('/?category=size&size=all');
      const fetchGender = fetch('/?category=sex&sex=all');
      // const fetchClothes = fetch('/?category=cloth&cloth=all');
      const fetchOther = fetch('/?category=other&other=all');
      this.initiate = Promise.all([fetchAlbums, fetchType, fetchSize, fetchGender, fetchOther])
      // this.initiate = await new Promise((resolve, reject) => {
      //   const fetchAlbums = fetch('/?category=album&album=all');
      //   // const fetchClothes = fetch('/?category=cloth&cloth=all');
      //   // const fetchOther = fetch('/?category=other&other=all');
      //   return resolve(fetchAlbums);
      // })
        .then(response => response.map(val => val.json()))
        .then((values) => {
          const dataArray = [];
          values.map(el => el.then(data => dataArray.push(data)));
          // values.map(el => console.log('first', el));
          // values.map(el => el.then(data => console.log('second', data)));
          return dataArray;
        });
        // .then((values) => {
        //   const dataArray = [];
        //   values.map(el => el.then(data => dataArray.push(data)));
        //   return dataArray;
        // });
      // .then(data => data.map(each => each.json()));
      // .then(album => album.json());
      return this.initiate;
    } catch (e) {
      return Error(e);
    }
  }

  // Initiate dropdowns
  async queryForDropdowns(e) {
    /**
     * SCHEMA
     * 
     * albums & other need no parameters. Pul 'all' as default
     * 
     * ALBUMS - albums load with page start
     * SONGS - album.id needed
     * CLOTH - type(shirt, jacket etc), size ('S', 'M' etc) & sex ('M', 'W', 'U')
     * OTHER - no parameters needed
     */
    const curCheckbox = e.target ? e.target : '';
    // console.log(curCheckbox);
    const curValue = e.target.getAttribute('value');
    // console.log(curValue);
    const ancestor = e.target.closest('.shopping__body');
    this.curCategory = ancestor.getAttribute('id');

    // Succesfull query, add to the object with a list of currently selected elements

    // Add to the this.selected if is not present. If it is (which means is going to be unchecked), remove
    if (!this.selected[this.curCategory][curValue]) {
      this.selected[this.curCategory][curValue] = e.target;
    } else {
      delete this.selected[this.curCategory][curValue];
      // No DB query when unchecking
      // this.currentQuery = new Promise((resolve, reject) => {
      //   return reject([]);
      // });
        // .then(album => album.json());;
      // return this.currentQuery;
    }

    // If section clicked, each input checked add to the buy list
    /** */

    // If section === album, no query to be made.
      /**
       * EXAMPLE URL: http://localhost:3000/?category=album&album=all
       * Grab all 'checked elements' and add them to the DOM
       * Add to the 'selected' & 'list' {}
       * * Unchecked remove
       */


    // If section === song, query songs based on what's checked.
      /**
       * EXAMPLE URL: http://localhost:3000/?category=song&album=2
       * Grab all 'albums' which are checked, and query songs based on that
       * Add to the 'selected' & 'list' {}
       * Add checked songs to the DOM
       * Unchecked remove
       */

      if (this.curCategory === 'song') {
        this.queryUrl = `/?category=${this.curCategory}&album=${curValue.split('.')[1]}`;
      }

    // if section === cloth, query based on selected and add them to the obj/arr which will insert inputs
      /**
       * EXAMPLE URL: http://localhost:3000/?category=cloth&type=jacket&size=M&sex=M
       * Display all categories in dropdowns
       * If at least 1 input is checked in each dropdown, query
       * If there is more than 1 checked in each dropdown, query more than ones using other dropdown inputs for url build
       * Add to the 'selected' & 'list' {}
       * Add checked to the DOM
       * Unchecked remove
       */

      if (this.curCategory === 'cloth') {
        this.queryUrl = `/?category=${this.curCategory}&type=${curValue.split('.')[1]}&size=M&sex=M`;
      }

    // if section === other, query and add to obj/arr
      /**
       * EXAMPLE URL: http://localhost:3000/?category=other&other=all
       * Add to the 'selected' & 'list' {}
       * Add checked to the DOM
       * Unchecked remove
       */
    //

    // Build URL
    if (this.queryUrl) {
      this.currentQuery = await new Promise((resolve, reject) => {
        const fetchData = fetch(this.queryUrl);
        
        return resolve(fetchData);
      })
        .then(data => data.json());
    } else {
      this.currentQuery = {Error: 'Not valid query'};
    }

    // const returnPromise = await this.currentQuery;
      // .then((dbData) => {
      //   dbData.forEach(record => {
      //     this.list[this.curCategory][`${val[this.curCategory]}.${val.id}`] = val;
      //   });
      // });
      
      // return dbData.reduce((acc, val, i, arr) => {
      //   console.log(this.curCategory);

      //   return acc;
      // }, this.list);


      // .then(dbData => dbData.map(el => el));

    
      // .then(dbData => dbData.map(el => el));
      
    
    if (!this.list[this.curCategory][curValue]) {
      this.list[this.curCategory][curValue] = this.currentQuery;
    } else {
      delete this.list[this.curCategory][curValue];
    }
      // No DB query when unchecking
      // this.currentQuery = new Promise((resolve, reject) => {
      //   return reject([]);
      // });`
        // .then(album => album.json());;
      // return this.currentQuery;
    // }
    // Build query URL


    // if ( this.curCategory !== 'album') {
    //   console.log('Nie album');
    // }
    
    // .catch(error => console.error(error));
    return this.currentQuery;
    // if (!category.trim() === 'album') {

    // }


  }

  // getCurrentSelection() {
  //   console.log('Return this.selected', this.selected);
  //   return this.selected;
  // }

  // Dodac event listenery do dropdownow z eventem na 'change'
  // DONE

  // Kazdy 'checked' dodac do obietku THIS.LIST z categoriami / albums / songs / cothes / other
  // DONE
  // Po wybraniu, wysylac requesty i pobrac recordy z DB
  // DONE

  // Recordy dodac do inputow z subcategoriami (jezeli istnieja, np clothes, songs)

  // Dodac listenery do pozostalych inputow
  // DONE

  // W zaleznosci od zakladki, wysqietlac kolejno produkty w contencie z obiektu THIS.LIST

  // Do wyswietlania w DOM, dodac listener do jakiejs funkcji zwracajacej THIS.LIST kazdorazowo gdy ta sie zmienia



  
}

export { SHOP };

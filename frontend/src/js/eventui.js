class UI {
  constructor() {
    // Inicialisation
    // this.init();
    this.result = document.querySelector('#result');
  }

  // When the app starts
  // init() {
  //   // Display categories in <select> (if present)
  //   // this.printCategories();

  //   // Selecting the results container
  // }
  // // Display events from the api
  // Display events from the api
  displayEvents(events) {
    this.events = events;
    console.log(events);
    // Build HTML template
    let htmlTemplate = '';
    // Loop through the events and print the result
    events.forEach((event) => {
      htmlTemplate += `
        <div class="col-md-6 col-xl-4">
          <div class="card">
            <div class="card-body">
              <img class="card-img-top" src="${event.logo !== null ? event.logo.url : ''}">
            </div>
            <div class="card-body">
              <div class="card-text">
                <h2 class="heading heading__article">${event.name.text}</h2>
                <p class="lead text-info">Event Information:</p>
                <p>${event.description.text.substring(0, 120)}...</p>
                <span class="badge badge-secondary">Date & Time: ${event.start.local}</span>

                <a href="${event.url}" target="_blank" class="btn btn-primary btn-block mt-2">Get Tickets</a>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    this.result.innerHTML = htmlTemplate;
  }

  // Print categories
  printCategories(categoriesList) {
    this.categories = categoriesList.categories.categories;
    const categoriesSelect = document.querySelector('#category') !== null
      ? document.querySelector('#category')
      : undefined;
    if (categoriesSelect) {
      this.categories.forEach((category) => {
        // Create <option>
        const option = document.createElement('option');
        option.value = category.id;
        option.appendChild(document.createTextNode(category.name));
        categoriesSelect.appendChild(option);
      });
    } else {
      console.log(Error('Category list Error'));
    }
  }

  // Display a message
  printMessage(message, className) {
    // Create container
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));

    // Insert into HTML
    const searchDiv = document.querySelector('#search-events') !== null
      ? document.querySelector('#search-events')
      : undefined;
    searchDiv.appendChild(div);
    
    // Remove the alert after 3s
    setTimeout(() => {
      this.removeMessage();
    }, 3000);

  }

  // Remove the message with alert
  removeMessage() {
    this.alert = document.querySelector('.alert');
    if (this.alert) { this.alert.remove(); }
  }
}

export { UI };

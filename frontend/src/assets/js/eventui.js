class EventUI {
  constructor() {
    // Inicialisation
    // this.init();
    this.result = document.querySelector('[name^="result"]');
  }

  // Display events from the api
  displayEvents(events) {
    this.events = events;
    // Build HTML template
    let htmlTemplate = '';

    if (this.result) {
      // Result container in index page will display only 6 records
      const indexPageRecords = this.result.getAttribute('name') === 'result-index' ? 6 : this.events.length;

      // Loop through the events and print the result
      this.events.filter((el, index) => index < indexPageRecords)
        .forEach((event, index) => {
          htmlTemplate += `
            <div class="col-md-6 col-xl-4">
              <div class="card-img-top">
                <img class="card-img-top" src="${event.logo !== null ? event.logo.url : ''}">
              </div>
              <div class="card-body">
                <div class="card-text">
                <h3 class="events__heading">${event.name.text.substring(0, 40)} ...</h3>
                  <p class="lead text-info">Event Information:</p>
                  <p>${event.description.text.substring(0, 120)}...</p>
                  <span class="badge badge-secondary">Date & Time: ${event.start.local}</span>
                  <a href="${event.url}" target="_blank" class="btn btn-outline-primary btn-block events__btn">Get Tickets</a>
                </div>
              </div>
            </div>
          `;
        });
    }
    this.result.innerHTML = htmlTemplate;
    // Insert 'READ MORE' button to 'index' page
    const readMoreBtn = `<div class="col text-centre"><a href="/events" class="btn btn-secondary events__btn events__btn--check">There are ${this.events.length - 6} more events...</a></div>  `;
    if (this.result.getAttribute('name') === 'result-index') {
      this.result.innerHTML += readMoreBtn;
    }
  }

  // Display a message (if used)
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

export { EventUI };

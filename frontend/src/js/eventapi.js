import { token } from './secret';

class Event {
  constructor() {
    this.auth_token = token;
    this.orderBy = 'date';
  }

  // Getting events from API
  async queryAPI(eventName, category) {
    const eventsResponse = await fetch(`https://www.eventbriteapi.com/v3/events/search/?q=${eventName}&sort_by=${this.orderBy}&categories=${category}&token=${this.auth_token}`);

    // Wait for response and return as json
    const events = await eventsResponse.json();

    return { events };
  }

  // Get categories from API
  async getCategoriesAPI() {
    // query categories
    const categoriesResponse = await fetch(`https://www.eventbriteapi.com/v3/categories/?token=${this.auth_token}`);

    // Wait for the response and return as json
    const categories = await categoriesResponse.json();

    return { categories };
  }
}

export { Event };

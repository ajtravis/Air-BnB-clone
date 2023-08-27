'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '555 Electric Ave',
        city: 'Miami',
        state: 'Florida',
        country: 'US',
        lat: 25.76171,
        lng: -80.19191,
        name: 'beach house',
        description: 'a house on miami beach',
        price: 299.99
      },
      {
        ownerId: 1,
        address: '123 Fake Street',
        city: 'New York',
        state: 'New York',
        country: 'US',
        lat: 35.59779,
        lng: -82.5554,
        name: 'a fake house',
        description: 'totally a real house',
        price: 149.00
      },
      {
        ownerId: 1,
        address: '333 third street',
        city: 'New York',
        state: 'New York',
        country: 'US',
        lat: 35.60182,
        lng: -82.56174,
        name: '3rd house',
        description: 'the 3rd best house in NY',
        price: 333.33
      },
      {
        ownerId: 2,
        address: '455 ravens nest blvd',
        city: 'Ney York',
        state: 'New York',
        country: 'US',
        lat: 35.60796,
        lng: -82.54444,
        name: 'Ravens Nest Cottage',
        description: 'A cozy cottage',
        price: 89.99
      },
      {
        ownerId: 1,
        address: '123 Ocean View Drive',
        city: 'Los Angeles',
        state: 'California',
        country: 'US',
        lat: 34.05223,
        lng: -118.24368,
        name: 'Luxury Oceanfront Villa',
        description: 'A stunning villa with direct beach access',
        price: 699.99
      },
      {
        ownerId: 2,
        address: '456 Mountain Retreat Rd',
        city: 'Aspen',
        state: 'Colorado',
        country: 'US',
        lat: 39.1911,
        lng: -106.81754,
        name: 'Cozy Cabin Getaway',
        description: 'Escape to the mountains in this charming cabin',
        price: 249.99
      },
      {
        ownerId: 3,
        address: '789 Lakeside Cottage Ln',
        city: 'Lake Tahoe',
        state: 'California',
        country: 'US',
        lat: 39.0968,
        lng: -120.0324,
        name: 'Quaint Lakeside Cottage',
        description: 'Rustic cottage with beautiful lake views',
        price: 179.99
      },
      {
        ownerId: 4,
        address: '101 Palm Paradise Ave',
        city: 'Miami',
        state: 'Florida',
        country: 'US',
        lat: 25.76168,
        lng: -80.19179,
        name: 'Tropical Paradise Retreat',
        description: 'Relax in this lush oasis near the beach',
        price: 399.99
      },
      {
        ownerId: 5,
        address: '234 Redwood Forest Rd',
        city: 'San Francisco',
        state: 'California',
        country: 'US',
        lat: 37.77493,
        lng: -122.41942,
        name: 'Redwood Treehouse',
        description: 'Unique treehouse retreat in the heart of the city',
        price: 179.99
      },
      {
        ownerId: 6,
        address: '567 Desert Oasis Blvd',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'US',
        lat: 33.44838,
        lng: -112.07404,
        name: 'Sunny Desert Getaway',
        description: 'Modern oasis with pool and mountain views',
        price: 299.99
      },
      {
        ownerId: 7,
        address: '890 Ski Chalet Lane',
        city: 'Aspen',
        state: 'Colorado',
        country: 'US',
        lat: 39.1841,
        lng: -106.81754,
        name: 'Ski-In, Ski-Out Chalet',
        description: 'Hit the slopes from your doorstep in this cozy chalet',
        price: 449.99
      },
      {
        ownerId: 8,
        address: '1111 Vineyard Retreat Rd',
        city: 'Napa Valley',
        state: 'California',
        country: 'US',
        lat: 38.50247,
        lng: -122.26537,
        name: 'Vineyard Villa',
        description: 'Wine lovers\' paradise with stunning vineyard views',
        price: 599.99
      },
      {
        ownerId: 9,
        address: '1313 Historic District St',
        city: 'Charleston',
        state: 'South Carolina',
        country: 'US',
        lat: 32.77647,
        lng: -79.93105,
        name: 'Antebellum Charm House',
        description: 'Step back in time in this historic home',
        price: 329.99
      },
      {
        ownerId: 8,
        address: '1515 Lakeside Haven Ave',
        city: 'Seattle',
        state: 'Washington',
        country: 'US',
        lat: 47.60621,
        lng: -122.33207,
        name: 'Serene Lakeside Haven',
        description: 'Tranquil retreat on the shores of a serene lake',
        price: 279.99
      },
      {
        ownerId: 1,
        address: '1717 Urban Loft Way',
        city: 'New York',
        state: 'New York',
        country: 'US',
        lat: 40.71278,
        lng: -74.0060,
        name: 'Chic Downtown Loft',
        description: 'Sleek and stylish loft in the heart of the city',
        price: 379.99
      },
      {
        ownerId: 2,
        address: '1919 Beachfront Blvd',
        city: 'Miami',
        state: 'Florida',
        country: 'US',
        lat: 25.76171,
        lng: -80.19191,
        name: 'Beachfront Paradise',
        description: 'Wake up to the sound of waves in this beachfront condo',
        price: 499.99
      },
      {
        ownerId: 3,
        address: '2020 Hillside Haven Rd',
        city: 'San Francisco',
        state: 'California',
        country: 'US',
        lat: 37.77493,
        lng: -122.41942,
        name: 'Modern Hillside Retreat',
        description: 'Contemporary home with panoramic city views',
        price: 349.99
      },
      {
        ownerId: 4,
        address: '2222 Rustic Cabin Lane',
        city: 'Asheville',
        state: 'North Carolina',
        country: 'US',
        lat: 35.59506,
        lng: -82.55149,
        name: 'Rustic Mountain Cabin',
        description: 'Escape to the mountains in this cozy cabin',
        price: 199.99
      },
      // {
      //   ownerId: 5,
      //   address: '2323 Desert Retreat Blvd',
      //   city: 'Scottsdale',
      //   state: 'Arizona',
      //   country: 'US',
      //   lat: 33.49417,
      //   lng: -111.92605,
      //   name: 'Desert Oasis Villa',
      //   description: 'Relax in luxury in the heart of the desert',
      //   price: 549.99
      // },
      // {
      //   ownerId: 6,
      //   address: '2424 Seaside Bungalow Ave',
      //   city: 'Santa Monica',
      //   state: 'California',
      //   country: 'US',
      //   lat: 34.02244,
      //   lng: -118.49591,
      //   name: 'Charming Seaside Bungalow',
      //   description: 'Quaint bungalow just steps from the beach',
      //   price: 299.99
      // },
      // {
      //   ownerId: 5,
      //   address: '2525 Mountain View Rd',
      //   city: 'Denver',
      //   state: 'Colorado',
      //   country: 'US',
      //   lat: 39.73915,
      //   lng: -104.99025,
      //   name: 'Mountain View Retreat',
      //   description: 'Enjoy stunning mountain views from this modern home',
      //   price: 319.99
      // },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['555 Electric Ave', '123 Fake Street', '333 third street', '455 ravens nest blvd'] }
    }, {});
  }
};

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

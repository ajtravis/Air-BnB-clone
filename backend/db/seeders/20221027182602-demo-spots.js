'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     *
    */
     return queryInterface.bulkInsert('Spots', [
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

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ['555 Electric Ave', '123 Fake Street', '333 third street', '455 ravens nest blvd'] }
    }, {});
  }
};

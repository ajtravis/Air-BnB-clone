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
    */
     return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate: 20210510,
        endDate: 20210610
      },
      {
        spotId: 2,
        userId: 3,
        startDate: 20210510,
        endDate: 20210610
      }
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
       spotId: { [Op.in]: [1,2] }
     }, {});
  }
};

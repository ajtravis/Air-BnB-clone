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
     return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: 'Had an amazing time, great place',
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: 'had an awful time, my wife left me and she took the kids',
        stars: 1
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
  }
};

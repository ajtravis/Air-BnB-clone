'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demmy',
        lastName:'Lang'
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Leeroy',
        lastName: 'Jenkins'
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Chuck',
        lastName: 'Testa'
      },
      {
        email: 'harrypotter@example.com',
        username: 'TheBoyWhoLived',
        hashedPassword: bcrypt.hashSync('hogwarts123'),
        firstName: 'Harry',
        lastName: 'Potter'
      },
      {
        email: 'daenerys@example.com',
        username: 'MotherOfDragons',
        hashedPassword: bcrypt.hashSync('fireandblood'),
        firstName: 'Daenerys',
        lastName: 'Targaryen'
      },
      {
        email: 'tonystark@example.com',
        username: 'IronMan',
        hashedPassword: bcrypt.hashSync('jarvis456'),
        firstName: 'Tony',
        lastName: 'Stark'
      },
      {
        email: 'lukeskywalker@example.com',
        username: 'JediMaster',
        hashedPassword: bcrypt.hashSync('lightsaber789'),
        firstName: 'Luke',
        lastName: 'Skywalker'
      },
      {
        email: 'hermionegranger@example.com',
        username: 'BookWorm',
        hashedPassword: bcrypt.hashSync('spellsandbooks'),
        firstName: 'Hermione',
        lastName: 'Granger'
      },
      {
        email: 'michaelscott@example.com',
        username: 'That\'sWhatSheSaid',
        hashedPassword: bcrypt.hashSync('worldsbestboss'),
        firstName: 'Michael',
        lastName: 'Scott'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2',] }
    }, {});
  }
};

'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/c371345e-d579-416c-8d35-ea883248d899.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-726157512783221345/original/7b4d4126-5c24-4fb4-a769-ba94230fc3ed.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/fb63d52e-c5cf-4969-8559-0ea3d72c0e80.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/b7756897-ef31-4080-b881-c4c7b9ec0df7.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/c371345e-d579-416c-8d35-ea883248d899.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-726157512783221345/original/7b4d4126-5c24-4fb4-a769-ba94230fc3ed.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/180d4ffe-2408-4038-bd53-c1d2a9a02c7e.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/b7756897-ef31-4080-b881-c4c7b9ec0df7.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/c371345e-d579-416c-8d35-ea883248d899.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-726157512783221345/original/7b4d4126-5c24-4fb4-a769-ba94230fc3ed.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1035536276145262927/original/b08fdf50-7c65-48b4-8cbb-6e448a9c780c.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/b7756897-ef31-4080-b881-c4c7b9ec0df7.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://a0.muscache.com/im/pictures/c371345e-d579-416c-8d35-ea883248d899.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-726157512783221345/original/7b4d4126-5c24-4fb4-a769-ba94230fc3ed.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-724802297486500821/original/b38bdc15-c056-4546-b840-468d6ab2e15f.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://a0.muscache.com/im/pictures/b7756897-ef31-4080-b881-c4c7b9ec0df7.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 17,
        url: 'https://a0.muscache.com/im/pictures/c371345e-d579-416c-8d35-ea883248d899.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 18,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-726157512783221345/original/7b4d4126-5c24-4fb4-a769-ba94230fc3ed.jpeg?im_w=720',
        preview: true
      },
      // {
      //   spotId: 19,
      //   url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-724802297486500821/original/b38bdc15-c056-4546-b840-468d6ab2e15f.jpeg?im_w=720',
      //   preview: true
      // },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};

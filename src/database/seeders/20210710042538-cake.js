const data = [
  {
    id: 1,
    name: 'Field Parsley Piert',
    comment:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    imageUrl: 'http://dummyimage.com/146x100.png/5fa2dd/ffffff',
    yumFactor: 1,
  },
  {
    id: 2,
    name: 'Mouse-ear Chickweed',
    comment:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
    imageUrl: 'http://dummyimage.com/131x100.png/ff4444/ffffff',
    yumFactor: 2,
  },
  {
    id: 3,
    name: 'Mexican Cancer-root',
    comment: 'Fusce consequat. Nulla nisl. Nunc nisl.',
    imageUrl: 'http://dummyimage.com/100x100.png/cc0000/ffffff',
    yumFactor: 3,
  },
  {
    id: 4,
    name: 'Rio Grande Skullcap',
    comment:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    imageUrl: 'http://dummyimage.com/225x100.png/5fa2dd/ffffff',
    yumFactor: 4,
  },
  {
    id: 5,
    name: 'Calymperes Moss',
    comment:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    imageUrl: 'http://dummyimage.com/204x100.png/cc0000/ffffff',
    yumFactor: 5,
  },
];
module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('cakes', data, {});
    
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('cakes', null, {});
    
  },
};

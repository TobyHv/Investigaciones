const { Sequelize, DataTypes } = require('sequelize');

// Crear una instancia de Sequelize
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

// Definir un modelo
const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
});

// Sincronizar el modelo con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });

/****************** */
  //Operaciones CRUD
  // Crear un nuevo usuario
User.create({ firstName: 'John', lastName: 'Doe' })
.then(user => {
  console.log(user.toJSON());
});

// Buscar todos los usuarios
User.findAll()
.then(users => {
  console.log(users);
});

// Actualizar un usuario
User.update({ lastName: 'Smith' }, {
where: { firstName: 'John' }
})
.then(() => {
  console.log('User updated');
});

// Eliminar un usuario
User.destroy({
where: { firstName: 'John' }
})
.then(() => {
  console.log('User deleted');
});

/**********************
 * Relaciones entre modelos
 */

const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  });
  
  // Relación 1:N (Un usuario tiene muchos posts)
  User.hasMany(Post);
  Post.belongsTo(User);
  
  // Crear un usuario con un post
  User.create({
    firstName: 'Jane',
    lastName: 'Doe',
    Posts: [
      { title: 'First Post', content: 'This is the first post' }
    ]
  }, {
    include: [Post]
  });
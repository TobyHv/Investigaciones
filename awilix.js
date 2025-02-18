const { createContainer, asClass, asValue, asFunction } = require('awilix');

// Crear un contenedor
const container = createContainer();

// Registrar dependencias
container.register({
  userService: asClass(require('./services/UserService')).scoped(),
  logger: asValue(console),
  database: asFunction(() => require('./database')).singleton()
});

// Resolver dependencias
const userService = container.resolve('userService');
userService.doSomething();

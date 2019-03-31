import initModels from '../models';

export default async (sequelize, eraseDatabaseOnSync) => {
  const models = initModels(sequelize);

  await sequelize.sync({ force: eraseDatabaseOnSync });
  if (eraseDatabaseOnSync) {
    //createUsersWithMessages();
  }

  return models;
}

// TODO: SEED DB
// const createUsersWithMessages = async () => {
//     await models.User.create ({
//     {
//       username: 'uname',
//     }
//     })
// }
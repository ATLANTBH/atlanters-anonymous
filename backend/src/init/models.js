import initModels from '../models';

export default async (sequelize, eraseDatabaseOnSync) => {
  const models = initModels(sequelize);

  await sequelize.sync({ force: eraseDatabaseOnSync });
  if (eraseDatabaseOnSync) {
    //createUsersWithMessages();
  }

  return models;
}

// const createUsersWithMessages = async () => {
//     await models.User.create ({

//     })

// }


// await models.User.create(
//     {
//       username: 'rwieruch',
//       messages: [
//         {
//           text: 'Published the Road to learn React',
//         },
//       ],
//     },
//     {
//       include: [models.Message],
//     },
//   );
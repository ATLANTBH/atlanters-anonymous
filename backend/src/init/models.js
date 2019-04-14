import initModels from '../models';

export default async (sequelize, eraseDatabaseOnSync) => {
  const models = initModels(sequelize);

  await sequelize.sync({ force: eraseDatabaseOnSync });
  if (eraseDatabaseOnSync) {
    createUsersWithMessages(models);
  }

  return models;
};

// TODO: SEED DB
const createUsersWithMessages = async models => {
  await models.User.create({
    email: 'veda_df@dfasfasa.com',
    name: 'test',
    surname: 'test',
    password: '12345678',
    tokens: [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE1NTUyNDY5NDJ9.YeHmVTL5bEo_SpxfifU-7OfsxTqJ-aH0lWf1l5Y1LLE',
    ],
  });
};

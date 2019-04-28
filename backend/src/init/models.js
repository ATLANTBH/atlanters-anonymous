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
  const user = await models.User.create({
    email: 'veda_df@dfasfasa.com',
    name: 'test',
    surname: 'test',
    password: '12345678',
    tokens: [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE1NTUyNDY5NDJ9.YeHmVTL5bEo_SpxfifU-7OfsxTqJ-aH0lWf1l5Y1LLE',
    ],
  });

  const question1 = await models.Question.create({
    type: 'checkbox',
    question: 'What foods do you like?',
    content: ['Pizza', 'Spaghetti', 'Burgers', 'Chicken'],
  });

  const question2 = await models.Question.create({
    type: 'radio',
    question: 'What movies do you like?',
    content: ['Sci-fi', 'Biography', 'Fantasy'],
  });

  const pollTemplate = await models.PollTemplate.create({
    title: 'Food Poll',
    description: 'this is a food poll',
  });

  const poll = await models.Poll.create({
    entity: 'Reactor8',
    description: 'This poll is for the team reactor8',
    locked: false,
    maxNumAnswers: 4,
  });

  await user.setPollTemplates([pollTemplate]);
  await pollTemplate.setQuestions([question1, question2]);
  await user.setPolls([poll]);
  await pollTemplate.setPolls([poll]);
};

import initModels from '../models';

export default async (sequelize, eraseDatabaseOnSync) => {
  const models = initModels(sequelize);

  console.log("Syncing...");
  try{
    await sequelize.sync({ force: eraseDatabaseOnSync });
  }
  catch(error) {
    console.log(error);
  }
  if (eraseDatabaseOnSync) {
    createUsersWithMessages(models);
  }

  return models;
};

const createUsersWithMessages = async models => {
  const user = await models.User.create({
    email: 'veda_df@dfasfasa.com',
    name: 'test',
    surname: 'test',
    password: '$2b$10$YRyan2uS8QLqwzjeOOlZNu71xt5XdVtnvK0Ax.yALuqzgfG0s8dc.',
    tokens: [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE1NTUyNDY5NDJ9.YeHmVTL5bEo_SpxfifU-7OfsxTqJ-aH0lWf1l5Y1LLE',
    ],
  });

  const pollTemplate = await models.PollTemplate.create({
    title: 'Food Poll',
    description: 'this is a food poll',
    questions: [
      {
        type: 'radio',
        question: 'Your favorite food?',
        options: ['Pizza', 'Spaghetti', 'Salmon', 'Chicken'],
        required: true,
      },
      {
        type: 'checkbox',
        question: 'Your favorite movie genre',
        options: ['Sci-fi', 'Fantasy', 'Biography', 'Soap Opera'],
        required: true,
      },
      {
        type: 'text',
        question: 'Additional input',
        required: false,
      },
    ],
  });

  const poll = await models.Poll.create({
    entity: 'Reactor8',
    description: 'This poll is for the team reactor8',
    locked: false,
    maxNumAnswers: 4,
    numAnswers: 1,
  });

  const answer = await models.Answer.create({
    content: [
      {
        'Your favorite food?': ['Spaghetti'],
      },
      {
        'Your favorite movie genre': ['Sci-fi', 'Fantasy', 'Biography'],
      },
      {
        'Additional input': 'Random text',
      },
    ],
  });

  await user.setPollTemplates([pollTemplate]);
  await user.setPolls([poll]);
  await pollTemplate.setPolls([poll]);
  await poll.setAnswers([answer]);
};

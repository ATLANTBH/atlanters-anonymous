export default {
  oldUser: {
    email: 'veda_df@dfasfasa.com',
    name: 'test',
    surname: 'test',
    password: '$2b$10$YRyan2uS8QLqwzjeOOlZNu71xt5XdVtnvK0Ax.yALuqzgfG0s8dc.',
    tokens: [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE1NTUyNDY5NDJ9.YeHmVTL5bEo_SpxfifU-7OfsxTqJ-aH0lWf1l5Y1LLE',
    ],
  },
  newUser: {
    email: 'new@email.com',
    name: 'testNew',
    surname: 'testNew',
    password: 'testing123',
  },
  invalidUsers: [
    {
      password: 'testing123'
    },
    {
      surname: 'test',
      password: 'testing123'
    },
    {
      name: 'test',
      surname: 'test',
      password: 'testing123'
    },
    {
      email: 'test@test.com',
      name: 'test',
      password: 'testing123'
    }
  ]
};
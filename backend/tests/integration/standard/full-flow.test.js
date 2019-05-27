// Sign up -> create poll template -> get poll template -> 
// create poll -> get poll -> submit answer -> get answer -> delete poll -> delete poll template -> delete user

require('dotenv').config();
import request from 'supertest';
import init from '../../../src/init';
import data from '../../mocks/data';

describe('Goes through sign up, poll template creation, poll creation, deletion and sign out', () => {

  let app;
  let expressApp;
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE1NTUyNDY5NDJ9.YeHmVTL5bEo_SpxfifU-7OfsxTqJ-aH0lWf1l5Y1LLE';
  let userId = '2', pollTemplateId = '2', pollId = '2', answerId = '2';

  beforeAll(async (done) => {
    app = await init.start();
    expressApp = app.expressApp;
    done();
  })

  test('Sign up', (done) => {
    const user = data.user.newUser;

    request(expressApp).post('/auth/sign-up')
    .send(user)
    .set('Accept', 'application/json')
    .then(async (response) => {
      expect(response.statusCode).toBe(200);
      expect(typeof response.body).toBe('object');
      const body = response.body;
      expect(await app.models.User.isPasswordHashProper(user.password, body.password)).toBe(true);
      user.password = body.password;
      expect(body).toMatchObject(user);
      done();
    });
  })

  test('Create poll template', (done) => {
    const pollTemplate = data.pollTemplate.pollTemplate.newPollTemplate;

    request(expressApp).post('/poll-templates')
    .send(pollTemplate)
    .set('x-auth', token)
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(typeof response.body).toBe('object');
      const body = response.body;
      expect(body).toMatchObject(pollTemplate);
      done();
    });
  })

  test('Get poll template', (done) => {
    const pollTemplate = data.pollTemplate.pollTemplate.newPollTemplate;

    request(expressApp).get('/poll-templates/' + pollTemplateId)
    .set('x-auth', token)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(typeof response.body).toBe('object');
      const body = response.body;
      expect(body).toMatchObject(pollTemplate);
      done();
    })
  })

  test('Create poll', (done) => {
    const poll = data.poll.newPoll;
    
    request(expressApp).post('/polls/' + pollTemplateId)
    .send(poll)
    .set('x-auth', token)
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(typeof response.body).toBe('object');
      const body = response.body;
      expect(body).toMatchObject(poll);
      done();
    })
  })

  test('Get poll', (done) => {
    const poll = data.poll.newPoll;

    request(expressApp).get('/polls/' + pollId)
    .set('x-auth', token)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(typeof response.body).toBe('object');
      const body = response.body;
      expect(body).toMatchObject(poll);
      done();
    })
  })

  test('Submit answer', (done) => {
    const answer = data.answer.newAnswer;

    request(expressApp).post('/poll-templates/' + pollTemplateId + '/poll/' + pollId + '/answers')
    .send(answer)
    .set('x-auth', token)
    .set('Accept', 'application/json')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(typeof response.body).toBe('object');
      const body = response.body;
      expect(body).toMatchObject({content: answer});
      done();
    })
  })

  test('Get answer', (done) => {
    const answer = data.answer.newAnswer;

    request(expressApp).get('/answers/' + answerId)
    .set('x-auth', token)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(typeof response.body).toBe('object');
      const body = response.body;
      expect(body).toMatchObject({content: answer});
      done();
    })
  })

  test('Delete poll', (done) => {
    request(expressApp).delete('/polls/' + pollId)
    .set('x-auth', token)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    })
  })
  
  test('Delete poll template', (done) => {
    request(expressApp).delete('/poll-templates/' + pollTemplateId)
    .set('x-auth', token)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    })
  })
  
  test('Delete user', (done) => {
    request(expressApp).delete('/users/' + userId)
    .set('x-auth', token)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    })
  })

  test('Cannot get deleted user by id', (done) => {
    request(expressApp).get('/users/' + userId)
    .set('x-auth', token)
    .then((response) => {
      expect(response.statusCode).toBe(500);
      done();
    })
  })

  afterAll(() => {
    app.server.close();
  })

})
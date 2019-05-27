// Sign up -> edit user info -> Sign out -> Sign in

require('dotenv').config();
import request from 'supertest';
import init from '../../../src/init';
import data from '../../mocks/data';

describe('Goes through sign up, poll template creation, poll creation, deletion and sign out', () => {

  let app;
  let expressApp;
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE1NTUyNDY5NDJ9.YeHmVTL5bEo_SpxfifU-7OfsxTqJ-aH0lWf1l5Y1LLE';
  let userId = '2';
  let newUser = data.user.newUser;

  const updatedUser = {
    email: "newEmail@email.com",
    password: "newPassword123",
    name: "newName"
  }

  beforeAll(async (done) => {
    app = await init.start();
    expressApp = app.expressApp;
    done();
  })

  test('Sign up', (done) => {
    request(expressApp).post('/auth/sign-up')
    .send(newUser)
    .set('Accept', 'application/json')
    .then(async (response) => {
      expect(response.statusCode).toBe(200);
      expect(typeof response.body).toBe('object');
      const body = response.body;
      expect(await app.models.User.isPasswordHashProper(newUser.password, body.password)).toBe(true);
      let userHashPw = {...newUser};
      userHashPw.password = body.password;
      expect(body).toMatchObject(userHashPw);
      done();
    });
  });

  test('Edit user', (done) => {

    request(expressApp).put('/users/' + userId)
    .send(updatedUser)
    .set('Accept', 'application/json')
    .set('x-auth', token)
    .then(async (response) => {
      expect(response.statusCode).toBe(200);
      expect(typeof response.body).toBe('object');
      const body = response.body;
      expect(await app.models.User.isPasswordHashProper(updatedUser.password, body.password)).toBe(true);
      let userHashPw = {...updatedUser};
      userHashPw.password = body.password;
      expect(body).toMatchObject(userHashPw);
      done();
    });
  });

  test('Sign out', (done) => {
    request(expressApp).delete('/auth/sign-out')
    .set('x-auth', token)
    .then(async (response) => {
      expect(response.statusCode).toBe(200);
      done();
    })
  })

  test('Sign in', (done) => {
    const user = {
      email: updatedUser.email,
      password: updatedUser.password
    }

    request(expressApp).post('/auth/sign-in')
    .send(user)
    .set('Accept', 'application/json')
    .then(async (response) => {
      expect(response.statusCode).toBe(200);
      expect(typeof response.body).toBe('object');
      const body = response.body;
      expect(await app.models.User.isPasswordHashProper(user.password, body.password)).toBe(true);
      expect(user.email).toEqual(body.email);
      done();
    })
  })
  
  afterAll( async () => {
    app.server.close();
  })

})
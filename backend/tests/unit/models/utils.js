import sinon from 'sinon';
import mocks from '../../mocks';

const output = {
  Polls: []
};
const resMock = sinon.mock(mocks.data.express.res);
const res = {
  send: resMock.expects('send').once().withArgs(output).returns()
}
const models = {
  PollTemplate: mocks.models.PollTemplateMock,
  Poll: mocks.models.PollMock,
  Answer: mocks.models.AnswerMock,
  User: mocks.models.UserMock
}

function next(error) {
  console.log(error);
}

function resetMocks() {
  res.send.reset();
  for(let key in models.PollTemplate) models.PollTemplate[key].reset();
  for(let key in models.Poll) models.Poll[key].reset();
  for(let key in models.Answer) models.Answer[key].reset();
  for(let key in models.User) models.User[key].reset();
}

export default {
  output,
  res,
  resMock,
  models,
  resetMocks,
  next
}
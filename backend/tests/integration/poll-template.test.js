require('dotenv').config();
import { expect } from 'chai';
import getModels from '../lib/init';
import mocks from '../mocks';

const pollTemplate = mocks.data.pollTemplate.pollTemplate;
let models = null;

describe('Testing models', async () => {

  before(async function () {
    models = await getModels();
    await models.PollTemplate.create(pollTemplate.newPollTemplate);
  })

  describe('Testing poll template', async () => {

    it('get created poll template by id', async () => {
      const ptResult = await models.PollTemplate.findById(0);
      expect(ptResult.dataValues).to.deep.include(pollTemplate.newPollTemplate);
    })

    it('get created poll template by title', async () => {
      const result = await models.PollTemplate.findByTitle("Food Poll");
      expect(result.dataValues).to.deep.include(pollTemplate.newPollTemplate);
    })

    it('get created poll template by user id', async () => {
      const result = await models.PollTemplate.findByUserId(1);
      expect(result[0].dataValues).to.deep.include(pollTemplate.newPollTemplate);
    })

  })


})
require('dotenv').config();
import { expect } from 'chai';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { pollTemplate, linearScale, radio, checkbox } from '../mocks/poll-template';
import validatePollTemplate from '../../src/routes/validation/poll-template.post.validate';

async function isValid(invalidTemplate) {
  try{
    await validatePollTemplate(invalidTemplate);  
  }
  catch(error){
    return false;
  }
  return true;
}

describe('Validate Poll Template', () => {

  describe('Validate without questions', async() => {
    it('Validate without questions', async () => {
      let valid = false;
      const invalidPollTemplates = pollTemplate.invalidPollTemplates;
      for(let i = 0; i < invalidPollTemplates.length; i++){
        valid = await isValid(invalidPollTemplates[i]);
        if(valid) {
          console.log(`Unexpected that ${i} is valid`);
          break;  
        }
      }
      expect(valid).to.false;
    })
  })

  describe('Validate radiobutton', async() => {
    it('Invalid radiobutton structure', async () => {
      let valid = false;
      const invalidRadios = radio.invalid;
      for(let i = 0; i < invalidRadios.length; i++){
        valid = await isValid(invalidRadios[i]);
        if(valid) {
          console.log(`Unexpected that ${i} is valid`);
          break;  
        }
      }
      expect(valid).to.false;
    })

    it('Valid radiobutton structure', async () => {
      const valid = await isValid(radio.valid);
      expect(valid).to.true;
    })

  })

  describe('Validate checkbox', async() => {
    it('Invalid checkbox structure', async () => {
      let valid = false;
      const invalidCheckboxes = checkbox.invalid;
      for(let i = 0; i < invalidCheckboxes.length; i++){
        valid = await isValid(invalidCheckboxes[i]);
        if(valid) {
          console.log(`Unexpected that ${i} is valid`);
          break;  
        }
      }
      expect(valid).to.false;
    })

    it('Valid checkbox structure', async () => {
      const valid = await isValid(checkbox.valid);
      expect(valid).to.true;
    })
  })

  describe('Validate linear scale', async() => {
    it('Invalid linear scale structure', async () => {
      let valid = false;
      const invalidLinearScales = linearScale.invalid;
      for(let i = 0; i < invalidLinearScales.length; i++){
        valid = await isValid(invalidLinearScales[i]);
        if(valid) {
          console.log(`Unexpected that ${i} is valid`);
          break;  
        }
      }
      expect(valid).to.false;
    })

    it('Valid linear scale structure', async () => {
      const valid = await isValid(linearScale.valid);
      expect(valid).to.true;
    })
  })


})
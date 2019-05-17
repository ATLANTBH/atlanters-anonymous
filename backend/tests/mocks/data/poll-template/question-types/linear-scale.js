export default {
  valid: {
    title: '1',
    description: 'this is a food poll',
    questions: [
      {
        type: 'linearScale',
        question: 'How much are you satisfied?',
        minIndex: 1,
        maxIndex: 10,
        minChoice: "Don't like",
        maxChoice: "Really like",
        required: true
      }
    ]
  },
  invalid: [
    {
      title: '0',
      description: 'this is a food poll',
      questions: [
        {
          type: 'linearScale'
        }
      ]
    },
    {
      title: '1',
      description: 'this is a food poll',
      questions: [
        {
          type: 'linearScale',
          question: '1'
        }
      ]
    },
    {
      title: '2',
      description: 'this is a food poll',
      questions: [
        {
          type: 'linearScale',
          question: '2',
          minIndex: 1,
        }
      ]
    },
    {
      title: '3',
      description: 'this is a food poll',
      questions: [
        {
          type: 'linearScale',
          question: '3',
          minIndex: ''
        }
      ]
    },
    {
      title: '4',
      description: 'this is a food poll',
      questions: [
        {
          type: 'linearScale',
          question: '4',
          minIndex: 1,
          maxIndex: 10
        }
      ]
    },
    {
      title: '5',
      description: 'this is a food poll',
      questions: [
        {
          type: 'linearScale',
          question: '5',
          minIndex: 1,
          maxIndex: ''
        }
      ]
    },
    {
      title: '6',
      description: 'this is a food poll',
      questions: [
        {
          type: 'linearScale',
          question: '6',
          minIndex: 1,
          maxIndex: 10,
          minChoice: "Don't like"
        }
      ]
    },
    {
      title: '7',
      description: 'this is a food poll',
      questions: [
        {
          type: 'linearScale',
          question: '7',
          minIndex: 1,
          maxIndex: 10,
          minChoice: {},
          maxChoice: "Really like"
        }
      ]
    },
    {
      title: '8',
      description: 'this is a food poll',
      questions: [
        {
          type: 'linearScale',
          question: '8',
          minIndex: 1,
          maxIndex: 10,
          minChoice: "Don't like",
          maxChoice: "Really like"
        }
      ]
    },
    {
      title: '9',
      description: 'this is a food poll',
      questions: [
        {
          type: 'linearScale',
          question: '9',
          minIndex: 1,
          maxIndex: 10,
          minChoice: "Don't like",
          maxChoice: {},
          required: true
        }
      ]
    },
  ]
}
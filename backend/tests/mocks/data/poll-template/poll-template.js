export default {
  newPollTemplate: {
    title: 'Food Poll 2',
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
        type: 'paragraph',
        question: 'Additional input',
        required: false,
      },
      {
        type: 'linearScale',
        question: 'How much are you satisfied?',
        minIndex: 1,
        maxIndex: 10,
        minChoice: "Don't like",
        maxChoice: "Really like",
        required: true
      }
    ],
    UserId: 1
  },
  invalidPollTemplates: [
    {

    },
    {
      title: '1',
      description: 'this is a food poll',
      questions: []
    },
    {
      description: 'this is a food poll',
      questions: []
    },
    {
      title: '3',
      description: 'this is a food poll',
      questions: {}
    },
    {
      title: '4',
      description: 'this is a food poll',
      questions: [
        {}
      ]
    },
    {
      title: '5',
      description: 'this is a food poll',
      questions: [
        {
          type: 'does not exist',
          question: 'How much are you satisfied?',
          minIndex: 1,
          maxChoice: "Really like",
          required: true
        }
      ]
    }
  ]
}
export default {
  valid: {
    title: '1',
    description: 'this is a food poll',
    questions: [
      {
        type: 'radio',
        question: '1',
        options: ['Pizza', 'Spaghetti', 'Salmon', 'Chicken'],
        required: true
      }
    ]
  },
  invalid: [
    {
      title: '1',
      description: 'this is a food poll',
      questions: [
        {
          type: 'radio'
        }
      ]
    },
    {
      title: '2',
      description: 'this is a food poll',
      questions: [
        {
          type: 'radio',
          question: '2'
        }
      ]
    },
    {
      title: '3',
      description: 'this is a food poll',
      questions: [
        {
          type: 'radio',
          question: '3',
          options: ['Pizza', 'Spaghetti', 'Salmon', 'Chicken']
        }
      ]
    },
    {
      title: '4',
      description: 'this is a food poll',
      questions: [
        {
          type: 'radio',
          question: '4',
          options: {}
        }
      ]
    },
    {
      title: '5',
      description: 'this is a food poll',
      questions: [
        {
          type: 'radio',
          question: '5',
          options: []
        }
      ]
    },
    {
      title: '6',
      description: 'this is a food poll',
      questions: [
        {
          type: 'radio',
          question: '6',
          options: ['']
        }
      ]
    },
  ]
}
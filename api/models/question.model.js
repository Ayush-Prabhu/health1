const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
      unique: true
    },
    questionText: {
      type: String,
      required: true
    },
    questionType: {
      type: String,
      required: true,
      enum: ['MCQ', 'MSQ', 'INFO' ]// Add other types as needed
    },
    options: [
      {
        optionText: {
          type: String,
          required: true
        },
        optionWeight: {
          type: Number,
          default: 0
        }
      }
    ],
    open: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    chosenAnswer: {
      type: String,
      default: ""
    },
    weightage: {
      type: Number,
      default: 1
    },
    weightSet: {
      type: Number,
      default: 0
    },
    image: {
      type: [String],
      default: []
    },
    table: {
      type: [String], // Assuming table is an array of strings
      default: []
    },
    latex: {
      type: [String], // Assuming latex is an array of strings
      default: []
    },
    regex: {
      type: String,
      default: ""
    }
  });

const surveySchema = new mongoose.Schema({
  surveyId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [questionSchema]
}, {
  timestamps: true
});

const responseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  surveyId: {
    type: String,
    required: true
  },
  responses: [
    {
      questionId: {
        type: String,
        required: true
      },
      answer: {
        type: mongoose.Mixed, // This allows for various types of responses (string for text, array for multiple choice, etc.)
        required: true
      }
    }
  ]
}, {
  timestamps: true
});


const UserSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  dob: {
      type: Date,
      required: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  username: {
      type: String,
      required: true,
      unique: true
  },
  city: {
      type: String,
      required: true
  },
  state: {
      type: String,
      required: true
  },
  country: {
      type: String,
      required: true
  },
  postal_code: {
      type: String,
      required: true
  }
});

const Response = mongoose.model('Response', responseSchema);
const User = mongoose.model('User', UserSchema);

const Question = mongoose.model('Question', questionSchema);
const Survey = mongoose.model('Survey', surveySchema);

module.exports = { Question, Survey, Response, User };
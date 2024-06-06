import React, { useState } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';

import questions from './Questionnaire.json';

const SurveyForm = () => {
  const [userAnswers, setUserAnswers] = useState({}); // Store user answers

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleTextChange = (event) => {
    const { id, value } = event.target;
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (e.g., send answers to the server)
    console.log('User answers:', userAnswers);
  };

  return (
    <Container>
      <h1>Survey</h1>
      <Form onSubmit={handleSubmit}>
        {questions.map((question) => {
          if (question.type === 'BRIEF') {
            // Render radio buttons for BRIEF questions
            return (
              <Form.Group key={question.id}>
                <Form.Label>{question.id + ". " + question.text}</Form.Label>
                {question.options.map((option) => (
                  <Form.Check
                    key={option}
                    type="radio"
                    label={option}
                    name={question.id} // Group radio buttons by question ID
                    value={option}
                    checked={userAnswers[question.id] === option}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  />
                ))}
              </Form.Group>
            );
          } else if (question.type === "TABLE") {
            // Render a table for other question types
            return (
              <div key={question.id} className="table-container">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Items</th>
                      {question.hoptions.map((option) => (
                        <th key={option}>{option}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {question.qs.map((qn) => (
                      <tr key={qn.id}>
                        <td>
                          <p align="justify">{qn.id + ". " + qn.text}</p>
                        </td>
                        {qn.options.map((option) => (
                          <td key={option}>
                            <Form.Check
                              key={option}
                              type="radio"
                              name={qn.id} // Group radio buttons by question ID
                              value={option}
                              checked={userAnswers[qn.id] === option}
                              onChange={(e) => handleAnswerChange(qn.id, e.target.value)}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            );
          } else if (question.type === "INFO") {
            return (
              <div key={question.id}>
                <Form.Label className='form-label'>{question.id + ". " + question.text}</Form.Label>
                <div className="table-container">
                <Table striped bordered key={question.id}>
                  <tbody>
                    {question.info.map((row) => (
                      <tr key={row}>
                        <td><pre>{row}</pre></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                </div>
                <Form.Control
                  type="text"
                  id={question.id}
                  pattern={question.regex} // Allow only integers
                  onChange={handleTextChange} // Use handleTextChange for input change
                />
              </div>
            );
          } else if (question.type === "MULTIINFO") {
            return (
              <div key={question.id}>
                <Form.Label>{question.id + ". " + question.text}</Form.Label>
                <div className="table-container"><Table striped bordered key={question.id}>
                  <tbody>
                    {question.info.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((col, colIndex) => (
                          <td key={colIndex}><pre>{col}</pre></td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                </div>
                <Form.Control
                  type="text"
                  id={question.id}
                  pattern={question.regex} // Allow only integers
                  onChange={handleTextChange} // Use handleTextChange for input change
                />
              </div>
            );
          }
          return null; // Added to handle the case where neither 'BRIEF' nor 'TABLE' nor 'INFO'
        })}
        
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <br></br>
    </Container>
  );
};

export default SurveyForm;


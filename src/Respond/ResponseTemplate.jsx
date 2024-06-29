import React, { useState } from 'react';
import questions from 'C://Users/student/Downloads/2024610 (15).json';
import { Accordion, Form, FormLabel } from 'react-bootstrap';
import { Table, TableBody, TableRow, TableCell, withStyles, ButtonBase, Button } from '@material-ui/core';
import Latex from 'react-latex-next';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const ResponseTemplate = () => {
    const [userAnswers, setUserAnswers] = useState({}); // Store user answers

    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleAnswerAdd = (questionId, answer) => {
        setUserAnswers((prevAnswers) => {
            const currentAnswers = prevAnswers[questionId] || [];
            if (currentAnswers.includes(answer)) {
                return {
                    ...prevAnswers,
                    [questionId]: currentAnswers.filter((ans) => ans !== answer),
                };
            } else {
                return {
                    ...prevAnswers,
                    [questionId]: [...currentAnswers, answer],
                };
            }
        });
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
        <div className="response-template" style={{ background: "var(--bglowalpha)" }}>
            <div className="response_top">
                {questions.SurveyTitle&&(<div className='title-box' style={{ color: "var(--text)", alignContent: "center" }}>

                    <h1>{questions.SurveyTitle}</h1>
                </div>)}
                {questions.SurveyDesc&&(<div className='Desc-box' style={{ color: "var(--text2)" }}>

                    <h2>{questions.SurveyDesc}</h2>
                </div>)}
            </div>
            <div className='response_bottom'>
                <Accordion defaultActiveKey="0">
                    {questions.qs.map((question, index) => (
                        <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header >{question.questionText}</Accordion.Header>
                            <Accordion.Body>
                                <Form>
                                    <FormLabel>{question.questionText}</FormLabel>

                                    {question.image && question.image.length > 0 && (
                                        <img src={`data:image/jpeg;base64,${question.image}`} alt="" style={{ maxWidth: '200px', marginTop: '10px' }} />
                                    )}
                                    {<div>

                                        <pre>



                                        </pre>
                                        <Table>
                                            {question.table && question.table.length > 0 && question.table.map((rows, rowIndex) => (
                                                <TableBody key={rowIndex}>
                                                    <TableRow>
                                                        {rows.split(',').map((dat, cellIndex) => (
                                                            <StyledTableCell key={cellIndex}>{dat}</StyledTableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableBody>

                                            ))}
                                        </Table>
                                    </div>
                                    }
                                    {
                                        question.latex && question.latex.length > 0 && question.latex.map((lat, index) => (
                                            (
                                                <Latex key={index} strict>{lat}</Latex>
                                            )
                                        ))
                                    }
                                    {
                                        (question.questionType === "MCQ" && (
                                            question.options.map((option, optionIndex) => (
                                                <Form.Check
                                                    key={optionIndex}
                                                    type="Radio"
                                                    label={option.optionText}
                                                    value={option.optionText}
                                                    name={index}
                                                    checked={userAnswers[index] === option.optionText}
                                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                />
                                            ))
                                        )) ||
                                        (question.questionType === "MSQ" && (
                                            question.options.map((option, optionIndex) => (
                                                <Form.Check
                                                    key={optionIndex}
                                                    type="CheckBox"
                                                    label={option.optionText}
                                                    
                                                    value={option.optionText}
                                                    checked={userAnswers[index] && userAnswers[index].includes(option.optionText)}
                                                    onChange={(e) => handleAnswerAdd(index, e.target.value)}
                                                />
                                            ))
                                        )) || (
                                            question.questionType === "INFO" && (
                                                <Form.Control
                                                    type="text"
                                                    id={index}
                                                    pattern={question.regex ? question.regex : undefined}
                                                    onChange={handleTextChange}
                                                />
                                            )
                                        )
                                    }
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))


                    }
                </Accordion>
                <ButtonBase style={{alignItems:"center", display:"flex", flexDirection:"column"}}>
                    <Button onClick={handleSubmit}>
                        Submit
                    </Button>
                </ButtonBase>
            </div>
        </div>

    );
};

export default ResponseTemplate;

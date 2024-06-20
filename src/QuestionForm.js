import React, { useState, useEffect } from "react";
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import {
  CropOriginal,
  CheckBox,
  ShortText,
  Subject,
  MoreVertRounded,
  FilterNone,
  AddCircleOutline,
  OndemandVideo,
  TextFields,
  Close,
  AddToPhotosOutlined,
} from "@material-ui/icons";
import {
  Select,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  MenuItem,
  Button,
  Radio,
  FormControlLabel,
  Icon,
} from "@material-ui/core";
import { BsTrash, BsFileText } from "react-icons/bs";
import { FcRightUp } from "react-icons/fc";
import "./QuestionForm.css";
import { DragIndicator } from "@material-ui/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CgOpenCollective } from "react-icons/cg";
import SaveIcon from "@material-ui/icons/SaveAlt";
import Toolbar from "./Toolbar";
import ImageModal from "./ImageModal"
import TableInputModal from "./TableInputModal";
import LatexModal from "./LatexInput/LatexModal";

const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
};

var strs=[];


function QuestionForm() {
  const [csvContent,setCsvContent] = useState({"str":[]});
  const [latexData, setLatexData] = useState({"latex":[]});
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      questionType: "MCQ",
      options: [],
      open: false,
      required: false,
      chosenAnswer: "",
      weightage: 0,
      weightSet: 0,
      image:strs,
      table:csvContent.str,
      latex:latexData.latex,
    },
  ]);

  const [isLatexOpen, setIsLatexOpen] = useState(false);


  const openLatexModal = () => {
    setIsLatexOpen(true);
  };

  const closeLatexModal = () => {
    setIsLatexOpen(false);
  };

  const handleLatexSubmit = (latexData) => {
    console.log(latexData);
    setLatexData(latexData);
  };

  const [openImageModal, setOpenImageModal] = useState(false);
  const handleOpenImageModal = () => {
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    console.log(strs);
    setOpenImageModal(false);
  };

  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  const openTableModal = () => {
    console.log("table open");
    setIsTableModalOpen(true);
  };

  const closeTableModal = () => {
    setIsTableModalOpen(false);
  };

  



  const handleSaveTable = (csvContent) => {
    //console.log('Table Data:', tableData);
    // Convert tableData to CSV format
    // const csvContent = tableData.map(row => {
    //   return row.map(data =>`${data.value}`).join(',')
    // }).join('\n');
    setCsvContent(csvContent);
    console.log('CSV Content:', csvContent.str);
  };
  

  //const fs=require('fs');
  /*const filename=id*/
  const filename = 2024610 + ".json";
  const data = {
    "SurveyTitle": "",
    "SurveyDesc":"",
    "qs":[...questions]};

  function saveForm() {
    try {
      const jsonData = JSON.stringify(data, null, 2); // null, 2 for pretty formatting

      // Create a Blob object representing the data as a JSON file
      const blob = new Blob([jsonData], { type: "application/json" });

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;

      // Programmatically click the link to start the download
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error writing JSON to file:", error);
    }
  }

  function setWeightage(weight, qno) {
    var Questions = [...questions];
    Questions[qno].weightage = weight;
    setQuestions(Questions);
  }

  function doneWeightage(i) {
    var qs = [...questions];
    qs[i].weightSet = 1;
    setQuestions(qs);
  }

  function addWeightage(i) {
    var qs = [...questions];
    setQuestions(qs);
    qs[i].weightSet = 2;
    console.log(i + " add weight " + qs[i].weightage);
  }

  function getWeightage(i) {
    var qs = [...questions];
    let t = 0;
    if (qs[i].weightSet === 1 || qs[i].weightage === 2) {
      t = qs[i].weightage;
    }
    return t;
  }

  function addQuestionType(i, type) {
    let qs = [...questions];
    qs[i].questionType = type;
    setQuestions(qs);
  }

  function changeOptionValue(text, i, j) {
    var optionsQuestion = [...questions];
    optionsQuestion[i].options[j].optionText = text;
    setQuestions(optionsQuestion);
    console.log(questions);
  }

  function addMoreQuestionField() {
    expandCloseAll();
    setQuestions([
      ...questions,
      {
        questionText: "Question",
        questionType: "MCQ",
        options: [{ optionText: "Option 1" }],
        open: true,
        required: false,
        weightSet: 0,
        weightage: 0,
      },
    ]);
  }

  function addOption(i) {
    var quests = [...questions];
    if (quests[i].options.length < 5) {
      quests[i].options.push({
        optionText: "Option " + (quests[i].options.length + 1),
      });
    } else {
      console.log("Max limit reached");
    }
    setQuestions(quests);
  }

  function copyQuestion(i) {
    expandCloseAll();
    let quests = [...questions];
    var newQuestion = { ...quests[i] };
    setQuestions([...questions, newQuestion]);
  }

  function deleteQuestion(i) {
    let quests = [...questions];
    if (questions.length > 1) {
      quests.splice(i, 1);
    }

    setQuestions(quests);
  }

  function removeOption(i, j) {
    var removeOptionsQuestion = [...questions];
    if (removeOptionsQuestion[i].options.length >= 1) {
      removeOptionsQuestion[i].options.splice(j, 1);
      setQuestions(removeOptionsQuestion);

      console.log(questions);
    }
  }

  function expandCloseAll() {
    let ques = [...questions];
    for (let j = 0; j < ques.length; j++) {
      ques[j].open = false;
    }
    setQuestions(ques);
  }

  function handleExpand(i) {
    let ques = [...questions];
    for (let j = 0; j < ques.length; j++) {
      if (i === j) {
        ques[i].open = !ques[i].open;
      } else {
        ques[j].open = false;
      }
    }
    setQuestions(ques);
  }

  function questionsUI() {
    return (
      <div>
        <div>
          {questions.map((ques, i) => (
            <Draggable key={i} draggableId={i + "id"} index={i}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div>
                    <div style={{ marginBottom: "0px" }}>
                      <div style={{ width: "100%", marginBottom: "0px" }}>
                        <DragIndicator
                          style={{
                            transform: "rotate(-90deg)",
                            color: "#DAE0E2",
                            position: "relative",
                            left: "300px",
                          }}
                          fontSize="small"
                        />
                      </div>
                      <div key={i}>
                        <Accordion
                          expanded={ques.open}
                          onChange={() => handleExpand(i)}
                          className={ques.open ? "addBorder" : "close"}
                        >
                          <AccordionSummary
                            aria-controls="panelia-content"
                            id="panelia-header"
                            elevation={1}
                            style={{ width: "100%" }}
                          >
                            {!ques.open ? (
                              <div className="saved_questions">
                                <Typography
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "400",
                                    letterSpacing: ".3px",
                                    lineHeight: "30px",
                                    paddingBottom: "8px",
                                  }}
                                >
                                  {i + 1}.{questions[i].questionText}
                                </Typography>
                                {ques.options.map((op, j) => (
                                  <div className="add_question_body" key={j}>
                                    <div style={{ display: "flex" }}>
                                      <FormControlLabel
                                        style={{
                                          marginLeft: "5px",
                                          marginBottom: "5px",
                                        }}
                                        disabled
                                        control={
                                          <input
                                            type={ques.questionType}
                                            color="primary"
                                            style={{ marginRight: "3px" }}
                                            required={ques.required}
                                            placeholder={op.optionText}
                                          />
                                        }
                                        label={
                                          <Typography
                                            style={{
                                              fontSize: "13px",

                                              fontWeight: "400",

                                              letterSpacing: ".2px",

                                              lineHeight: "25px",

                                              color: "#202125",
                                            }}
                                          >
                                            {ques.options[j].text}
                                          </Typography>
                                        }
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              i + 1 + ". " + ques.questionText
                            )}
                          </AccordionSummary>
                          <div className="question_boxes">
                            {questions[i].weightSet !== 1 ? (
                              <AccordionDetails className="add_question">
                                <div className="add_question_top">
                                  <input
                                    type="text"
                                    className="question"
                                    placeholder="Question"
                                    value={ques.questionText}
                                    onChange={(e) => {
                                      const updatedQuestions = [...questions];
                                      updatedQuestions[i].questionText =
                                        e.target.value;
                                      setQuestions(updatedQuestions);
                                    }}
                                  />
                                  <Button onClick={handleOpenImageModal}>
                                    <CropOriginal
                                      style={{ color: "#5F6368" }}

                                    />
                                  </Button>
                                  {/*<UploadModal open={openImageModal} onClose={handleCloseModal} />*/}
                                  <ImageModal open={openImageModal} onClose={handleCloseImageModal} strs={strs}/>
                                  <Select
                                    className="select"
                                    style={{
                                      color: "#5F6368",
                                      fontSize: "13px",
                                    }}
                                    value={ques.questionType}
                                    onChange={(e) => {
                                      const updatedQuestions = [...questions];
                                      updatedQuestions[i].questionType =
                                        e.target.value;
                                      setQuestions(updatedQuestions);
                                    }}
                                  >
                                    <MenuItem
                                      id="MCQ"
                                      value="MCQ"
                                      onClick={() => {
                                        addQuestionType(i, "MCQ");
                                      }}
                                    >
                                      MCQ
                                    </MenuItem>
                                    <MenuItem
                                      id="INFO"
                                      value="INFO"
                                      onClick={() => {
                                        addQuestionType(i, "INFO");
                                      }}
                                    >
                                      INFO
                                    </MenuItem>
                                    <MenuItem
                                      id="MULTIINFO"
                                      value="MULTIINFO"
                                      onClick={() => {
                                        addQuestionType(i, "MULTIINFO");
                                      }}
                                    >
                                      MULTIINFO
                                    </MenuItem>
                                  </Select>
                                </div>
                                {ques.options.map((op, j) => (
                                  <div key={j} className="add_question_body">
                                    <input
                                      type={
                                        ques.questionType === "MULTIINFO" ||
                                        ques.questionType === "INFO"
                                          ? "text"
                                          : "radio"
                                      }
                                      value={op.text}
                                      onChange={(e) => {
                                        const updatedQuestions = [...questions];
                                        updatedQuestions[i].options[j].text =
                                          e.target.value;
                                        setQuestions(updatedQuestions);
                                      }}
                                    />
                                    <div>
                                      <input
                                        type="text"
                                        className="textInput"
                                        placeholder="option"
                                        value={ques.options[j].optionText}
                                        onChange={(e) => {
                                          changeOptionValue(
                                            e.target.value,
                                            i,
                                            j
                                          );
                                        }}
                                      ></input>
                                    </div>
                                    <Button>
                                      <Close
                                        onClick={() => {
                                          removeOption(i, j);
                                        }}
                                      />
                                    </Button>
                                  </div>
                                ))}

                                {ques.options.length < 5 ? (
                                  <div className="add_question_body">
                                    <FormControlLabel
                                      disabled
                                      control={
                                        ques.questionType === "MCQ" ? (
                                          <input
                                            type="radio"
                                            color="primary"
                                            aria-label="secondary-checkbox"
                                            style={{
                                              marginLeft: "10px",
                                              marginRight: "10px",
                                            }}
                                            disabled
                                          />
                                        ) : (
                                          <ShortText
                                            style={{ marginRight: "10px" }}
                                          />
                                        )
                                      }
                                      label={
                                        <div>
                                          <input
                                            type="text"
                                            className="text_input"
                                            style={{
                                              fontSize: "13px",
                                              width: "60px",
                                            }}
                                            placeholder="Add other"
                                          ></input>
                                          <Button
                                            size="small"
                                            style={{
                                              textTransform: "none",
                                              color: "#4285f4",
                                              fontSize: "13px",
                                              fontWeight: "600",
                                            }}
                                            onClick={() => {
                                              addOption(i);
                                            }}
                                          >
                                            Add Option
                                          </Button>
                                        </div>
                                      }
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}

                                <div className="add_footer">
                                  <div className="add_question_bottom_left">
                                    <Button
                                      size="small"
                                      onClick={() => {
                                        doneWeightage(i);
                                      }}
                                    >
                                      <FcRightUp />
                                      Set Weight
                                    </Button>
                                  </div>
                                  <div className="add_question_bottom">
                                    <Button
                                      aria-label="copy"
                                      onClick={() => {
                                        copyQuestion(i);
                                      }}
                                    >
                                      <FilterNone />
                                    </Button>
                                    <Button
                                      aria-label="delete"
                                      onClick={() => {
                                        deleteQuestion(i);
                                      }}
                                    >
                                      <BsTrash />
                                    </Button>
                                    <Button aria-label="req">
                                      <span>Required</span>{" "}
                                      <Switch
                                        name="checkedA"
                                        color="primary"
                                        checked={ques.required}
                                        onChange={(e) => {
                                          const updatedQuestions = [
                                            ...questions,
                                          ];
                                          updatedQuestions[i].required =
                                            e.target.checked;
                                          setQuestions(updatedQuestions);
                                        }}
                                      />
                                    </Button>
                                  </div>
                                </div>
                              </AccordionDetails>
                            ) : (
                              <AccordionDetails className="add_question">
                                <div className="top_header">
                                  Set the Weightage
                                </div>
                                <div className="add_question_top">
                                  <input
                                    type="text"
                                    className="question"
                                    placeholder="Question"
                                    value={ques.questionText}
                                    onChange={(e) => {
                                      const updatedQuestions = [...questions];
                                      updatedQuestions[i].questionText =
                                        e.target.value;
                                      setQuestions(updatedQuestions);
                                    }}
                                    disabled
                                  />
                                  <input
                                    type="number"
                                    className="weight"
                                    min="0"
                                    step="1"
                                    placeholder={getWeightage(i)}
                                    onChange={(e) =>
                                      setWeightage(e.target.value, i)
                                    }
                                  />
                                </div>
                                {ques.options.map((op, j) => (
                                  <div key={j} className="add_question_body">
                                    <input
                                      type={
                                        ques.questionType === "MULTIINFO" ||
                                        ques.questionType === "INFO"
                                          ? "text"
                                          : "radio"
                                      }
                                      value={op.text}
                                      onChange={(e) => {
                                        const updatedQuestions = [...questions];
                                        updatedQuestions[i].options[j].text =
                                          e.target.value;
                                        setQuestions(updatedQuestions);
                                      }}
                                    />
                                    <div>
                                      <input
                                        type="text"
                                        className="textInput"
                                        placeholder="option"
                                        value={ques.options[j].optionText}
                                        onChange={(e) => {
                                          changeOptionValue(
                                            e.target.value,
                                            i,
                                            j
                                          );
                                        }}
                                      ></input>
                                    </div>
                                    <Button>
                                      <Close
                                        onClick={() => {
                                          removeOption(i, j);
                                        }}
                                      />
                                    </Button>
                                  </div>
                                ))}

                                {ques.options.length < 5 ? (
                                  <div className="add_question_body">
                                    <FormControlLabel
                                      disabled
                                      control={
                                        ques.questionType === "MCQ" ? (
                                          <input
                                            type="radio"
                                            color="primary"
                                            aria-label="secondary-checkbox"
                                            style={{
                                              marginLeft: "10px",
                                              marginRight: "10px",
                                            }}
                                            disabled
                                          />
                                        ) : (
                                          <ShortText
                                            style={{ marginRight: "10px" }}
                                          />
                                        )
                                      }
                                      label={
                                        <div>
                                          <input
                                            type="text"
                                            className="text_input"
                                            style={{
                                              fontSize: "13px",
                                              width: "60px",
                                            }}
                                            placeholder="Add other"
                                          ></input>
                                          <Button
                                            size="small"
                                            style={{
                                              textTransform: "none",
                                              color: "#4285f4",
                                              fontSize: "13px",
                                              fontWeight: "600",
                                            }}
                                            onClick={() => {
                                              addOption(i);
                                            }}
                                          >
                                            Add Option
                                          </Button>
                                        </div>
                                      }
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}

                                <div className="add_footer">
                                  <div className="add_question_bottom_left">
                                    <Button
                                      size="small"
                                      onClick={() => {
                                        addWeightage(i);
                                      }}
                                    >
                                      <FcRightUp />
                                      Done
                                    </Button>
                                  </div>
                                  <div className="add_question_bottom">
                                    <Button
                                      aria-label="copy"
                                      onClick={() => {
                                        copyQuestion(i);
                                      }}
                                    >
                                      <FilterNone />
                                    </Button>
                                    <Button
                                      aria-label="delete"
                                      onClick={() => {
                                        deleteQuestion(i);
                                      }}
                                    >
                                      <BsTrash />
                                    </Button>
                                    <Button aria-label="req">
                                      <span>Required</span>{" "}
                                      <Switch
                                        name="checkedA"
                                        color="primary"
                                        checked={ques.required}
                                        onChange={(e) => {
                                          const updatedQuestions = [
                                            ...questions,
                                          ];
                                          updatedQuestions[i].required =
                                            e.target.checked;
                                          setQuestions(updatedQuestions);
                                        }}
                                      />
                                    </Button>
                                  </div>
                                </div>
                              </AccordionDetails>
                            )}
                            <div className="question_edit">
                              <Button
                                onClick={() => {
                                  addMoreQuestionField();
                                }}
                              >
                                <AddCircleOutline
                                  fontSize="large"
                                  className="edit"
                                />
                              </Button>
                              <Button onClick={openTableModal}>
                                <TableChartOutlinedIcon
                                  className="edit"
                                  fontSize="large"
                                                            
                                  
      
                                />
                              </Button>
                              <TableInputModal 
        isTableModalOpen={isTableModalOpen} 
                                  closeModal={closeTableModal} 
                                  onSave={handleSaveTable} 
                                  csvContent={csvContent}
                                  setCsvContent={setCsvContent}
      />
                              <Button onClick={openLatexModal}>
                                <Icon
                                  fontSize="small" style={{textTransform:"none",color:"#5F6368",paddingBottom:"30px"}}>Lₓ</Icon>
                              </Button>
                              <LatexModal isOpen={isLatexOpen} onClose={closeLatexModal} onSubmit={handleLatexSubmit} setLatexData={setLatexData} latexData={latexData} />
                              
                              <Button>
                                <TextFields className="edit" fontSize="large" />
                              </Button>
                            </div>
                          </div>
                          
                        </Accordion>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
        </div>
        <div>
          <SaveIcon onClick={() => saveForm()} />
        </div>
      </div>
    );
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...questions];
    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );
    setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  return (
    <div>
      <div className="toolbar">
        <Toolbar questions={questions} />
      </div>
      <div className="question_form">
        <br />
        <div className="section">
          <div className="question_title_section">
            <div className="question_form_top">
              <input
                type="text"
                className="question_form_top_name"
                style={{ color: "black" }}
                placeholder="Untitled document"
              />
              <input
                type="text"
                className="question_form_top_desc"
                placeholder="Survey description"
              />
            </div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questionsUI()}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default QuestionForm;

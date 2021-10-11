import React, { useState, useEffect } from "react";
import s from "pages/index.module.scss";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import Select from 'react-select';
import {
  Container,
  Button,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Form,
  Card,
  CardHeader,
  CardBody,
  ListGroup, 
  ListGroupItem
} from "reactstrap";
import Checkbox from "react-custom-checkbox";

const options = [
  { value: '1', label: 'Section 1 (Reading)' },
  { value: '2', label: 'Section 2 (Writing and Language)' },
  { value: '3', label: 'Section 3 (Math no cale)' },
  { value: '4', label: 'Section 4 (Math with cale)' },
  { value: '5', label: 'Expiremental' },
];

const questions = [
  {id: '1', label: '1'},
  {id: '2', label: '2'},
  {id: '3', label: '3'},
  {id: '4', label: '4'},
  {id: '5', label: '5'},
  {id: '6', label: '6'},
  {id: '7', label: '7'},
  {id: '8', label: '8'},
  {id: '9', label: '9'},
  {id: '10', label: '10'},
]

const answers = [
  {id: '1', label: 'A'},
  {id: '2', label: 'B'},
  {id: '3', label: 'C'},
  {id: '4', label: 'D'},
  {id: '5', label: 'E'},
  {id: '6', label: 'F'},
]

const customStyles = {
  control: (styles) => ({ ...styles, minWidth: "180px", minHeight: "50px" }),
  option: (styles) => ({ ...styles }),
  menu: (styles) => ({ ...styles, minWidth: "180px", backgroundColor: "black", color: "white", zIndex: "99" }),
};

let answerList = [];

const Index = () => {
  const [sectionOptions, setSectionOptions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState({id: '1', label: '1'});
  const [currentAnswer, setCurrentAnswer] = useState([]);

  useEffect(() => {
    options.map((item) => {
      questions.map((question) => {
        answerList.push({section: item.value, question: question, answer: []})
      });
    });
  }, []);

  const handleChange = (selectedOption) => {
    setSectionOptions(selectedOption);
    console.log(`Option selected:`, selectedOption);
    checkAnswers(selectedOption, currentQuestion);
  };

  const handleClickQuestion = (selectedQuestion) => {
    if(!sectionOptions) {
      alert("Please select the section");
      return;
    }
    setCurrentQuestion(selectedQuestion);
    checkAnswers(sectionOptions, selectedQuestion);
    console.log(`question selected:`, currentQuestion);
  }

  const handlePromoteQuestion = (type) => {
    if(!sectionOptions) {
      alert("Please select the section");
      return;
    }
    questions.map((question, key) => {
      if(currentQuestion.id == question.id) {
        if(type == "next") {
          if(key == questions.length-1) {
            alert("This are no more questions...");
            return;
          }
          setCurrentQuestion(questions[key+1])
          checkAnswers(sectionOptions, questions[key+1]);
        }
      }
      if(currentQuestion.id == question.id) {
        if(type == "prev") {
          if(key == 0) {
            alert("This is first question...");
            return;
          }
          setCurrentQuestion(questions[key-1])
          checkAnswers(sectionOptions, questions[key-1]);
        }
      }
    });
  }

  const handleSubmit = () => {
    answerList= [];
    alert('success');
    options.map((item) => {
      questions.map((question) => {
        answerList.push({section: item.value, question: question, answer: []})
      });
    });
  }

  const addAnswerList = (param) => {
    if(!sectionOptions) {
      alert("Please select the section");
      return;
    }
    let count = 0;
    let filtered = answerList.filter( item => item.section == sectionOptions.value && item.question.id ==  currentQuestion.id);
    let filteredAnswerIndex = filtered[0]['answer'];
    filteredAnswerIndex.push(param);

    filteredAnswerIndex.forEach((item) => {
      if (item.id === param.id) count += 1;
    });

    filteredAnswerIndex = filteredAnswerIndex.filter((item) => {
      if (filteredAnswerIndex.length === 1) {
        return true;
      }
      if (count === 1 && item.id === param.id) return true;
      return item.id !== param.id;
    });

    answerList.map((item) => {
      if( item.section == sectionOptions.value && item.question.id ==  currentQuestion.id ) {
        item.answer = filteredAnswerIndex;
      }
    });
    
    console.log( answerList.filter( item => item.section == sectionOptions.value && item.question.id ==  currentQuestion.id));
    setCurrentAnswer(filteredAnswerIndex);
  }

  const checkAnswers = (sectionParam, questionParam) => {
    let filtered = answerList.filter( item => item.section == sectionParam.value && item.question.id ==  questionParam.id);
    let filteredAnswerIndex = filtered[0]['answer'];
    console.log(filteredAnswerIndex);
    setCurrentAnswer(filteredAnswerIndex);
  }

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Row className={"no-gutters"} style={{ height: "100vh" }}>
          <Col xs={12} sm={12} md={8} className="h-100" >
            <div className={`h-75 ${s.backgroundImage}`} />
            <Button
              outline
              color="primary"
              className={`text-uppercase mt-4 mr-auto fw-bold d-flex align-items-center ${s.viewMoreBtn} ml-auto`}
              style={{ backgroundColor: "#09097c", borderColor: "black", color: "white" }}
            >
              <p className={"mb-0"}> 
                You selected answer { currentAnswer.length > 0 ? currentAnswer.map((i) => {return i.label}).join(",") : "?" } for question number {currentQuestion.label} 
              </p>{" "}
            </Button>
            <Button
              outline
              color="primary"
              className={`text-uppercase mt-4 mr-auto fw-bold d-flex align-items-center ${s.viewMoreBtn} ml-auto`}
              style={{ backgroundColor: "black", borderColor: "black", color: "white" }}
              onClick={() => handleSubmit()}
            >
              <p className={"mb-0"}>Submit</p>{" "}
            </Button>
          </Col>
          <Col
            xs={12}
            md={4}
            className={
              "d-flex flex-column justify-content-center align-items-center h-100"
            }
          >
            <Container>
              <Row>
                <Col lg={12}>
                  <h4 className={"fw-bold mb-5"}>Testing Sections</h4>
                  <Select
                    styles={customStyles}
                    value={sectionOptions}
                    onChange={handleChange}
                    options={options}
                    placeholder="Select Video param"
                  />

                  <Button
                    outline
                    color="primary"
                    className={`text-uppercase justify-content-center mt-4 mr-auto fw-bold d-flex align-items-center ${s.viewMoreBtn} ml-auto`}
                    style={{ backgroundColor: "#09097c", borderColor: "black", color: "white", width: "100%" }}
                    onClick={ () => handlePromoteQuestion("next") }
                  >
                    <p className={"mb-0"}> Next Question </p>{" "}
                    <div className={`ml-2 ${s.arrowRight}`} />
                  </Button>
                  <Button
                    outline
                    color="primary"
                    className={`text-uppercase justify-content-center mt-4 mr-auto fw-bold d-flex align-items-center ${s.viewMoreBtn} ml-auto`}
                    style={{ backgroundColor: "white", borderColor: "black", color: "#09097c", width: "100%" }}
                    onClick={ () => handlePromoteQuestion("prev") }
                  >
                    <div className={`mr-2 ${s.arrowLeft}`} />
                    <p className={"mb-0"}> Previous Question </p>{" "}
                  </Button>

                  <Row className="mt-5">
                    <Col sm="6">
                      <Card>
                        <CardHeader> <h6 className={"fw-bold"}> Question </h6> </CardHeader>
                        <CardBody style={{ height: "307px", overflow: "auto" }}>
                          <ListGroup>
                            {questions.map( (item, key) => {
                              if(key == 0) {
                                return <ListGroupItem onClick={ () => handleClickQuestion(item) } style={{ borderTop: "none", marginTop: "-10px" }} key={key}>{item.label}</ListGroupItem>
                              }
                              return <ListGroupItem onClick={ () => handleClickQuestion(item) } key={key}>{item.label}</ListGroupItem>
                            } )}
                          </ListGroup>
                        </CardBody>
                      </Card>
                      
                    </Col>
                    <Col sm="6">
                      <Card>
                        <CardHeader> <h6 className={"fw-bold"}> Answer </h6> </CardHeader>
                        <CardBody>
                          <ListGroup>
                            {answers.map( (item, key) => {
                              if(key == 0) {
                                return <ListGroupItem style={{ borderTop: "none", marginTop: "-10px" }} key={key}> 
                                  <div className={"d-flex align-items-center"}>
                                    <input
                                      type="checkbox"
                                      checked={ currentAnswer.includes(item)}
                                      onChange={() => addAnswerList(item)}
                                    />
                                    <p
                                      className={"d-inline-block ml-1 mb-0"}
                                      style={{ cursor: "pointer" }}
                                      onClick={() => addAnswerList(item)}
                                    >
                                      { item.label}
                                    </p>
                                  </div>
                                </ListGroupItem>
                              }
                              return <ListGroupItem key={key} style={{ marginTop: "5px" }}>
                                  <div className={"d-flex align-items-center"} >
                                    <input
                                      type="checkbox"
                                      checked={ currentAnswer.includes(item)}
                                      onChange={() => addAnswerList(item)}
                                    />
                                    <p
                                      className={"d-inline-block ml-1 mb-0"}
                                      style={{ cursor: "pointer" }}
                                      onClick={() => addAnswerList(item)}
                                    >
                                      { item.label}
                                    </p>
                                  </div>
                              </ListGroupItem>
                            } )}
                          </ListGroup>
                        </CardBody>
                      </Card>
                      
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
          
        </Row>
    </>
  );
};

export async function getServerSideProps(context) {

  return {
    props: { }, // will be passed to the page component as props
  };
}

export default Index;

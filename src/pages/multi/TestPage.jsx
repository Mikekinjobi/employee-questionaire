import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import questionsData from "../../data/questions.json";
import managers from "../../data/managers.json";
// import imagePaths from "../../components/importImages";


import A1 from '../../images/QuestionImages/A1.png';
import A2 from '../../images/QuestionImages/A2.png';
import A3 from '../../images/QuestionImages/A3.png';
import A4 from '../../images/QuestionImages/A4.png';
import A5 from '../../images/QuestionImages/A5.png';
import A6 from '../../images/QuestionImages/A6.png';
import A7 from '../../images/QuestionImages/A7.png';
import A8 from '../../images/QuestionImages/A8.png';
import A9 from '../../images/QuestionImages/A9.png';
import A10 from '../../images/QuestionImages/A10.png';
import A11 from '../../images/QuestionImages/A11.png';
import A12 from '../../images/QuestionImages/A12.png';
import A13 from '../../images/QuestionImages/A13.png';
import A14 from '../../images/QuestionImages/A14.png';
import A15 from '../../images/QuestionImages/A15.png';
import A16 from '../../images/QuestionImages/A16.png';
import A17 from '../../images/QuestionImages/A17.png';
import A18 from '../../images/QuestionImages/A18.png';
import A19 from '../../images/QuestionImages/A19.png';
import A20 from '../../images/QuestionImages/A20.png';
import A21 from '../../images/QuestionImages/A21.png';
import A22 from '../../images/QuestionImages/A22.png';
import A23 from '../../images/QuestionImages/A23.png';
import A24 from '../../images/QuestionImages/A24.png';
import A25 from '../../images/QuestionImages/A25.png';

import B1 from '../../images/QuestionImages/B1.png';
import B2 from '../../images/QuestionImages/B2.png';
import B3 from '../../images/QuestionImages/B3.png';
import B4 from '../../images/QuestionImages/B4.png';
import B5 from '../../images/QuestionImages/B5.png';
import B6 from '../../images/QuestionImages/B6.png';
import B7 from '../../images/QuestionImages/B7.png';
import B8 from '../../images/QuestionImages/B8.png';
import B9 from '../../images/QuestionImages/B9.png';
import B10 from '../../images/QuestionImages/B10.png';
import B11 from '../../images/QuestionImages/B11.png';
import B12 from '../../images/QuestionImages/B12.png';
import B13 from '../../images/QuestionImages/B13.png';
import B14 from '../../images/QuestionImages/B14.png';
import B15 from '../../images/QuestionImages/B15.png';
import B16 from '../../images/QuestionImages/B16.png';
import B17 from '../../images/QuestionImages/B17.png';
import B18 from '../../images/QuestionImages/B18.png';
import B19 from '../../images/QuestionImages/B19.png';
import B20 from '../../images/QuestionImages/B20.png';
import B21 from '../../images/QuestionImages/B21.png';
import B22 from '../../images/QuestionImages/B22.png';
import B23 from '../../images/QuestionImages/B23.png';
import B24 from '../../images/QuestionImages/B24.png';
import B25 from '../../images/QuestionImages/B25.png';


const images = {
  A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, 
  A11, A12, A13, A14, A15, A16, A17, A18, A19, A20, 
  A21, A22, A23, A24, A25, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, 
  B11, B12, B13, B14, B15, B16, B17, B18, B19, B20, 
  B21, B22, B23, B24, B25
};

export default function TestPage() {
  const [data, setFormData]  =useState({});
  const [managerIndex] = useState(Math.floor(Math.random() * managers.allData.length));
  const manager = managers.allData[managerIndex];
  const [questions, setQuestions] = useState([])
  const [questionsInfo, setQuestionsInfo] = useState([])
  const [countSeconds, setSeconds] = useState(3000);
  const [questionsDataState, setQuestionsData] = useState([]);
  const [answersList, setAnswersList] = useState([])
  const [submitted, setSubmitted] = useState(false)
  let [correctAnswers, setCorrectAnswers] = useState(0);
  let [eValue, setEvalue] = useState(0);
  let [totalEvalue, setTotalEvalue] = useState(0)
  let [numberOfSkippedQuestions, setNumberOfSkippedQuestions] = useState(0);
  let [skippedQuestions, setSkippedQuestions] = useState([]);
  let [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);
  let [disableButton, setDisableButton] = useState(true)
  const [inputFieldsFilled, setInputFieldsFilled] = useState([]);


  const handleSubmit = ()=> {
        setSubmitted(true);
  }

  function updateFields(fields) {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  }

  useEffect(()=>{
    setQuestions(manager.table2Choices.slice(-3))
  
  }, [manager])

  useEffect(()=>{
    console.log(questions)
    setQuestionsInfo(questionsData.Portfolio2.filter(question=> question.PORTFOLIO == questions[0] || question.PORTFOLIO == questions[1] || question.PORTFOLIO == questions[2]))
  }, [questions])

useEffect(()=> {
  console.log(questionsInfo)
  setTotalEvalue(questionsInfo.reduce((acc, question)=> acc + question.Column2, 0))
}, [questionsInfo])

useEffect(()=>{
  updateFields({eValue, correctAnswers, skippedQuestions, answersList})
},[eValue, correctAnswers, skippedQuestions, answersList])
  return (
    <>
    <h1>Practice Round</h1>

    {...questionsInfo.map((question, index) => (
          <div key={index}>
            <label htmlFor={index}><h3>{question.Column10}</h3></label>
            <div className="img-input-div">
              <div className="img-div" >
                
                {/* {question.Column5} */}
                <img src={images[question.PORTFOLIO]} alt="" />
              </div>
              <input className="num-input" type="number" placeholder='type a number' name={index} id={index} onChange={(e)=>{
              
              let a = question.PORTFOLIO + " " + e.target.value;
              let update = answersList.findIndex(answer=> answer.split(' ')[0] == question.PORTFOLIO)
              console.log("data: ", data)
              let initialCorrect = false;
              let skipped = false;

              if(update != -1){
                if(answersList[update].split(' ')[1] == question.Column4) {
                    initialCorrect = true;
                  }
                if(answersList[update].split(' ')[1] == 0){skipped = true;}
                  

                console.log("skipped!!!! ", skipped)
                answersList[update] = a;
                if(e.target.value == question.Column4){
                    if(!initialCorrect){
                    setCorrectAnswers(prev=> ++prev)
                    setEvalue(prev=> prev += question.Column2)
                    if(skipped){
                        setNumberOfSkippedQuestions(prev=> --prev)
                        setSkippedQuestions(prev=> [...prev].filter((answer)=> answer != answersList[update]))
                    }
                    }

                }else if(e.target.value != question.Column4) {
                    if(initialCorrect){
                    setCorrectAnswers(prev=> --prev)
                    setEvalue(prev=> prev -= question.Column2)
                    if (!skipped && e.target.value == 0) {
                        setNumberOfSkippedQuestions(prev => prev + 1);
                        setSkippedQuestions(prev => [...prev, answersList[update]])
                      }
                    }
                    
                }   
            }else {
                answersList.push(a);
                if(e.target.value == question.Column4){
                    setCorrectAnswers(prev=> ++prev)
                    setEvalue(prev=> prev += question.Column2)
                }
                if(e.target.value == 0){
                    setNumberOfSkippedQuestions(prev=> ++prev)
                    setSkippedQuestions(prev => [...prev, answersList[update]])
                }
            }
  
                 
                  updateFields({eValue, correctAnswers, skippedQuestions, totalEvalue, answersList})
              }
              }/>
            </div>
          </div>
        ))}
    {submitted && <div>
    <h3>Results:</h3>
        <p>Result: {((eValue/totalEvalue) * 100).toFixed(1)}% , {totalEvalue} was the Maximum Value possible</p>
    </div>}
    <button onClick={handleSubmit} className="button-link">Submit</button> <br /><br />
    {submitted && <Link to={"/questions"} className="button-link">End Practice Round</Link>}
    </>
  );
}


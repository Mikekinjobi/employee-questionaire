import React, { useState, useEffect } from "react";
import questionsData from "../../data/questions.json";
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


const Page1 = ({ sendDataToParent, goToNextPage, seconds, questions, data, currentPage, newPostMutation, handleTimeout }) => {
  // console.log("imagePaths ", imagePaths)
  const [value, setValue] = useState("");
  const [countSeconds, setSeconds] = useState(seconds);
  const [questionsDataState, setQuestionsData] = useState([]);
  let [correctAnswers, setCorrectAnswers] = useState(0);
  let [eValue, setEvalue] = useState(0);
  let [numberOfSkippedQuestions, setNumberOfSkippedQuestions] = useState(0);
  let [skippedQuestions, setSkippedQuestions] = useState([]);
  let [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);
  let [disableButton, setDisableButton] = useState(true)
  const [inputFieldsFilled, setInputFieldsFilled] = useState([]);

    const handleWheel = (e) => {
      if (document.activeElement === e.target) {
        e.preventDefault();
      }
    };
  
    useEffect(() => {
      const handleDocumentWheel = (e) => handleWheel(e);
  
      document.addEventListener('wheel', handleDocumentWheel, { passive: false });
  
      return () => {
        document.removeEventListener('wheel', handleDocumentWheel);
      };
    }, []); 


useEffect(() => {
  setInputFieldsFilled(Array.from({ length: questionsDataState.length }, () => false));
}, [questionsDataState]);

const handleInputChange = (index, value) => {
  const updatedFilledStatus = [...inputFieldsFilled];
  updatedFilledStatus[index] = value !== "";
  setInputFieldsFilled(updatedFilledStatus);
};

useEffect(() => {
  const allFieldsFilled = inputFieldsFilled.every(field => field);
  setDisableButton(!allFieldsFilled);
}, [inputFieldsFilled]);

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = () => {

    const pageData = {
      correctAnswers,
      eValue,
      numberOfSkippedQuestions,
      skippedQuestions,
      numberOfAnsweredQuestions,
      questionsDataState
    };
  
    sendDataToParent(pageData);
    newPostMutation.mutate();
  
    // goToNextPage(); 
  };

  function updateFields(fields) {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  }

  useEffect(() => {
    if (countSeconds == 0) {
      handleTimeout();
      setSeconds(180);
    }
  }, [countSeconds]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(()=> {
    const qData = questions.map(question=> {
        if(question.split('')[0] === 'A'){
            return questionsData.Portfolio1.find(d => d["PORTFOLIO"] === question);
        }
        if(question.split('')[0] === 'B'){
            return questionsData.Portfolio2.find(d => d["PORTFOLIO"] === question);
        }
        console.log(question.split('')[0]);
    });

    setQuestionsData(qData);
  }, [questions]);

  const minutes = Math.floor(countSeconds / 60);
  const remainingSeconds = countSeconds % 60;

  return (
    <div>
      <div style={{display: "flex", flexDirection:"column", alignItems:"center", border:"",}}>

      <div className={"timer-instructions-div"}>
        <p className="timer-instructions"><b>The tasks you see are assigned to you by your manager. You can choose to do the task or skip by putting ‘0’ <br /> There is no value gained for skipped or wrong answers.</b></p>
        <div className="timer">
          <h3 style={{marginBottom: "0px"}}>Time left: </h3>
          <hr />
          <h3 style={{marginTop: "1px", color: "white"}}>{`${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`}</h3>
        </div>
      </div>
      <div style={{width: "80%"}}>
        {...questionsDataState.map((question, index) => (
          <div key={index}>
            <label htmlFor={index}><h3>{question.Column10}</h3></label>
            <div className="img-input-div">
              <div className="img-div" >
                
                {/* {question.Column5} */}
                <img src={images[question.PORTFOLIO]} alt="" />
              </div>
              <input className="num-input" type="number" placeholder='type a number' name={index} id={index} onChange={(e)=>{
                
                handleInputChange(index, e.target.value)
                let a = question.PORTFOLIO + " " + e.target.value;
                let answersList = data.answers;
                setNumberOfAnsweredQuestions(answersList.filter(answer=> answer.split(' ')[1] != 0).length)
                let update = data.answers.findIndex(answer=> answer.split(' ')[0] == question.PORTFOLIO)
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
              }}/>
            </div>
          </div>
        ))}
        <br />
        <button className={disableButton ? "grey": "button-link"} onClick={handleSubmit} disabled={disableButton}>Submit</button>
      </div>
      </div>
    </div>
  );
};

export default Page1;

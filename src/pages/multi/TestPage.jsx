import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import questionsData from "../../data/questions.json";
import managers from "../../data/managers.json";
// import imagePaths from "../../components/importImages";


import P1 from '../../images/practiceRound/P1.png';
import P2 from '../../images/practiceRound/P2.png';
import P3 from '../../images/practiceRound/P3.png';



const images = {
  P1, P2, P3
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
  let [disableButton, setDisableButton] = useState(false)
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
    setInputFieldsFilled(Array.from({ length: questionsInfo.length }, () => false));
  }, [questionsInfo]);
  
  const handleInputChange = (index, value) => {
    const updatedFilledStatus = [...inputFieldsFilled];
    updatedFilledStatus[index] = value !== "";
    setInputFieldsFilled(updatedFilledStatus);
  };
  
  useEffect(() => {
    const allFieldsFilled = inputFieldsFilled.every(field => field);
    setDisableButton(!allFieldsFilled);
  }, [inputFieldsFilled]);

  const handleSubmit = ()=> {
        setSubmitted(true);
  }

  function updateFields(fields) {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  }

  useEffect(()=>{
    setQuestions(["P1", "P2", "P3"])
  
  }, [manager])

  useEffect(()=>{
    console.log(questions)
    setQuestionsInfo(questionsData.practise)
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

    <div style={{width:"100%"}}className={"timer-instructions-div"}>
        <p style={{width: "100%"}} className="timer-instructions"><b>The tasks you see are assigned to you by your manager. You can choose to do the task or skip by putting ‘0’ There is no value gained for skipped or wrong answers.</b></p>
        
      </div>

    {...questionsInfo.map((question, index) => (
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
        <p>Result: {((eValue/totalEvalue) * 100).toFixed(1)}% , you scored {eValue}, {totalEvalue} was the Maximum Value possible</p>
    </div>}
    <button onClick={handleSubmit} className={disableButton ? "grey": "button-link"} disabled={disableButton} >Submit</button> <br /><br />
    {submitted && <Link to={"/questions"} className="button-link">End Practice Round</Link>}
    </>
  );
}


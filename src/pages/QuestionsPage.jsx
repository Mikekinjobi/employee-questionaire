import React, { useState, useEffect } from "react";
import data from "../data/questions.json";


export default function QuestionsPage({ questions, seconds, handleTimeout, updateFields, formData, updateTotalValues, currentPageIndex}) {
  const [countSeconds, setSeconds] = useState(seconds);
  const [questionsData, setQuestionsData] = useState([]);
  let [correctAnswers, setCorrectAnswers] = useState(0);
  let [eValue, setEvalue] = useState(0);
  let [numberOfSkippedQuestions, setNumberOfSkippedQuestions] = useState(0);
  let [skippedQuestions, setSkippedQuestions] = useState([]);
  let [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);

  useEffect(()=>{
    updateFields({correctAnswers, eValue, numberOfSkippedQuestions, numberOfAnsweredQuestions,})
    console.log("Evalue: ", eValue, "FormData:", FormData.totalPossibleEvalue)
    
  }, [correctAnswers, eValue, numberOfSkippedQuestions])
  useEffect(() => {
    updateTotalValues(eValue);
    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
  }, [currentPageIndex, updateTotalValues]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

 



  useEffect(()=> {
    const qData = questions.map(question=> {
        if(question.split('')[0] == 'A'){
            return data.Portfolio1.find(d => d["PORTFOLIO"] == question)
        }
        if(question.split('')[0] == 'B'){
            return data.Portfolio2.find(d => d["PORTFOLIO"] == question)
        }
        console.log(question.split('')[0])
    })
    console.log(questions)

    setQuestionsData(qData);
  }, [])

  useEffect(() => {
    if (countSeconds == 0) {
      handleTimeout();
      setSeconds(19);
    }
  }, [countSeconds]);

  const minutes = Math.floor(countSeconds / 60);
  const remainingSeconds = countSeconds % 60;
  return (
    <div>
        <div style={{display:"flex"}}>
        <p>The tasks you see are assigned to you by your manager. You can choose to do the task or skip by putting ‘0’ There is no value gained for skipped or wrong answers.</p>
        <div className="timer">
        <p style={{marginBottom: "0px"}}>Time left: </p>
        <p style={{marginTop: "1px", color: "white"}}>{`${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`}
        </p>

        </div>
        </div>
      
      {questionsData.map((question, index) => (
        <div key={index}>
        <label htmlFor={index}><h3>{question.Column10}</h3></label>
        <div className="img-input-div">
        <div className="img-div" >{question.Column5}</div>

        <input className="num-input" type="number" placeholder='type a number' name={index} id={index} onChange={(e)=>{
            let a = question.PORTFOLIO + " " + e.target.value;
            let answersList = formData.answers;
            let update = formData.answers.findIndex(answer=> answer.split(' ')[0] == question.PORTFOLIO)
            console.log("formData: ", formData)
            let initialCorrect = false;
            let skipped = false;
            if(e.target.value != 0 && e.target.value != '') {
                setNumberOfAnsweredQuestions(prev=> ++prev)
            }else{
                setNumberOfAnsweredQuestions(prev=> --prev)
            }
            setNumberOfSkippedQuestions(prev=> prev++)
            console.log(question.Column4);
            if(update != -1){
                if(answersList[update].split(' ')[1] == question.Column4) {
                    initialCorrect = true;
                  }
                  if(answersList[update].split(' ')[1] == '0'){skipped = true;}



                answersList[update] = a;
                if(e.target.value == question.Column4){
                    if(!initialCorrect){
                    setCorrectAnswers(prev=> ++prev)
                    setEvalue(prev=> prev += question.Column2)
                    if(skipped){
                        setNumberOfSkippedQuestions(prev=> --prev)
                    }
                    }

                }else if(e.target.value != question.Column4) {
                    if(initialCorrect){
                    setCorrectAnswers(prev=> --prev)
                    setEvalue(prev=> prev -= question.Column2)
                    if (!skipped && e.target.value == 0) {
                        setNumberOfSkippedQuestions(prev => prev + 1);
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
                    setNumberOfSkippedQuestions(prev=> prev++)
                }
            }
            

            updateFields({answers: answersList, correctAnswers, eValue, numberOfSkippedQuestions, numberOfAnsweredQuestions})
            
        }} />
        </div>
        
        </div>
      ))}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import questionsData from "../../data/questions.json";

const Page1 = ({ sendDataToParent, goToNextPage, seconds, questions, data }) => {
  const [formData, setFormData] = useState({});
  const [countSeconds, setSeconds] = useState(seconds);
  const [questionsDataState, setQuestionsData] = useState([]);
  let [correctAnswers, setCorrectAnswers] = useState(0);
  let [eValue, setEvalue] = useState(0);
  let [numberOfSkippedQuestions, setNumberOfSkippedQuestions] = useState(0);
  let [skippedQuestions, setSkippedQuestions] = useState([]);
  let [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0);

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
  
  
    goToNextPage(); 
  };

  function updateFields(fields) {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  }

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
      <h2>{questions[0]}</h2>
      <div style={{display:"flex", justifyContent: "space-between"}}>
        <p style={{width: "50%"}}>The tasks you see are assigned to you by your manager. You can choose to do the task or skip by putting ‘0’ There is no value gained for skipped or wrong answers.</p>
        <div className="timer">
          <p style={{marginBottom: "0px"}}>Time left: </p>
          <p style={{marginTop: "1px", color: "white"}}>{`${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`}</p>
        </div>
      </div>
      <div>
        {...questionsDataState.map((question, index) => (
          <div key={index}>
            <label htmlFor={index}><h3>{question.Column10}</h3></label>
            <div className="img-input-div">
              <div className="img-div" >{question.Column5}</div>
              <input className="num-input" type="number" placeholder='type a number' name={index} id={index} onChange={(e)=>{
                let a = question.PORTFOLIO + " " + e.target.value;
                let answersList = data.answers;
                setNumberOfAnsweredQuestions(answersList.length)
                let update = data.answers.findIndex(answer=> answer.split(' ')[0] == question.PORTFOLIO)
                console.log("data: ", data)
                let initialCorrect = false;
                let skipped = false;

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
                      setNumberOfSkippedQuestions(prev=> prev++)
                  }
              }
              }}/>
            </div>
          </div>
        ))}
      </div>
      <button className={"button-link"} onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Page1;

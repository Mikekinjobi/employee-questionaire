import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import managers from "../../data/managers.json";
import questionsData from "../../data/questions.json"
import { v4 as uuidv4 } from "uuid";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import { useMutation } from "@tanstack/react-query";
import QuestionsPage from "../QuestionsPage";
import Page7 from "../Page7";
import Page6 from "../Page6";

const initialState = {
  answerId: uuidv4(),
  createdAt: new Date(),
  answers: [],
};

const generateRandomIndex = (max) => Math.floor(Math.random() * max);

const generateQuestionPages = (questions, seconds, handleTimeout, updateFields, formData, updateTotalValues, currentPageIndex) => {
  const pages = [];


  const fullSubArraysCount = Math.floor(questions.length / 3);

  for (let i = 0; i < fullSubArraysCount; i++) {
    const subArray = questions.slice(i * 3, (i + 1) * 3);
    pages.push(
      <QuestionsPage
        key={uuidv4()}
        questions={subArray}
        seconds={seconds}
        handleTimeout={handleTimeout}
        updateFields={updateFields}
        formData={formData}
        updateTotalValues={updateTotalValues}
        currentPageIndex={currentPageIndex}
      />
    );
  }

  const remainder = questions.length % 3;
  if (remainder !== 0) {
    const partialSubArray = questions.slice(fullSubArraysCount * 3);
    pages.push(
      <QuestionsPage
        key={uuidv4()}
        questions={partialSubArray}
        seconds={seconds}
        handleTimeout={handleTimeout}
        updateFields={updateFields}
        formData={formData}
        updateTotalValues={updateTotalValues}
      />
    );
  }
  pages.push(<Page6 formData={formData} updateFields={updateFields}/>)

  pages.push(<Page7 formData={formData}/>)

  return pages;
};

export function Form() {
  const [data, setData] = useState(initialState);
  const [seconds, setSeconds] = useState(1000);
  const [managerIndex] = useState(
    generateRandomIndex(managers.allData.length)
  );
  const manager = managers.allData[managerIndex];
  const tableUsed = useMemo(() => Math.floor(Math.random() * 2), []);
  const questions = useMemo(
    () =>
      tableUsed === 0 ? manager.table1Choices : manager.table2Choices,
    [tableUsed, manager]
  );
  const [questionPages, setQuestionPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [progressBar, setProgressBar] = useState(0)
  let [result, setResult] = useState(0);
  let [pagesEvalue, setPagesEvalue] = useState(0)
  const [showProgress, setShowProgress] = useState(true)

  const updateTotalValues = (eValue) => {
    setPagesEvalue(prevTotalEValue => prevTotalEValue + eValue);
    const updatedPagesEvalue = pagesEvalue + eValue;
    console.log("hgggggggggggggggggggg")
    updateFields({pagesEvalue: updatedPagesEvalue})
  };
  
  

  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const newPostMutation = useMutation({
    mutationFn: (data) => {
      
      if (currentStepIndex === 0) {
        axios.post(
          "https://questionaire-backend-01x0.onrender.com/employees/addData",
          data
        );
      } else {
        axios.patch(
          `https://questionaire-backend-01x0.onrender.com/employees/update/${data.answerId}`,
          data
        );
      }
    },
    onSuccess: () => {
      next()
    },
    onError: () => {},
  });
  

  const handleTimeout = useCallback(() => {
    newPostMutation.mutate(data);
    
  }, [updateFields]);

  let {
    currentStepIndex,
    next,
    back,
    isLastStep,
    step,
  } = useMultistepForm(questionPages);

  console.log(data)

  useEffect(() => {
    updateFields({managerId: manager.answerId})
  }, [manager]);


  useEffect(() => {
    setQuestionPages(generateQuestionPages(questions, seconds, handleTimeout, updateFields, data, updateTotalValues, currentStepIndex));
    const qData = questions.map(question=> {
      if(question.split('')[0] == 'A'){
          return questionsData.Portfolio1.find(d => d["PORTFOLIO"] == question)
      }
      if(question.split('')[0] == 'B'){
          return questionsData.Portfolio2.find(d => d["PORTFOLIO"] == question)
      }
  })
  const totalPossibleEvalue = qData.reduce((acc, q)=> acc + q.Column2, 0)

    updateFields({totalQuestions: questions.length, totalPossibleEvalue, result})
    
  }, [questions, seconds]);

  useEffect(() => {
    if (questionPages.length > 0) {
      setCurrentPage(questionPages[currentStepIndex]);
    }
    if(currentStepIndex == questionPages.length-1){
      setShowProgress(false)
    }
    
   updateFields({pagesEvalue}) 
    updateFields({result})
    console.log('changed!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', pagesEvalue, data.totalPossibleEvalue)
    setProgressBar(((currentStepIndex/(questionPages.length-2)) * 100).toFixed(0))
  }, [questionPages, currentStepIndex]);


    
  const handleSubmit = () => {
    newPostMutation.mutate(data);
  };

  const condition = false; 

  return (
    <div>
      { showProgress && <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progressBar}%` }}>
        {`${progressBar}%`}
      </div>
      </div>
}
      {currentPage}
      <div>
        {!isLastStep && (
          <button
            className={condition ? "grey" : "button-link"}
            onClick={handleSubmit}
            type="button" 
            disabled={condition || newPostMutation.isLoading}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

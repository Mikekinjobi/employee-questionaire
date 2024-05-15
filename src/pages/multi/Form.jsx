import React, { useState, useEffect, useMemo, useCallback } from "react";
import {useMutation} from "@tanstack/react-query"
import managers from "../../data/managers.json";
import questionsData from "../../data/questions.json";
import axios from 'axios'
import { v4 as uuidv4 } from "uuid";
import Page1 from './Page1';
import Page6 from '../Page6';
import Page7 from '../Page7';

const initialState = {
  answerId: uuidv4(),
  createdAt: new Date(),
  dataFromPage1: [],
  answers: [],
};

const MultipageComponent = () => {
  const [data, setData] = useState(initialState)
  
  const [currentPage, setCurrentPage] = useState(0); 
  const [dataFromPage1, setDataFromPage1] = useState([]);
  const [dataFromPage2, setDataFromPage2] = useState('');
  const [questionPages, setQuestionPages] = useState([]);
  const [eValue, setEvalue] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] = useState(0)
  const [numberOfSkippedQuestions, setNumberOfSkippedQuestions] = useState(0)
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [totalPossibleEvalue, setTotalPossibleEvalue] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [result, setResult] = useState(0);
  let [percentageSkippedQuestions, setPercentageSkippedQuestions] = useState(0);
  let [percentageCorrectAnswers, setPercentageCorrectAnswers] = useState(0);
  const [managerIndex] = useState(Math.floor(Math.random() * managers.allData.length));
  let [progressBar, setProgressBar] = useState(0)
  let [showProgress, setShowProgress] = useState(true)
  const manager = managers.allData[managerIndex];
  const [managerId, setManagerId] = useState('')
  const tableUsed = useMemo(() => Math.floor(Math.random() * 2), []);
  const questions = useMemo(
    () => (tableUsed === 0 ? manager.table1Choices : manager.table2Choices),
    [tableUsed, manager]
  );

  
  const newPostMutation = useMutation({
    mutationFn: () => {
      
      if (currentPage == 0) {
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
      goToNextPage()
    },
    onError: () => {
      
    },
  });

  const handleTimeout = useCallback(() => {
    newPostMutation.mutate(data);
    
  }, [updateFields]);

  const handleDataFromPage1 = (newData) => {
    setDataFromPage1(prevData => [...prevData, newData]);
  };
  
console.log(data)
  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const sendDataToChild = ()=>{
    return data;
  }

  const goToNextPage = () => {
    console.log("Updating page ....")
    setCurrentPage(prev => prev + 1);
    console.log("after update>>.>>>")
  };

  useEffect(()=>{
    updateFields({dataFromPage1})
  }, [dataFromPage1])

  useEffect(()=>{
    setSkippedQuestions(data.answers.map(answer=> { if(answer.split(' ')[1] == 0) return answer.split(' ')[0]}).filter(x => x != null))
  },[numberOfSkippedQuestions, currentPage])

  useEffect(()=> {
    updateFields({totalPossibleEvalue, totalQuestions})
  }, [questions, totalPossibleEvalue, totalQuestions])

  useEffect(()=>{

    let correctAnswers = 0;
    let eValue = 0;
    let numberOfAnsweredQuestions = 0;
    // let numberOfSkippedQuestions = 0;
    let percentageSkippedQuestions;
    let percentageCorrectAnswers;
    let result = 0;
    data.dataFromPage1.forEach(page=>{
      correctAnswers += page.correctAnswers;
      eValue +=page.eValue;
      numberOfAnsweredQuestions = page.numberOfAnsweredQuestions;
      // numberOfSkippedQuestions += page.numberOfSkippedQuestions;
      result += page.result;
    })

    setCorrectAnswers(correctAnswers);
    setEvalue(eValue);
    setNumberOfAnsweredQuestions(numberOfAnsweredQuestions);
    // setNumberOfSkippedQuestions(numberOfSkippedQuestions);
    // setSkippedQuestions(skippedQuestions);
    setResult(((eValue/data.totalPossibleEvalue)*100).toFixed(1) + "%")
  

  }, [currentPage, correctAnswers, eValue, numberOfSkippedQuestions])

  useEffect(()=>{
    setPercentageCorrectAnswers(((correctAnswers/data.totalQuestions) * 100).toFixed(1) + "%")
    setPercentageSkippedQuestions(((data.numberOfSkippedQuestions/data.totalQuestions) * 100).toFixed(1) + "%")
  }, [skippedQuestions, correctAnswers, numberOfSkippedQuestions, numberOfAnsweredQuestions])


  useEffect(()=>{

    updateFields({managerId, correctAnswers, eValue, numberOfAnsweredQuestions, numberOfSkippedQuestions, skippedQuestions, result, percentageCorrectAnswers, percentageSkippedQuestions})

  },[correctAnswers, eValue, numberOfAnsweredQuestions, numberOfSkippedQuestions, skippedQuestions, result, currentPage, managerId, percentageCorrectAnswers, percentageSkippedQuestions])

  useEffect(()=>{
    setNumberOfSkippedQuestions(data.answers.filter(answer=> answer.split(' ')[1] == 0).length)
  }, [eValue, result, currentPage])


  useEffect(() => {
    const qData = questions.map(question => {
      if (question.split('')[0] === 'A') {
        return questionsData.Portfolio1.find(d => d["PORTFOLIO"] === question)
      }
      if (question.split('')[0] === 'B') {
        return questionsData.Portfolio2.find(d => d["PORTFOLIO"] === question)
      }
    })
    const totalPossibleEvalue = qData.reduce((acc, q) => acc + q.Column2, 0)
    console.log(totalPossibleEvalue);
    setTotalQuestions(questions.length);
    setTotalPossibleEvalue(totalPossibleEvalue);
    setManagerId(manager.answerId);
    console.log('Question Pages:', questionPages);
  }, [questions, questionPages])


  useEffect(() => {
    
    if(currentPage >= questionPages.length){
      setShowProgress(false)
    }else{
      setShowProgress(true)
    }
    console.log("Page: ", currentPage)
    console.log("question length", questionPages.length)
    setProgressBar(((currentPage/(questionPages.length - 1)) * 100).toFixed(0))

  }, [questionPages, currentPage]);

  useEffect(()=>{
    console.log("Show Progress",showProgress)

  }, [showProgress])

  useEffect(() => {
    const pages = [];
    const seconds = 180;
    const fullSubArraysCount = Math.floor(questions.length / 3);

    for (let i = 0; i < fullSubArraysCount; i++) {
      const subArray = questions.slice(i * 3, (i + 1) * 3);
      pages.push(
        <Page1
          key={uuidv4()}
          questions={subArray}
          seconds={seconds}
          sendDataToParent={handleDataFromPage1}
          goToNextPage={ goToNextPage} 
          data={data}
          newPostMutation={newPostMutation}
          handleTimeout={handleTimeout}
        />
      );
    }

    const remainder = questions.length % 3;
    if (remainder !== 0) {
      const partialSubArray = questions.slice(fullSubArraysCount * 3);
      pages.push(
        <Page1
          key={uuidv4()}
          questions={partialSubArray}
          seconds={seconds}
          sendDataToParent={handleDataFromPage1}
          goToNextPage={goToNextPage} 
          data={data}
          currentPage={currentPage}
          newPostMutation={newPostMutation}
          handleTimeout={handleTimeout}
        />
      );
    }

    pages.push(<Page6 key={uuidv4()} formData={data} updateFields={updateFields} goToNextPage={goToNextPage} newPostMutation={newPostMutation}/>);
    setQuestionPages(pages);
  }, [questions]);



  useEffect(() => {
    console.log('Current Page:', currentPage);
    setResult(result)
  }, [currentPage]);

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div>
        {currentPage < questionPages.length-1 && <h4>Round <span>{currentPage + 1}/{questionPages.length-1}</span></h4>}
      </div>
      <div>
      { showProgress && <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progressBar}%` }}>
        {`${progressBar}%`}
      </div>
      </div>
     
} 
  <br />
  </div>
  <div>
      {questionPages.map((page, index) => 
        index === currentPage && page
      )}
      {currentPage == questionPages.length && <Page7 key={uuidv4()}  formData={data} currentPage={currentPage} getDataFromParent={sendDataToChild}/>}

      
        {/* <button onClick={newPostMutation.mutate(data)}>Submit</button> */}
        {/* <h3>Data received from Page: {dataFromPage1}</h3> */}
      </div>
    </div>
  );
};

export default MultipageComponent;


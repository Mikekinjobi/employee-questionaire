import React, { useState, useEffect, useMemo } from "react";
import managers from "../../data/managers.json";
import questionsData from "../../data/questions.json";
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

  const handleDataFromPage1 = (newData) => {
    setDataFromPage1(prevData => [...prevData, newData]);
  };
  
console.log(data)
  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  useEffect(()=>{
    updateFields({dataFromPage1})
  }, [dataFromPage1])

  useEffect(()=> {
    updateFields({totalPossibleEvalue, totalQuestions})
  }, [questions, totalPossibleEvalue, totalQuestions])

  useEffect(()=>{

    let correctAnswers = 0;
    let eValue = 0;
    let numberOfAnsweredQuestions = 0;
    let numberOfSkippedQuestions = 0;
    let skippedQuestions;
    let result = 0;
    data.dataFromPage1.forEach(page=>{
      correctAnswers += page.correctAnswers;
      eValue +=page.eValue;
      numberOfAnsweredQuestions += page.numberOfAnsweredQuestions;
      numberOfSkippedQuestions += page.numberOfSkippedQuestions;
      skippedQuestions = [...page.skippedQuestions]
      result += page.result;
    })

    setCorrectAnswers(correctAnswers);
    setEvalue(eValue);
    setNumberOfAnsweredQuestions(numberOfAnsweredQuestions);
    setNumberOfSkippedQuestions(numberOfSkippedQuestions);
    setSkippedQuestions(skippedQuestions);
    setResult(((eValue/data.totalPossibleEvalue)*100).toFixed(1) + "%")

  }, [currentPage, correctAnswers, eValue])


  useEffect(()=>{

    updateFields({managerId, correctAnswers, eValue, numberOfAnsweredQuestions, numberOfSkippedQuestions, skippedQuestions, result,})

  },[correctAnswers, eValue, numberOfAnsweredQuestions, numberOfSkippedQuestions, skippedQuestions, result, currentPage, managerId])

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
    if(currentPage == questionPages.length-1){
      setShowProgress(false)
    }
     
    setProgressBar(((currentPage/(questionPages.length-2)) * 100).toFixed(0))
  }, [questionPages, currentPage]);

  useEffect(() => {
  
    const pages = [];
    const seconds = 6000;
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
        />
      );
    }

    pages.push(<Page6 key={uuidv4()} formData={data} updateFields={updateFields} goToNextPage={goToNextPage}/>);
    pages.push(<Page7 key={uuidv4()}  formData={data} currentPage={currentPage}/>);
    setQuestionPages(pages);
  }, [questions]);

  const goToNextPage = () => {
    console.log("Updating page ....")
    setCurrentPage(prev => prev + 1);
    console.log("after update>>.>>>")
  };

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
      { showProgress && <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progressBar}%` }}>
        {`${progressBar}%`}
      </div>
      </div>
} </div>
      {questionPages.map((page, index) => 
        index === currentPage && page
      )}

      <div>
        {/* <h3>Data received from Page: {dataFromPage1}</h3> */}
      </div>
    </div>
  );
};

export default MultipageComponent;


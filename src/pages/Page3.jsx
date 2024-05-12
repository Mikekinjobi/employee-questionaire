import React, {useState}from 'react'
import {Link} from "react-router-dom"
export default function Page3() {
    const [submitted, setSubmitted] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [taskSelect, setTaskSelect] = useState('');
    const [responseSelect, setResponseSelect] = useState('');
    const [optionsSelected, setOptionsSelected] = useState([]);
  
    const handlePortfolioSelectChange = (event) => {
      setTaskSelect(event.target.value);
    };
  
    const handlePortfolioCapacityChange = (event) => {
      setResponseSelect(event.target.value);
    };
  
    const handleOptionChange = (event) => {
      const option = event.target.value;
      const isChecked = event.target.checked;
  
      if (isChecked) {
        setOptionsSelected((prevOptions) => [...prevOptions, option]);
      } else {
        setOptionsSelected((prevOptions) =>
          prevOptions.filter((item) => item !== option)
        );
      }
    };
  
    const handleSubmit = () => {
        if(taskSelect == 'false' && responseSelect == 'false' && optionsSelected.length==3){
      setSubmitted(true);
    setWrong(false);
    }
    else{
        setSubmitted(false);
        setWrong(true);
    }
    };
  
    return (
      <div>
        <form action="">
          <h1>Comprehension Questions</h1>
  
          <fieldset>
            <legend>The tasks assigned to you are randomly selected</legend>
            <input
              type="radio"
              name="portfolioSelect"
              id="trueSelect"
              value="true"
              checked={taskSelect === 'true'}
              onChange={handlePortfolioSelectChange}
            />
            <label htmlFor="trueSelect">True</label>
            <input
              type="radio"
              name="portfolioSelect"
              id="falseSelect"
              value="false"
              checked={taskSelect === 'false'}
              onChange={handlePortfolioSelectChange}
            />
            <label htmlFor="falseSelect">False</label>
            {wrong && <span className="wrongAnswer"> Answer: False</span>}
            {submitted && <span className='answer'> Correct!</span>}
          </fieldset>
  
          <fieldset>
            <legend>You can input my responses in words.</legend>
            <input
              type="radio"
              name="portfolioCapacity"
              id="trueCapacity"
              value="true"
              checked={responseSelect === 'true'}
              onChange={handlePortfolioCapacityChange}
            />
            <label htmlFor="trueCapacity">True</label>
            <input
              type="radio"
              name="portfolioCapacity"
              id="falseCapacity"
              value="false"
              checked={responseSelect === 'false'}
              onChange={handlePortfolioCapacityChange}
            />
            <label htmlFor="falseCapacity">False</label>
            {wrong && <span className="wrongAnswer"> Answer: False</span>}
            {submitted && <span className='answer'> Correct!</span>}
          </fieldset>
  
          <fieldset>
            <legend>If you correctly respond to the tasks, which of the following people hypothetically receive value? Select all that apply.</legend>
            <input
              type="checkbox"
              name="option1"
              id="option1"
              value="Option 1"
              checked={optionsSelected.includes('Option 1')}
              onChange={handleOptionChange}
            />
            <label htmlFor="option1">You (the participant)</label>
            <br />
            <input
              type="checkbox"
              name="option2"
              id="option2"
              value="Option 2"
              checked={optionsSelected.includes('Option 2')}
              onChange={handleOptionChange}
            />
            <label htmlFor="option2">Your manager (the other participant assigning tasks)</label>
            <br />
            <input
              type="checkbox"
              name="option3"
              id="option3"
              value="Option 3"
              checked={optionsSelected.includes('Option 3')}
              onChange={handleOptionChange}
            />
            <label htmlFor="option3">The company</label>
            <br />
            {wrong && <span className="wrongAnswer"> Answer: Select all options</span>}
            {submitted && <span className='answer'> Correct!</span>}
          </fieldset>
        </form>
        {!submitted && <button onClick={handleSubmit} className='button-link'>Submit</button>}
        {submitted && <Link to={'/test'} className='button-link'>Next</Link>}
      </div>
    );
  }

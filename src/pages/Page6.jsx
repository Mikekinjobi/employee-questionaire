import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"

export default function Page6({formData, updateFields, goToNextPage, newPostMutation}) {
    let [submitted, setSubmitted] = useState(false);
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('under 18');
    const [location, setLocation] = useState('');
    const [education, setEducation] = useState('');
    const [employment, setEmployment] = useState('');
  //   const table1Result = ((formData.table1Evalue/3556) * 100).toFixed(1).toString() + "%";
  // const table2Result = ((formData.table2Evalue/2653) * 100).toFixed(1).toString() + "%";
    useEffect(()=>{
      setGender('male');
      setAge('under 18');
      updateFields({gender, age})
    }, [])
    const handleGenderChange = (e) => {
      updateFields({gender: e.target.value})
      setGender(e.target.value);
    };
  
    const handleAgeChange = (e) => {
      updateFields({age: e.target.value})
      setAge(e.target.value);
    };
  
    const handleLocationChange = (e) => {
      updateFields({location: e.target.value})
      setLocation(e.target.value);
    };
  
    const handleEducationChange = (e) => {
      updateFields({education: e.target.value})
      setEducation(e.target.value);
    };
  
    const handleEmploymentChange = (e) => {
      updateFields({employment: e.target.value})
      setEmployment(e.target.value);
    };
    const handleSubmit = ()=>{
      newPostMutation.mutate();
        // goToNextPage();
        setSubmitted(true);
      }

      const condition = (formData.hasOwnProperty('location') || !formData.hasOwnProperty('education') || !formData.hasOwnProperty('employment') )
    return (
      <div>
        <h1>Demographic Questions</h1>
        <form action="">
        <p>What is your gender</p>
          <select name="" id="" onChange={handleGenderChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <p>What is your age</p>
          <select name="" id="" onChange={handleAgeChange}>
            <option value="under 18">Under 18</option>
            <option value="18 - 24">18 - 24</option>
            <option value="25 - 34">25 - 34</option>
            <option value="35 - 44">35 - 44</option>
            <option value="45 - 54">45 - 54</option>
            <option value="55 or older">55 or older</option>
          </select>
  
          <fieldset>
            <legend>In which of these locations did you spend most of your life</legend>
            <input type='radio' name='location' id='North Africa or Middle East' value="North Africa or Middle East" onChange={handleLocationChange}/>
            <label for="North Africa or Middle East">North Africa or Middle East</label><br></br>
            <input type='radio' name='location' id='Sub-Saharan Africa' value="Sub-Saharan Africa" onChange={handleLocationChange}/>
            <label for="Sub-Saharan Africa">Sub-Saharan Africa(all countries not in north Africa e.g Nigeria, Zimbabwe, South Africa)</label><br></br>
            <input type='radio' name='location' id='North America' value="North America" onChange={handleLocationChange}/>
            <label for="North America">North America</label><br></br>
            <input type='radio' name='location' id='South America' value="South America" onChange={handleLocationChange}/>
            <label for="South America">South America</label><br></br>
            <input type='radio' name='location' id='Europe' value="Europe" onChange={handleLocationChange}/>
            <label for="Europe">Europe</label><br></br>
            <input type='radio' name='location' id='Asia' value="Asia" onChange={handleLocationChange}/>
            <label for="Asia">Asia</label><br></br>
            <input type='radio' name='location' id='Australia and Oceania' value="Australia and Oceania" onChange={handleLocationChange}/>
            <label for="Australia and Oceania">Australia and Oceania</label><br></br>
            <input type='radio' name='location' id='Other' value="Other" onChange={handleLocationChange}/>
            <label for="Other">Other</label><br></br>
          </fieldset>
  
          <fieldset>
            <legend>What is the highest degree or level of school you have completed</legend>
            <input type='radio' name='education' id='Less than a high school diploma' value="Less than a high school diploma" onChange={handleEducationChange}/>
            <label for="Less than a high school diploma">Less than a high school diploma</label><br></br>
            <input type='radio' name='education' id='High school degree or equivalent' value="High school degree or equivalent" onChange={handleEducationChange}/>
            <label for="High school degree or equivalent">High school degree or equivalent</label><br></br>
            <input type='radio' name='education' id="Associate degree or Bachelor's degree" value="Associate degree or Bachelor's degree" onChange={handleEducationChange}/>
            <label for="Associate degree or Bachelor's degree">Associate degree or Bachelor's degree</label><br></br>
            <input type='radio' name='education' id="Master's degree or Doctorate" value="Master's degree or Doctorate" onChange={handleEducationChange}/>
            <label for="Master's degree or Doctorate">Master's degree or Doctorate</label><br></br>
          </fieldset>
  
          <fieldset>
            <legend>Which employment status most defines you?</legend>
            <input type='radio' name="employment" id="Employed full time (35 or more hours per week)" value="Employed full time (35 or more hours per week)" onChange={handleEmploymentChange}/>
            <label for="Employed full time (35 or more hours per week)">Employed full time (35 or more hours per week)</label><br></br>
            <input type='radio' name='employment' id='Employed part time (up to 35 hours per week)' value="Employed part time (up to 35 hours per week)" onChange={handleEmploymentChange}/>
            <label for="Employed part time (up to 35 hours per week)">Employed part time (up to 35 hours per week)</label><br></br>
            <input type='radio' name='employment' id='Unemployed' value="Unemployed" onChange={handleEmploymentChange}/>
            <label for="Unemployed">Unemployed</label><br></br>
            <input type='radio' name='employment' id='Student' value="Student" onChange={handleEmploymentChange}/>
            <label for="Student">Student</label><br></br>
            <input type='radio' name='employment' id='Retired' value="Retired" onChange={handleEmploymentChange}/>
            <label for="Retired">Retired</label><br></br>
            <input type='radio' name='employment' id='Self-employed' value="Self-employed" onChange={handleEmploymentChange}/>
            <label for="Self-employed">Self-employed</label><br></br>
            <input type='radio' name='employment' id='Other' value="Other" onChange={handleEmploymentChange}/>
            <label for="Other">Other</label><br></br>
          </fieldset>
        </form>
        <br />
        <br />
        {/* {!submitted && <button onClick={handleSubmit} className="button-link">Submit</button>} */}
        <button className='button-link' onClick={handleSubmit}>Submit</button>
      </div>
    )
  }

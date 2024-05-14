import React from 'react'
import {Link} from 'react-router-dom';

export default function Page2() {
  return (
    <div>
      <h1>INSTRUCTIONS</h1>
        <p>You are given the role of an employee, who has been assigned tasks by the company manager.<b> The tasks you will be faced with were selected for you by another participant who is playing the role of your manager.</b> He/she is aware of the difficulty or simplicity of each task before he/she assigns them to the employees. </p>
      <p>You will be presented with a series of lines of emojis, <b> your task as assigned by your manager is to count the number of times a certain emoji appears.</b> This will be repeated for up to 7 rounds depending on the number of tasks assigned to you by your manager. You will be able to see your progress and how many tasks you have left at the top of your screen.</p>
<p><span>Each round, irrespective of its difficulty, has the same fixed time limit for completion</span>. You have the option to choose whether or not to attempt each task. If you think that any task assigned to you is too difficult, you can skip it by just putting ‘0’.</p>
<p><b>Please enter your answers in figures, with no spaces or commas</b>. For example, you must input your response as “10” but NOT “ten” or “1 0” or “1,0”.</p>
<p>If you do not input the correct count of the specific emoji assigned, the task is failed and no value for that task comes to you, your manager, or the company. However, if you respond correctly, the value for the task comes to you, your manager, and the company. Correct answers are preferred to wrong ones.</p>
<p>Once you've completed all tasks, a summary of your accuracy in completing the tasks will be displayed to you on the results page.</p>

<h3>Thanks for participating!</h3>
    <Link to={'/comprehension-questions'} className='button-link'>Next</Link>
    </div>
    
  )
}

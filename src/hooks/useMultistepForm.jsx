import { useState, ReactElement } from "react";

export function useMultistepForm(steps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    function next() {
        setCurrentStepIndex(i => {
            if(i >= steps.length-1) return i
            return ++i
        })
    }

    function back() {
        setCurrentStepIndex(i => {
            if(i <= 0) return i;
            return --i;  
        })
        
    }

    function goTo (index) {
        setCurrentStepIndex(index);
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        goTo,
        next,
        back,
        isFirstStep: currentStepIndex ===0,
        isLastStep: currentStepIndex === steps.length-1
    }
}
import React from "react";
import Options from "./Option";

const Quiz = ({ questions, indx, dispatch, answer }) => {
  const currQuestion = questions[indx];
  return (
    <div>
      <h4>{currQuestion.question}</h4>

      <Options
        currQuestion={currQuestion}
        dispatch={dispatch}
        answer={answer}
      />
    </div>
  );
};

export default Quiz;

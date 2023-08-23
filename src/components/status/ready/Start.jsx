import React from "react";

export default function Start({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2 style={{ textTransform: "capitalize" }}>
        welcome to the react quiz!
      </h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn" onClick={() => dispatch({ type: "startQuiz" })}>
        {" "}
        Let's start!
      </button>
    </div>
  );
}

export default function Options({ currQuestion, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {currQuestion.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === currQuestion.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            } `}
            // id={`${
            //   hasAnswered
            //     ? answer !== currQuestion.correctOption
            //       ? "btn-delete"
            //       : ""
            //     : ""
            // } `}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={hasAnswered}
            key={index}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

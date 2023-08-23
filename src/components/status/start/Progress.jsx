const Progress = ({ numQuestions, totalPoints, answer, indx, points }) => {
  return (
    <header className="progress">
      <progress max={numQuestions} value={indx + Number(answer !== null)} />
      <p>
        Question <strong>{indx + 1}</strong> / {numQuestions}
      </p>
      <p>
        Points <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
};

export default Progress;

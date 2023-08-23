const Finish = ({ points, totalPoints, dispatch }) => {
  return (
    <>
      <p className="result">
        <span>💥</span> You Scored <strong>{points} </strong> Out of{" "}
        {totalPoints}
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
};

export default Finish;

import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/status/loading/Loader";
import Error from "./components/status/error/Error";
import Start from "./components/status/ready/Start";
import Quiz from "./components/status/start/Quiz";
import NextQuestion from "./components/status/start/footer/NextQuestion";
import Progress from "./components/status/start/Progress";
import Finish from "./components/status/finish/Finish";
import Footer from "./components/status/start/footer/Footer";
import Timer from "./components/status/start/footer/Timer";

const initalState = {
  questions: [],

  //"loading" , "ready" ,  "error" , "start" , "finished"
  status: "loading",

  // for selecting 1 by 1 question
  indx: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

function reducer(state, actions) {
  switch (actions.type) {
    case "dataReceived":
      return {
        ...state,
        questions: actions.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "startQuiz":
      return {
        ...state,
        status: "start",
        secondsRemaining: state.questions.length * 30,
      };

    case "newAnswer":
      const curQuestion = state.questions.at(state.indx);
      return {
        ...state,
        answer: actions.payload,
        points:
          actions.payload === curQuestion.correctOption
            ? state.points + curQuestion.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        indx: state.indx + 1,
        answer: null,
      };

    case "finished":
      return {
        ...state,
        status: "finished",
      };

    case "restart":
      return {
        ...initalState,
        questions: state.questions,
        status: "ready",
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 1 ? "finished" : state.status,
      };
    default:
      throw new Error("Invalid Action!!!");
  }
}

export default function App() {
  const [
    { questions, status, indx, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initalState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        if (!res.ok) throw new Error();
        const data = await res.json();

        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Start numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "start" && (
          <>
            <Progress
              numQuestions={numQuestions}
              answer={answer}
              indx={indx}
              points={points}
              totalPoints={totalPoints}
            />
            <Quiz
              questions={questions}
              indx={indx}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <>
                <Timer
                  dispatch={dispatch}
                  secondsRemaining={secondsRemaining}
                />
                <NextQuestion
                  dispatch={dispatch}
                  answer={answer}
                  indx={indx}
                  numsQuestion={numQuestions}
                />
              </>
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finish
            points={points}
            totalPoints={totalPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

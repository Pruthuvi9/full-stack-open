import { useState } from "react";

let goodObj = {
  text: "good",
  value: 1,
};

let neutralObj = {
  text: "neutral",
  value: 1,
};

let badObj = {
  text: "bad",
  value: 1,
};

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, all, avg }) => {
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text={goodObj.text} value={good} />
          <StatisticLine text={neutralObj.text} value={neutral} />
          <StatisticLine text={badObj.text} value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={avg} />
          <StatisticLine text="positive" value={`${(good / all) * 100} %`} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [score, setScore] = useState(0);
  const [avg, setAvg] = useState(0);

  const setToGood = () => {
    setGood(good + 1);
    setAll(all + 1);
    setScore(score + 1);
    setAvg((score + 1) / (all + 1));
  };

  const setToNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    setAvg(score / (all + 1));
  };

  const setToBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setScore(score - 1);
    setAvg((score - 1) / (all + 1));
  };

  return (
    <div>
      <Title text="give feedback" />
      <Button text={goodObj.text} onClick={setToGood} />
      <Button text={neutralObj.text} onClick={setToNeutral} />
      <Button text={badObj.text} onClick={setToBad} />
      <Title text="statistics" />
      <div>
        {all > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            all={all}
            avg={avg}
          />
        ) : (
          <div>
            <p>No feedback given</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

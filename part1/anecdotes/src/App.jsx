import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array.from({ length: 8 }, () => 0));
  const [topAnecdote, setTopAnecdote] = useState(null);
  // console.log("votes", votes);

  const changeAnecdote = () => {
    const num = Math.floor(Math.random() * 8);
    // console.log("num", num);

    setSelected(num);
  };

  const handleVote = (selected) => {
    const copy = [...votes];
    // console.log("copy before:", copy);
    copy[selected]++;
    // console.log("copy after:", copy);

    setVotes(copy);
    // console.log("votes after:", copy);
    setTheTopAnecdote(copy);
  };

  const setTheTopAnecdote = (copy) => {
    const highestVotes = Math.max(...copy);
    // console.log("highest votes:", highestVotes);
    const index = copy.indexOf(highestVotes);
    // console.log("index of highest votes:", index);

    setTopAnecdote(anecdotes[index]);
    // console.log("top anecdote:", topAnecdote);
  };

  return (
    <>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>Votes: {votes[selected]}</p>
        <Button text="vote" onClick={() => handleVote(selected)} />
        <Button text="next anecdote" onClick={changeAnecdote} />
      </div>
      {topAnecdote && (
        <div>
          <h2>Anecdote with most votes</h2>
          <p>{topAnecdote}</p>
        </div>
      )}
    </>
  );
};

export default App;

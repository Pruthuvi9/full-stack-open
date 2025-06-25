const App = () => {
  const Header = (props) => {
    return <h1>{props.course}</h1>;
  };

  const Content = (props) => {
    return (
      <>
        {props.partObj.map((item) => (
          <Part key={item.part} part={item.part} exercise={item.exercise} />
        ))}
      </>
    );
  };

  const Total = (props) => {
    return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>;
  };

  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercise}
      </p>
    );
  };

  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const partObj = [
    {
      part: part1,
      exercise: exercises1,
    },
    {
      part: part2,
      exercise: exercises2,
    },
    {
      part: part3,
      exercise: exercises3,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content partObj={partObj} />
      <Total />
    </div>
  );
};

export default App;

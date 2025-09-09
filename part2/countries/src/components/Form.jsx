const Form = ({ handleInput }) => {
  return (
    <form>
      <div>
        find countries <input onChange={handleInput} />
      </div>
    </form>
  );
};

export default Form;

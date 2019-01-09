import React from 'react';

const Form = () => {
  const salaryBrackets = {
    bracket1: '0 – 1.000',
    bracket2: '1.000 – 2.000',
    bracket3: '2.000 – 3.000',
    bracket4: '3.000 – 4.000',
    bracket5: 'More than 4.000'
  };

  return (
    <form>
      <fieldset>
        <label htmlFor="fullname">
          <div className="label">full name</div>
          <input type="text" id="fullname" required />
        </label>
      </fieldset>
      <fieldset>
        <label htmlFor="email">
          <div className="label">email</div>
          <input type="email" id="email" required />
        </label>
      </fieldset>
      <fieldset>
        {Object.keys(salaryBrackets).map((key, i) => (
          <label htmlFor={key} key={key}>
            <div className="label">{salaryBrackets[key]}</div>
            <input type="radio" id={key} name="salary" required />
          </label>
        ))}
      </fieldset>
      <button type="submit">submit</button>
    </form>
  );
};

export default Form;

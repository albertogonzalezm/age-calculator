import { useState } from "react";

function Birthday() {
  const [values, setValues] = useState({ d: "", m: "", y: "" });
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });
  const [emptyFields, setEmptyFields] = useState({ d: false, m: false, y: false });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setEmptyFields({ ...emptyFields, [name]: !value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!values.y || !values.m || !values.d) {
      setAge({ years: "--", months: "--", days: "--" });
      setEmptyFields({ y: !values.y, m: !values.m, d: !values.d });
      return;
    }

    const today = new Date();
    const birthday = new Date(`${values.m} ${values.d}, ${values.y}`);
    let years = today.getFullYear() - birthday.getFullYear();
    let months = today.getMonth() - birthday.getMonth();
    let days = today.getDate() - birthday.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    setAge({ years, months, days });
  }

  return (
    <>
      <form>
        <div className="top">
          <div className="inputs">
            <label htmlFor="d" style={{ color: emptyFields.d ? "red" : "" }}>
              DAY
            </label>
            <input
              name="d"
              type="number"
              min={1}
              max={31}
              placeholder="DD"
              maxLength={2}
              onChange={handleInputChange}
              style={{ borderColor: emptyFields.d ? "red" : "" }}
            />
            <p style={{ color: emptyFields.d ? "red" : "" }} hidden={!emptyFields.d}>
              This field is required
            </p>
          </div>
          <div className="inputs">
            <label htmlFor="m" style={{ color: emptyFields.m ? "red" : "" }}>
              MONTH
            </label>
            <input
              name="m"
              type="number"
              min={1}
              max={12}
              placeholder="MM"
              maxLength={2}
              onChange={handleInputChange}
              style={{ borderColor: emptyFields.m ? "red" : "" }}
            />
            <p style={{ color: emptyFields.m ? "red" : "" }} hidden={!emptyFields.m}>
              This field is required
            </p>
          </div>
          <div className="inputs">
            <label htmlFor="y" style={{ color: emptyFields.y ? "red" : "" }}>
              YEAR
            </label>
            <input
              name="y"
              type="number"
              min={1900}
              max={new Date().getFullYear()}
              placeholder="YYYY"
              maxLength={4}
              onChange={handleInputChange}
              style={{ borderColor: emptyFields.y ? "red" : "" }}
            />
            <p style={{ color: emptyFields.y ? "red" : "" }} hidden={!emptyFields.y}>
              This field is required
            </p>
          </div>
        </div>
        <SubmitButton handleSubmit={handleSubmit} />
      </form>
      <Print age={age} />
    </>
  );
}

function SubmitButton({ handleSubmit }) {
  return (
    <>
      <div className="middle">
        <hr />
        <button onClick={handleSubmit} type="submit">
          <img src="/src/assets/images/icon-arrow.svg" alt="icon-arrow" />
        </button>
      </div>
    </>
  );
}

function Print({ age }) {
  const { years, months, days } = age;

  return (
    <>
      <div className="age">
        <p>
          <span>{years}</span> years
        </p>
        <p>
          <span>{months}</span> months
        </p>
        <p>
          <span>{days}</span> days
        </p>
      </div>
    </>
  );
}

export default function App() {
  return (
    <div className="box">
      <Birthday />
    </div>
  );
}

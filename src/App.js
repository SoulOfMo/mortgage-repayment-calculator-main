import { useState } from "react";
import emptyIllustration from "./assets/images/illustration-empty.svg";
import "./styles.css";
function App() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const [totalRepayment, setTotalRepayment] = useState("");
  return (
    <main className="parent-container">
      <Calculator
        handleTotalRepayment={setTotalRepayment}
        handleShowResult={setShowResult}
        handleSetResult={setResult}
        showResult={showResult}
      />
      <Results
        showResult={showResult}
        result={result}
        totalRepayment={totalRepayment}
      />
    </main>
  );
}

export default App;

function Calculator({
  handleShowResult,
  handleSetResult,
  handleTotalRepayment,
}) {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("");
  const [mortgageTypeError, setMortgageTypeError] = useState(false);
  const [mortgageTermError, setMortgageTermError] = useState(false);
  const [mortgageAmountError, setMortgageAmountError] = useState(false);
  const [interestRateError, setInterestRateError] = useState(false);

  const [type, setType] = useState("");

  function handleMortgageType(value) {
    setType(value);
  }
  function handleSetAmount(value) {
    setAmount(value);
  }

  function handleSetTerm(value) {
    setTerm(value);
  }

  function handleSetRate(value) {
    setRate(value);
  }

  function handleClearAll() {
    setAmount("");
    setRate("");
    setTerm("");
    handleShowResult(false);
    setType("");
    setInterestRateError(false);
    setMortgageAmountError(false);
    setMortgageTermError(false);
    setMortgageTypeError(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    amount.trim(" ") === ""
      ? setMortgageAmountError(true)
      : setMortgageAmountError(false);

    term.trim(" ") === ""
      ? setMortgageTermError(true)
      : setMortgageTermError(false);

    rate.trim(" ") === ""
      ? setInterestRateError(true)
      : setInterestRateError(false);

    type.trim(" ") === ""
      ? setMortgageTypeError(true)
      : setMortgageTypeError(false);

    if (
      amount.trim("") === "" ||
      rate.trim("") === "" ||
      term.trim("") === "" ||
      type.trim("") === ""
    )
      return;

    const annualInterest = Number(rate) / (100 * 12);
    const loanTerm = Number(term) * 12;
    const constant = (1 + annualInterest) ** loanTerm;
    const numerator = annualInterest * constant;
    const denumerator = constant - 1;
    const result = Number(amount) * (numerator / denumerator);
    const totalRepayment = result * loanTerm;
    const formmatted = new Intl.NumberFormat();
    const formmattedResult = formmatted.format(result.toFixed(2));
    const formmattedTotalRepayment = formmatted.format(
      totalRepayment.toFixed(2)
    );
    const interest = (Number(amount) * Number(rate)) / (12 * 100);
    const formmattedInterest = formmatted.format(interest.toFixed(2));

    const totalInterest = formmatted.format(
      (interest * 12 * Number(term)).toFixed(2)
    );

    if (type === "repayment") {
      handleSetResult(formmattedResult);
      handleTotalRepayment(formmattedTotalRepayment);
    } else if (type === "interest") {
      handleSetResult(formmattedInterest);
      handleTotalRepayment(totalInterest);
    }
    handleShowResult(true);
  }

  return (
    <div className="calculator-container">
      <div className="header">
        <h1>mortgage calculator</h1>
        <button aria-label="clear-btn" onClick={handleClearAll}>
          clear all
        </button>
      </div>

      <form>
        <div className="form--row">
          <span className="input-type">mortgage amount</span>
          <label
            htmlFor="amount"
            className={
              mortgageAmountError === true
                ? "error amount-input"
                : "amount-input"
            }
          >
            <span className={mortgageAmountError === true ? "error" : ""}>
              £
            </span>
            <input
              id="amount"
              className="no-spinners"
              type="number"
              value={amount}
              onChange={(e) => handleSetAmount(e.target.value)}
            />
          </label>
          <ErrMsg err={mortgageAmountError} />
        </div>

        {/* MORTGAGE Term */}
        <div className="terms-container">
          <label className="input-row">
            <span className="input-type">mortgage term</span>
            <span className="term-input">
              <input
                className="no-spinners"
                type="number"
                value={term}
                onChange={(e) => handleSetTerm(e.target.value)}
              />
              <span>years</span>
            </span>
            <ErrMsg err={mortgageTermError} />
          </label>

          <label className="input-row">
            <span className="input-type">Interset rate</span>
            <span className="year-input">
              <input
                className="no-spinners"
                type="number"
                value={rate}
                onChange={(e) => handleSetRate(e.target.value)}
              />
              <span>%</span>
            </span>
            <ErrMsg err={interestRateError} />
          </label>
        </div>

        {/* MORTGAGE Type */}
        <div className="types-container">
          <span className="input-type">mortgage type</span>
          <MortgageType
            id="repayment"
            value="repayment"
            handleMortgageType={handleMortgageType}
            children="Repayment"
          />

          <MortgageType
            id="interest"
            value="interest"
            handleMortgageType={handleMortgageType}
            children="Interest Only"
          />
          <ErrMsg err={mortgageTypeError} />
        </div>
        <button onClick={handleSubmit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#133041"
              d="M18.75 2.25H5.25a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V3.75a1.5 1.5 0 0 0-1.5-1.5Zm-10.5 16.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 18.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25ZM12 15a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 15Zm3.75 3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm0-3.75a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Zm1.5-5.25a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v3.75Z"
            />
          </svg>
          Calculate Repayments
        </button>
      </form>
    </div>
  );
}

function Results({ showResult, result, totalRepayment }) {
  return (
    <div className="results-container">
      {!showResult && (
        <div className="empty-result">
          <img src={emptyIllustration} alt="empty" />
          <p>Results shown here</p>
          <span>
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </span>
        </div>
      )}

      {showResult && (
        <div className="result-page">
          <p>Your results</p>
          <span>
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </span>

          <div className="result">
            <span>Your monthly repayments</span>
            <p className="repayments">{`£${result}`}</p>
            <hr />
            <span>Total you'll repay over the term</span>
            <p className="total-repayment">{`£${totalRepayment}`}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ErrMsg({ err }) {
  return (
    <span className={err === true ? "err-msg" : "hidden"}>
      The field is required
    </span>
  );
}

function MortgageType({ children, id, value, handleMortgageType }) {
  return (
    <label htmlFor="repayment" className="input-row">
      <input
        type="radio"
        name="type"
        id={id}
        value={value}
        onClick={(e) => handleMortgageType(e.target.value)}
      />
      <span>{children}</span>
    </label>
  );
}

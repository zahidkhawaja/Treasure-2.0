import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";

const Calculator = ({ setResult }) => {
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = values => {
        let expectedAnnualReturn = 0.12;
        let yearlyContribution = values.monthlycontribution * 12;
        let retirementSavings = values.currentsavings * 1;

        for(let age = values.age; age <= values.retirementage; age++) {
            let annualGrowth = (yearlyContribution + retirementSavings) * expectedAnnualReturn;
            let totalToDate = yearlyContribution + annualGrowth;
            retirementSavings += Math.round(totalToDate);
        };
        setResult({
          age: values.age,
          retirementage: values.retirementage, 
          currentsavings: values.currentsavings, 
          monthlycontribution: values.monthlycontribution,
          retirementSavings: retirementSavings
        });
        console.log(values);
    };

    const StyledButton = withStyles({
      root: {
        background: 'coral',
        borderRadius: 5,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(0,0,0,0.2)',
        '&:hover': {
          backgroundColor: 'rgb(250, 149, 112)',
        },
      },
    })(Button);

    return (
        <div className = "calculatorform">
          <div className = "innercalc">
            <h2>Information</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

            <TextField
            label="Current Age"
            variant="outlined"
            name="age"
            type="text"
            inputRef={register({
              required: "Please enter your current age.",
              validate: value =>
              Number.isInteger(parseInt(value)) || "You must enter an integer."
            })}
            placeholder="Current Age"
          />
          <br/>
          <p>{errors.age && errors.age.message}</p>
          <br />

          <TextField
            label="Expected Retirement Age"
            variant="outlined"
            name="retirementage"
            type="text"
            inputRef={register({
              required: "Please enter your expected retirement age.",
              validate: value =>
              Number.isInteger(parseInt(value)) || "You must enter an integer."
            })}
            placeholder="Expected Retirement Age"
          />
          <br/>
          <p>{errors.retirementage && errors.retirementage.message}</p>
          <br />

          <TextField
            label="Current Retirement Savings"
            variant="outlined"
            name="currentsavings"
            type="text"
            inputRef={register({
              required: "Please enter your current retirement savings.",
              validate: value =>
              Number.isInteger(parseInt(value)) || "You must enter an integer."
            })}
            placeholder="Current Retirement Savings"
          />
          <br/>
          <p>{errors.currentsavings && errors.currentsavings.message}</p>
          <br />

          <TextField
            label="Monthly Contribution"
            variant="outlined"
            name="monthlycontribution"
            type="text"
            inputRef={register({
              required: "Please enter your monthly contribution.",
              validate: value =>
              Number.isInteger(parseInt(value)) || "You must enter an integer."
            })}
            placeholder="Monthly Contribution"
          />
          <br/>
          <p>{errors.monthlycontribution && errors.monthlycontribution.message}</p>
          <br />

          <StyledButton type="submit">
            Calculate
          </StyledButton>

            </form>
            </div>
        </div>
    )
};

export default Calculator;
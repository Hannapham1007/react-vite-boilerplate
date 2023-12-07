import React from "react";
import styled from "styled-components";

export const Question = styled.h2`
  color: var(--primary);
`;

const About = () => {
  //TO DO
  return (
    <section className="about">
      <Question>What is this project about?</Question>
      <p>
        This is the final project of Technigo's React and JavaScript 11-week
        fall '23. I wanted to develop a daily expense tracker web
        application that combines many aspects I learned during the course.
      </p>
      <Question>How does the app work?</Question>
      <p>
        {" "}
        At the home page users can add a new transaction. For each transaction
        users can log the following details:{" "}
      </p>
      <div style={{ paddingLeft: "20px" }}>
        <p>
          <strong>* Type:</strong> Selecting whether it is an income or an
          expense.
          <br />
          <strong>* Category:</strong> Choosing from predefined categories
          (e.g., salary, bonus, health, social life, transport and so on.)
          <br />
          <strong>* Amount:</strong> Entering the transaction amount.
          <br />
          <strong>* Note:</strong> Adding optional notes for the transaction.
        </p>
      </div>
      <p>
        Users can also edit existing transaction to make corrections or updates.
        They can also delete transactions that are no longer relevant.
        After each transaction, the application calculates and updates the
        user's balance.
      </p>
      <Question>Which technologies is used?</Question>
      <p>
        The application is built using HTML, CSS, React, Redux, Style
        Components, LottieFiles and Netlify.
      </p>
    </section>
  );
};

export default About;

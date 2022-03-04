import { useEffect, useState } from "react";
import classes from "./Home.module.css";

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        const random = data[Math.floor(Math.random() * data.length)];
        setQuote(random.text);
        setAuthor(random.author);
      });
  }, []);

  return (
    <div>
      <div className={classes.quote}>
        <h3>{quote}</h3>
        {author && <span> - {author}</span>}
        {quote && !author && <span> - unknown</span>}
      </div>
      <button
        className={classes.btn}
        onClick={() => {
          fetch("https://type.fit/api/quotes")
            .then(function (res) {
              return res.json();
            })
            .then(function (data) {
              const random = data[Math.floor(Math.random() * data.length)];
              setQuote(random.text);
              setAuthor(random.author);
            });
        }}
      >
        <span className={classes.span}>ANOTHER QUOTE</span>
      </button>
    </div>
  );
};

export default Quotes;

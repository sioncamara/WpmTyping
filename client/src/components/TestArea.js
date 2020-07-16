import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../styles.css";
import axios from "axios";

function TestArea() {
  // const quote = "Maybe for you there's one thousand tomorrows, or three thousand, or ten.";
  let [quote, setQuote] = useState("");

  // useEffect(() => {
  //   async function fetchData() {
  //     //const baseUrl = process.env.baseURL || "http://localhost:5000";
  //     axios
  //       .get("/api/")
  //       .then((response) => {
  //         if (response.data.length > 0) {
  //           //setQuote(response.data.map((user) => user.username));
  //           //  console.log(response.data[0].quote);
  //           const quotes = response.data;
  //           setQuote(response.data[0].quote);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  //   fetchData();
  // }, []);
  // Or so much time you can bathe in it, roll around in it, let it slide like coins through your fingers. So much time you can waste it, but for some of us, there's only today. And the truth is, you never really know.
  // console.log(quote);

  let [userInput, setInput] = useState("");
  let [quoteLeft, setLeft] = useState("");
  let [quoteCurrent, setCurrent] = useState("");
  let [quoteError, setError] = useState("");
  let [quoteRight, setRight] = useState("");
  console.log(quoteRight);
  let [isError, setIsError] = useState(false);
  let [currIsShort, setShortCurr] = useState(false); // boolean value that keeps track if

  function onInputChange(event) {
    const value = event.target.value;

    setInput((prev) => {
      // console.log(prev);
      if (prev.length === quote.length) {
        console.log(prev.length);
        console.log(value.length);
        if (value.length <= prev.length) return value;
        else return prev;
      }
      if (value === quote) {
        // check is user finished quote
        console.log("congradualtions you finished the quote");
        return;
      }

      if (isError && prev.length < value.length) {
        // user has typed error and did not delete
        console.log("is this loggin? part 1");
        console.log(quoteError + quoteRight.charAt(0));

        setError((prevError) => prevError + quoteRight.charAt(0));
        setRight(quoteRight.substr(1));

        if (quoteError > 7) {
          // reset quote subparts and take time penalty
        }
        return value;
      }

      if (prev.length >= value.length) {
        console.log("is this loggin?");

        // user hit backspace
        if (isError) {
          // user previously had an error

          // remove one char from error and add to right
          setRight((prevRight) => quoteError.charAt(quoteError.length - 1) + prevRight);
          const prevError = quoteError;
          setError(quoteError.substring(0, quoteError.length - 1));
          console.log("DEBUG: " + quoteError);

          // check if user corrected all of his errors
          if (quoteError.length == 1) {
            // it is one bc the length does not update until after the method
            setIsError(false);
            //  console.log("is this printing?");

            if (quoteLeft.length == 0) {
              // user has not completed one word
              setCurrent(quote.substring(0, quote.indexOf(" ")));
              setRight(quoteRight.substr(quoteRight.indexOf(" ")));
            } else if (quoteRight.length === 0) {
              // user made error on last character
              setCurrent(quoteError);
              setError("");
            } else if (quoteError === " ") {
              // user error started on space
              setCurrent(quoteError);
              setError("");
            } else {
              const errorAtMax = quoteError + quoteRight.substr(0, 6); // get what the error would be if the user typed 7 errors in a row

              setCurrent(errorAtMax.substring(0, errorAtMax.indexOf(" ")));
              setRight(quoteRight.substr(quoteRight.indexOf(" ")));
            }
          }
          return value;
        }
      }

      const words = value.split(" ");
      console.log(words);

      const expectedWord = quoteLeft.substr(quoteLeft.lastIndexOf(" ") + 1) + quoteCurrent;

      const lastWord = words[words.length - 2]; // get last word user entered
      var newCurrEnd = quoteRight.indexOf(" ", quoteRight.indexOf(" ") + 1); // if at the last word there will be no space after it.
      if (newCurrEnd == -1) newCurrEnd = Number.MAX_SAFE_INTEGER; // if at end of quote there will not be a space after the first space

      if (quoteCurrent === " ") {
        // case where user didn't type a space and corrected it\\
        console.log("Mayday maday");

        setLeft((prevLeft) => prevLeft + quoteCurrent);
        setCurrent(quoteRight.substring(1, newCurrEnd));
        setRight(quoteRight.substring(newCurrEnd));
        return value;
      }

      if (words[words.length - 1] == "") {
        // logic to check if most recent word is correct

        if (lastWord === expectedWord) {
          console.log("is this working?");

          // user typed current word correctly update left, curr, and right part of quote

          // add correctly typed work to left and account if user typed errors
          setLeft((prevValue) => prevValue.substring(0, prevValue.lastIndexOf(" ") + 1) + lastWord + " ");

          // console.log(newCurrEnd);
          // console.log(Number.MAX_SAFE_INTEGER);

          // console.log(quoteRight.indexOf(" ", quoteRight.indexOf(" ") + 1));

          setCurrent(quoteRight.substring(1, newCurrEnd)); // start after first space and end before second
          setRight(quoteRight.substring(newCurrEnd));
        }
      } else {
        // check for mistyped on current word

        const lastWord = words[words.length - 1];

        console.log("DEBUG (check for mistyped word): " + "Happy" + expectedWord);

        if (lastWord.length > expectedWord.length) {
          // user hit char instead of space
          setIsError(true);
          setLeft((prevLeft) => prevLeft + expectedWord);
          setError(" ");
          setRight(quoteRight.substr(1));
          setCurrent("");
          return value;
        } else {
          // check if user typed a char wrong
          for (let i = 0; i < lastWord.length; i++) {
            if (lastWord.charAt(i) !== expectedWord.charAt(i)) {
              // user typed a char wrong
              setIsError(true);
              setLeft((prevLeft) => prevLeft + expectedWord.substring(0, i));
              setError(expectedWord.substring(i, i + 1));
              //console.log(quoteError);

              setRight((prevRight) => expectedWord.substr(i + 1) + prevRight);
              setCurrent("");
              return value;
            }
          }
        }
      }

      return value;
    });
  }

  const errCol = {
    backgroundColor: "#F7EDED",
  };
  const leftStyle = {
    color: "#BBBBBB",
  };

  const currentStyle = {
    backgroundColor: "#85f7c9",
  };

  const errorStyle = {
    backgroundColor: "#E52020",
    color: "white",
  };


     async function fetchData() {
      axios
        .get("/api/")
        .then((response) => {
          if (response.data.length > 0) {
            //setQuote(response.data.map((user) => user.username));
            //  console.log(response.data[0].quote);
            const quotes = response.data;
            const randQuote = quotes[Math.floor(Math.random() * quotes.length)].quote
          setQuote(randQuote);
         // console.log("Testing:", quote);
           setCurrent(randQuote.substring(0, randQuote.indexOf(" ")));
           setRight(randQuote.substr(randQuote.indexOf(" ")));
           console.log("quoteRight", quoteRight);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }


  const onSubmit = (event) => {
    event.preventDefault();

   fetchData()

    

      
    //  window.location = "/";

  };

  // function setUp(quote) {
   
  //   console.log("Testing Current:", quoteCurrent);
  // }

  return (
    <div>
      <div className="quote-area" style={isError ? errCol : null} name="content">
        <span style={leftStyle}>{quoteLeft}</span>
        <span style={currentStyle}>{quoteCurrent}</span>
        <span style={errorStyle}>{quoteError}</span>
        <span>{quoteRight}</span>
      </div>

      <form className="align-me">
        <input
          onChange={onInputChange}
          value={userInput}
          className="input-style"
          type="text"
          placeholder="Type the words here."
        />
      </form>

      <Button variant="primary" type="submit" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default TestArea;

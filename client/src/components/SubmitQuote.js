import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function SubmitQuote() {
  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [quote, setQuote] = useState("");

  const onTitleChange = (event) => {
    const value = event.target.value;

    setTitle(value);
  };

  const onAuthorChange = (event) => {
    const value = event.target.value;

    setAuthor(value);
  };

  const onQuoteChange = (event) => {
    const value = event.target.value;

    setQuote(value);
  };

  function clearFields() {
    setTitle("");
    setAuthor("");
    setQuote("");
  }

  const baseUrl = process.env.baseURL || "http://localhost:5000";
  const onSubmit = (event) => {
    event.preventDefault();

    if (title == "" || author == "" || quote.length < 50) {
      clearFields();
      alert("Error: " + "please enter a quote longer than 50 characters");
      return;
    }

    const newQuote = {
      title: title,
      author: author,
      quote: quote,
    };

    axios.post("/api/save", newQuote).then((res) => console.log(res.data));
    clearFields();
    alert("Thank you for submiting your quote");
  };

  return (
    <div className="container">
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="input" value={title} onChange={onTitleChange} />
        </Form.Group>

        <Form.Group controlId="title">
          <Form.Label>Author</Form.Label>
          <Form.Control type="input" value={author} onChange={onAuthorChange} />
        </Form.Group>

        <Form.Group controlId="quote">
          <Form.Label>Quote</Form.Label>
          <Form.Control as="textarea" rows="3" value={quote} onChange={onQuoteChange} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SubmitQuote;

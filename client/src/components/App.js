import React from "react";
import WpmNavbar from "./WpmNavbar";
import SubmitQuote from "./SubmitQuote"
import TestArea from "./TestArea";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <Router className="router">
       <div>
      <WpmNavbar  />
      <br />
      <Route path="/submit" component={SubmitQuote} />
      <Container>
        <Row>
          <Col>
          <Route path="/" exact component={TestArea} />
          </Col>
        </Row>
      </Container>
    </div>
    </Router>
   
  );
}

export default App;

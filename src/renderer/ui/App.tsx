import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { FcInfo } from "react-icons/fc";

import "./css/styles.css";
import AppNavbar from "./components/AppNavbar";
import StatusCard from "./components/StatusCard";
import SoundTest from "./components/SoundTest";
import AppInfo from "./components/AppInfo";
import SoundPlayer from "./components/SoundPlayer";

const App = () => {
  return (
    <>
      <AppNavbar />
      <Container>
        <Row>
          <Col>
            <StatusCard />
          </Col>
        </Row>
        <Row>
          <Col>
            <Alert variant="info" style={{ marginTop: "1rem" }}>
              <FcInfo />
              Цей застосунок перевіряє останні новини щодо повітряної тривоги на
              офіційному сайті м. Одеса{" "}
              <a href="https://omr.gov.ua/">https://omr.gov.ua/</a> раз на 3
              хвилини, та вмикає звуковий сигнал на вашому ПК, якщо мерія
              розмістила таке повідомлення.
            </Alert>
            <SoundTest />
          </Col>
        </Row>
      </Container>
      <AppInfo />
      <SoundPlayer />
    </>
  );
};

export default App;

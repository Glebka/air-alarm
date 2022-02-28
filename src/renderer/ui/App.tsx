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

const App = () => {
  return (
    <>
      <AppNavbar />
      <Container>
        <Row>
          <Col>
            <StatusCard
              alarm
              title="Відбій повітряної тривоги"
              text="28 лютого 19:18 Відбій повітряної тривоги"
              lastUpdated={new Date()}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Alert variant="info">
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
    </>
  );
};

export default App;
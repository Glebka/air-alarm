import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const AppNavbar = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>
          Моніторинг сповіщень повітряної тривоги в м. Одеса
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

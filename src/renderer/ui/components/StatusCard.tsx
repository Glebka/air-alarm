import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { RiAlarmWarningFill } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";
import { FaRunning } from "react-icons/fa";
import { AiFillSafetyCertificate, AiOutlineWarning } from "react-icons/ai";
import "../css/styles.css";
import { AlarmStatus } from "../redux/types";
import { useAppSelector } from "../redux/hooks";
import {
  selectStatusCardData,
  selectDataUpdatingStatus
} from "../redux/AlarmStatusSlice";

const StatusCardIcon = (props: { status: AlarmStatus }) => {
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center"
      }}
    >
      {props.status === "alarm" && (
        <RiAlarmWarningFill
          className="red-alert"
          style={{
            fontSize: "5rem",
            justifyContent: "center"
          }}
        />
      )}
      {props.status === "all-clear" && (
        <AiFillSafetyCertificate
          style={{
            color: "green",
            fontSize: "5rem",
            justifyContent: "center"
          }}
        />
      )}
      {props.status === "undefined" && (
        <AiOutlineWarning
          style={{
            color: "orange",
            fontSize: "5rem",
            justifyContent: "center"
          }}
        />
      )}
    </div>
  );
};

const DismissButton = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center"
        }}
      >
        <Button variant="primary">
          <FaRunning />
          Іду в укриття!
        </Button>
      </div>
    </>
  );
};

const DismissNoInfoButton = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center"
        }}
      >
        <Button variant="primary">
          <FaRunning />
          Зрозуміло!
        </Button>
      </div>
    </>
  );
};

const LastUpdatedInfo = (props: { date: Date }) => {
  const isLoading = useAppSelector(selectDataUpdatingStatus);
  return (
    <div style={{ fontSize: "0.8rem" }}>
      {!isLoading && <BsInfoCircle />}
      {isLoading && (
        <Spinner
          style={{ marginRight: "0.3rem" }}
          animation="border"
          size="sm"
        />
      )}
      <i>Останнє оновлення {props.date.toLocaleString()}</i>
    </div>
  );
};

const StatusCard = () => {
  const props = useAppSelector(selectStatusCardData);
  return (
    <Card border={props.status === "alarm" ? "danger" : "primary"}>
      <StatusCardIcon status={props.status} />
      <Card.Body>
        <Card.Title
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            fontSize: "2rem"
          }}
        >
          {props.title}
        </Card.Title>
        <Card.Text
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          {props.text}
        </Card.Text>
        {props.status === "alarm" && <DismissButton />}
        {props.status === "undefined" && <DismissNoInfoButton />}
        <br />
        <LastUpdatedInfo date={new Date(props.lastUpdated)} />
      </Card.Body>
    </Card>
  );
};

export default StatusCard;

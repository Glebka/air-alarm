import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { RiAlarmWarningFill } from "react-icons/ri";
import { FcInfo } from "react-icons/fc";
import { MdPlayCircleOutline } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { FaRunning } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";

import "../css/styles.css";

type StatusCardProps = {
  alarm?: boolean;
  title: string;
  text: string;
  lastUpdated: Date;
};

const StatusCardIcon = (props: { alarm: boolean }) => {
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center"
      }}
    >
      {props.alarm && (
        <RiAlarmWarningFill
          className="red-alert"
          style={{
            fontSize: "5rem",
            justifyContent: "center"
          }}
        />
      )}
      {!props.alarm && (
        <AiFillSafetyCertificate
          style={{
            color: "green",
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

const LastUpdatedInfo = (props: { date: Date }) => {
  return (
    <div style={{ fontSize: "0.7rem" }}>
      <BsInfoCircle />
      <i>Останнє оновлення {props.date.toLocaleString()}</i>
    </div>
  );
};

const StatusCard = (props: StatusCardProps) => {
  return (
    <Card border={props.alarm ? "danger" : "primary"}>
      <StatusCardIcon alarm={props.alarm || false} />
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
        <Card.Text>{props.text}</Card.Text>
        {props.alarm && <DismissButton />}
        <br />
        <LastUpdatedInfo date={props.lastUpdated} />
      </Card.Body>
    </Card>
  );
};

export default StatusCard;

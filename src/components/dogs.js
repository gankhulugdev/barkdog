import { Col, Row, Divider, Collapse } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { HiXCircle } from "react-icons/hi";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { ACTIONS } from "../App";

const { Panel } = Collapse;

export default function Dog({ dog, updateDogs }) {
  const [vaccination, setVaccination] = useState([]);

  useEffect(() => {
    setVaccination(dog.vaccinations);
  }, [dog]);

  return (
    <>
      <div
        style={{
          position: "relative",
          left: "22%",
          top: "0.7rem",
          height: "100%",
          width: "11%",
          borderRadius: "5px",
          paddingLeft: "5px",
          fontSize: "1rem",
          // opacity: "0.5",
          color: "#337ab7",
          backgroundColor: dog.status === "Red" ? "#fde2dd" : "#e7eaec",
        }}
      >
        {dog.status === "Red" ? "Needs Action" : "Pending Check In"}
      </div>
      <div
        style={{
          backgroundColor: "#e7eaec",
          width: "400px",
          borderRadius: "5px",
          padding: "10px",
          marginTop: "2rem",
        }}
      >
        <div className="dog-Info">
          <Row>
            <Col span={5}>
              <div
                style={{
                  padding: "5px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ borderRadius: "5px" }}
                  width={70}
                  src={dog.imageUrl}
                  alt="pic"
                />
              </div>
            </Col>
            <Col span={13} offset={1}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                }}
              >
                <span>Name</span>
                <span style={{ color: "#337ab7" }}>{dog.name}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>Breed</span>
                <span style={{ color: "#337ab7" }}>{dog.breed}</span>
              </div>
            </Col>
            <Col span={5}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>DOB</span>
                <span style={{ color: "#337ab7" }}>
                  {moment(dog.dob).format("MM/DD/YY")}
                </span>
              </div>
            </Col>
          </Row>
          <Divider orientation="right" plain>
            Pass Info
          </Divider>
          <Row style={{ display: "flex", flexDirection: "column" }}>
            <div
              onClick={() => {
                updateDogs({ type: ACTIONS.NEUTERED_SPRAYED, data: dog.id });
              }}
              style={{ display: "flex", alignItems: "center" }}
            >
              {dog.requireNeuteredSpayed ? (
                <BsFillCheckCircleFill
                  style={{ color: "#1ab394", fontSize: " 1rem" }}
                />
              ) : (
                <HiXCircle style={{ color: "#ec4758", fontSize: " 1rem" }} />
              )}
              <span>
                Neutered/Sprayed: {dog.requireNeuteredSpayed ? " Yes " : " No "}{" "}
                (Required)
              </span>
            </div>
            <div
              onClick={() => {
                updateDogs({ type: ACTIONS.BANNED, data: dog.id });
              }}
              style={{ display: "flex", alignItems: "center" }}
            >
              {!dog.isBanned ? (
                <BsFillCheckCircleFill
                  style={{ color: "#1ab394", fontSize: " 1rem" }}
                />
              ) : (
                <HiXCircle style={{ color: "#ec4758", fontSize: " 1rem" }} />
              )}
              <span>{dog.isBanned ? " " : " Not "} Banned</span>
            </div>
            <div
              onClick={() => {
                dog.subscription !== null &&
                  updateDogs({ type: ACTIONS.MEMBERSHIP, data: dog.id });
              }}
            >
              {dog.subscription !== null ? (
                dog.subscription.status === "Active" ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <BsFillCheckCircleFill
                      style={{ color: "#1ab394", fontSize: " 1rem" }}
                    />
                    <span>{dog.subscription.membershipName}</span>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <HiXCircle
                      style={{ color: "#ec4758", fontSize: " 1rem" }}
                    />
                    <span>{dog.subscription.membershipName}</span>
                  </div>
                )
              ) : dog.freeGroupId !== null ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <BsFillCheckCircleFill
                    style={{ color: "#1ab394", fontSize: " 1rem" }}
                  />
                  <span>No Subscription: </span>
                  <span style={{ color: "#337ab7" }}>Free Group</span>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <HiXCircle style={{ color: "#ec4758", fontSize: " 1rem" }} />
                  <span>No Subscription: </span>
                </div>
              )}
            </div>
            <div>
              {dog.subscription !== null ? (
                dog.subscription.status === "Active" ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <BsFillCheckCircleFill
                      style={{ color: "#1ab394", fontSize: " 1rem" }}
                    />
                    <span>Pass: Has Subscription</span>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <HiXCircle
                      style={{ color: "#ec4758", fontSize: " 1rem" }}
                    />
                    <span>Pass: Missing</span>
                  </div>
                )
              ) : dog.freeGroupId !== null ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <BsFillCheckCircleFill
                    style={{ color: "#1ab394", fontSize: " 1rem" }}
                  />
                  <span>Pass: </span>
                  <span style={{ color: "#337ab7" }}>Free Group</span>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <HiXCircle style={{ color: "#ec4758", fontSize: " 1rem" }} />
                  <span>Pass: Missing </span>
                </div>
              )}
            </div>
          </Row>
          <Divider orientation="right" plain>
            Vaccination
          </Divider>
          <Row>
            <Collapse
              bordered={false}
              style={{ width: "100%" }}
              expandIcon={({ isActive }) =>
                isActive ? <FaCaretUp /> : <FaCaretDown />
              }
            >
              <Panel
                header={
                  <div>
                    {vaccination.every((v) => v.status === "Verified") ? (
                      <BsFillCheckCircleFill
                        style={{ color: "#1ab394", fontSize: " 1rem" }}
                      />
                    ) : (
                      <HiXCircle
                        style={{ color: "#ec4758", fontSize: " 1rem" }}
                      />
                    )}
                    <span>{`Vaccinations (${vaccination.reduce(
                      (curr, v) => (v.status === "Verified" ? curr + 1 : curr),
                      0
                    )}/3)`}</span>
                  </div>
                }
                key="1"
              >
                {vaccination.map((vac, idx) => {
                  return (
                    <div
                      onClick={() => {
                        updateDogs({
                          type: ACTIONS.VACCINATION,
                          data: {
                            dogId: dog.id,
                            vaccinationId: vac.vaccinationId,
                          },
                        });
                      }}
                      key={idx}
                    >
                      {vac.status === "Verified" ? (
                        <div>
                          <BsFillCheckCircleFill
                            style={{ color: "#1ab394", fontSize: " 1rem" }}
                          />
                          <span>{`${vac.vaccinationName}: `}</span>
                          <span
                            style={{ color: "#1ab394" }}
                          >{`(${vac.status})`}</span>
                        </div>
                      ) : (
                        <div>
                          <HiXCircle
                            style={{ color: "#ec4758", fontSize: " 1rem" }}
                          />
                          <span>{`${vac.vaccinationName}: `}</span>
                          {vac.status === "Missing" ? (
                            <span style={{ color: "#337ab7" }}>
                              {vac.status}
                            </span>
                          ) : (
                            <span style={{ color: "#ec4758" }}>
                              {vac.status}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </Panel>
            </Collapse>
          </Row>
        </div>
      </div>
    </>
  );
}

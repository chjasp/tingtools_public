import React from "react";
import {useState, useEffect, useRef} from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import Tilt from "react-tilt";

const OutputCards = ({ text, markerFunction, index, mode }) => {

  const [border, setBorder] = useState("none");

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    markerFunction(index);
  }, [border])

  return (
    <TiltWrapper options={{ max: 5, scale: 1.02 }}>
      <Wrapper className="my-3 p-0" style={{outline: `${border}`}}>
      <StyledCard key={index} className="my-0 p-0" onClick={() => setBorder(border == "none" ? "solid #03b962 5px" : "none")}>
        <StyledCardBody>
          <Card.Text as="div">
            <div>
              {text}
            </div>
          </Card.Text>
        </StyledCardBody>
        </StyledCard>
        </Wrapper>
        </TiltWrapper>
  );
};

export default OutputCards;

const Wrapper = styled.div`
  box-shadow: 0px 17px 20px 7px rgba(0, 0, 0, 0.7);
  width: 100%;
`;

const TiltWrapper = styled(Tilt)`
    width: 90%;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
`;

const StyledCard = styled(Card)`
  width: 100%;
  text-align: center;
  overflow: hidden;
  background-color: white;
  box-shadow: 0px 17px 10px 3px rgba(0,0,0,0.7);
  cursor: pointer;
`;

const StyledCardBody = styled(Card.Body)`
  overflow: auto;
  margin-bottom: 0px;
  overflow: hidden;
  div {
    margin-bottom: 0px;
    overflow: hidden;
  }
`;


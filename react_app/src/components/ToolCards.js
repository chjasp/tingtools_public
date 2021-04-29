import React from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import cpImage from "../assets/other_imgs/copypress.jpg";
import fgImage from "../assets/other_imgs/focusgroup.jpg";
import Tilt from "react-tilt";
import { Link } from "react-router-dom";

const ToolCards = ({ title, text }) => {
  return (
    <TiltWrapper options={{ max: 3, scale: 1.02 }}>
      <Wrapper>
      <StyledCard className="my-0 p-3">
        {title === "COPYPRESS" ? (
          <Card.Img src={cpImage} />
        ) : (
          <Card.Img src={fgImage} />
        )}
        <StyledCardBody>
          <Card.Title as="div">
            <strong>{title}</strong>
          </Card.Title>
          <Card.Text as="div">
            <div className="my-3">
              {text}
            </div>
          </Card.Text>
        </StyledCardBody>
        <Card.Footer as="div">
        {title === "COPYPRESS" ? (
          <Link to="/Copypress"><StyledButton variant="primary">Select</StyledButton></Link>
        ) : (
          <Link to="/Focusgroup"><StyledButton variant="primary">Select</StyledButton></Link>
        )}
        </Card.Footer>
      </StyledCard>
      </Wrapper>
    </TiltWrapper>
  );
};

export default ToolCards;

const Wrapper = styled.div`
  border: #03B962 solid 10px;
  box-shadow: 0px 17px 20px 7px rgba(0, 0, 0, 0.7);
`;

const TiltWrapper = styled(Tilt)`
    width: 70%;
    max-width: 450px;
    max-height: 900px;

    @media(max-width: 576px) {
      width: 50vw;
    }

`;

const StyledCard = styled(Card)`
  width: 100%;
  text-align: center;
  text-align: center !important;
  vertical-align: middle !important;
  justify-content: center;
  overflow: auto;
  background-color: white;
  box-shadow: 0px 17px 10px 7px rgba(0, 0, 0, 0.7);
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

const StyledButton = styled(Button)`
  text-align: center;
  background-color: transparent !important;
  color: #0A0227 !important; 
  border: solid #0A0227 2px;

  &:hover {
    background-color: #0A0227 !important;
    color: white !important;
    -webkit-transition: background-color 0.3s;
    -webkit-transition: color 0.3s;
`;

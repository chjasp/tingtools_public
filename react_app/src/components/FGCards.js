import React from "react";
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import ReactCardFlip from "react-card-flip";
import Alex from "../assets/focus_group_imgs/Alex.png";
import Marie from "../assets/focus_group_imgs/Marie.png";
import Henry from "../assets/focus_group_imgs/Henry.png";
import Jia from "../assets/focus_group_imgs/Jia.png";

const FGCards = ({
  name,
  id,
  text,
  answers,
  elaborateFunction,
  answerFunction,
  showBack,
  SBFunction,
  showBtn,
}) => {
  let picArr = [Alex, Marie, Henry, Jia];

  return (
    <ReactCardFlip isFlipped={showBack[id]} flipDirection="vertical">
      <Wrapper>
        <StyledCard className="my-0 p-3">
          <Card.Img src={picArr[id]} />
          <StyledCardBody>
            <StyledCardTitle as="div">
              <strong>{name}</strong>
            </StyledCardTitle>
            <StyledCardText as="div">{text}</StyledCardText>
          </StyledCardBody>
          <StyledCardFooter as="div">
            {showBtn ? (
              <>
                <StyledButton
                  onClick={() => elaborateFunction(id)}
                  variant="primary"
                  className="leftBtn"
                >
                  Elaborate
                </StyledButton>
                <StyledButton
                  onClick={() => answerFunction(id)}
                  variant="primary"
                  classNme="rightBtn"
                >
                  Answer
                </StyledButton>{" "}
              </>
            ) : (
              <StyledPlaceholder></StyledPlaceholder>
            )}
          </StyledCardFooter>
        </StyledCard>
      </Wrapper>
      <Wrapper>
        <StyledCard className="my-0 p-3">
          <StyledCardBody className="back">
            <StyledCardText as="div" className="answer">
              {answers[id]}
            </StyledCardText>
          </StyledCardBody>
          <StyledCardFooter as="div">
            {showBtn ? (
              <>
                <StyledButton
                  onClick={() => SBFunction(id)}
                  variant="primary"
                  classNme="rightBtn"
                >
                  Turn
                </StyledButton>{" "}
              </>
            ) : (
              <StyledPlaceholder></StyledPlaceholder>
            )}
          </StyledCardFooter>
        </StyledCard>
      </Wrapper>
    </ReactCardFlip>
  );
};

export default FGCards;

const Wrapper = styled.div`
  border: #03b962 solid 10px;
  box-shadow: 0px 17px 20px 7px rgba(0, 0, 0, 0.7);
`;

const StyledCardText = styled(Card.Text)`
  display: block !important;
  align-items: center;
  height: 80%;
  text-align: center !important;
  overflow: auto;
  z-index: 200;

  &.answer {
    width: 100%;
    height: 100%;
    overflow: auto
  }
`;

const StyledCardTitle = styled(Card.Title)`
  margin-top: 0rem;
  margin-bottom: 1rem;
`;

const StyledPlaceholder = styled.div`
  height: 2rem;
`;

const StyledCardFooter = styled(Card.Footer)`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: row;
  margin-top: 1rem;
`;

const StyledCard = styled(Card)`
  max-width: 250px;
  max-height: 400px;
  height: 50vh;
  width: 100%;
  text-align: center;
  overflow: hidden;
  box-shadow: 0px 17px 10px 7px rgba(0, 0, 0, 0.7);
`;

const StyledCardBody = styled(Card.Body)`
  overflow: auto;
  padding: 0.7rem;
  margin-bottom: 0px;
  overflow: hidden;

  &.back {
    width: 100%;
    overflow: hidden;
  }
`;

const StyledButton = styled(Button)`
  text-align: center;
  background-color: white !important;
  color: #0A0227 !important; 
  border: solid #0A0227 2px;
  font-size: 0.7rem;
  padding: 0;
  width: 40%;
  height: 2rem;

  &.leftBtn {
    margin-right: 1rem;
  }

  &:hover {
    background-color: #0A0227 !important;
    color: white !important;
    -webkit-transition: background-color 0.3s;
    -webkit-transition: color 0.3s;
`;

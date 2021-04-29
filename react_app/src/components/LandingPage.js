import styled from "styled-components";
import { Row, Col, Button } from "react-bootstrap";
import Tilt from "react-tilt";
import HeroLogo from "../assets/other_imgs/HeroLogo.png";

function LandingPage() {
  return (
    <>
      <Row sm={2} md={2} lg={2} xl={2}>
        <StyledCol className="left">
          <h1>Next-Generation</h1>
          <h1>Marketingtools.</h1>
          <h5>Bla blaBla blaBla blaBla blaBla bla</h5>
          <h5>Bla bla Bla blaBla bla Bla bla blaaaaa</h5>
          <h5>Now with a 7-day trial option.</h5>
          <StyledButton className="trial-btn" variant="primary">
            <span>Start Trial</span>
          </StyledButton>
        </StyledCol>
        <StyledCol className="right">
          <TiltWrapper options={{ max: 5 }}>
            <img src={HeroLogo} alt="" />
          </TiltWrapper>
        </StyledCol>
      </Row>
    </>
  );
}

export default LandingPage;

const StyledButton = styled(Button)`
  &.trial-btn {
    margin-left: 20%;
    margin-top: 1rem;
    width: 10rem;
    border-left: solid #03b962 5px !important;
    background-color: transparent;
    color: white;
    position: relative;
    transition: all 0.35s;

    @media (max-width: 500px) {
      margin-left: 1rem;
      margin-right: 1rem;
      margin-top: 1rem;
    }
  }

  &.trial-btn span {
    position: relative;
    z-index: 2;
  }

  &.trial-btn:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: white;
    transition: all 0.35s;
  }

  &.trial-btn:hover {
    color: #0a0227;
    border-right: solid #03b962 5px !important;
  }

  &.trial-btn:hover:after {
    width: 100%;
  }
`;

const TiltWrapper = styled(Tilt)`
  width: 100%;

  img {
    width: 70%;
    max-height: 67vh;
    margin-left: 10%;
  }

  @media (max-width: 670px) {
    display: none;
  }
`;

const StyledCol = styled(Col)`
  margin: auto;
  text-align: left;

  &.right {
    @media (max-width: 670px) {
      display: none;
    }
  }

  &.left {
    h1, h5 {
      color: white;
      margin-left: 20%;
} 
      @media (max-width: 670px) {
        margin-left: 2rem;
        margin-right: 2rem;
      }
    }
    
  }

`;

import styled from "styled-components";
import ToolCards from "./ToolCards";
import { Row, Col } from "react-bootstrap";

function SelectTool() {
  return (
    <>
        <StyledRow>
          <StyledCol className="left" sm={6}>
            <ToolCards title="FOCUSGROUP" text="Curious what People think of your Product? Find it out in Your Personal AI-Generated Focus Group Session."/>
          </StyledCol>
          <StyledCol className="right" sm={6}>
            <ToolCards title="COPYPRESS" text="Get Great Ideas for Ad Copies, Blog Articles and more in a Heartbeat with Your AI-Powered Copypress."/>
          </StyledCol>
        </StyledRow>
    </>
  );
}
export default SelectTool;

const StyledRow = styled(Row)`
  height: 92vh;
  bottom: 0px;
  position absolute;
  display: flex !important;
  align-items: center !important;
  flex-direction: row !important;
  justify-content: center !important;
  overflow: auto;

  @media(max-width: 576px) {
    height: 87vh;
  }
`;

const StyledCol = styled(Col)`
  margin: auto;
  text-align: center !important;
  display: flex !important;
  align-items: center !important;
  flex-direction: row !important;
  justify-content: center !important;

  &.left {
    margin-right: -5%;
  }

  &.right {
    margin-left: -5%;
  }

  @media(max-width: 576px) {

    &.right {
      margin-left: 0%;
    }

    &.left {
      margin-right: 0%;
    }
  }
`;

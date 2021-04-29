import { useState, useEffect } from "react";
import styled from "styled-components";
import { Row } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";

const Edit = ({ elements }) => {
  const [textLength, setTextLength] = useState(0);

  const handleTextFieldChange = (e) => {
    var input = e.target.value;
    setTextLength(input.length);
  };

  let copiesArray = (elements.filter((str) => str !== "---"))
  let copiesStr = copiesArray.join("\n\n\n");
  
  return (
    <Container>
      <StyledRow className="input">
        <TextWrapper>
          <Wrapper>
          <StyledTextField
            id="standard-multiline-static"
            InputProps={{
              disableUnderline: true,
            }}
            multiline
            onChange={handleTextFieldChange}
            defaultValue={copiesStr}
            rows={26}
          >
            {elements} 
            </StyledTextField> 
            </Wrapper>
          <Counter>
            {textLength}
          </Counter>
        </TextWrapper>
      </StyledRow>
    </Container>
  );
};

export default Edit;

const Wrapper = styled.div`
  border: #251F89 solid 10px;
  box-shadow: 0px 17px 20px 7px rgba(0, 0, 0, 0.7);
`;

const TextWrapper = styled.div`
  width: 80%;
  height: 60%;
  margin-bottom: 8rem;
  max-height: 700px;
  max-width: 1100px;
`;

const Counter = styled.div`
color: rgba(255, 255, 255, 0.6);
  text-align: right;
  z-index: 7;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  height: 100%;
  padding-left: 7px !important;
  border: none !important;
  background: white;
  position: center;
  box-shadow: 0px 17px 10px 7px rgba(0, 0, 0, 0.7);

  &:hover {
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 6vh;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${({ bg }) => bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const StyledRow = styled(Row)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &.input {
    margin-bottom: 1.5rem;
    height: 100%;
  }
`;

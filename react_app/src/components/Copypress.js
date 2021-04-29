import { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Edit from "./Edit";
import spinner from "../assets/other_imgs/spinner.svg";
import OutputCards from "./OutputCards";
import { Row, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";

function Copypress() {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [textLength, setTextLength] = useState(0);
  const [createMode, setCreateMode] = useState(true);
  const [charLim, setCharLim] = useState(200);

  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOutputDisplayed, setIsOutputDisplayed] = useState(false);
  const [mode, setMode] = useState("Product Description");
  const [isClicked, setIsClicked] = useState([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    // setCreateMode(createMode);
    setOutput([]);
    setName("");
    setDescription("");
    console.log("IN")
    switch (mode) {
      case "Product Description":
        setCharLim(200);
        break;
      case "Facebook Ad":
        setCharLim(100);
        break;
      case "Google Ad":
        setCharLim(100);
        break;
      case "Blog Idea":
        setCharLim(100);
        break;
      case "Blog Intro":
        setCharLim(100);
        break;   
    }
    return;
  }, [mode]);

  const handleNameFieldChange = (e) => {
    var input = e.target.value;
    setName(input);
    setTextLength(input.length + description.length);
  };

  const handleTextFieldChange = (e) => {
    var input = e.target.value;
    setDescription(input);
    setTextLength(name.length + input.length);
  };

  async function getOutput() {
    setIsLoading(true);
    if (description.trim() === "") return;

    var response_mode = mode;

    let formData = new FormData();
    formData.append("name", name.trim());
    formData.append("text", description.trim());
    formData.append("response_mode", response_mode);

    let out = await callBackend(formData);

    console.log("OUTPUT");
    console.log(out);

    let answers = [];
    let isClicked = [];
    for (const s of out) {
      answers.push(s);
      isClicked.push(false);
    }

    console.log("TEXTDESCRIPTION")
    console.log(description);

    setOutput(answers);
    setIsClicked(isClicked);
    setIsOutputDisplayed(true);
    setIsLoading(false);

    return;
  }

  function callBackend(data) {
    return fetch("http://localhost:8000/generate_json_copypress/", {
      method: "POST",
      body: data,
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.status === "success") {
          console.log("RESPONSE RESULT: ");
          console.log(response.result);
        }
        return response.result;
      });
  }

  function handleModeChange(new_child) {
    setMode(new_child);
    setTextLength(0);
    setRerender(!rerender);
  }

  function handleClick(index) {
    let isClickedCopy = isClicked;
    isClickedCopy[index] = !isClicked[index];
    setIsClicked(isClickedCopy);
  }

  return (
    <Container>
      {createMode ? (
        <>
          <BarWrapper>
            <Sidebar handleModeChange={handleModeChange} />
          </BarWrapper>
          <StyledRow className={`input ${mode}`}>
            <TextWrapper>
              { ((mode !== "Blog Idea") && (mode !== "Blog Intro"))  ? (<Wrapper className="productNameWrapper">
                <StyledTextField
                  key={mode}
                  id="standard-basic"
                  className="productName"
                  // does only seem to work when split in i/InputProps
                  inputProps={{
                    maxLength: {charLim},
                  }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  onChange={handleNameFieldChange}
                  defaultValue="Product Name"
                />
              </Wrapper>) : (<Buffer></Buffer>)}
              <Wrapper>
                <StyledTextField
                  key={mode}
                  id="standard-multiline-static"
                  // does only seem to work when split in i/InputProps
                  inputProps={{
                    maxLength: {charLim},
                  }}
                  style={{ borderColor: "black" }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  multiline
                  onChange={handleTextFieldChange}
                  rows={3}
                  defaultValue={(mode == "Blog Idea" || mode == "Blog Intro") ? "Describe the Topic" : "Describe the Product"}
                />
              </Wrapper>
              <Indicators>
                <span className="mode">Mode: {mode}</span>
                <span className="length">{textLength} / {charLim} </span>
              </Indicators>
            </TextWrapper>
            {isLoading ? (
              <StyledButton className="spinning-send-btn" variant="primary">
                <img src={spinner} alt="" />
              </StyledButton>
            ) : (
              <StyledButton
                className="send-btn"
                onClick={getOutput}
                variant="primary"
              >
                <span>Generate with AI</span>
              </StyledButton>
            )}
          </StyledRow>
          <Wrapper className="outputWrapper">
            <StyledRow className="output">
              {output.map((resultText, index) =>
                isClicked[index] == "green" ? (
                  <StyledRowOutput key={index}>
                    <OutputCards
                      key={index}
                      text={resultText}
                      bgColor="red"
                      markerFunction={handleClick}
                      index={index}
                    ></OutputCards>
                  </StyledRowOutput>
                ) : (
                  <StyledRowOutput key={index}>
                    <OutputCards
                      key={index}
                      text={resultText}
                      bgColor="green"
                      markerFunction={handleClick}
                      index={index}
                      mode={mode}
                    ></OutputCards>
                  </StyledRowOutput>
                )
              )}
            </StyledRow>
          </Wrapper>
          {isOutputDisplayed ? (
            <StyledButton
              className="send-btn edit-btn"
              variant="primary"
              onClick={() => setCreateMode(false)}
            >
              <span>Edit</span>
            </StyledButton>
          ) : (
            <StyledPlaceholder></StyledPlaceholder>
          )}{" "}
        </>
      ) : (
        <Edit
          elements={isClicked.map((bool, index) =>
            bool ? output[index] : "---"
          )}
        />
      )}
    </Container>
  );
}

export default Copypress;

const Buffer = styled.div`

    margin-left: 24%;
    width: 50%;
`;

const Wrapper = styled.div`
  border: #251f89 solid 10px;
  box-shadow: 0px 17px 20px 7px rgba(0, 0, 0, 0.7);

  &.outputWrapper {
    height: 60vh;
    width: 79%;
    max-width: 1100px;
    max-height: 400px;
    display: flex;
    align-items: center;
  }

  &.productNameWrapper {
    margin-left: 24%;
    width: 50%;
    margin-bottom: -0.3rem !important;
  }
`;

const StyledRowOutput = styled(Row)`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPlaceholder = styled.div`
  height: 2rem;
  height: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const BarWrapper = styled.div`
  margin-left: -100%;
  z-index: 1111;
`;

const TextWrapper = styled.div`
  width: 60%;
  max-width: 600px;
`;

const Indicators = styled.div`
  color: rgba(255, 255, 255, 0.6);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  z-index: 7;

  span {
    .left {
    text-align: right;
  }

`;

const StyledButton = styled(Button)`
  &.send-btn,
  &.spinning-send-btn {
    height: 2rem;
    margin-top: 0.4rem;
    width: 10rem;
    padding: 0px;
    text-decoration: none;
    text-align: top !important;
    background-color: transparent;
    color: white;
    position: relative;
    transition: all 0.35s;

    @media (max-width: 500px) {
    }
  }

  &.send-btn.edit-btn {
    margin-top: 2rem;
    margin-bottom: -1rem;
  }

  &.send-btn span {
    position: relative;
    z-index: 2;
  }

  &.send-btn:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: white;
    transition: all 0.35s;
  }

  &.spinning-send-btn:hover,
  &.send-btn:hover {
    background-color: transparent !important;
  }

  &.send-btn:hover {
    color: #0a0227;
    border-right: solid #03b962 5px !important;
  }

  &.send-btn:hover:after {
    width: 100%;
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  padding-left: 7px !important;
  border: none !important;
  background: white;
  position: center;
  box-shadow: 0px 17px 20px 7px rgba(0, 0, 0, 0.7);
  z-index: 10040;

  &.productName {
    width: 100%;
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
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;

  &.input {
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &.input.Blog {
    margin-top: 2.9rem;
    margin-bottom:1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &.output {
    max-width: 1100px;
    max-height: 400px;
    margin-left: 0px;
    width: 100% !important;
    height: 101% !important;
    text-align: center;
    overflow: auto;
    box-shadow: 0px 17px 20px 7px rgba(0, 0, 0, 0.7);

    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      --webkit-backdrop-filter: blur(35px);
      backdrop-filter: blur(35px);
      backdrop-color: rgba(255, 255, 255, 0.4);
    }
  }
`;

import { useState } from "react";
import styled from "styled-components";
import spinner from "../assets/other_imgs/spinner.svg";
import FGCards from "./FGCards";
import { Row, Col, Button } from "react-bootstrap";
import MemberData from "../assets/FocusGroupData";
import Carousel from "react-elastic-carousel";
import TextField from "@material-ui/core/TextField";

function FocusGroup() {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 950, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
  const [memberText, setMemberText] = useState([
    "Hey🙂",
    "Hi🤗",
    "Huhu😀",
    "Hello!✌",
  ]);
  const [memberAnswer, setMemberAnswer] = useState([
    "lol",
    "lol",
    "lol",
    "lol",
  ]);
  const [showBack, setShowBack] = useState([false, false, false, false]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [textLength, setTextLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState(["", "", "", ""]);
  const [initialGeneration, setInitialGeneration] = useState(false);
  const [rerender, setRerender] = useState(false);

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

  async function getInitQuestions() {
    setIsLoading(true);

    if (description.trim() === "") return;

    var response_mode = "initQuestions";
    let formData = new FormData();
    formData.append("name", name.trim());
    formData.append("text", description.trim());
    formData.append("question", "");
    formData.append("response_mode", response_mode);

    let out = await callBackend(formData);

    console.log("OUTPUT");
    console.log(out);

    let questions = [];
    for (const s of out) {
      questions.push(s);
    }
    setMemberText(questions);
    setQuestions(questions);
    setIsLoading(false);
    setInitialGeneration(true);

    return;
  }

  async function getElaboration(member_id) {
    setIsLoading(true);

    var response_mode = "elaboration";
    let formData = new FormData();
    formData.append("name", name.trim());
    formData.append("text", description.trim());
    formData.append("question", questions[member_id]);
    formData.append("response_mode", response_mode);

    let out = await callBackend(formData);

    let memberTextCopy = memberText;
    memberTextCopy[member_id] = out;

    setMemberText(memberTextCopy);
    setIsLoading(false);

    return;
  }

  async function getAnswer(member_id) {
    setIsLoading(true);

    var response_mode = "answer";
    let formData = new FormData();
    formData.append("name", name.trim());
    formData.append("text", description.trim());
    formData.append("question", questions[member_id]);
    formData.append("response_mode", response_mode);

    let out = await callBackend(formData);

    console.log("OUTPUT");
    console.log(out);

    let memberAnswerCopy = memberAnswer;
    memberAnswerCopy[member_id] = out[0];
    setMemberAnswer(memberAnswerCopy);

    let showBackCopy = showBack;
    showBackCopy[member_id] = true;
    setShowBack(showBackCopy);
    setIsLoading(false);

    return;
  }

  function setShowBackFromChild(member_id) {
    setRerender(!rerender);
    let showBackCopy = showBack;
    showBackCopy[member_id] = !showBackCopy[member_id];
    setIsLoading(true);
    setShowBack(showBackCopy);
    setIsLoading(false);
  }

  function callBackend(data) {
    return fetch("http://localhost:8000/generate_json_focusgroup/", {
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

  return (
    <Container>
      <StyledRow className="input">
        <TextWrapper>
        <Wrapper className="productNameWrapper">
                <StyledTextField
                  id="standard-basic"
                  className="productName"
                  // does only seem to work when split in i/InputProps
                  inputProps={{
                    maxLength: 50,
                  }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  onChange={handleNameFieldChange}
                  defaultValue="Product Name"
                />
              </Wrapper>
              <Wrapper> 
                <StyledTextField
                  id="standard-multiline-static"
                  // does only seem to work when split in i/InputProps
                  inputProps={{
                    maxLength: 150,
                  }}
                  style={{ borderColor: "black" }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  multiline
                  onChange={handleTextFieldChange}
                  rows={3}
                  defaultValue="Product Description"
                />
              </Wrapper>
          <Counter>{textLength} / 150</Counter>
        </TextWrapper>
        {isLoading ? (
          <StyledButton className="spinning-send-btn" variant="primary">
            <img src={spinner} alt="" />
          </StyledButton>
        ) : (
          <StyledButton
            className="send-btn"
            onClick={getInitQuestions}
            variant="primary"
          >
            <span>Generate with AI</span>
          </StyledButton>
        )}
      </StyledRow>
      <StyledRow className="members">
        <StyledCarousel breakPoints={breakPoints}>
          {MemberData.map((member) => (
            <StyledCol key={member.name} className="member">
              <FGCards
                name={member.name}
                id={member.id}
                text={memberText[member.id]}
                answers={memberAnswer}
                elaborateFunction={getElaboration}
                answerFunction={getAnswer}
                showBack={showBack}
                SBFunction={setShowBackFromChild}
                showBtn={initialGeneration}
              />
            </StyledCol>
          ))}
        </StyledCarousel>
      </StyledRow>
    </Container>
  );
}

export default FocusGroup;

const TextWrapper = styled.div`
  width: 60%;
  max-width: 600px;
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
    margin-bottom: -0.3rem !important
  }
`;

const Counter = styled.div`
  color: rgba(255, 255, 255, 1);
  text-align: right;
  z-index: 7;
`;

const StyledCarousel = styled(Carousel)`
  &.rec rec-carousel {
    height: 100vh;
  }
`;

const StyledButton = styled(Button)`
  &.send-btn,
  &.spinning-send-btn {
    height: 2rem;
    margin-top: 0rem;
    margin-bottom: -0.6rem;
    width: 10rem;
    padding: 0px;
    text-decoration: none;
    text-align: top !important;
    background-color: transparent;
    color: white;
    position: relative;
    transition: all 0.35s;
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

  &.spinning-send-btn:hover {
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
  box-shadow: 0px 17px 10px 7px rgba(0, 0, 0, 0.7);
  z-index: 1040;
`;
const StyledRow = styled(Row)`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;

  &.input {
    margin-bottom: 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &.members {
    margin-left: 0%;
  }
  &.member {
    margin-right: 0%;
  }
`;

const StyledCol = styled(Col)`
  margin: auto;
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

import styled from "styled-components";
import bg from "./assets/other_imgs/bg.jpg";
import NavbarBS from "./components/NavbarBS";
import SelectTool from "./components/SelectTool";
import FocusGroup from "./components/FocusGroup";
import Copypress from "./components/Copypress";
import LandingPage from "./components/LandingPage";
import Edit from "./components/Edit";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <StyledNavbarBS />
      <Container bg={bg}>
      <Route path="/Toolselection" component={SelectTool} />
      <Route path="/Focusgroup" component={FocusGroup} />
      <Route path="/Copypress" component={Copypress} />
      <Route path="/Edit" component={Edit} />
      <Route path="/" exact component={LandingPage} />
      </Container>
    </Router>
  );
}

export default App;

const StyledNavbarBS = styled(NavbarBS)`
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${({ bg }) => bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

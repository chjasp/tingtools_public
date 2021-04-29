import React, { useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { SidebarData } from "../assets/SidebarData";
import "./Sidebar.css";
import styled from "styled-components";

const Sidebar = ({ handleModeChange }) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="sidebar">
        <Link to="#" className="open">
          <AiFillCaretRight onClick={showSidebar} color="white" />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="close">
              <StyledClose />
            </Link>
          </li>
          <BtnContainer>
            {SidebarData.map((item, index) => {
              return (
                <StyledLi key={index} className={item.cName}>
                  <StyledButton onClick={() => handleModeChange(item.cName)}>
                    <span className="icon">{item.icon}</span>
                    <span className="modeText">{item.title}</span>
                  </StyledButton>
                </StyledLi>
              );
            })}
          </BtnContainer>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;

const StyledLi = styled.li`
  list-style-type: none;
  margin-left: -20%;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
`;

const StyledButton = styled.button`
  height: 2rem;
  margin-top: 1rem;
  margin-bottom: 0rem;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 10rem;
  padding: 0px;
  background-color: transparent;
  color: white;
  border: none;
  position: relative;
  transition: all 0.35s;

  span {

      &.icon {
        margin-left: 6px;
        margin-bottom: 3px;
        color: white !important;
      }
      &.modeText {
        margin-left: 6px;
      }
  }

  &:hover {
    background-color: white;
    color: #0a0227 !important;
    -webkit-transition: background-color 0.3s;
    -webkit-transition: color 0.3s;

    .icon {
        color: #0a0227 !important;
  }
`;

const StyledClose = styled(IoMdClose)`
  color: white !important;
  opacity: 1;
`;

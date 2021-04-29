import React from "react";
import styled from "styled-components";
import { Navbar, Nav } from "react-bootstrap";

const NavbarBS = () => {
  return (
    <StyledNavbar scrolling variant="dark" expand="md" fixed="top">
      <StyledNavBrand href="/">TINGTOOLS</StyledNavBrand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <StyledCollapse id="basic-navbar-nav">
        <StyledNav className="ml-auto" color="white">
          <StyledNavlink href="/Toolselection" color="white">
            Tools
          </StyledNavlink>
          <StyledNavlink>Account</StyledNavlink>
        </StyledNav>
      </StyledCollapse>
    </StyledNavbar>
  );
};

export default NavbarBS;

const StyledNavBrand = styled(Navbar.Brand)`
  z-index: -11 !important;
  position: relative !important;
`;

const StyledNav = styled(Nav)`
  margin-right: 0px !important;
`;

const StyledCollapse = styled(Navbar.Collapse)`
  @media (max-width: 760px) {
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      --webkit-backdrop-filter: blur(35px);
      backdrop-filter: blur(35px);
      backdrop-color: rgba(255, 255, 255, 0.4);
    }
  }
`;

const StyledNavlink = styled(Nav.Link)`
  color: white !important;
  margin-left: 6px;
  margin-top: 6px;
  text-align: center;

  @media (max-width: 960px) {
    margin-left: 0px;
    margin-top: 0px;
  }

  &:hover {
    background-color: white;
    color: #0a0227 !important;
    -webkit-transition: background-color 0.3s;
    -webkit-transition: color 0.3s;
  }
`;

const StyledNavbar = styled(Navbar)`
  padding-left: 10%;
  padding-right: 10%;
  z-index: 2000;
`;

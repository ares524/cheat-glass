import React from "react";
import {
  Navbar,
  NavbarBrand,
  Container,
} from "reactstrap";
import Link from "next/link";
import s from "./Header.module.scss";
import { withRouter } from "next/router";
import { connect } from "react-redux";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      innerWidth: typeof window !== "undefined" && window.innerWidth,
    };
  }

  render() {
    const { innerWidth } = this.state;
    return (
      <Navbar className={s.header}>
        <Container className="justify-content-center">
          <NavbarBrand className="d-flex">
            <Link href={"/"}>
              <span className={s.logoStyle}>Welcome to Chater glasses</span>
            </Link>
          </NavbarBrand>
        </Container>
      </Navbar>
    );
  }
}

Header.propTypes = {};

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    navbarType: store.layout.navbarType,
    navbarColor: store.layout.navbarColor,
  };
}

export default withRouter(connect(mapStateToProps)(Header));

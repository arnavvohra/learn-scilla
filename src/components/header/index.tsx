import React from 'react';
import {
  // Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarBrand,
  NavbarToggler
} from 'reactstrap';
import { translate } from 'react-i18next';
import { paths } from '../../routes';
import * as H from 'history';
import Collapse from 'reactstrap/lib/Collapse';
import { Link } from 'react-router-dom';

interface IHeaderProps {
  history: H.History;
  location: H.Location;

  i18n: {
    language: string;
    changeLanguage: (lang: string) => void;
  };
  t: (key: string) => string;
  isAuth: boolean;
  logout: () => void;
}

interface IHeaderStates {
  isOpen: boolean;
  color: string;
}

class Header extends React.Component<IHeaderProps, IHeaderStates> {
  public readonly state: IHeaderStates = {
    color: '',
    isOpen: false
  };
  public componentDidMount() {
    const i18n = this.props.i18n;
    i18n.changeLanguage('en');
  }
  public render(): React.ReactNode {
    const { isAuth, logout } = this.props;

    const { pathname } = this.props.location;

    return (
      <Navbar expand="md" color="dark" dark={true} fixed={'top'}>
        <div className="navbar-wrapper">
          <NavbarBrand href={paths.home}>{'Learn Scilla'}</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
        </div>
        <Collapse isOpen={this.state.isOpen} navbar={true}>
          <Nav className="ml-auto" navbar={true}>
            <NavItem>
              <Link
                to={paths.home}
                className={`nav-link ${pathname === paths.home ? 'active' : ''}`}
              >
                {'Home'}
              </Link>
            </NavItem>
            <NavItem>
              <Link
                to={'learn/en/lesson/1/chapter/1'}
                className={`nav-link ${pathname === paths.codeTutorial ? 'active' : ''}`}
              >
                {'Learn'}
              </Link>
            </NavItem>

            {isAuth ? (
              <NavItem>
                <NavLink onClick={logout} style={{ cursor: 'pointer' }}>
                  {'Logout'}
                </NavLink>
              </NavItem>
            ) : (
              <NavItem>
                <Link
                  to={paths.signin}
                  className={`nav-link ${pathname === paths.signin ? 'active' : ''}`}
                >
                  {'Login'}
                </Link>
              </NavItem>
            )}
            {this.renderI18nDropdown()}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
  private toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  private renderI18nDropdown = () => {
    const i18n = this.props.i18n;

    const lang: string = i18n.language;
    return (
      <UncontrolledDropdown nav={true} inNavbar={true}>
        <DropdownToggle caret={true} nav={true}>
          {lang}
        </DropdownToggle>
        <DropdownMenu right={true} size="sm">
          <DropdownItem onClick={() => i18n.changeLanguage('en')}>{'English'}</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };
}

export default translate('translations')(Header);

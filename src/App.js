import React from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { AddLocationAlt, EditLocation as EditLocation2, WrongLocation } from '@styled-icons/material-outlined/';
import { LogOut } from '@styled-icons/ionicons-outline/';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalGlyphs from './assets/fonts/fonts';

import About from './components/About/About';
import Admin from './components/Admin/Admin';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminMenu from './components/AdminMenu/AdminMenu';
import Filters from './components/Filters/Filters';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import Map from './components/Map/Map';
import Menu from './components/Menu/Menu';
import Nav from './components/Nav/Nav';
import Panel from './components/Panel/Panel';
import Timeline from './components/Timeline/Timeline';

const theme = {
  josefin: "Josefin Sans",
  montserrat: "Montserrat",
  unica: "Unica One",
  abril: "Abril Fatface",
  openSans: "Open Sans",
  glyphs: "Glyphter",
  softPink: "#e6dbdf",
  medPink: "#c39dab",
  deepPink: "#cc86a2",
  primaryColor: "#a76777",
  secondaryColor: "#9a385f",
  tertiaryColor: "#381221",
  gray: "#ccc",
  white: "#fff",
  body: "#170c3d",
  navHeight: "60px",
  navWidthTablet: "380px",
  navWidthDesktop: "450px",
  navButtonWidth: "50px",
  tablet: "768px",
  tabletXL: "1024px",
  desktop: "1200px",
  desktopXL: "1400px"
};

// App

class App extends React.Component {
  state = {
    adminUser: true,
    mapReady: false,
    navOpen: false,
    about: false,
    filterView: true,
    timelineView: false,
    activeMarker: null
  };

  componentDidMount(){
    ReactGA.initialize('UA-111080612-1');
  }

  // Display the map once we've received successful load callback from map API
  showMap = () => {
    this.setState(() => ({ mapReady: true }));
  }

  // Set the active map marker
  setActiveMarker = (markerID) => {
    if(this.state.activeMarker !== markerID) {
      this.setState(() => ({ activeMarker: markerID }));
    }
  }

  // Clear the active map marker
  clearActiveMarker = () => {
    this.setState(() => ({ activeMarker: null }));
  }

  // Toggle Admin Mode
  toggleAdmin = () => {
    this.setState(() => ({ adminUser: !this.state.adminUser }));
  }

  // Toggle Nav
  toggleNav = () => {
    this.setState(() => ({ navOpen: !this.state.navOpen }));
  }

  // Toggle 'View by Filter' Mode
  toggleFilterView = () => {
    this.setState(() => ({
      filterView: !this.state.filterView,
      timelineView: false,
      about: false
      // activeMarker: null,
      // activeFilter: null
    }));
  }

  // Toggle 'View by Timeline' Mode
  toggleTimelineView = () => {
    this.setState(() => ({
      timelineView: !this.state.timelineView,
      filterView: false,
      about: false
      // activeMarker: null,
      // activeFilter: null
    }));
  }

  // Toggle the About Panel
  toggleAbout = () => {
    this.setState(() => ({ 
      about: !this.state.about,
      timelineView: false,
      filterView: false
    }));
  }

  // Compose the Shared Menu w/ all required props
  SharedMenu = () => {
    return (
      <Menu 
        toggleFilterView={this.toggleFilterView} 
        toggleTimelineView={this.toggleTimelineView} 
        toggleAbout={this.toggleAbout} 
        filterView={this.state.filterView} 
        timelineView={this.state.timelineView}
        about={this.state.about}
      />
    );
  }

  // Compose the Shared Nav w/ all required props
  ShareNav = () => {
    return (
      <Nav 
        menu={this.SharedMenu}
        navOpen={this.state.navOpen}
        toggleNav={this.toggleNav}
      />
    );
  }

  // Compose the Shared Panel w/ all required props
  SharedPanel = () => {
    return (
      <Panel>
        {this.state.filterView ? <Filters /> : null}
        {this.state.timelineView ? <Timeline /> : null}
        {this.state.about ? <About /> : null}
      </Panel>
    );
  }

  // Compose menu for admin actions
  AdminMenu = () => {
    const addIcon = !this.state.activeMarker ? <button><AddIcon />Add Marker</button> : null;
    const manageIcons = this.state.activeMarker ? (<div className="manageIcons"><button><EditIcon />Edit Marker</button><button><RemoveIcon />Remove Marker</button></div>) : null;

    return(
      <AdminMenu>
        <button><LogoutIcon onClick={e => (this.toggleAdmin(e))} />Logout</button>
        {addIcon}
        {manageIcons}
      </AdminMenu>
    );
  }

  CloseAdmin = () => {
    return (
      <button onClick={e => (this.toggleAdmin(e))}>Log In</button>
    );
  }

  render(){
    return (
      <AppWrap className="App">
        <Router>
          <GlobalGlyphs />
          <CssBaseline>
            <ThemeProvider theme={theme}>
              <Switch>
                <Route path="/admin">
                  <AdminLogin closeAdmin={this.CloseAdmin} />
                </Route>
                <Route path="/">
                  <Map filterView={this.state.filterView} timelineView={this.state.timelineView} showMap={this.showMap} openMarker={this.setActiveMarker} />
                  {this.state.navOpen ? this.SharedPanel() : null}
                  <Header adminUser={this.state.adminUser} adminMenu={this.AdminMenu} nav={this.ShareNav} />
                  {!this.state.mapReady ? <Loading /> : null}
                </Route>
              </Switch>
            </ThemeProvider>
          </CssBaseline>
        </Router>
      </AppWrap>
    );
  }
}

export default App;

const AppWrap = styled.div`
  position: relative;
  max-height: 100vh;
  max-width: 100vw;
  height: 100vh;
  font-size: 16px;
  font-family: ${theme.josefin}, sans-serif;
  overflow: hidden;

  h1, h2 {
    display: inline-block;
    font-family: ${theme.unica};
    text-transform: uppercase;
    font-weight: 300;

    @media (min-width: ${theme.tablet}) {
        margin-top: 0;
    }
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  button:focus,
  button:active {
    outline: 0;
  }

  hr {
    border-style: solid;
    border-color: ${theme.medPink};
    border-bottom: 0;
  }

  cite {
    display: block;
    margin-top: 20px;
    font-size: 0.9rem;
    font-style: italic;
  }
`;

const LogoutIcon = styled(LogOut)`
  height: 25px;

  @media (min-width: ${props => props.theme.tablet}) {
      height: 35px;
  }
`;
const AddIcon = styled(AddLocationAlt)`
  height: 25px;

  @media (min-width: ${props => props.theme.tablet}) {
      height: 35px;
  }
`;
const EditIcon = styled(EditLocation2)`
  height: 25px;

  @media (min-width: ${props => props.theme.tablet}) {
      height: 35px;
  }
`;
const RemoveIcon = styled(WrongLocation)`
  height: 25px;

  @media (min-width: ${props => props.theme.tablet}) {
      height: 35px;
  }
`;
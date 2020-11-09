import React from 'react';
import AdminProjectArea from '../components/AdminProjectArea.js';
import ContentBackground from '../components/ContentBackground.js'
import Header from '../components/Header.js';
import Sidebar from '../components/Sidebar.js'
import ProjectController from './js/ProjectControl'
import './css/Admin.scss';

var login = require('../login.config.js')


class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false, //change to false for production 
      wrongpass: false,
      projectController: new ProjectController(this),
    };
    this.state.projectController.getProjects();
    //this.state.TechController.getTechs();
  }

  checkCredientals = (guest = false) => {
    let user = document.getElementsByClassName("Admin-login-username")[0].children[1].value;
    let pwd = document.getElementsByClassName("Admin-login-password")[0].children[1].value;
    if (user === login.user && pwd === login.password) {
      this.setState({
        auth: true,
      })
    }
    else if (guest === true) {
      this.state.projectController.fake=true;
      this.setState({
        auth: "guest",
      })
    }
    else {
      this.setState({
        wrongpass: true,
      })
    }
  }

  renderLogIn = () => {
    let content = "";
    if (this.state.wrongpass === true) {
      content="Incorrect Login Information"
    }
    return (
      <div className="Admin-login">
        <div className="Admin-login-result" >
          {content}
        </div>
        <div className="Admin-login-username">
          <div className="Admin-login-label">Username</div>
          <input />
        </div>
        <div className="Admin-login-password" >
          <div className="Admin-login-label">Password</div>
          <input type="password"/>
        </div>
        <div className="Admin-login-buttons" >
          <input onClick={() => this.checkCredientals()} className="Admin-login-submit" type="button" value="Submit" />
          <a onClick={() => {this.checkCredientals(true);}} className="Admin-login-guest" href="#">Continue as Guest</a>
        </div>
      </div>
    );
  }

  /*async getTechs() {
    const techs = await api.makeApiGetCall('techs/',);
    this.setState({
        techs: techs,
    })
  }*/
  

  renderContent() {
    return(
      <div className="Admin-content">  
        <AdminProjectArea controller={this.state.projectController}/>
      </div>
    );
  }

  renderFakeContent() {
    return(
      <div className="Admin-content">
        <AdminProjectArea controller={this.state.projectController} fake/>
      </div>
    )
  } 

  render() {
    let content=this.renderLogIn();
    if (this.state.auth === true) {
      content = this.renderContent();
    }
    else if (this.state.auth === "guest") {
      content = this.renderFakeContent();
    }
    return (
      <div className="Admin">
          <Header />
          <Sidebar />
          <ContentBackground />
          {content}
      </div>
    );
  }
}

export default Admin; 
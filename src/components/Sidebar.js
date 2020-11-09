import React from 'react';
import './css/Sidebar.scss';
const api=require('./js/dbConnection.js');

function SidebarLink(props) {
    let className="Sidebar-link";
    if (props.isSubLink) {
        className="Sidebar-subLink";
    }
    return (
        <a className={className} href={props.link}>
            {props.text}
        </a>
    );
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        }
        this.getProjectList()
    }

     getProjectList = async () => {
        let out = [];
        const projects = await api.makeApiGetCall('projects/');
        let projectList=this.state.projects
        for (let i = 0; i < projects.length;i++) {
            let project = {};
            project.id=projects[i].id;
            project.name=projects[i].name;
            projectList.push(project)
        }
        this.setState({
            projects: projectList,
        })
        return out;
    }

    mapProjectLinks = () => {
        let out = [];
        for (let i=0;i<this.state.projects.length;i++) {
            out.push(<SidebarLink key={this.state.projects[i].id} link={"/ProjectPage?id="+this.state.projects[i].id}  text={this.state.projects[i].name} isSubLink/>)
        }
        return out;
    }

    render() {
        let projectLinks = this.mapProjectLinks();
        return (
            <div className="Sidebar">
                    <div className="Sidebar-links">
                    <SidebarLink link="/" text="Home"/>
                    <SidebarLink link="/admin" text="Admin" />
                    <SidebarLink link="/ProjectList" text="Project List:"/>
                    {projectLinks}
                </div>
            </div>
        );
    }
}

export default Sidebar;
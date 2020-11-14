import React from 'react';
import './css/Sidebar.scss';
const api=require('../js/dbConnection.js');

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

    async getProjectList () {
        let out = [];
        const projects = await api.makeApiGetCall('projects/');
        this.setState({
            projects: projects,
        })
        return out;
    }

    mapProjectLinks() {
        let out = [];
        for (let i=0;i<this.state.projects.length;i++) {
            out.push(<SidebarLink key={this.state.projects[i].id} link={"/projectpage/"+this.state.projects[i].id}  text={this.state.projects[i].name} isSubLink/>)
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
                    <SidebarLink link="/projectlist" text="Project List:"/>
                    {projectLinks}
                </div>
            </div>
        );
    }
}

export default Sidebar;
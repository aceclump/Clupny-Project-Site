const api=require('./dbConnection.js');
const fs=require('fs')

class ProjectController {
    constructor(component) {
        this.fake = false;
        this.component = component;
    }

    async getProjects() {
        const projects = await api.makeApiGetCall('projects/');
        this.projects=projects
        this.updatePage();
      }

    updatePage() {
        this.component.setState(this.component.state.projects=this.projects)
    }

    handleTextChange(event, index, label) {
        this.projects[index][label] = event.target.value;
        this.updatePage()
    }

    handleTechIds(index, list) {
        this.projects[index].tech_ids = JSON.stringify(list);
        this.updatePage()
    }
    
    handleNewPicture(event, index, label) {
        let pics=(this.projects[index][label] !== '')?JSON.parse(this.projects[index][label]):[];
        pics.push('./projectFiles/' + this.projects[index].id + "/" + label + "/" + event.target.files[0].name)
        this.projects[index][label] = JSON.stringify(pics);
        if (!this.fake) {
            let formData = new FormData()
            formData.append('file', event.target.files[0], event.target.files[0].name)
            formData.append('id', this.projects[index].id)
            formData.append('label', label)
            api.makeApiPostCall('projectAddPicture/', formData).then(this.updatePage())
        }
        else {
            this.updatePage()
        }
    }

    deleteProjectPicture(index, label, picIndex) {
        let pics=(this.projects[index][label] !== '')?JSON.parse(this.projects[index][label]):[];
        let picture=pics.splice(picIndex, 1)
        this.projects[index][label] = JSON.stringify(pics);
        this.updatePage()
        if (!this.fake) {
            let formData = new FormData()
            formData.append('picture', picture[0])
            api.makeApiPostCall('projectDeletePicture/', formData)
        }
    }
    
    handleNewProject() {
        let index=0;
        for(let i = 0; i < this.projects.length; i++) {
            if(this.projects[i].id>index) {
                index=this.projects[i].id
            }
        }
        index++;
        this.projects.push(
            {
                id: index,
                name: "",
                description: "",
                purpose: "",
                results: "",
                picture_paths_prototype: "",
                picture_paths_results: "",
                tech_ids: "",
                newProject: true
            }
        )
        this.updatePage()
    }

    deleteProject(index) {
        if (!this.fake) {
            let pics=(this.projects[index]['picture_paths_prototype'] !== '')?JSON.parse(this.projects[index]['picture_paths_prototype']):[];
            for (let i = 0;i < pics.length; i++) {
                fs.unlink(pics[i])
            }
            pics=(this.projects[index]['picture_paths_results'] !== '')?JSON.parse(this.projects[index]['picture_paths_results']):[];
            for (let i = 0;i < pics.length; i++) {
                fs.unlink(pics[i])
            }
            let formData = new FormData()
            formData.append('id', this.projects[index].id)
            api.makeApiPostCall('deleteProject/', formData)
        }
        this.projects.splice(index, 1)
        this.updatePage()
    }

    addProjectToDB(index) {
        delete this.projects[index].newProject;
        this.updatePage()
        if (!this.fake) {
            let json=this.projects[index]
            api.makeApiPostCall('addProject/', JSON.stringify(json), {"content-type": "application/json"})
        }
    }

    updateProject(index) {
        if (!this.fake) {
            let json=this.projects[index]
            api.makeApiPostCall('updateProject/', JSON.stringify(json), {"content-type": "application/json"})
        }
        
    }
}

export default ProjectController    
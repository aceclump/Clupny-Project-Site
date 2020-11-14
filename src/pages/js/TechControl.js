const api=require('../../js/dbConnection.js');
const fs=require('fs')

class TechController {
    constructor(component) {
        this.fake = false;
        this.component = component;
    }

    async getTechs() {
        const techs = await api.makeApiGetCall('techs/');
        this.techs=techs
        this.updatePage();
      }

    updatePage() {
        this.component.setState(this.component.state.techs=this.techs)
    }

    handleTextChange(event, index, label) {
        this.techs[index][label] = event.target.value;
        this.updatePage()
    }
    
    handleNewPicture(event, index, label) {

        this.techs[index][label]='./techFiles/' + this.techs[index].id + "/" + label + "/" + event.target.files[0].name
        if (!this.fake) {
            let formData = new FormData()
            formData.append('file', event.target.files[0], event.target.files[0].name)
            formData.append('id', this.techs[index].id)
            formData.append('label', label)
            api.makeApiPostCall('techAddPicture/', formData).then(this.updatePage())
        }
        else {
            this.updatePage()
        }
    }

    deleteTechPicture(index, label, picIndex) {
        if (!this.fake) {
            let formData = new FormData()
            formData.append('picture', this.techs[index][label])
            api.makeApiPostCall('techDeletePicture/', formData)
        }
        this.techs[index][label] = '';
        this.updatePage()
    }
    
    handleNewTech() {
        let index=0;
        for(let i = 0; i < this.techs.length; i++) {
            if(this.techs[i].id>index) {
                index=this.techs[i].id
            }
        }
        index++;
        this.techs.push(
            {
                id: index,
                name: "",
                picture_path: "",
                newTech: true
            }
        )
        this.updatePage()
    }

    deleteTech(index) {
        if (!this.fake) {
            let pics=(this.techs[index]['picture_path'] !== '')?JSON.parse(this.techs[index]['picture_path']):[];
            for (let i = 0;i < pics.length; i++) {
                fs.unlink(pics[i])
            }
            let formData = new FormData()
            formData.append('id', this.techs[index].id)
            api.makeApiPostCall('deleteTech/', formData)
        }
        this.techs.splice(index, 1)
        this.updatePage()
    }

    addTechToDB(index) {
        delete this.techs[index].newTech;
        this.updatePage()
        if (!this.fake) {
            let json=this.techs[index]
            api.makeApiPostCall('addTech/', JSON.stringify(json), {"content-type": "application/json"})
        }
    }

    updateTech(index) {
        if (!this.fake) {
            let json=this.techs[index]
            console.log(json)
            api.makeApiPostCall('updateTech/', JSON.stringify(json), {"content-type": "application/json"})
        }
        
    }
}

export default TechController    
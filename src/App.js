import React, { Component } from 'react';
import './App.css';
import AddTeacher from './components/AddTeacher';
import Teachers from './components/Teachers';
import EditTeacher from './components/EditTeacher';
import Header from './layout/Header';
import MenuItems from './layout/MenuItems';
import ClearData from './layout/ClearData';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import remove from 'lodash/remove';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [
      ],
      checkedTeachers: [
      ]
    }
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  addTeacher = teacher => {
    const teachers = [...this.state.teachers];
    teachers.push(teacher);
    this.setState({ teachers: [...this.state.teachers, teacher] });
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }

  editTeacher = (oldTeacher) => {
    localStorage.setItem("editedTeacher", JSON.stringify(oldTeacher));
    this.setState({ checkedTeachers: [] });
  }

  updateTeachers = (teacher) => {
    const oldTeachers = [...this.state.teachers];
    const teachers = oldTeachers.filter(t => t.id !== teacher.id);
    teachers.push(teacher);
    this.setState({ teachers: teachers });
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }

  deleteTeacher = id => {
    const teachers = [...this.state.teachers];
    const updatedTeachers = remove(teachers, teacher => teacher.id !== id);
    this.setState({ teachers: updatedTeachers });
    localStorage.setItem("teachers", JSON.stringify(updatedTeachers));
  }

  deleteTeachers = arrayOfDeletedID => {
    let teachers = [...this.state.teachers];
    arrayOfDeletedID.forEach(deletedTeacherID => 
      teachers.forEach(teacher => {
          if(teacher.id === deletedTeacherID) {
            teachers.splice(teachers.indexOf(teacher), 1);  
          }
      })
    );
    this.setState({ checkedTeachers: [] });
    this.setState({ teachers: teachers });
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }

  checkTeacher = id => {
    let checked = [...this.state.checkedTeachers];
    if(checked.includes(id)) {
      checked = remove(checked, value => value !== id);
    } else {
      checked.push(id);
    }
    this.setState({ checkedTeachers: checked });
  }

  clearData = () => {
    this.setState({ teachers: [] });
  }

  render() {
    return (
      <Router>
      <div className="App">
       <Header />
          <div id="content">
          <Route exact path="/" render={props =>(
            <div>
              <table className="table">
                <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Discipline</th>
                  <th>Phone</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                <Teachers
                  teachers={this.state.teachers}
                  checkTeacher={this.checkTeacher}
                  
                  editTeacher={this.editTeacher}
                  deleteTeacher={this.deleteTeacher}
                />
              </tbody>
             </table>
             <MenuItems teachers={this.state.teachers} 
              checkedTeachers={this.state.checkedTeachers}
              deleteTeachers={this.deleteTeachers}
              editTeachers={this.editTeacher}/>
            </div>
          )} />
          <Route path="/add" render={props =>(
            <AddTeacher addTeacher={this.addTeacher} />
          )} />
        <Route path="/edit" render={props =>(
            <EditTeacher updateTeacher={this.updateTeachers} />
        )} />
        <Route path="/clear" render={props =>(
            <ClearData clearData={this.clearData}/>
        )} />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;

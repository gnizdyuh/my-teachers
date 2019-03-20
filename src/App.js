import React, { Component } from 'react';
import './App.css';
import AddTeacher from './components/AddTeacher';
import EditTeacher from './components/EditTeacher';
import Header from './layout/Header';
import Teachers from './components/Teachers';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [
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
    localStorage.setItem("editTeacher", JSON.stringify(oldTeacher));
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
    const updatedTeachers = teachers.filter(teacher => teacher.id !== id);
    this.setState({ teachers: updatedTeachers });
    localStorage.setItem("teachers", JSON.stringify(updatedTeachers));
  }

  render() {
    return (
      <Router>
      <div className="App">
       <Header />
        <div className="container">
          <Route exact path="/" render={props =>(
              <table className="table">
                <thead>
                <tr>
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
                  deleteTeacher={this.deleteTeacher}
                  editTeacher={this.editTeacher}
                />
              </tbody>
            </table>
          )} />
          <Route path="/add" render={props =>(
            <AddTeacher addTeacher={this.addTeacher} />
          )} />
        <Route path="/edit" render={props =>(
            <EditTeacher editTeacher={this.editTeacher} updateTeacher={this.updateTeachers} />
        )} />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;

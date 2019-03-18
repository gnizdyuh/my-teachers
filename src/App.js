import React, { Component } from 'react';
import './App.css';
import AddTeacher from './components/AddTeacher';
import Header from './layout/Header';
import Teachers from './components/Teachers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import idGenerator from 'react-id-generator';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [
        {
          id: idGenerator(),
          name: "Ivan",
          surname: "Tavan",
          discipline: "Math",
          phone: "+380999333222",
          notes: "Tall and Bald"
        },
        {
          id: idGenerator(),
          name: "Stepan",
          surname: "Martov",
          discipline: "Physycs",
          phone: "+380999312352",
          notes: "Short and Funny"
        }
      ]
    }
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  addTeacher = teacher => {
    // copy current list of items
    const teachers = [...this.state.teachers];

    // add the new item to the list
    teachers.push(teacher);

    // update state with new list, reset the new item input
    this.setState({ teachers: [...this.state.teachers, teacher] });

    // update localStorage
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }

  editTeacher = teacher => {
    console.log(teacher);
  }

  deleteTeacher = id => {
    // copy current list of items
    const teachers = [...this.state.teachers];
    // filter out the item being deleted
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
        </div>
      </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import uuid from 'uuid';

export class EditTeacher extends Component {
  constructor(props) {
    super(props);
    const oldTeacher = JSON.parse(localStorage.getItem("editedTeacher"));
    this.state = {
      id: oldTeacher.id,
      name: oldTeacher.name,
      surname: oldTeacher.surname,
      phone: oldTeacher.phone,
      discipline: oldTeacher.discipline,
      notes: oldTeacher.notes
    }
  }


  submittable = () => {
    if(!(this.state.phone.match(/\+380\d{9}$/) || this.state.phone === '')) {
      return true;
    }
    if(this.state.name.length < 2 || this.state.surname.length < 2) {
      return true;
    } else {
      return false;
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.props.updateTeacher(this.state);
    this.setState({
      id: uuid(),
      name: "",
      surname: "",
      phone: "",
      discipline: "",
      notes: ""
    });
    document.querySelector('#message').innerHTML = "<h4>Teacher has been edited. <a href='/' class='alert-link'>List</a></h4>";
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="container mt-3">
      <p id="message" className="alert-success"></p>
      <form onSubmit={this.OnSubmit}>
        <div className="form-group">
          <label htmlFor="name">
          Name: *</label>
            <input className="form-control"
                   type="text" name="name" id="name"
                   value={ this.state.name }
                   onChange={ this.onChange }
            />

        </div>
        <div className="form-group">
          <label htmlFor="surname">
          Surname: *</label>
          <input className="form-control"
                 type="text" name="surname"  id="surname"
                 value={ this.state.surname }
                 onChange={ this.onChange }
          />

        </div>
        <div className="form-group">
          <label htmlFor="discipline">
          Discipline:</label>
          <input className="form-control"
                 type="text" name="discipline" id="discipline"
                 value={ this.state.discipline }
                 onChange={ this.onChange }
          />

        </div>
        <div className="form-group">
          <label htmlFor="phone">
          Phone:</label>
          <input className="form-control"
                 type="text" name="phone" id="phone"
                 value={ this.state.phone }
                 onChange={ this.onChange }
                 placeholder="+380XXXXXXXXX"
          />

        </div>
        <div className="form-group">
          <label htmlFor="notes">
            Notes:</label>
          <textarea className="form-control" id="notes" name="notes"
                value={ this.state.notes }
                onChange={ this.onChange }
          />

        </div>
        <input className="btn btn-primary" type="submit"
                value="Edit Teacher" onClick={this.onSubmit}
                disabled={this.submittable()}
        />
      </form>
      </div>
    )
  }
}

export default EditTeacher

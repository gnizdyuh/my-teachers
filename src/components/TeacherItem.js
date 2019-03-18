import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TeacherItem extends Component {
  render() {
    return (
      <tr>
        <td>{ this.props.teacher.name }</td>
        <td>{ this.props.teacher.surname }</td>
        <td>{ this.props.teacher.discipline }</td>
        <td>{ this.props.teacher.phone }</td>
        <td>
          <button
            onClick={this.props.editTeacher.bind(this, this.props.teacher)}
            className="btn btn-info">e
          </button>
        </td>
        <td>
          <button
            onClick={this.props.deleteTeacher.bind(this, this.props.teacher.id)}
            className="btn btn-danger">x
          </button>
        </td>
      </tr>
    )
  }
}

TeacherItem.propTypes = {
  teacher: PropTypes.object.isRequired
}

export default TeacherItem

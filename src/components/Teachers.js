import React, { Component } from 'react';
import TeacherItem from './TeacherItem';
import PropTypes from 'prop-types';

class Teachers extends Component {
  render() {
    return this.props.teachers.map(teacher => (
       <TeacherItem
         key={teacher.id}
         teacher={teacher}
         checkTeacher={this.props.checkTeacher}
         deleteTeacher={this.props.deleteTeacher}
         editTeacher={this.props.editTeacher}
       />
    ));
  }
}

Teachers.propTypes = {
  teachers: PropTypes.array.isRequired
}

export default Teachers;

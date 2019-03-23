import React from 'react';
import { Link } from 'react-router-dom';

function MenuItems(props) {
  const cb = document.querySelectorAll(".checkbox_teacher");
  let checked_count = 0;
  cb.forEach(checkbox => checkbox.checked ? checked_count++ : "");

  let state = {
    checkedTeachers: props.checkedTeachers,
    teachers: props.teachers
  }

  const handleDelete = () => {
    props.deleteTeachers(state.checkedTeachers);
    state.checkedTeachers = [];
  }

  const handleEdit = () => {
    props.editTeachers(state.checkedTeachers);
    const needsToEdit = state.teachers.find(teacher => teacher.id === state.checkedTeachers[0]);
    localStorage.setItem("editedTeacher", JSON.stringify(needsToEdit));
    state.checkedTeachers = [];
  }

  if(checked_count === 1) {
    return (
      <div>
        <button className="btn btn-danger m-2" onClick={handleDelete}>Delete</button>
        <Link className="btn btn-info" onClick={handleEdit} to="/edit">Edit</Link>
      </div>
    )
  } else if(checked_count > 1){
    return (
        <div>
            <button className="btn btn-danger m-2" onClick={handleDelete}>Delete</button>
        </div>
    )
  } else {
    return <span></span>;
  }
}

export default MenuItems;
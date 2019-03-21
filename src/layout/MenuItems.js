import React from 'react';
//import { Link } from 'react-router-dom';

function MenuItems(props) {
  const handleDelete = () => {
    props.deleteTeachers(props.checkedTeachers);
  }

  /// TODO 
//   const handleEdit = () => {
//     console.log(props);
//     props.editTeacher(props.checkedTeachers);
//     props.checkedTeachers = [];
//     //localStorage.setItem("editedTeacher", JSON.stringify(props.checkedTeachers));
//   }

  if(props.checkedTeachers.length === 1) {
    return (
      <div>
        <button className="btn btn-danger m-2" onClick={handleDelete}>Delete</button>
        {/* <Link className="btn btn-info" onClick={handleEdit} to="/edit">Edit</Link> */}
      </div>
    )
  } else if(props.checkedTeachers.length > 1){
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
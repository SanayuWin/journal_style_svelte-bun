import React from "react";

function DeleteGraphic(props) {
  function submitHandler(event) {
    event.preventDefault();
    // could add validation here...
    props.onDeleteGraphic();
  }

  return (
    <form onSubmit={submitHandler}>
      <button>Delete Graphic</button>
    </form>
  );
}

export default DeleteGraphic;

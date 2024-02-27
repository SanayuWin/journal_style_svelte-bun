import React, { useRef } from "react";

// import classes from './AddMovie.module.css';

function AddGraphic(props) {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();
    const graph = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    props.onGraphic(graph);
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        {/* <label htmlFor='opening-text'>Opening Text</label> */}
        <input type="text" id="note" ref={openingTextRef}></input>
      </div>
      <button>Add Graphic</button>
    </form>
  );
}

export default AddGraphic;

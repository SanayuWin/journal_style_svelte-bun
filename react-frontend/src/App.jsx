import React, { useState, useEffect, useCallback } from "react";

import GraphicList from "./components/GraphicList";
import AddGraphic from "./components/AddGraphic";
import ShapeList from "./components/ShapeList";
import DeleteGraphic from "./components/DeleteGraphic";

function App() {
  const [graphic, setGraphic] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGraphicHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/v1/graphic");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          key: data[key].id,
          num: data[key].num,
          layer: data[key].layer,
          height: data[key].height,
          width: data[key].width,
          x_axis: data[key].x_axis,
          y_axis: data[key].y_axis,
          border_weight: data[key].border_weight,
          border_color: data[key].border_color,
          border_radius: data[key].border_radius,
          font_size: data[key].font_size,
          font_weight: data[key].font_weight,
          note: data[key].note,
          created_at: data[key].created_at,
        });
      }

      console.log(loadedMovies);

      setGraphic(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchGraphicHandler();
  }, [fetchGraphicHandler]);

  async function addGraphicHandler(movie) {
    const response = await fetch("http://localhost:8080/v1/graphic", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  async function deleteGraphicHandler() {
    const response = await fetch("http://localhost:8080/v1/delete-graphic", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
    console.log("delete success");
  }

  // console.log(graphic[0].border_color);
  let content = <p>Found Graphic.</p>;

  if (graphic.length > 0) {
    content = <GraphicList graphic={graphic} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  const fullRefresh = () => {
    deleteGraphicHandler();
    addGraphicHandler();
    fetchGraphicHandler();
  };

  return (
    <React.Fragment>
      <section style={{ zIndex: 100000 }}>
        <AddGraphic onAddMovie={addGraphicHandler} />
      </section>
      <section>
        <button onClick={fetchGraphicHandler}>Fetch Graphic</button>
      </section>
      <section>
        <DeleteGraphic onDeleteGraphic={deleteGraphicHandler} />
      </section>
      {/* <Shape graphic={graphic} /> */}
      <div>{content}</div>
      <ShapeList graphic={graphic} />
    </React.Fragment>
  );
}

export default App;

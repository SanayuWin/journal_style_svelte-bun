import React from "react";

import Graphic from "./Graphic";

const GraphicList = (props) => {
  return (
    <div
      style={{
        border_radius: props.border_radius,
        height: props.height,
        width: props.width,
        backgroundColor: "black",
      }}
    >
      {props.graphic.map((graph) => (
        <Graphic
          key={graph.id}
          num={graph.num}
          layer={graph.layer}
          height={graph.height}
          width={graph.width}
          x_axis={graph.x_axis}
          y_axis={graph.y_axis}
          border_weight={graph.border_weight}
          border_color={graph.border_color}
          border_radius={graph.border_radius}
          font_size={graph.font_size}
          font_weight={graph.font_weight}
          note={graph.note}
          created_at={graph.created_at}
        />
      ))}
    </div>
  );
};

export default GraphicList;

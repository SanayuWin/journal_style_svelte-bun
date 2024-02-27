import React from "react";
import ShapeBox from "./ShapeBox";

const ShapeList = (props) => {
  return (
    <div>
      {props.graphic.map((graph) => (
        <ShapeBox
          height={graph.height}
          width={graph.width}
          x_axis={graph.x_axis}
          y_axis={graph.y_axis}
          border_weight={graph.border_weight}
          border_color={`${graph.border_color[0]} ${graph.border_color[1]} ${graph.border_color[2]}`}
          border_radius={graph.border_radius}
          font_size={graph.font_size}
          font_weight={graph.font_weight}
          left={graph.x_axis}
          top={graph.y_axis}
        />
      ))}
    </div>
  );
};

export default ShapeList;

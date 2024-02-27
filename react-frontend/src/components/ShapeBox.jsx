const ShapeBox = (props) => {
  return (
    <div
      style={{
        display: "flex",
        borderStyle: "solid",
        height: `${props.height}px`,
        width: `${props.width}px`,
        transformOrigin: `${props.x_axis} ${props.y_axis}`,
        top: `${props.x_axis}%`,
        left: `${props.y_axis}%`,
        borderWidth: props.border_weight,
        borderColor: `rgb(${props.border_color})`,
        borderRadius: `${props.border_radius}%`,
        fontSize: `${props.font_size}px`,
        fontWeight: props.font_weight,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
      }}
    >
  
    </div>
  );
};

export default ShapeBox;

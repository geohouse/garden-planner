export default function ColorBlocks() {
  const colors = {
    Red: "#ff0033",
    Orange: "#ff6600",
    Yellow: "#ffcc00",
    Green: "#009966",
    Blue: "#3333ff",
    Purple: "#6633cc",
    White: "#ffffff",
    Pink: "#ff99cc",
    "Light blue": "#33ccff",
    Lavender: "#cc99ff",
    "Light orange": "#ff9966",
    "Light yellow": "#ffff99",
    None: "#ffffff",
  };

  return (
    <>
      <div id="color-block-holder">
        {Object.values(colors).map((color, index) => {
          const colorName = Object.keys(colors)[index];
          console.log(colorName);
          const colorStyle = { backgroundColor: { color } };
          console.log(colorStyle);
          return (
            <button
              key={index}
              className="color-block-button"
              style={colorStyle}
            >
              {colorName}
            </button>
          );
        })}
      </div>
      Testing color blocks
    </>
  );
}

import { useState, useEffect } from "react";

interface ColorBlocksProps {
  onBloomColorChange: (hexColor: string, colorName: string) => void;
}

export default function ColorBlocks(props: ColorBlocksProps) {
  const [currColor, setCurrentColor] = useState("");

  // Update the selected border every time the color selection is changed
  useEffect(() => {
    const allColorButtons = document.querySelectorAll(".color-block-button");
    allColorButtons.forEach((colorButton) => {
      if (colorButton.innerHTML === currColor) {
        colorButton.classList.toggle("selected-color");
      } else {
        // Calling remove on the classList is safe even if the 'selected-color'
        // class isn't in the classList.
        colorButton.classList.remove("selected-color");
      }
    });
  }, [currColor]);

  const { onBloomColorChange } = props;

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

  function handleColorChange(event: React.MouseEvent<HTMLButtonElement>) {
    //console.log("clicked");
    //console.log(event.currentTarget.innerHTML);
    //console.log(event.currentTarget.style.backgroundColor);
    // sets both the current color (hex) and the current color name
    onBloomColorChange(
      event.currentTarget.style.backgroundColor,
      event.currentTarget.innerHTML
    );
    setCurrentColor(event.currentTarget.innerHTML);
  }

  return (
    <>
      {Object.values(colors).map((color, index) => {
        const colorName = Object.keys(colors)[index];
        //console.log(colorName);
        // Only works when don't wrap color in {}
        const colorStyle = { backgroundColor: color };
        //console.log(colorStyle);
        let classList = "color-block-button";
        // Set colors to change the text color for better contrast
        // depending on the bloom color option.
        if (["Red", "Orange", "Green", "Blue", "Purple"].includes(colorName)) {
          classList += " light-text";
        } else {
          classList += " dark-text";
        }

        return (
          <>
            {/* <label id={`label-${colorName}`} for={colorName}>
                {colorName}
              </label> */}
            <button
              key={index}
              className={classList}
              style={colorStyle}
              onClick={handleColorChange}
              type="button"
              // id={colorName}
            >
              {colorName}
            </button>
          </>
        );
      })}
    </>
  );
}

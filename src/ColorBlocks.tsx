import { useEffect } from "react";

interface ColorBlocksProps {
  onBloomColorChange: (hexColor: string, colorName: string) => void;
  bloomColorName: string;
}

export default function ColorBlocks(props: ColorBlocksProps) {
  //const [currColor, setCurrentColor] = useState(props.bloomColor);

  // Update the selected border every time the color selection is changed
  // as kept track of the state from the GardenPlanner component.
  // the handleColorChange function on click removes any color selection,
  // then calls the onBloomColorChange function provided in props
  // to update the state in the GardenPlanner component, and that
  // then triggers this useEffect. This keeps the bloom color toggling
  // as before, but also allows the GardenPlanner component to directly
  // set the selected color (used to reset the color on submission
  // and to enable editing of an existing plant)
  useEffect(() => {
    // console.log("tests");
    // console.log(props.bloomColorName);
    const allColorButtons = document.querySelectorAll(".color-block-button");
    allColorButtons.forEach((colorButton) => {
      if (colorButton.innerHTML === props.bloomColorName) {
        // All selected color class labels are removed on click
        // in the handleColorChange function below, so this needs
        // to add it to the currently selected bloom color.
        // (Removes problem with using toggle requiring a double click to get selected)
        colorButton.classList.add("selected-color");
      }
    });
  }, [props.bloomColorName]);

  const { onBloomColorChange, bloomColorName } = props;

  // const allColorButtons = document.querySelectorAll(".color-block-button");
  // allColorButtons.forEach((colorButton) => {
  //   if (colorButton.innerHTML === bloomColor) {
  //     colorButton.classList.toggle("selected-color");
  //   } else {
  //     // Calling remove on the classList is safe even if the 'selected-color'
  //     // class isn't in the classList.
  //     colorButton.classList.remove("selected-color");
  //   }
  // });

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
    const allColorButtons = document.querySelectorAll(".color-block-button");
    allColorButtons.forEach((colorButton) => {
      // Calling remove on the classList is safe even if the 'selected-color'
      // class isn't in the classList.
      colorButton.classList.remove("selected-color");
    });

    //event.currentTarget.classList.toggle("selected-color");

    //setCurrentColor(event.currentTarget.innerHTML);
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
        if (colorName === bloomColorName) {
          classList += " selected-color";
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

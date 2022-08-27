import { useState, useEffect } from "react";
export default function BloomDateSelect(props) {
  const [selectedMonths, setSelectedMonths] = useState();

  const { onBloomTimeChange } = props;
  const months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  function handleAllMonthSelect(event) {
    console.log("all month click");
    const monthButtonList = document.querySelectorAll(".bloom-month");
    monthButtonList.forEach((monthButton) => {
      monthButton.classList.add("selected-month");
    });
    onBloomTimeChange(months);
  }

  function handleNoMonthSelect(event) {
    console.log("no month click");
    const monthButtonList = document.querySelectorAll(".bloom-month");
    monthButtonList.forEach((monthButton) => {
      monthButton.classList.remove("selected-month");
    });
  }

  function handleMonthToggle(event) {
    console.log("month toggle");
    console.log(event.currentTarget);
    event.currentTarget.classList.toggle("selected-month");
  }

  function handleMonthMouseOver(event) {
    console.log(event.currentTarget.innerText);
    // Use event.buttons to get the mouse button(s) if any,
    // that were pressed at the time of the mouseover event.
    // I want to listen to the left button being clicked through
    // the mouseover to allow 'painting' over the buttons, and the
    // left button's value is 1.
    console.log("The mouse buttons pressed are:");
    console.log(event.buttons);
    // treat mouseover with left button click the same as a full
    // click directly on the button, and run the toggle handler
    if (event.buttons === 1) {
      handleMonthToggle(event);
    }
  }

  return (
    <>
      <button id="select-all-months" onClick={handleAllMonthSelect}>
        Select all months
      </button>
      {Object.values(months).map((monthName, index) => {
        const monthNum = Object.keys(months)[index];
        console.log(monthName);
        return (
          <button
            type="button"
            key={monthNum}
            className="bloom-month"
            onMouseOver={handleMonthMouseOver}
            onMouseDown={handleMonthToggle}
          >
            {monthName}
          </button>
        );
      })}
      <button id="select-no-months" onClick={handleNoMonthSelect}>
        Select no months
      </button>
    </>
  );
}

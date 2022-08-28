import { useState, useEffect } from "react";
export default function BloomDateSelect(props) {
  const [selectedMonths, setSelectedMonths] = useState({});
  const [disableAllSelection, setDisableAllSelection] = useState(false);
  // Disable by default because when page loaded, no buttons are selected.
  const [disableNoneSelection, setDisableNoneSelection] = useState(true);
  useEffect(() => {
    console.log("The new selected months are:");
    console.log(selectedMonths);
  }, [selectedMonths]);

  useEffect(() => {
    console.log("in disable effect");
    const allMonthsButton = document.querySelector("#select-all-months");
    const noMonthsButton = document.querySelector("#select-no-months");

    if (disableAllSelection) {
      allMonthsButton.setAttribute("disabled", "");
    } else {
      allMonthsButton.removeAttribute("disabled");
    }

    if (disableNoneSelection) {
      noMonthsButton.setAttribute("disabled", "");
    } else {
      noMonthsButton.removeAttribute("disabled");
    }
  }, [disableAllSelection, disableNoneSelection]);

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
    // Use the months object directly to set the state because
    // all months have been selected.
    onBloomTimeChange(months);
    setSelectedMonths(months);
    setDisableAllSelection(true);
    setDisableNoneSelection(false);
  }

  function handleNoMonthSelect(event) {
    console.log("no month click");
    const monthButtonList = document.querySelectorAll(".bloom-month");
    monthButtonList.forEach((monthButton) => {
      monthButton.classList.remove("selected-month");
    });
    // Use empty object to set the state because none of the months
    // are selected
    onBloomTimeChange({});
    setSelectedMonths({});
    setDisableNoneSelection(true);
    setDisableAllSelection(false);
  }

  function updateCurrentlySelectedMonthsObj() {
    const monthButtonList = document.querySelectorAll(".bloom-month");
    monthButtonList.forEach((monthButton) => {
      //This is a DOMTokenList, and uses the .contains() method
      // (doesn't have an .includes() method)
      let monthNum = 0;
      const monthName = monthButton.innerText;
      // Look up the monthNum (key) by looping through the monthNames (value)
      for (const keyValueArray of Object.entries(months)) {
        if (keyValueArray[1] === monthName) {
          monthNum = keyValueArray[0];
        }
      }
      // ADD any newly selected months if this button is selected
      // and is not already in the list
      if (
        monthButton.classList.contains("selected-month") &&
        !Object.keys(selectedMonths).includes(monthNum)
      ) {
        const newSelectedMonths = { ...selectedMonths };
        newSelectedMonths[monthNum] = monthName;
        setSelectedMonths(newSelectedMonths);
        onBloomTimeChange(newSelectedMonths);
        // Activate the all/none selectors depending on
        // how many months are selected
        if (Object.keys(newSelectedMonths).length >= 1) {
          setDisableNoneSelection(false);
        }
        if (
          Object.keys(newSelectedMonths).length < Object.keys(months).length
        ) {
          setDisableAllSelection(false);
        } else {
          // All the buttons are clicked now, so disable the all selection button
          setDisableAllSelection(true);
        }
      }
      // REMOVE any months from the list that aren't selected any longer.
      if (
        Object.keys(selectedMonths).includes(monthNum) &&
        !monthButton.classList.contains("selected-month")
      ) {
        // deconstruct the selectedMonths obj using the dynamic value of monthNum
        // to extract the part to remove (need to do : assignment for dynamic destructuring to work)
        const { [monthNum]: toRemove, ...rest } = selectedMonths;
        setSelectedMonths({ ...rest });
        onBloomTimeChange({ ...rest });

        if (Object.keys(rest).length >= 1) {
          setDisableAllSelection(false);
        } else {
          setDisableNoneSelection(true);
        }
      }
    });
  }

  function handleMonthToggle(event) {
    console.log("month toggle");
    console.log(event.currentTarget);
    event.currentTarget.classList.toggle("selected-month");
    updateCurrentlySelectedMonthsObj();
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
      <button
        id="select-all-months"
        type="button"
        onClick={handleAllMonthSelect}
      >
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
      <button id="select-no-months" type="button" onClick={handleNoMonthSelect}>
        Select no months
      </button>
    </>
  );
}

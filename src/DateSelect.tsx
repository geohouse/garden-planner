import { useState, useEffect } from "react";
import { DateSelectionObj } from "./GardenPlannerInterfaces";
// This accommodates the keys being 1-12 (or any number) without any hardcoding.
// Could make more specific to only allow 1-12 and that would also be OK.
// interface DateSelectionObj {
//   [key: number]: string;
// }

interface DateSelectProps {
  onDateSelectChange: (selectedMonthObj: DateSelectionObj) => void;
  eventTypeForDate: string;
}

export default function DateSelect(props: DateSelectProps) {
  const [selectedMonths, setSelectedMonths] = useState({});
  const [disableAllSelection, setDisableAllSelection] = useState(false);
  // Disable by default because when page loaded, no buttons are selected.
  const [disableNoneSelection, setDisableNoneSelection] = useState(true);
  const { onDateSelectChange, eventTypeForDate } = props;
  useEffect(() => {
    console.log("The new selected months are:");
    console.log(selectedMonths);
  }, [selectedMonths]);

  useEffect(() => {
    console.log("in disable effect");
    const allMonthsButton = document.querySelector(
      `#${eventTypeForDate}-select-all-months`
    );
    const noMonthsButton = document.querySelector(
      `#${eventTypeForDate}-select-no-months`
    );

    if (disableAllSelection) {
      if (allMonthsButton) {
        // Any string after the 'disabled' attribute will set it to 'true', even the empty string
        allMonthsButton.setAttribute("disabled", "");
      } else {
        console.error(
          `Cannot locate the button with id: ${eventTypeForDate}-select-all-months`
        );
      }
    } else {
      if (allMonthsButton) {
        allMonthsButton.removeAttribute("disabled");
      } else {
        console.error(
          `Cannot locate the button with id: ${eventTypeForDate}-select-all-months`
        );
      }
    }

    if (disableNoneSelection) {
      if (noMonthsButton) {
        noMonthsButton.setAttribute("disabled", "");
      } else {
        console.error(
          `Cannot locate the button with id: ${eventTypeForDate}-select-no-months`
        );
      }
    } else {
      if (noMonthsButton) {
        noMonthsButton.removeAttribute("disabled");
      } else {
        console.error(
          `Cannot locate the button with id: ${eventTypeForDate}-select-no-months`
        );
      }
    }
  }, [disableAllSelection, disableNoneSelection, eventTypeForDate]);

  const months: { [key: number]: string } = {
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

  function handleAllMonthSelect() {
    console.log("all month click");
    const monthButtonList = document.querySelectorAll(
      `.${eventTypeForDate}-month`
    );
    monthButtonList.forEach((monthButton) => {
      monthButton.classList.add("selected-month");
    });
    // Use the months object directly to set the state because
    // all months have been selected.
    onDateSelectChange(months);
    setSelectedMonths(months);
    setDisableAllSelection(true);
    setDisableNoneSelection(false);
  }

  function handleNoMonthSelect() {
    console.log("no month click");
    const monthButtonList = document.querySelectorAll(
      `.${eventTypeForDate}-month`
    );
    monthButtonList.forEach((monthButton) => {
      monthButton.classList.remove("selected-month");
    });
    // Use empty object to set the state because none of the months
    // are selected
    onDateSelectChange({});
    setSelectedMonths({});
    setDisableNoneSelection(true);
    setDisableAllSelection(false);
  }

  function updateCurrentlySelectedMonthsObj() {
    // Need to cast this as a NodeList of HTML Elements instead of the default
    // NodeList of Elements in order for the monthName to be able to be extracted from each
    // button using the .innerText property.
    const monthButtonList = document.querySelectorAll(
      `.${eventTypeForDate}-month`
    ) as NodeListOf<HTMLButtonElement>;
    monthButtonList.forEach((monthButton) => {
      //This is a DOMTokenList, and uses the .contains() method
      // (doesn't have an .includes() method)
      let monthNum = 0;
      const monthName = monthButton.innerText;
      // Look up the monthNum (key) by looping through the monthNames (value)
      for (const keyValueArray of Object.entries(months)) {
        if (keyValueArray[1] === monthName) {
          // When using Object.entries, the key (pos [0] of each array of the arrays)
          // is a string, even if the actual key value in the object is a number,
          // so need to convert to numeric here.
          monthNum = parseInt(keyValueArray[0], 10);
        }
      }
      // ADD any newly selected months if this button is selected
      // and is not already in the list
      if (
        monthButton.classList.contains("selected-month") &&
        !Object.keys(selectedMonths).includes(monthNum.toString())
      ) {
        //Need to re-establish the key/value types
        const newSelectedMonths: { [key: number]: string } = {
          ...selectedMonths,
        };
        newSelectedMonths[monthNum] = monthName;
        setSelectedMonths(newSelectedMonths);
        onDateSelectChange(newSelectedMonths);
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
        Object.keys(selectedMonths).includes(monthNum.toString()) &&
        !monthButton.classList.contains("selected-month")
      ) {
        // deconstruct the selectedMonths obj using the dynamic value of monthNum
        // to extract the part to remove (need to do : assignment for dynamic destructuring to work)
        // Need to re-establish the key:value types
        const { [monthNum]: toRemove, ...rest }: { [key: number]: string } =
          selectedMonths;
        setSelectedMonths({ ...rest });
        onDateSelectChange({ ...rest });

        if (Object.keys(rest).length >= 1) {
          setDisableAllSelection(false);
        } else {
          setDisableNoneSelection(true);
        }
      }
    });
  }

  function handleMonthToggle(event: React.MouseEvent<Element, MouseEvent>) {
    console.log("month toggle");
    console.log(event.currentTarget);
    event.currentTarget.classList.toggle("selected-month");
    updateCurrentlySelectedMonthsObj();
  }

  function handleMonthMouseOver(event: React.MouseEvent<Element, MouseEvent>) {
    //console.log(event.currentTarget.innerText);
    // Use event.buttons to get the mouse button(s) if any,
    // that were pressed at the time of the mouseover event.
    // I want to listen to the left button being clicked through
    // the mouseover to allow 'painting' over the buttons, and the
    // left button's value is 1.
    //console.log("The mouse buttons pressed are:");
    //console.log(event.buttons);
    // treat mouseover with left button click the same as a full
    // click directly on the button, and run the toggle handler
    if (event.buttons === 1) {
      handleMonthToggle(event);
    }
  }

  return (
    <>
      <button
        key={13}
        id={`${eventTypeForDate}-select-all-months`}
        type="button"
        onClick={handleAllMonthSelect}
      >
        Select all months
      </button>
      {Object.values(months).map((monthName, index) => {
        const monthNum = Object.keys(months)[index];
        //console.log(monthName);
        return (
          <button
            type="button"
            key={monthNum}
            className={`${eventTypeForDate}-month`}
            onMouseOver={handleMonthMouseOver}
            onMouseDown={handleMonthToggle}
          >
            {monthName}
          </button>
        );
      })}
      <button
        key={14}
        id={`${eventTypeForDate}-select-no-months`}
        type="button"
        onClick={handleNoMonthSelect}
      >
        Select no months
      </button>
    </>
  );
}

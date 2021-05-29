import DayPicker, { DateUtils } from "react-day-picker";
import React, { useEffect } from "react";
import "react-day-picker/lib/style.css";
import "./styles.css";
import { WEEKDAYS_SHORT, MONTHS, EVENTS } from "./types";

function App() {
  const [state, setState] = React.useState(getInitialState());

  /*
  function getPosts() {
    console.log('getPosts');
    var searchParams = new URLSearchParams();
    searchParams.append("from", state.range.from);
    searchParams.append("to", state.range.to);

    fetch("http://dm2grig.mart-shop.ru/test/calendar/api.php?" + searchParams)
      .then((response) => response.json())
      .then((data) => console.log("fetch data: ", data));
  }
*/
  useEffect(() => {
    //console.log("did mount", state);
    var searchParams = new URLSearchParams();
    searchParams.append("from", state.range.from);
    searchParams.append("to", state.range.to);

    fetch("https://dm2grig.mart-shop.ru/test/calendar/api.php?" + searchParams)
      .then((response) => response.json())
      .then((data) => console.log("fetch data: ", data));
  }, [state]);

  const eDay = {
    highlighted: [new Date(2021, 5, 26), new Date(2021, 5, 24)],
    highlighted2: [new Date(2021, 5, 21), new Date(2021, 5, 23)]
  };

  function getInitialState() {
    return {
      range: { from: null, to: null },
      enteredTo: null,
      events: EVENTS
    };
  }
  function isSelectingFirstDay(from, to, day) {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    console.log("isBeforeFirstDay:", isBeforeFirstDay);
    console.log("from:", from);
    return !from || isBeforeFirstDay || isRangeSelected;
  }

  function handleDayClick(day) {
    const { from, to } = state.range;
    if (from && to && day >= from && day <= to) {
      handleResetClick();
      return;
    }
    if (isSelectingFirstDay(from, to, day)) {
      // first click
      setState((prevState) => ({
        ...prevState,
        range: {
          ...prevState.range,
          from: day
        },
        enteredTo: day
      }));
    } else {
      console.log("second click"); // second click
      setState((prevState) => ({
        ...prevState,
        range: {
          ...prevState.range,
          to: day
        },
        enteredTo: day
      }));
    }
  }

  function handleDayMouseEnter(day) {
    const { from, to } = state.range;
    if (!isSelectingFirstDay(from, to, day)) {
      setState((prevState) => ({
        ...prevState,
        enteredTo: day
      }));
    }
  }

  function handleResetClick() {
    setState(getInitialState());
  }

  const { range, enteredTo } = state;
  //const modifiers = { start: range.from, end: enteredTo };
  const disabledDays = { before: state.range.from };
  const selectedDays = [range.from, { from: range.from, to: range.to }]; //o: enteredTo }];
  return (
    <div>
      <h1>Calender</h1>
      <DayPicker
        className="Range"
        numberOfMonths={2}
        fromMonth={range.from}
        selectedDays={selectedDays}
        disabledDays={disabledDays}
        modifiers={({ start: range.from, end: enteredTo }, eDay)}
        onDayClick={handleDayClick}
        onDayMouseEnter={handleDayMouseEnter}
        months={MONTHS}
        weekdaysShort={WEEKDAYS_SHORT}
      />
      <div>
        {!range.from && !range.to && "Please select the first day."}
        {range.from && !range.to && "Please select the last day."}
        {range.from &&
          range.to &&
          `Selected from ${range.from.toLocaleDateString()} to
                ${range.to.toLocaleDateString()}`}{" "}
        {range.from && range.to && (
          <button className="link" onClick={handleResetClick}>
            Reset
          </button>
        )}
      </div>
      <p>
        from: {state.range.from == null ? "null" : state.range.from.toString()}
      </p>
      <p>to: {state.range.to == null ? "null" : state.range.to.toString()}</p>
      <p>
        enteredTo:{" "}
        {state.enteredTo == null ? "null" : state.enteredTo.toString()}
      </p>
    </div>
  );
}

export default App;

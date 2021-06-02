import DayPicker, { DateUtils } from "react-day-picker";
import React, { useEffect } from "react";
import "react-day-picker/lib/style.css";
import "./styles.css";
import { WEEKDAYS_SHORT, MONTHS } from "./types";

function App() {
  const [state, setState] = React.useState(getInitialState());

  function getPosts() {
    var searchParams = new URLSearchParams();
    searchParams.append("from", state.range.from);
    searchParams.append("to", state.range.to);
    console.log(searchParams);
    fetch(
      "https://russoft.org/wp-content/plugins/react-calendar/api.php?action=get_events&" +
        searchParams
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("fetch data: ", data);
        let events = { highlighted: [] };
        for (let key in data) {
          events.highlighted.push(new Date(data[key].date));
        }

        setState((prevState) => ({
          ...prevState,
          events: events
        }));
      });
  }

  useEffect(() => {
    //console.log("did mount", state);
    getPosts();
  }, []);

  function getInitialState() {
    return {
      range: { from: null, to: null },
      enteredTo: null,
      events: { highlighted: [] }
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
    setState((prevState) => ({
      ...prevState,
      range: { from: null, to: null }
    }));
  }

  const { range, enteredTo } = state;
  //const modifiers = { start: range.from, end: enteredTo };
  const disabledDays = { before: state.range.from };
  const selectedDays = [range.from, { from: range.from, to: enteredTo }]; //o: enteredTo }];

  return (
    <div>
      <h3>Calendar 0.3</h3>
      <DayPicker
        className="Range"
        numberOfMonths={2}
        fromMonth={range.from}
        selectedDays={selectedDays}
        disabledDays={disabledDays}
        modifiers={({ start: range.from, end: enteredTo }, state.events)}
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
      <p>Список мероприятий</p>
      <ul>
        {state.events.highlighted.map((ev, key) => {
          if (
            (ev > state.range.from && ev < state.range.to) ||
            state.range.from == null
          )
            return <li key={key}>{ev.toLocaleString("ru")}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;

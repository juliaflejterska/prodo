import React, { useState, useEffect, useRef } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import DateTimePicker from "react-datetime-picker";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { motion } from "framer-motion";

import classes from "./Calendar.module.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};

const CalendarComp = () => {
  const forceUpdate = useForceUpdate();

  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    id: "",
  });
  const [events, setEvents] = useState([]);

  const [titleIsEmpty, setTitleIsEmpty] = useState(true);
  const [startIsDate, setStartIsDate] = useState(false);
  const [endIsDate, setEndIsDate] = useState(false);

  const [showAdd, setShowAdd] = useState(false);

  const showAddHandler = () => {
    setShowAdd(true);
  };

  let fetchedEvents;
  fetchedEvents = JSON.parse(localStorage.getItem("events"));
  fetchedEvents.forEach((event) => {
    for (let key in event) {
      if (key === "start" || key === "end") {
        event[key] = new Date(event[key]);
      }
    }
  });

  const setTitle = (e) => {
    if (e.target.value !== "" || e.target.value.length !== 0) {
      setTitleIsEmpty(false);
    }
    setNewEvent({ ...newEvent, title: e.target.value });
  };

  const setStartDate = (start) => {
    if (start instanceof Date) {
      setStartIsDate(true);
    }
    setNewEvent({ ...newEvent, start });
  };

  const setEndDate = (end) => {
    if (end instanceof Date) {
      setEndIsDate(true);
    }
    setNewEvent({ ...newEvent, end });
  };

  const addEventHandler = () => {
    newEvent.id = Math.round(Math.random() * 1000000);

    if (newEvent.title === "" || newEvent.title.length === 0) {
      alert("Name cannot be empty. Please enter a valid name.");
      return;
    }

    if (!newEvent.start || !newEvent.end) {
      alert("Dates cannot be empty. Please enter valid dates.");
      return;
    }

    if (newEvent.start.getTime() > newEvent.end.getTime()) {
      alert("The start date must be before the end date.");
      return;
    }

    if (!titleIsEmpty && startIsDate && endIsDate) {
      setEvents([newEvent, ...events]);
      localStorage.setItem(
        "events",
        JSON.stringify([newEvent, ...fetchedEvents])
      );
    }

    setNewEvent({
      title: "",
      start: "",
      end: "",
      id: "",
    });
  };

  const handleSelect = ({ start, end }) => {
    const title = window.prompt(`Please, enter the event's name to save it.`);
    if (title) {
      setEvents([
        {
          start,
          end,
          title,
          id: Math.round(Math.random() * 1000000),
        },
        ...events,
      ]);
      localStorage.setItem(
        "events",
        JSON.stringify([
          {
            title,
            start,
            end,
            id: Math.round(Math.random() * 1000000),
          },
          ...fetchedEvents,
        ])
      );
    }
    fetchedEvents = JSON.parse(localStorage.getItem("events"));
    forceUpdate();
  };

  const onSelectEvent = (event) => {
    const confirm = window.confirm("Would you like to remove this event?");
    if (confirm) {
      const newEvents = [...fetchedEvents];
      const deletedEvent = newEvents.indexOf(event);
      newEvents.splice(deletedEvent, 1);
      console.log(newEvents);

      localStorage.setItem("events", JSON.stringify([...newEvents]));
      forceUpdate();
      return { newEvents };
    }
  };

  return (
    <section>
      <div className={classes.empty}></div>
      <div>
        <div className={classes.main}>
          <div className={classes.container}>
            <img
              className={classes.img}
              src="https://images.unsplash.com/photo-1641386337567-c824f91bea87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=862&q=80"
              alt="calendar"
            ></img>
            {!showAdd && (
              <div className={classes.text}>
                <motion.h1
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 25,
                    duration: 1,
                  }}
                >
                  CALENDAR
                </motion.h1>
                <button className={classes.btn} onClick={showAddHandler}>
                  <span className={classes.span}>CREATE AN EVENT</span>
                </button>
              </div>
            )}
          </div>

          {showAdd && (
            <div className={classes.inputs}>
              <h2 className={classes.title}>NEW EVENT</h2>
              <h3>name</h3>
              <div>
                <input
                  className={classes.input}
                  type="text"
                  placeholder="enter text"
                  value={newEvent.title}
                  onChange={setTitle}
                />
              </div>
              <h3>start date</h3>
              <DateTimePicker
                className={classes.input}
                placeholderText="start date"
                yearPlaceholder="yyyy"
                monthPlaceholder="mm"
                dayPlaceholder="dd"
                hourPlaceholder="hh"
                minutePlaceholder="mm"
                style={{ marginRight: "10px" }}
                value={newEvent.start}
                onChange={setStartDate}
              />
              <h3>end date</h3>
              <DateTimePicker
                className={classes.input}
                style={{ width: "500px" }}
                placeholderText="end date"
                yearPlaceholder="yyyy"
                monthPlaceholder="mm"
                dayPlaceholder="dd"
                hourPlaceholder="hh"
                minutePlaceholder="mm"
                value={newEvent.end}
                onChange={setEndDate}
              />
              <br />
              <button className={classes.btn} onClick={addEventHandler}>
                <span className={classes.span}>ADD</span>
              </button>
            </div>
          )}
        </div>

        <div className={classes.cal}>
          <div className={classes.info}>
            <h4>
              To create an event, click the button above or click the space on
              the calendar and drag your mouse down to select the time.
            </h4>
          </div>
          <Calendar
            selectable
            localizer={localizer}
            events={fetchedEvents}
            defaultView={Views.WEEK}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: "50px" }}
            onSelectEvent={onSelectEvent}
            onSelectSlot={handleSelect}
          />
        </div>
      </div>
    </section>
  );
};

export default CalendarComp;

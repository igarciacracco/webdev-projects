import React from "react";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Task from "./components/Task.jsx";
import "./App.css";

const weekDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];

function App() {
    const [week, setWeek] = useState([[], [], [], [], [], [], []]);

    const [startTime, setStartTime] = useState(0);
    const [finishTime, setFinishTime] = useState(0);
    const [taskName, setTaskName] = useState("unknown");
    const [taskColor, setTaskColor] = useState("White");

    const [weekDay, setWeekday] = useState(0);
    const [popup, setPopup] = useState([0, "hidden"]);

    useEffect(() => {}, week);

    const date = new Date();
    var currentTime = date.getHours() + ":" + date.getMinutes();

    if (date.getMinutes() < 10) {
        currentTime = date.getHours() + ":0" + date.getMinutes();
    }

    return (
        <>
            <div
                class="popUpCard"
                style={{ opacity: popup[0], visibility: popup[1] }}
            >
                <a class="boldText">
                    <a class="lightText">Create a new task for</a>{" "}
                    <a class="boldText">{weekDays[weekDay]}</a>
                </a>
                <form>
                    <label class="formField">
                        Task Name:
                        <input
                            type="text"
                            onChange={() => {
                                // might be buggy, may be delaying changes because of virtual DOM stuff
                                setTaskName(event.target.value);
                            }}
                        />
                    </label>
                    <label class="formField">
                        Start Time:
                        <input
                            type="number"
                            onChange={() => {
                                // might be buggy, may be delaying changes because of virtual DOM stuff
                                setStartTime(Math.abs(event.target.value));
                            }}
                        />
                    </label>
                    <label class="formField">
                        Finish Time:
                        <input
                            type="number"
                            onChange={() => {
                                // might be buggy, may be delaying changes because of virtual DOM stuff
                                setFinishTime(Math.abs(event.target.value));
                            }}
                        />
                    </label>
                    <label class="formField">
                        Card Color:
                        <select
                            onChange={() => {
                                // might be buggy, may be delaying changes because of virtual DOM stuff
                                setTaskColor(event.target.value);
                            }}
                        >
                            <option value="White">White</option>
                            <option value="Blue">Blue</option>
                            <option value="Cyan">Cyan</option>
                            <option value="Purple">Purple</option>
                            <option value="Pink">Pink</option>
                            <option value="Orange">Orange</option>
                            <option value="Yellow">Yellow</option>
                            <option value="Green">Green</option>
                        </select>
                    </label>
                    <button
                        style={{ backgroundColor: "red" }}
                        onClick={(event) => {
                            event.preventDefault();
                            setPopup([0, "hidden"]);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        style={{
                            backgroundColor: "green",
                            marginTop: "30px",
                            marginLeft: "50px",
                        }}
                        onClick={() => {
                            event.preventDefault();
                            //handleNewTask();
                            setWeek(() => {
                                let arr = week;
                                arr[weekDay].push(
                                    <Task
                                        text={taskName}
                                        color={taskColor}
                                        start={startTime}
                                        end={finishTime}
                                    />
                                );
                                return arr;
                            });
                            setPopup([0, "hidden"]);
                        }}
                    >
                        Create Task
                    </button>
                </form>
            </div>
            <div style={{ display: "flex", width: "1880px", height: "940px" }}>
                <div
                    style={{
                        background: "#000000",
                        width: "12%",
                        height: "100%",
                    }}
                >
                    <div class="weekDayName" style={{ marginBottom: "80px" }}>
                        {currentTime}
                    </div>
                    <div class="weekDayName">mon</div>
                    <div class="weekDayName">tue</div>
                    <div class="weekDayName">wed</div>
                    <div class="weekDayName">thu</div>
                    <div class="weekDayName">fri</div>
                    <div class="weekDayName">sat</div>
                    <div class="weekDayName">sun</div>
                </div>

                <div
                    style={{
                        background: "#1b1b1b",
                        width: "88%",
                        height: "100%",
                    }}
                >
                    <header>Plannr.</header>
                    <div style={{ display: "flex" }}>
                        <div
                            style={{
                                width: "1512px",
                                marginLeft: "20px",
                            }}
                        >
                            <div class="hourContainer">00</div>
                            <div class="hourContainer">01</div>
                            <div class="hourContainer">02</div>
                            <div class="hourContainer">03</div>
                            <div class="hourContainer">04</div>
                            <div class="hourContainer">05</div>
                            <div class="hourContainer">06</div>
                            <div class="hourContainer">07</div>
                            <div class="hourContainer">08</div>
                            <div class="hourContainer">09</div>
                            <div class="hourContainer">10</div>
                            <div class="hourContainer">11</div>
                            <div class="hourContainer">12</div>
                            <div class="hourContainer">13</div>
                            <div class="hourContainer">14</div>
                            <div class="hourContainer">15</div>
                            <div class="hourContainer">16</div>
                            <div class="hourContainer">17</div>
                            <div class="hourContainer">18</div>
                            <div class="hourContainer">19</div>
                            <div class="hourContainer">20</div>
                            <div class="hourContainer">21</div>
                            <div class="hourContainer">22</div>
                            <div class="hourContainer">23</div>

                            <div class="weekDayContainer">{week[0]}</div>
                            <div class="weekDayContainer">{week[1]}</div>
                            <div class="weekDayContainer">{week[2]}</div>
                            <div class="weekDayContainer">{week[3]}</div>
                            <div class="weekDayContainer">{week[4]}</div>
                            <div class="weekDayContainer">{week[5]}</div>
                            <div class="weekDayContainer">{week[6]}</div>
                        </div>
                        <div style={{ marginTop: "85px", marginLeft: "15px" }}>
                            <button
                                class="newTaskButton"
                                onClick={() => {
                                    setWeekday(0);
                                    setPopup([1, "visible"]);
                                }}
                            >
                                +
                            </button>
                            <button
                                class="newTaskButton"
                                onClick={() => {
                                    setWeekday(1);
                                    setPopup([1, "visible"]);
                                }}
                            >
                                +
                            </button>
                            <button
                                class="newTaskButton"
                                onClick={() => {
                                    setWeekday(2);
                                    setPopup([1, "visible"]);
                                }}
                            >
                                +
                            </button>
                            <button
                                class="newTaskButton"
                                onClick={() => {
                                    setWeekday(3);
                                    setPopup([1, "visible"]);
                                }}
                            >
                                +
                            </button>
                            <button
                                class="newTaskButton"
                                onClick={() => {
                                    setWeekday(4);
                                    setPopup([1, "visible"]);
                                }}
                            >
                                +
                            </button>
                            <button
                                class="newTaskButton"
                                onClick={() => {
                                    setWeekday(5);
                                    setPopup([1, "visible"]);
                                }}
                            >
                                +
                            </button>
                            <button
                                class="newTaskButton"
                                onClick={() => {
                                    setWeekday(6);
                                    setPopup([1, "visible"]);
                                }}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;

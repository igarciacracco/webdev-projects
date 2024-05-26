import React, { useState } from "react";
//import useState from "react";
import "../App.css";

function Task(props) {
    const [vis, setVis] = useState("visible");

    return (
        <div
            class="taskContainer"
            style={{
                visibility: vis,
                position: "absolute",
                height: "90px",
                marginLeft: props.start * 63,
                width: 63 * (parseInt(props.end) + 1 - parseInt(props.start)),
                backgroundColor: props.color,
                color: "black",
            }}
        >
            <div class="taskText">{props.text}</div>
            <button
                onClick={() => {
                    setVis("hidden");
                    console.log("test");
                }}
            >
                delete
            </button>
        </div>
    );
}

export default Task;

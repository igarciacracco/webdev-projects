import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import waiting from "./assets/waiting.png";
import sunny from "./assets/sunny.png";
import cloudy from "./assets/cloudy.png";
import partlyCloudy from "./assets/partlyCloudy.png";
import rainy from "./assets/rainy.png";
import stormy from "./assets/stormy.png";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import countries from "./data/countries.json";

function App() {
    const key_api = "db3a643693334b4f940211840231107";
    const [data, setData] = useState(null);
    function fetchDataJson(location) {
        // MAKING THE FETCH CALL AND SAVING DATA
        setData(null);
        // "http://api.weatherapi.com/v1/forecast.json?key=" + key_api + "&q=" + location + "&days=14&aqi=no&alerts=no"
        fetch(
            "http://api.weatherapi.com/v1/forecast.json?key=" +
                key_api +
                "&q=" +
                location +
                "&days=14&aqi=no&alerts=no"
        )
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                //console.log(data);
            })
            .catch((error) => {
                console.error(error);
                setData(null);
            });
        //console.log(data);
        return data;
    }

    useEffect(() => {
        updateData(data);
    }, data);

    const [weekDay, setweekDay] = useState(0);
    const [currentTimeHour, setcurrentTimeHour] = useState(0);
    const [currentTime, setcurrentTime] = useState("--:--");
    const [formattedDate, setformattedDate] = useState("");
    const [phrase, setPhrase] = useState("have a nice day.");
    const [currentLocation, setcurrentLocation] = useState("4cast");
    const [currentTemp, setcurrentTemp] = useState("...");
    const [currentWeather, setcurrentWeather] = useState("");
    const [todayTemps, settodayTemps] = useState(["", "", "", "", "", "", ""]);
    const [weeklyTemps, setweeklyTemps] = useState([
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ]);
    const [weeklyWeather, setweeklyWeather] = useState([
        "waiting",
        "waiting",
        "waiting",
        "waiting",
        "waiting",
        "waiting",
        "waiting",
    ]);
    const [hourlyTemp, sethourlyTemp] = useState(["", "", "", "", "", "", ""]);
    const [hourlyWeather, sethourlyWeather] = useState([
        "waiting",
        "waiting",
        "waiting",
        "waiting",
        "waiting",
        "waiting",
        "waiting",
    ]);

    const months = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
    ];
    const weekdays = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];

    // Getting and formatting the current date.
    useEffect(() => {
        var today = new Date();
        setweekDay(today.getDay());
        var dayNumber = today.getDate();
        var month = today.getMonth();
        console.log(dayNumber);
        switch (dayNumber) {
            case 1:
            case 21:
            case 31:
                setformattedDate(months[month] + " " + dayNumber + "st.");
                break;
            case 2:
            case 22:
                setformattedDate(months[month] + " " + dayNumber + "nd.");
                break;
            case 3:
            case 23:
                setformattedDate(months[month] + " " + dayNumber + "rd.");
                break;
            default:
                setformattedDate(months[month] + " " + dayNumber + "th.");
        }
    }, []);

    function updateData(jsonData) {
        // WRITING THE DATA TO THE PAGE
        let hourNow = 0;

        if (jsonData != null) {
            console.log(jsonData);

            // Set current location text
            setcurrentLocation(
                jsonData.location.name + ", " + jsonData.location.country
            );

            // Set current time text
            setcurrentTime(jsonData.location.localtime.slice(-5));
            // Getting current time hour
            setcurrentTimeHour(
                parseInt(jsonData.location.localtime.slice(-5, -3))
            );
            hourNow = parseInt(jsonData.location.localtime.slice(-5, -3));

            // Set current temp text
            setcurrentTemp(jsonData.current.temp_c + "°C");

            // Set current weather image
            setcurrentWeather(jsonData.current.condition.text);

            // Set phrase text
            setPhrase(tempToPhrase(jsonData.current.temp_c));

            // Set hourly temps text
            var todayInfo = jsonData.forecast.forecastday[0];
            settodayTemps([
                todayInfo.hour[handleTimeHours(hourNow)].temp_c,
                todayInfo.hour[handleTimeHours(hourNow + 1)].temp_c,
                todayInfo.hour[handleTimeHours(hourNow + 2)].temp_c,
                todayInfo.hour[handleTimeHours(hourNow + 3)].temp_c,
                todayInfo.hour[handleTimeHours(hourNow + 4)].temp_c,
                todayInfo.hour[handleTimeHours(hourNow + 5)].temp_c,
                todayInfo.hour[handleTimeHours(hourNow + 6)].temp_c,
            ]);

            // Set hourly weather image
            sethourlyWeather([
                todayInfo.hour[handleTimeHours(hourNow)].condition.text,
                todayInfo.hour[handleTimeHours(hourNow + 1)].condition.text,
                todayInfo.hour[handleTimeHours(hourNow + 2)].condition.text,
                todayInfo.hour[handleTimeHours(hourNow + 3)].condition.text,
                todayInfo.hour[handleTimeHours(hourNow + 4)].condition.text,
                todayInfo.hour[handleTimeHours(hourNow + 5)].condition.text,
                todayInfo.hour[handleTimeHours(hourNow + 6)].condition.text,
            ]);
            // Set weekly temps text
            var weekInfo = jsonData.forecast;
            setweeklyTemps([
                weekInfo.forecastday[0].day.avgtemp_c,
                weekInfo.forecastday[1].day.avgtemp_c,
                weekInfo.forecastday[2].day.avgtemp_c,
                20.3,
                17.8,
                19.1,
                18.4,
            ]);

            // Set weekly weather images
            setweeklyWeather([
                weekInfo.forecastday[0].day.condition.text,
                weekInfo.forecastday[1].day.condition.text,
                weekInfo.forecastday[2].day.condition.text,
                "Sunny",
                "Rainy",
                "Partly cloudy",
                "Clear",
            ]);
        }
    }

    function handleTimeHours(num) {
        if (num > 23) {
            return num % 24;
        } else {
            return num;
        }
    }

    function weatherToImage(condition) {
        switch (condition) {
            case "":
            case "waiting":
                return waiting;
            case "Sunny":
            case "Clear":
                return sunny;
            case "Partly cloudy":
                return partlyCloudy;
            case "Cloudy":
            case "Overcast":
            case "Mist":
                return cloudy;
            case "Heavy rain":
                return stormy;
            default:
                return rainy;
        }
    }

    function tempToPhrase(temp) {
        if (temp <= 0) {
            return "it's actually freezing.";
        }
        if (temp < 10 && temp > 0) {
            return "it's pretty cold.";
        }
        if (temp >= 10 && temp < 20) {
            return "maybe take a coat?";
        }
        if (temp >= 20) {
            return "it's nice out today.";
        }
    }

    function handleOnSearch(string, results) {}

    function handleOnHover(result) {}

    function handleOnSelect(item) {
        // Get data from fetch request and save it to jsonData variable
        //setjsonData(fetchDataJson(item.name));
        fetchDataJson(item.name);
        //console.log(fetchDataJson(item.name));
        //console.log(item.name);
        //updateData();
    }

    function handleOnFocus() {}

    function formatResult() {}

    /* ---------------------------------------------------------------------------------------------------------------------------------
*
* END OF FUNCTIONAL CODE
* START OF MARKUP TEXT
*
*
*
---------------------------------------------------------------------------------------------------------------------------------- */

    return (
        <>
            <header
                style={{
                    background: "black",
                    display: "flex",
                    justifyContent: "space-between",
                    paddingLeft: "10px",
                    paddingRight: "40px",
                }}
            >
                <div style={{ width: 700, padding: "28px" }}>
                    <ReactSearchAutocomplete
                        items={countries}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult()}
                        placeholder="where are we going?"
                        styling={{
                            height: "50px",
                            fontFamily: "League Spartan",
                            fontSize: "30px",
                            placeholderColor: "#C6C6C6",
                        }}
                    />
                </div>
                <a class="BigHeaderText">{currentTime}</a>
                <a class="BigHeaderText">{formattedDate}</a>
            </header>

            <div style={{ display: "flex", height: "700px", margin: "auto" }}>
                <div class="dayForecastContainer">
                    <div
                        style={{
                            margin: "auto",
                            marginTop: "70px",
                            width: "250px",
                            height: "250px",
                        }}
                    >
                        <img
                            src={weatherToImage(currentWeather)}
                            class="imageContain"
                        ></img>
                        <a class="BigHeaderText">{currentTemp}</a>
                    </div>
                    <div
                        style={{
                            margin: "auto",
                            marginTop: "120px",
                            display: "flex",
                            justifyContent: "space-around",
                            width: "80%",
                            height: "100px",
                        }}
                    >
                        <div class="hourlyForecastContainer">
                            <img
                                src={weatherToImage(hourlyWeather[0])}
                                class="imageContain"
                            ></img>
                            <a>{currentTimeHour.toString() + ":00"}</a>
                            <a style={{ display: "block" }}>
                                {todayTemps[0].toString() + "°C"}
                            </a>
                        </div>
                        <div class="hourlyForecastContainer">
                            <img
                                src={weatherToImage(hourlyWeather[1])}
                                class="imageContain"
                            ></img>
                            <a>{(currentTimeHour + 1).toString() + ":00"}</a>
                            <a style={{ display: "block" }}>
                                {todayTemps[1].toString() + "°C"}
                            </a>
                        </div>
                        <div class="hourlyForecastContainer">
                            <img
                                src={weatherToImage(hourlyWeather[2])}
                                class="imageContain"
                            ></img>
                            <a>{(currentTimeHour + 2).toString() + ":00"}</a>
                            <a style={{ display: "block" }}>
                                {todayTemps[2].toString() + "°C"}
                            </a>
                        </div>
                        <div class="hourlyForecastContainer">
                            <img
                                src={weatherToImage(hourlyWeather[3])}
                                class="imageContain"
                            ></img>
                            <a>{(currentTimeHour + 3).toString() + ":00"}</a>
                            <a style={{ display: "block" }}>
                                {todayTemps[3].toString() + "°C"}
                            </a>
                        </div>
                        <div class="hourlyForecastContainer">
                            <img
                                src={weatherToImage(hourlyWeather[4])}
                                class="imageContain"
                            ></img>
                            <a>{(currentTimeHour + 4).toString() + ":00"}</a>
                            <a style={{ display: "block" }}>
                                {todayTemps[4].toString() + "°C"}
                            </a>
                        </div>
                        <div class="hourlyForecastContainer">
                            <img
                                src={weatherToImage(hourlyWeather[5])}
                                class="imageContain"
                            ></img>
                            <a>{(currentTimeHour + 5).toString() + ":00"}</a>
                            <a style={{ display: "block" }}>
                                {todayTemps[5].toString() + "°C"}
                            </a>
                        </div>
                        <div class="hourlyForecastContainer">
                            <img
                                src={weatherToImage(hourlyWeather[6])}
                                class="imageContain"
                            ></img>
                            <a>{(currentTimeHour + 6).toString() + ":00"}</a>
                            <a style={{ display: "block" }}>
                                {todayTemps[6].toString() + "°C"}
                            </a>
                        </div>
                    </div>
                </div>

                <div class="weekForecastContainer">
                    <div class="weekDayContainer">
                        <a
                            class="BigHeaderText"
                            style={{ paddingTop: "0", color: "#F3C4FF" }}
                        >
                            today
                        </a>
                        <div>
                            <img
                                src={weatherToImage(weeklyWeather[0])}
                                class="imageContainInline"
                            ></img>
                            <a
                                class="BigHeaderText"
                                style={{ paddingTop: "0" }}
                            >
                                {weeklyTemps[0].toString() + "°C"}
                            </a>
                        </div>
                    </div>
                    <div class="weekDayContainer">
                        <a class="BigHeaderText" style={{ paddingTop: "0" }}>
                            {weekdays[weekDay + 1]}
                        </a>
                        <div>
                            <img
                                src={weatherToImage(weeklyWeather[1])}
                                class="imageContainInline"
                            ></img>
                            <a
                                class="BigHeaderText"
                                style={{ paddingTop: "0" }}
                            >
                                {weeklyTemps[1].toString() + "°C"}
                            </a>
                        </div>
                    </div>
                    <div class="weekDayContainer">
                        <a class="BigHeaderText" style={{ paddingTop: "0" }}>
                            {weekdays[weekDay + 2]}
                        </a>
                        <div>
                            <img
                                src={weatherToImage(weeklyWeather[2])}
                                class="imageContainInline"
                            ></img>
                            <a
                                class="BigHeaderText"
                                style={{ paddingTop: "0" }}
                            >
                                {weeklyTemps[2].toString() + "°C"}
                            </a>
                        </div>
                    </div>
                    <div class="weekDayContainer">
                        <a class="BigHeaderText" style={{ paddingTop: "0" }}>
                            {weekdays[weekDay + 3]}
                        </a>
                        <div>
                            <img
                                src={weatherToImage(weeklyWeather[3])}
                                class="imageContainInline"
                            ></img>
                            <a
                                class="BigHeaderText"
                                style={{ paddingTop: "0" }}
                            >
                                {weeklyTemps[3].toString() + "°C"}
                            </a>
                        </div>
                    </div>
                    <div class="weekDayContainer">
                        <a class="BigHeaderText" style={{ paddingTop: "0" }}>
                            {weekdays[weekDay + 4]}
                        </a>
                        <div>
                            <img
                                src={weatherToImage(weeklyWeather[4])}
                                class="imageContainInline"
                            ></img>
                            <a
                                class="BigHeaderText"
                                style={{ paddingTop: "0" }}
                            >
                                {weeklyTemps[4].toString() + "°C"}
                            </a>
                        </div>
                    </div>
                    <div class="weekDayContainer">
                        <a class="BigHeaderText" style={{ paddingTop: "0" }}>
                            {weekdays[weekDay + 5]}
                        </a>
                        <div>
                            <img
                                src={weatherToImage(weeklyWeather[5])}
                                class="imageContainInline"
                            ></img>
                            <a
                                class="BigHeaderText"
                                style={{ paddingTop: "0" }}
                            >
                                {weeklyTemps[5].toString() + "°C"}
                            </a>
                        </div>
                    </div>
                    <div class="weekDayContainer">
                        <a class="BigHeaderText" style={{ paddingTop: "0" }}>
                            {weekdays[weekDay + 6]}
                        </a>
                        <div>
                            <img
                                src={weatherToImage(weeklyWeather[6])}
                                class="imageContainInline"
                            ></img>
                            <a
                                class="BigHeaderText"
                                style={{ paddingTop: "0" }}
                            >
                                {weeklyTemps[6].toString() + "°C"}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <footer
                style={{
                    background: "black",
                    paddingLeft: "20px",
                    paddingRight: "40px",
                    height: "125px",
                    width: "97%",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <a class="BigFooterText" style={{ paddingLeft: "15px" }}>
                    {currentLocation}
                </a>
                <a class="BigFooterText" style={{ paddingRight: "15px" }}>
                    {phrase}
                </a>
            </footer>
        </>
    );
}

export default App;

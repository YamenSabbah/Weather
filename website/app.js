/* Global Variables */
// const { response } = ("express");
// Create a new date instance dynamically with JS
let d = new Date();
const apiKey = "&appid=b544298ffce0cd92d08c0d08df5ab609&units=imperial";
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";

const getWeatherDatas = async (baseUrl, zip, key) => {
    const response = await fetch(baseUrl + zip + key);
    try {
        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} - ${response.statusText}`
            );
        }
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("Error fetching weather data:", error);
        alert(
            "Failed to fetch weather data. Please check the ZIP code or API key."
        );
    }
};

let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};
const updateUI = async () => {
    const request = await fetch("/all");
    try {
        const allData = await request.json();
        document.getElementById("date").innerHTML = `Date: ${allData.date}`;
        document.getElementById(
            "temp"
        ).innerHTML = `Temperature: ${allData.temperature}°F`;
        document.getElementById(
            "content"
        ).innerHTML = `Feelings: ${allData.content}`;
    } catch (error) {
        console.log("error", error);
    }
};

// the generate section
document.getElementById("generate").addEventListener("click", async () => {
    const zipCodeValue = document.getElementById("zip").value;
    const feelingContentValue = document.getElementById("feelings").value;
    if (!zipCodeValue) {
        alert("Please enter a ZIP code.");
        return;
    }
    const weatherData = await getWeatherDatas(baseUrl, zipCodeValue, apiKey);
    if (weatherData) {
        await postData("/add", {
            date: d.toLocaleDateString(),
            temp: weatherData.main.temp,
            content: feelingContentValue,
        });
        updateUI();
    }
});

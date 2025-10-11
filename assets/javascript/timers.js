const events = [
    {
        title: "Introduction",
        date: new Date("2025-10-10T19:00:00.000+01:00")
    },
    {
        title: "Avatar Jam Kick-off",
        date: new Date("2025-10-10T20:00:00.000+01:00")
    },
    {
        title: "Avatar Jam Finish",
        date: new Date("2025-10-12T20:00:00.000+01:00")
    },
    {
        title: "Show Off",
        date: new Date("2025-10-12T20:30:00.000+01:00")
    },
]
//Change these to whatever the selectors are
const currentEventElement = document.querySelector("#current-event");
const nextEventElement = document.querySelector("#next-event");

//Update constants for whatever you want them to say
const currentEventString = "";
const noCurrentEventString = "None";
const nextEventString = "";
const noNextEventString = "No more events";

let currentEvent = null;
let nextEvent = null;

const getCurrentEvent = () => {
    const now = new Date();

    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        if (event.date < now) {
            currentEvent = event;
        }
    }

    return currentEvent;
}

const getNextEvent = () => {
    const now = new Date();

    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        if (event.date > now) {
            nextEvent = event;
            break;
        }
    }

    return nextEvent;
}

const getTimeUntilEvent = (event) => {
    if (!event) {
        return -1;
    }

    const now = new Date();
    const timeUntilEvent = event.date - now;
    return timeUntilEvent;
}

const updateCurrentEvent = () => {
    currentEvent = getCurrentEvent();
    const currentEventTitle = currentEvent ? currentEvent.title : noCurrentEventString;

    currentEventElement.innerHTML = `${currentEventString}${currentEventTitle}`;
}

const updateNextTimer = () => {
    if (!nextEvent) {
        nextEventElement.innerHTML = noNextEventString;
        return;
    }
    let timeUntilNextEvent = nextEvent ? getTimeUntilEvent(nextEvent) : -1;
    if (timeUntilNextEvent < 0) {
        currentEvent = getCurrentEvent();
        nextEvent = getNextEvent();
        timeUntilNextEvent = nextEvent ? getTimeUntilEvent(nextEvent) : -1;
        updateCurrentEvent();
    }
    if (timeUntilNextEvent < 0) {
        nextEventElement.innerHTML = noNextEventString;
        return;
    }

    const hours = Math.floor(timeUntilNextEvent / 1000 / 60 / 60);
    const paddedHours = hours < 10 ? `0${hours}` : hours;
    const minutes = Math.floor(timeUntilNextEvent / 1000 / 60) % 60;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(timeUntilNextEvent / 1000) % 60;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    nextEventElement.innerHTML = `${nextEventString}${nextEvent.title} in ${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

currentEvent = getCurrentEvent();
nextEvent = getNextEvent();

updateCurrentEvent();
updateNextTimer();

const timer = setInterval(() => {
    updateNextTimer();
}, 1000);


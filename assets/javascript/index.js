const loadSchedule = async () => {
    return await fetch("https://twitchschedule.dinosammy1.workers.dev/").then(res => res.json()).then(res => res.data.segments)
}

loadSchedule().then(console.log)

function digitalClock() {
    var date = new Date();

    var hours = date.getHours() + '';

    var minutes = date.getMinutes() + '';

    var seconds = date.getSeconds() + '';

    var day = date.getDay();



    if (hours.length < 2) {
        hours = '0' + hours
    }

    if (minutes.length < 2) {
        minutes = '0' + minutes
    }

    if (seconds.length < 2) {
        seconds = '0' + minutes
    }

    var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',]

    var fullDate = weekDays[day] + ' ' + hours + ':' + minutes + ':' + seconds;

    document.getElementById('clock').innerHTML = fullDate;
}

digitalClock();

setInterval(digitalClock, 1000);
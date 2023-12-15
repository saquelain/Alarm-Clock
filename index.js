const currentTimeElement = document.querySelector(".current-time");
const chooseHourElement = document.getElementById("hour");
const chooseMinuteElement = document.getElementById("minute");
const setAlarmBtn = document.querySelector(".set-alarm-btn");
const chooseampmElement = document.getElementById("ampm");
const alarmListElement = document.querySelector(".alarm-list");
const alarmHeadingElement = document.querySelector(".alarm-list-heading");
const audio = new Audio('asset/ringtone.mp3');
audio.loop = true; // make sure ringtone is on loop

// adding delay on alert so that audio does not stop until alert goes off
function delay(seconds) {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    });
}

let alarms = [];

setInterval(async() => {
    let date = new Date();
    // var h = ((date.getHours() - 12));
    let h = date.getHours(); 
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

    // 12 Hour Format
    if (h > 11) {
    h = h - 12;
    // ampm = (date.getHours()) < 12 ? 'AM' : 'PM';
    ampm = 'PM'
    }

    // if hour value is 0 then set it to 12
    h = h == 0 ? h = 12 : h;
    // Adding 0 before h , m ,s 
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    // console.log(h+":"+m+":"+s+" "+ampm);
    // Update time every second
    currentTimeElement.textContent = `${h}:${m}:${s} ${ampm}`;
    // Play ringtone if alarm time mathces with current time
    for (const alarm of alarms) {
        if (
            alarm.hour == h &&
            alarm.minute == m &&
            s == "00" &&
            alarm.ampm == ampm
        ) {
            // play the ringtone
            audio.play();
            await delay(1);
            // alert window that alarm is going off
            alert('RING! RING! Your alarm is going off!');
            // when alert goes off, pause the alarm
            audio.pause();
            break; // Stop checking after the first matching alarm
        }
    }
}, 1000);

// set alarm on click of button
setAlarmBtn.addEventListener('click', setAlarm);

function setAlarm(){
    const selectedHour = chooseHourElement.value;
    const selectedMinute = chooseMinuteElement.value;
    const selectedampm = chooseampmElement.value;

    // do not add alarm if valid input is not given
    if(!selectedHour || !selectedMinute || !selectedampm){
        alert("Please select a valid time");
    }else{
        
        // add alarm to alarm array
        const alarm = {
            hour: selectedHour,
            minute: selectedMinute,
            ampm: selectedampm
        }
        alarms.push(alarm);

        // create an alarm
        const alarmDivElement = document.createElement('div');
        alarmDivElement.classList.add('alarm');

        // create alarmtime
        const alarmTimeElement = document.createElement('div');
        alarmTimeElement.classList.add('alarm-time');
        alarmTimeElement.textContent = `${selectedHour}:${selectedMinute} ${selectedampm}`;

        // create deletebtn
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-alarm');
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener('click', ()=> {
            alarmDivElement.remove();
            alarms = alarms.filter((a) => {
                return !(a.hour == alarm.hour && a.minute == alarm.minute && a.ampm == alarm.ampm);
            });
        })

        // add alarmtime and deletebtn to alarm
        alarmDivElement.appendChild(alarmTimeElement);
        alarmDivElement.appendChild(deleteBtn);


        // add alarm to alarmlist
        alarmListElement.appendChild(alarmDivElement);
    }
}

function render(){
    // populate hour options
    for(let i=1; i<=12; i++){
        const option = document.createElement('option');
        option.textContent = i<10 ? '0'+i : i;
        chooseHourElement.appendChild(option);
    }

    // populate minute options
    for(let i=0; i<60; i++){
        const option = document.createElement('option');
        option.textContent = i<10 ? '0'+i : i;
        chooseMinuteElement.appendChild(option);
    }
}

render();
const timetable = [
  { startHour: 7, startMinute: 10, endHour: 7, endMinute: 55 },
  { startHour: 8, startMinute: 0, endHour: 8, endMinute: 45 },
  { startHour: 8, startMinute: 55, endHour: 9, endMinute: 40 },
  { startHour: 9, startMinute: 50, endHour: 10, endMinute: 35 },
  { startHour: 10, startMinute: 45, endHour: 11, endMinute: 30 },
  { startHour: 11, startMinute: 40, endHour: 12, endMinute: 25 },
  { startHour: 12, startMinute: 35, endHour: 13, endMinute: 20 },
  { startHour: 13, startMinute: 40, endHour: 14, endMinute: 25 },
  { startHour: 14, startMinute: 30, endHour: 15, endMinute: 15 },
  { startHour: 15, startMinute: 20, endHour: 16, endMinute: 0 },
  { startHour: 16, startMinute: 0, endHour: 16, endMinute: 40 },
  { startHour: 16, startMinute: 45, endHour: 17, endMinute: 25 },
  { startHour: 17, startMinute: 30, endHour: 18, endMinute: 10 },
  { startHour: 18, startMinute: 15, endHour: 18, endMinute: 55 },
  { startHour: 19, startMinute: 0, endHour: 19, endMinute: 40 },
  { startHour: 19, startMinute: 45, endHour: 20, endMinute: 25 },
  { startHour: 20, startMinute: 30, endHour: 21, endMinute: 10 }
];

function formatTime(hours, minutes) {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

const currentTime = new Date();
const currentHour = currentTime.getHours();
const currentMinute = currentTime.getMinutes();

let currentEvent = null;
let nextEvent = null;
let isBreak = false;

for (let i = 0; i < timetable.length; i++) {
  const { startHour, startMinute, endHour, endMinute } = timetable[i];
  const startTime = new Date();
  startTime.setHours(startHour);
  startTime.setMinutes(startMinute);
  const endTime = new Date();
  endTime.setHours(endHour);
  endTime.setMinutes(endMinute);

  if (currentTime >= startTime && currentTime < endTime) {
    currentEvent = i;
    isBreak = false;
    break;
  } else if (currentTime < startTime) {
    nextEvent = i;
    isBreak = true;
    break;
  }
}

const oraszamElement = document.getElementById('oraszam');

if (currentEvent !== null) {
  oraszamElement.textContent = `${currentEvent}. óra`;
} else if (nextEvent !== null) {
  oraszamElement.textContent = 'Szünet';
} else {
  oraszamElement.style.display = 'none';
}

const csengoigElement = document.getElementById('csengoig');

if (currentEvent !== null) {
  const { endHour, endMinute } = timetable[currentEvent];
  const endTime = new Date();
  endTime.setHours(endHour);
  endTime.setMinutes(endMinute);
  const timeRemaining = Math.max(0, endTime - currentTime);
  const minutesRemaining = Math.ceil(timeRemaining / (1000 * 60));
  csengoigElement.textContent = `${minutesRemaining} perc múlva ér véget`;
} else if (nextEvent !== null) {
  const { startHour, startMinute } = timetable[nextEvent];
  const startTime = new Date();
  startTime.setHours(startHour);
  startTime.setMinutes(startMinute);
  const timeRemaining = Math.max(0, startTime - currentTime);
  const minutesRemaining = Math.ceil(timeRemaining / (1000 * 60));
  csengoigElement.textContent = `${minutesRemaining} perc múlva kezdődik`;
} else {
  csengoigElement.textContent = 'Nincs több óra ma.';
}
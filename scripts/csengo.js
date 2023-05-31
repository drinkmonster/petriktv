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
  { startHour: 19, startMinute: 00, endHour: 19, endMinute: 40 },
  { startHour: 19, startMinute: 45, endHour: 20, endMinute: 25 },
  { startHour: 20, startMinute: 30, endHour: 21, endMinute: 10 },
];

function updateTime() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentClass = getClass(currentHour, currentMinute);
  const nextClass = getNextClass(currentHour, currentMinute);
  const csengoig = document.getElementById('csengoig');
  const oraszam = document.getElementById('oraszam');
  
  if (currentClass) {
    const classEndTime = getClassEndTime(currentClass);
    const timeRemaining = getTimeRemaining(currentTime, classEndTime);
    csengoig.innerText = `A kicsengőig ${timeRemaining} perc`;
  } else if (nextClass) {
    const nextClassStartTime = getNextClassStartTime(nextClass);
    const timeRemaining = getTimeRemaining(currentTime, nextClassStartTime);
    csengoig.innerText = `A becsengőig ${timeRemaining} perc`;
  } else {
    csengoig.innerText = "Jelenleg nincs óra.";
  }
}

function getClass(hour, minute) {
  for (let i = 0; i < timetable.length; i++) {
    const classStartTime = timetable[i];
    oraszam.innerText = i + ". óra";
    if (
      hour > classStartTime.startHour ||
      (hour === classStartTime.startHour && minute >= classStartTime.startMinute)
      ) {
        if (
          hour < classStartTime.endHour ||
          (hour === classStartTime.endHour && minute < classStartTime.endMinute)
          ) {
            return classStartTime;
          }
        }
      }
      
      return null;
    }
    
    function getNextClass(hour, minute) {
      for (let i = 0; i < timetable.length; i++) {
        const classStartTime = timetable[i];
        if (
          hour < classStartTime.startHour ||
          (hour === classStartTime.startHour && minute < classStartTime.startMinute)
          ) {
            return classStartTime;
          }
        }
        
        return null;
      }
      
      function getClassEndTime(classTime) {
        const { endHour, endMinute } = classTime;
        return new Date().setHours(endHour, endMinute);
      }
      
      function getNextClassStartTime(classTime) {
        const { startHour, startMinute } = classTime;
        return new Date().setHours(startHour, startMinute);
      }
      
      function getTimeRemaining(startTime, endTime) {
        const differenceInMinutes = Math.floor((endTime - startTime) / (1000 * 60));
        return differenceInMinutes;
      }
      
      // Call updateTime every second to keep the text updated
      setInterval(updateTime, 1000);
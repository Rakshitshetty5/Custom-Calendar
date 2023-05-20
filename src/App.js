import { format } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import { add } from "date-fns";
import moment from "moment";

function getFirstDayOfWeek(d) {
  // 👇️ clone date object, so we don't mutate it
  const date = new Date(d);
  const day = date.getDay(); // 👉️ get day of week

  // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);

  return new Date(date.setDate(diff));
}

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedWeekDates, setSelectedWeekDates] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(()=> {
    const firstDay = getFirstDayOfWeek(selectedDate);
    const weekDates = Array.from({ length: 7 }).map((_, idx) => moment(add(firstDay, { days: idx })).format('l'))
    setSelectedWeekDates(weekDates)
  },[selectedDate])

  return (
    <div className="mt-16 flex flex-col items-center gap-8">
      <Calendar value={selectedDate} selectedWeekDates={selectedWeekDates} handleDateChange={(date) => setSelectedDate(date)} onCalendarViewChange={setCurrentMonth} currentMonth={currentMonth}/>
    </div>
  );
};

export default App;

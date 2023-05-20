import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  setDate,
  startOfMonth,
  sub,
} from "date-fns";
import Cell from "./Cell";
import moment from "moment";

const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Calendar = ({
  value = new Date(),
  handleDateChange,
  currentMonth,
  onCalendarViewChange,
  selectedWeekDates,
}) => {
  const startDate = startOfMonth(currentMonth); //get first day of month
  const endDate = endOfMonth(currentMonth); //last day of month
  const numDays = differenceInDays(endDate, startDate) + 1; //get no of days in month

  let prefixDays = startDate.getDay(); //blanck cells prefix
  if (prefixDays === 0) {
    prefixDays = 6;
  } else {
    prefixDays -= 1;
  }
  const suffixDays = 7 - endDate.getDay(); //blank cell suffix

  const prevMonth = () =>
    onCalendarViewChange(sub(currentMonth, { months: 1 }));
  const nextMonth = () =>
    onCalendarViewChange(add(currentMonth, { months: 1 }));

  const monthDates = Array.from({ length: numDays }).map((_, idx) =>
    add(startDate, { days: idx })
  );

  const prefixDates = Array.from({ length: prefixDays }).map((_, idx) =>
    sub(startDate, { days: idx + 1 })
  );
  const suffixDates = Array.from({ length: suffixDays }).map((_, idx) =>
    add(endDate, { days: idx + 1 })
  );

  return (
    <div className="p-[30px] shadow-xl rounded-xl">
    <div className="w-[400px]">
      <div className="flex items-center justify-between pb-[20px]">
        <h1 className="text-xl font-bold">
          {format(currentMonth, "LLLL yyyy")}
        </h1>
        <div className="flex items-center space-x-[1rem]">
          <button onClick={prevMonth}>{"<"}</button>
          <button onClick={nextMonth}>{">"}</button>
        </div>
      </div>
      <div className="grid grid-cols-7 items-center justify-center text-center">
        {weeks.map((week) => (
          <Cell key={week} className="text-xs font-bold uppercase border-b">
            {week}
          </Cell>
        ))}
      </div>
      <div className="grid grid-cols-7 items-center justify-center text-center border-l border-r">
        {prefixDates.map((date) => {
          const isSelectedWeek = selectedWeekDates.includes(
            moment(date).format("l")
          );

          return (
            <Cell
              key={date}
              isInactiveDate={true}
              isWeekActive={isSelectedWeek}
            >
              {date.getDate()}
            </Cell>
          );
        })}

        {monthDates.map((date) => {
          const isSelectedDate =
            moment(date).format("l") === moment(value).format("l");
          const isSelectedWeek = selectedWeekDates.includes(
            moment(date).format("l")
          );
          return (
            <Cell
              key={date}
              isActive={isSelectedDate}
              onClick={() => handleDateChange(date)}
              isWeekActive={isSelectedWeek}
              className="border-b"
            >
              {date.getDate()}
            </Cell>
          );
        })}

        {suffixDates.map((date) => {
          const isSelectedWeek = selectedWeekDates.includes(
            moment(date).format("l")
          );

          return (
            <Cell
              key={date}
              isInactiveDate={true}
              isWeekActive={isSelectedWeek}              
              className="border-b"
            >
              {date.getDate()}
            </Cell>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default Calendar;

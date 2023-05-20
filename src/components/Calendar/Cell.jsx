
const Cell = ({
  onClick,
  children,
  className,
  isWeekActive=false,
  isActive = false,
  isInactiveDate=false
}) => {
  return (
    <div
      onClick={!isActive ? onClick : undefined}
      className={
        `h-[50px] flex items-center justify-center select-none transition-colors
          ${(!isActive && onClick) &&  " cursor-pointer hover:bg-gray-100 active:bg-gray-200 "}
          ${(isInactiveDate && !isWeekActive) && 'bg-gray-100 text-gray-600'}
          ${isWeekActive && ( isActive ? " font-bold text-white bg-blue-600 " : " bg-blue-300 ")}
          ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Cell;

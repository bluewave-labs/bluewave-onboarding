import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { enUS } from 'date-fns/locale';
import '../Styles/MyDatePicker.css';

const MyDatePicker = ({ onClose }) => {
  const [dateRange, setDateRange] = useState([null, null]);

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const handleShortcut = (startOffset, endOffset) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + startOffset);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + endOffset);
    setDateRange([startDate, endDate]);
  };

  const handleApply = () => {
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={enUS}>
      <div className="date-picker-container">
        <div className="calendar-container">
          <DateRangeCalendar
            startText="Start Date"
            endText="End Date"
            value={dateRange}
            onChange={handleDateChange}
            renderInput={() => null}
            onClose={onClose}
            toolbarFormat="MMM d"
            calendars={2}
          />
          <div className="button-container">
            <button onClick={() => handleShortcut(0, 0)}>Today</button>
            <button onClick={() => handleShortcut(-1, -1)}>Yesterday</button>
            <button onClick={() => handleShortcut(-6, 0)}>This Week</button>
            <button onClick={() => handleShortcut(-13, -7)}>Last Week</button>
            <button onClick={() => handleShortcut(-29, 0)}>This Month</button>
            <button onClick={() => handleShortcut(-59, -30)}>Last Month</button>
            <button onClick={() => handleShortcut(-364, 0)}>This Year</button>
            <button onClick={() => handleShortcut(-729, -365)}>Last Year</button>
            <button onClick={() => handleShortcut(-36500, 0)}>All Time</button>
          </div>
          <div className="button-container">
            <button onClick={onClose}>Cancel</button>
            <button className="apply" onClick={handleApply}>Apply</button>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default MyDatePicker;

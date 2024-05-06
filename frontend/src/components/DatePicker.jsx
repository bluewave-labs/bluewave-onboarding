import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { enUS } from 'date-fns/locale';
import '../Styles/MyDatePicker.css';

const MyDatePicker = ({ onClose }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const handleShortcut = (startOffset, endOffset, buttonId) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + startOffset);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + endOffset);
    setDateRange([startDate, endDate]);
    setSelectedButton(buttonId);
  };

  const handleApply = () => {
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={enUS}>
      <div className="date-picker-container">
        <div className="button-container">
          <button
            className={selectedButton === 'today' ? 'selected' : ''}
            onClick={() => handleShortcut(0, 0, 'today')}>Today</button>
            <button
            className={selectedButton === 'today' ? 'selected' : ''} onClick={() => handleShortcut(-1, -1)}>Yesterday</button>
            <button
            className={selectedButton === 'today' ? 'selected' : ''} onClick={() => handleShortcut(-6, 0)}>This Week</button>
            <button
            className={selectedButton === 'today' ? 'selected' : ''} onClick={() => handleShortcut(-13, -7)}>Last Week</button>
            <button
            className={selectedButton === 'today' ? 'selected' : ''} onClick={() => handleShortcut(-29, 0)}>This Month</button>
            <button
            className={selectedButton === 'today' ? 'selected' : ''} onClick={() => handleShortcut(-59, -30)}>Last Month</button>
            <button
            className={selectedButton === 'today' ? 'selected' : ''} onClick={() => handleShortcut(-364, 0)}>This Year</button>
            <button
            className={selectedButton === 'today' ? 'selected' : ''} onClick={() => handleShortcut(-729, -365)}>Last Year</button>
            <button
            className={selectedButton === 'today' ? 'selected' : ''} onClick={() => handleShortcut(-36500, 0)}>All Time</button>
        </div>
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
        </div>
        
        <div className="button-container1">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="apply" onClick={handleApply}>Apply</button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default MyDatePicker;

import React, { FC, SetStateAction, useState } from 'react';
import moment from 'moment';
import Select from 'react-select';
import ReactDatePicker from 'react-datepicker';
import { LabelNumericValue } from '../../../../../types/common';
import ErrorMessage from '../../../../../components/ErrorMessage';
import CustomLoader from '../../../../../components/CustomLoader';

type props = {
  ceresTagsOptions?: LabelNumericValue[];
  ceresTagData: any;
  times: string[];
  timeSliderValue: number | null;
  setTimeSliderValue: React.Dispatch<SetStateAction<number>>;
  ceresTagId: number | null;
  setCeresTagId: React.Dispatch<SetStateAction<number | null>>;
  setAsOfFrom: React.Dispatch<SetStateAction<string | null>>;
  setAsOfTo: React.Dispatch<SetStateAction<string | null>>;
  isFetchingCeresTag: boolean;
  isErrorCeresTag: boolean;
  displaySelectedDate: string;
};

const CeresTag: FC<props> = ({
  times,
  timeSliderValue,
  setTimeSliderValue,
  ceresTagId,
  setCeresTagId,
  setAsOfFrom,
  setAsOfTo,
  ceresTagsOptions,
  ceresTagData,
  isFetchingCeresTag,
  isErrorCeresTag,
  displaySelectedDate,
}) => {
  const [playPauseStatus, setPlayPauseStatus] = useState(0); // Status 0 means button is showing play (It is paused)
  const [currentInterval, setCurrentInterval] = useState<any>(null); // storing interval for play pause
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [displayDateMin, setDisplayDateMin] = useState(null);
  const [displayDateMax, setDisplayDateMax] = useState(moment().toDate());

  // data only used here
  const [dateRangeStart, setDateRangeStart] = useState(null);
  const [dateRangeEnd, setDateRangeEnd] = useState(null);

  const handleSliderChange = (event: any) => {
    const sliderValue = event.target.value;
    setTimeSliderValue(sliderValue);
  };

  const handleDateChange = (event: any) => {
    const [startDate, endDate] = event;

    if (startDate && !endDate) {
      setDateRangeStart(startDate);
      setDateRangeEnd(endDate);
      return;
    }

    const formattedStartDate = startDate
      .toISOString()
      .replace('T', ' ')
      .slice(0, 19);

    let formattedEndDate;

    if (endDate) {
      endDate.setHours(endDate.getHours() + 23);
      endDate.setMinutes(endDate.getMinutes() + 59);
      endDate.setSeconds(endDate.getSeconds() + 59);
      formattedEndDate = endDate.toISOString().replace('T', ' ').slice(0, 19);
    }

    setDateRangeStart(startDate);
    setDateRangeEnd(endDate);

    setAsOfFrom(formattedStartDate);
    setAsOfTo(formattedEndDate);

    setDisplayDateMin(startDate);
    setDisplayDateMax(endDate);
  };

  const handleButtonClick = (action: string) => {
    switch (action) {
      case 'back': {
        const newValue = timeSliderValue && timeSliderValue - 1;
        handleSliderChange({ target: { value: newValue } });
        break;
      }

      case 'forward': {
        const newValue = timeSliderValue && timeSliderValue + 1;
        handleSliderChange({ target: { value: newValue } });
        break;
      }

      default: {
        break;
      }
    }
  };

  const handlePlayPause = () => {
    setPlayPauseStatus(playPauseStatus === 0 ? 1 : 0);

    if (playPauseStatus === 0) {
      let count = 1;
      const interval = setInterval(() => {
        const newValue = timeSliderValue && timeSliderValue + count;
        if (newValue && newValue < times.length) {
          handleSliderChange({ target: { value: newValue } });
          count += 1;
        } else {
          clearInterval(interval);
          setPlayPauseStatus(0);
        }
      }, 1000);

      // Storing the interval in state so it can be cleared later
      setCurrentInterval(interval);
    } else {
      // Clear the interval if the pause button is clicked
      clearInterval(currentInterval);
    }
  };

  const handleCeresTagIdChange = (event: any) => {
    setCeresTagId(event ? event.value : null);
  };

  if (isFetchingCeresTag) {
    return <CustomLoader />;
  }

  if (isErrorCeresTag) {
    return <ErrorMessage />;
  }

  return (
    <div>
      <Select
        className="form-controll-sm"
        isClearable
        options={ceresTagsOptions}
        onChange={handleCeresTagIdChange}
        placeholder="Select VID"
        value={ceresTagsOptions?.find((item: any) => item.value === ceresTagId)}
        styles={{
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        menuShouldBlockScroll
      />
      <div className="ceresection d-flex flex-wrap align-items-center justify-content-center gap-1">
        {ceresTagData?.features.length === 0 && (
          <div className="text-center m-2 text-black-50">
            <p className="mb-1">No data available.</p>
            <p>Please change the date range or VID filter and try again.</p>
          </div>
        )}

        {ceresTagData?.features.length === 1 && (
          <div className="text-center text-black-50 font-12">
            <p className="mb-1 text-black-50">Only single data available.</p>

            <p className="text-primary mb-0">
              {' '}
              {moment(displaySelectedDate)
                .local()
                .format('MMMM Do YYYY, h:mm:ss a')}
            </p>
          </div>
        )}

        {ceresTagData?.features.length > 1 && (
          <div className="d-flex flex-column  gap-1 mt-1">
            <div className="text-center text-black-50  font-12 fw-bold">
              <p className="text-primary mb-0">
                {moment(displaySelectedDate)
                  .local()
                  .format('MMMM Do YYYY, h:mm:ss a')}
              </p>
            </div>
            <input
              type="range"
              onChange={handleSliderChange}
              min="0"
              max={times.length - 1}
              className="slider w-100"
              id="myRange"
              value={String(timeSliderValue)}
            />
            <div className="time-range d-flex justify-content-between align-items-center gap-3 w-100">
              <div className="min-date">
                {displayDateMin == null
                  ? moment(times[0]).local().format('MMM DD, h:mm a')
                  : moment(displayDateMin).local().format('MMM DD, h:mm a')}
              </div>
              |
              <div className="max-date">
                {moment(displayDateMax).local().format('MMM DD, h:mm a')}
              </div>
            </div>
          </div>
        )}

        <div className="d-flex align-items-center justify-content-center  gap-1 w-100">
          {ceresTagData?.features.length > 1 && (
            <div className="cerestag-items">
              <button
                type="button"
                onClick={() => handleButtonClick('back')}
                disabled={timeSliderValue === 0}>
                <i className="bx bx-rewind" />
              </button>

              <button
                type="button"
                onClick={handlePlayPause}
                disabled={timeSliderValue === times.length - 1}>
                {playPauseStatus === 0 ? (
                  <i className="bx bx-play" />
                ) : (
                  <i className="bx bx-pause" />
                )}
              </button>
              <button
                type="button"
                onClick={() => handleButtonClick('forward')}
                disabled={timeSliderValue === times.length - 1}>
                <i className="bx bx-fast-forward" />
              </button>
            </div>
          )}
          <div className="cerestag-items">
            <button
              type="button"
              onClick={() => setIsDatePickerOpen((prevState) => !prevState)}>
              <i className="bx bx-calendar" />
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center  gap-1 w-100">
          {isDatePickerOpen && (
            <ReactDatePicker
              className="form-control"
              selectsRange
              placeholderText="Select Date Range"
              startDate={dateRangeStart}
              endDate={dateRangeEnd}
              onChange={handleDateChange}
              maxDate={new Date()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CeresTag;

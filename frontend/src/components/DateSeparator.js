import React from 'react';

const DateSeparator = React.memo(({ messageDate }) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dateText = messageDate.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
    if (messageDate.toDateString() === today.toDateString()) {
        dateText = "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
        dateText = "YesterDay";
    }

  return ( 
    <div className="text-center my-2 text-slate-400 text-xs">
          {dateText}
    </div>
  );
});

export default DateSeparator;

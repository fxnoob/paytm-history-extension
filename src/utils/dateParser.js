const getDurationFromDate = date => {
  const currDate = +new Date();
  let difference = currDate - date;
  let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  let duration = "";
  if (daysDifference === 0) {
    difference -= daysDifference * 1000 * 60 * 60 * 24;
    const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    if (hoursDifference === 0) {
      difference -= hoursDifference * 1000 * 60 * 60;
      const minutesDifference = Math.floor(difference / 1000 / 60);
      if (minutesDifference === 0) {
        difference -= minutesDifference * 1000 * 60;
        const secondsDifference = Math.floor(difference / 1000);
        duration = secondsDifference + " seconds ago";
      } else {
        duration = minutesDifference + " minute ago";
      }
    } else {
      duration = hoursDifference + " hour ago";
    }
  } else duration = daysDifference + " day ago";
  return duration;
};

export { getDurationFromDate };

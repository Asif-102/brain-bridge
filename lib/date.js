export const formatMyDate = (date) => {
  const validDate = new Date(date);
  if (isNaN(validDate.getTime())) {
    throw new Error(`Invalid date value: ${date}`);
  }
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    validDate
  );
  return formattedDate;
};

export const formatDuration = (duration) => {
  if (!duration) return null;

  var hour = Math.floor(duration / 3600);
  var min = Math.floor((duration % 3600) / 60);
  var sec = Math.floor((duration % 3600) % 60);

  const durationString = `${hour}:${min}:${sec}`;

  console.log(durationString);

  return durationString;
};

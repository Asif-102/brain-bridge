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

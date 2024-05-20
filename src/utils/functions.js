const getTimestampString = (time) => {
  const date = new Date(time * 1000).toISOString().substr(11, 8);
  const [hours, minutes, seconds] = date.split(":").map(Number);

  let result = [];

  if (hours > 0) {
    result.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
  }

  result.push(`${minutes} ${minutes === 1 ? "min" : "mins"}`);

  result.push(`${seconds} ${seconds === 1 ? "sec" : "sec"}`);
  return result.join(" ");
};

function getDateString(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [datePart] = dateString.split(", ");
  const [month, day, year] = datePart.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  const monthName = months[date.getMonth()];
  const shortYear = year.toString().slice(-2);
  return `${day} ${monthName.toLowerCase().slice(0, 3)} '${shortYear}`;
}

export { getTimestampString, getDateString };

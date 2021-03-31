export const handleDate = (date) => {
  const current = new Date(date);
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
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const timeStr =
    ("0" + current.getHours()).slice(-2) +
    ":" +
    ("0" + current.getMinutes()).slice(-2);
  const currDate = `${("0" + current.getDate()).slice(-2)} ${
    months[current.getMonth()]
  } ${current.getFullYear()}`;
  const currDay = days[current.getDay()];
  return (
    <small className="">
      <span className="font-weight-bold">{currDay},</span> {currDate}
    </small>
  );
};

type OptionType = {
  withTime?: boolean;
};

function formatDate(
  originalDateString: string,
  options: OptionType = { withTime: true }
): string {
  // Dateオブジェクトを使用して日付と時間を解析
  let date = new Date(originalDateString);

  // 月の名前を取得するための配列
  const monthNames = [
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

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0時間は12時間として扱う
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  if (!options.withTime) {
    return `${monthNames[monthIndex]} ${day}, ${year}`;
  }

  return `${monthNames[monthIndex]} ${day}, ${year} ${hours}:${minutesStr} ${ampm}`;
}

export default formatDate;

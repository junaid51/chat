import { set, get, del } from "idb-keyval";
import { globals } from "./globals";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
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

const memoize = (fn) => {
  let cache = {};
  return function (key) {
    const prop = key ? key : "data";
    if (cache[prop]) {
      return cache[prop];
    } else {
      let result = fn();
      cache[prop] = result;
      return result;
    }
  };
};

export function executeNextInQueue() {
  const [fn, ...args] = arguments;
  setTimeout(() => fn(...args), 0);
}

const setValue = (name, value, cookie) => {
  if (cookie) {
    document.cookie = name + "=" + value + "; Path=/;";
  } else {
    set(name, value);
  }
};
const deleteValue = (name, cookie) => {
  if (cookie) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  } else {
    del(name);
  }
};
const getValue = (name, cookie) => {
  if (cookie) {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name))
      .split("=")[1];
  } else {
    return get(name);
  }
};

const initCap = (str) => {
  return str.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
    return m.toUpperCase();
  });
};

const disconnectChat = () => {
  if (globals.chatRef) {
    globals.chatRef.off();
    globals.chatRef = undefined;
  }
};

const getOS = memoize(() => {
  const userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"];
  let os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    return { os: "Mac OS", device: "desktop" };
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    return { os: "iOS", device: "mobile" };
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    return { os: "Windows", device: "desktop" };
  } else if (/Android/.test(userAgent)) {
    return { os: "Android", device: "mobile" };
  } else if (!os && /Linux/.test(platform)) {
    return { os: "Linux", device: "desktop" };
  }
  return os;
});

const formatTimestamp = (timestamp, type) => {
  const day = days[timestamp.getDay()],
    date = timestamp.getDate(),
    month = months[timestamp.getMonth()],
    year = timestamp.getFullYear();
  let hr = timestamp.getHours(),
    min = timestamp.getMinutes(),
    ampm = "am";

  min = (min < 10 ? "0" : "") + min;
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }

  switch (type) {
    case "DATE":
      return date + " " + month + " " + year;
    case "DATE_WEEKDAY":
      return day + ", " + date + " " + month + " " + year;
    case "TIME":
      return hr + ":" + min + " " + ampm;
    default:
      return (
        day +
        ", " +
        date +
        " " +
        month +
        " " +
        year +
        ", " +
        hr +
        ":" +
        min +
        ampm
      );
  }
};

export {
  setValue,
  deleteValue,
  getValue,
  initCap,
  getOS,
  disconnectChat,
  formatTimestamp,
};

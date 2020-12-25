const monthString = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
];

export const formatElapsedTime = (utc: number): string => {
  const now = Date.now() / 1000;

  let diff = now - utc;
  if (diff < 60) {
    return `${diff}s`;
  }

  diff = Math.trunc(diff / 60);
  if (diff < 60) {
    return `${diff}m`;
  }

  diff = Math.trunc(diff / 60);
  if (diff < 24) {
    return `${diff}h`;
  }

  diff = Math.trunc(diff / 24);
  if (diff < 7) {
    return `${diff}d`;
  }

  diff = Math.trunc(diff / 7);
  return `${diff}w`;
};

const formatElapsedTimeVerbose = (utc: number): string => {
  const now = Date.now() / 1000;

  let diff = now - utc;
  if (diff < 60) {
    return `${diff} second${diff > 1 ? 's' : ''}`;
  }

  diff = Math.trunc(diff / 60);
  if (diff < 60) {
    return `${diff} minute${diff > 1 ? 's' : ''}`;
  }

  diff = Math.trunc(diff / 60);
  if (diff < 24) {
    return `${diff} hour${diff > 1 ? 's' : ''}`;
  }

  diff = Math.trunc(diff / 24);
  if (diff < 7) {
    return `${diff} day${diff > 1 ? 's' : ''}`;
  }

  diff = Math.trunc(diff / 7);
  return `${diff} week${diff > 1 ? 's' : ''}`;
};

export const formatDate = (utc: number): string => {
  if (Date.now() - utc * 1000 < 1000 * 60 * 60 * 24 * 31) {
    return `${formatElapsedTimeVerbose(utc)} ago   `;
  }

  const date = new Date(utc * 1000);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${day} ${monthString[month]} ${year} . `;
};

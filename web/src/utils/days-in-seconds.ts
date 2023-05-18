export function daysInSeconds(days: number) {
  var secondsInOneDay = 86400; // 60 seconds * 60 minutes * 24 hours

  return secondsInOneDay * days;
}

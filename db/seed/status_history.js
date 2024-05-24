const addSeconds = (date, s) => date.setTime(date.getTime() + (s * 1000));
const addMinutes = (date, m) => date.setTime(date.getTime() + (m * 60 * 1000));
const addHours = (date, h) => date.setTime(date.getTime() + (h * 60 * 60 * 1000));
const addDays = (date, d) => date.setTime(date.getTime() + (d * 24 * 60 * 60 * 1000));
const subtractDays = (date, d) => date.setTime(date.getTime() - (d * 24 * 60 * 60 * 1000));

const randomHealth = () => Math.random() < 0.95

const history = (id, startDate, days) => {
  let h = [];
  for (let i = 0; i < days; i += 1) {
    for (let j = 0; j < 288; j += 1) {
      h.push({
        service_id: id,
        healthy: randomHealth(),
        time: new Date(addMinutes(startDate, 5))
      })
    }
  }
  return h;
}

const aMonthAgo = new Date(subtractDays(new Date(), 30))

const STATUS_HISTORY = [
  history(1, aMonthAgo, 30),
  history(4, aMonthAgo, 30),
].flat();

export default STATUS_HISTORY;

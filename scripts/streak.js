const fs = require("fs");

const file = "streak.json";
const data = JSON.parse(fs.readFileSync(file, "utf8"));

const today = new Date().toISOString().split("T")[0];

function isNextDay(lastDate, today) {
  if (!lastDate) return true;

  const last = new Date(lastDate);
  const now = new Date(today);
  const diff = (now - last) / (1000 * 60 * 60 * 24);

  return diff === 1;
}

if (!data.lastActiveDate) {
  data.currentStreak = 1;
  data.longestStreak = 1;
  data.lastActiveDate = today;

} else if (isNextDay(data.lastActiveDate, today)) {
  data.currentStreak += 1;
  data.lastActiveDate = today;

  if (data.currentStreak > data.longestStreak) {
    data.longestStreak = data.currentStreak;
  }

} else {
  data.streaks.push({
    name: `Streak #${data.streaks.length + 1}`,
    length: data.currentStreak,
    end: data.lastActiveDate
  });

  data.currentStreak = 1;
  data.lastActiveDate = today;
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log("Streak updated");

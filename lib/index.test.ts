import test from "node:test";
import assert from "node:assert";
import getWeek from ".";

test("getWeek() returns current week starting Monday by default", () => {
  const week = getWeek();
  assert.strictEqual(week.length, 7);
  assert.ok(
    week.every(
      (date) =>
        typeof date.day === "number" &&
        typeof date.month === "number" &&
        typeof date.year === "number"
    )
  );
});

test("getWeek() with custom date (Aug 6th 2025, Wednesday)", () => {
  const testDate = new Date("2025-08-06");
  const week = getWeek(testDate);

  assert.strictEqual(week.length, 7);
  assert.deepStrictEqual(week[0], { day: 4, month: 8, year: 2025 });
  assert.deepStrictEqual(week[1], { day: 5, month: 8, year: 2025 });
  assert.deepStrictEqual(week[2], { day: 6, month: 8, year: 2025 });
  assert.deepStrictEqual(week[3], { day: 7, month: 8, year: 2025 });
  assert.deepStrictEqual(week[4], { day: 8, month: 8, year: 2025 });
  assert.deepStrictEqual(week[5], { day: 9, month: 8, year: 2025 });
  assert.deepStrictEqual(week[6], { day: 10, month: 8, year: 2025 });
});

test("getWeek() with Sunday start (startDay = 0)", () => {
  const testDate = new Date("2025-08-06");
  const week = getWeek(testDate, 0);

  assert.strictEqual(week.length, 7);
  assert.deepStrictEqual(week[0], { day: 3, month: 8, year: 2025 });
  assert.deepStrictEqual(week[1], { day: 4, month: 8, year: 2025 });
  assert.deepStrictEqual(week[2], { day: 5, month: 8, year: 2025 });
  assert.deepStrictEqual(week[3], { day: 6, month: 8, year: 2025 });
  assert.deepStrictEqual(week[4], { day: 7, month: 8, year: 2025 });
  assert.deepStrictEqual(week[5], { day: 8, month: 8, year: 2025 });
  assert.deepStrictEqual(week[6], { day: 9, month: 8, year: 2025 });
});

test("getWeek() with example from README (Oct 10th 2010, Sunday start)", () => {
  const testDate = new Date(2010, 9, 10);
  const week = getWeek(testDate, 0);

  assert.strictEqual(week.length, 7);
  assert.deepStrictEqual(week[0], { day: 10, month: 10, year: 2010 });
  assert.deepStrictEqual(week[6], { day: 16, month: 10, year: 2010 });
});

test("getWeek() handles month boundary", () => {
  const testDate = new Date("2025-08-01");
  const week = getWeek(testDate);

  assert.strictEqual(week.length, 7);
  assert.deepStrictEqual(week[0], { day: 28, month: 7, year: 2025 });
  assert.deepStrictEqual(week[6], { day: 3, month: 8, year: 2025 });
});

test("getWeek() handles year boundary", () => {
  const testDate = new Date("2025-01-01");
  const week = getWeek(testDate);

  assert.strictEqual(week.length, 7);
  assert.deepStrictEqual(week[0], { day: 30, month: 12, year: 2024 });
  assert.deepStrictEqual(week[6], { day: 5, month: 1, year: 2025 });
});

test("getWeek() with all start day values (0=Sunday to 6=Saturday)", () => {
  const testDate = new Date("2025-08-06");

  for (let startDay = 0; startDay <= 6; startDay++) {
    const week = getWeek(testDate, startDay);
    assert.strictEqual(week.length, 7, `Failed for startDay ${startDay}`);
    assert.ok(
      week.every(
        (date) =>
          typeof date.day === "number" &&
          typeof date.month === "number" &&
          typeof date.year === "number"
      ),
      `Failed for startDay ${startDay}`
    );
  }
});

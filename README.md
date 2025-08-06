# get-week

Generate 7-day week calendar for any given date with configurable start day.

## Installation

```sh
npm install @bredele/get-week
```

## Usage

```ts
import getWeek from '@bredele/get-week';

// get current week starting Monday (current date: Wed Aug 6th 2025)
getWeek();
// => [{ day: 4, month: 8, year: 2025 }, { day: 5, month: 8, year: 2025 }, ..., { day: 10, month: 8, year: 2025 }]

// get week of October 10th 2010 starting Sunday
getWeek(new Date('10-10-2010'), 0);
```

## API

`getWeek(date?, startDay?)`

- **date** (optional): Date object to find the week for. Defaults to current date.
- **startDay** (optional): Day of week to start from (0-6 where 0=Sunday, 6=Saturday). Defaults to 1 (Monday).

Returns an array of 7 date objects in `{day, month, year}` format.

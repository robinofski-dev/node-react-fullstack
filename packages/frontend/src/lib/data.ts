import type { Room, Speaker, Talk } from "@node-react-fullstack/shared";
import { faker } from "@faker-js/faker";

faker.seed(123); // Seed for consistent mock data across runs

const EVENT_DAY = new Date("2026-03-13T09:00:00");

let currentHour = 0;
export const Talks: Talk[] = Array.from({ length: 10 }, (_, i) => {
  const start = new Date(EVENT_DAY.getTime() + currentHour * 60 * 60 * 1000);
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  // ~30% chance to repeat the same hour slot (duplicate), otherwise advance
  if (Math.random() > 0.3) currentHour++;
  return {
    id: `talk-${i + 1}`,
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    speakerIds: [`speaker-${faker.number.int({ min: 1, max: 5 })}`],
    room: {
      id: `room-${faker.number.int({ min: 1, max: 3 })}`,
      name: faker.company.name(),
    },
  };
});

export const Speakers: Speaker[] = Array.from({ length: 5 }, (_, i) => ({
  id: `speaker-${i + 1}`,
  name: faker.person.fullName(),
  socialHandle: faker.internet.username(),
  avatarUrl: faker.image.avatar(),
  company: {
    name: faker.company.name(),
    url: faker.internet.url(),
  },
}));

export const Rooms: Room[] = Array.from({ length: 3 }, (_, i) => ({
  id: `room-${i + 1}`,
  name: faker.word.noun(),
}));

export const groupTalksByStartTime = (talks: Talk[]): Talk[][] => {
  const map = new Map<string, Talk[]>();
  for (const talk of talks) {
    const group = map.get(talk.startDate) ?? [];
    map.set(talk.startDate, [...group, talk]);
  }
  return [...map.values()].sort((a, b) =>
    a[0].startDate.localeCompare(b[0].startDate),
  );
};

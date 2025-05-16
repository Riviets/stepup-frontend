export const CARDS_NUMBER = 10;
export const PUZZLES_NUMBER = 16;
export const PUZZLE_SETS_NUMBER = 4;
export const PUZZLES_IN_SET = 4;
export const MAX_LEVEL = 20;
export const REACT_APP_API_URL = "https://stepup-api.onrender.com";

export const ACHIEVEMENTS = (t) => [
  {
    title: t("achievements.customer.title"),
    description: t("achievements.customer.description"),
    condition: (userCards) => userCards.length >= 5,
  },
  {
    title: t("achievements.cardsMagnate.title"),
    description: t("achievements.cardsMagnate.description"),
    condition: (userCards) => userCards.length >= 9,
  },
  {
    title: t("achievements.collector.title"),
    description: t("achievements.collector.description"),
    condition: function (userCards, userPuzzleSets) {
      return userPuzzleSets.some((set) => set?.collected === PUZZLES_IN_SET);
    },
  },
  {
    title: t("achievements.beginner.title"),
    description: t("achievements.beginner.description"),
    condition: (userCards, userPuzzleSets, userData) => userData.xp >= 350,
  },
  {
    title: t("achievements.ineedmore.title"),
    description: t("achievements.ineedmore.description"),
    condition: (userCards, userPuzzleSets, userData) => userData.xp >= 1000,
  },
  {
    title: t("achievements.myprecious.title"),
    description: t("achievements.myprecious.description"),
    condition: (userCards, userPuzzleSets, userData) => userData.xp >= 2500,
  },
  {
    title: t("achievements.tester.title"),
    description: t("achievements.tester.description"),
    condition: (userCards, userPuzzleSets, userData) => userData.level >= 5,
  },
  {
    title: t("achievements.opportunist.title"),
    description: t("achievements.opportunist.description"),
    condition: (userCards, userPuzzleSets, userData) => userData.level >= 10,
  },
  {
    title: t("achievements.champion.title"),
    description: t("achievements.champion.description"),
    condition: (userCards, userPuzzleSets, userData) =>
      userData.level === MAX_LEVEL,
  },
];

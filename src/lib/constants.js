export const CARDS_NUMBER = 10
export const PUZZLES_NUMBER = 16
export const PUZZLE_SETS_NUMBER = 4
export const PUZZLES_IN_SET = 4
export const MAX_LEVEL = 20

export const ACHIEVEMENTS = [
    {
        title: "Customer",
        description: "Collect 5 cards",
        image: null,
        condition: (userCards) => userCards.length >= 5
    },
    {
        title: "Cards magnate",
        description: "Collect 9 cards",
        image: null,
        condition: (userCards) => userCards.length >= 9
    },
    {
        title: "Collector",
        description: "Complete your first puzzle set",
        image: null,
        condition: function (userCards, userPuzzleSets) {            
            return userPuzzleSets.some(set => set?.collected === PUZZLES_IN_SET);
        }
    },
    {
        title: "Beginner",
        description: "Reach 500 XP",
        image: null,
        condition: (userCards, userPuzzleSets, userData) => userData.xp >= 350
    },
    {
        title: "I need more!",
        description: "Reach 1000 XP",
        image: null,
        condition: (userCards, userPuzzleSets, userData) => userData.xp >= 1000
    },
    {
        title: "My precious!",
        description: "Reach 2000 XP",
        image: null,
        condition: (userCards, userPuzzleSets, userData) => userData.xp >= 2500
    },
    {
        title: "Tester",
        description: "Reach level 5",
        image: null,
        condition: (userCards, userPuzzleSets, userData) => userData.level >= 5
    },
    {
        title: "Opportunist",
        description: "Reach level 10",
        image: null,
        condition: (userCards, userPuzzleSets, userData) => userData.level >= 10
    },
    {
        title: "Champion",
        description: "Reach max level",
        image: null,
        condition: (userCards, userPuzzleSets, userData) => userData.level === MAX_LEVEL
    },
]
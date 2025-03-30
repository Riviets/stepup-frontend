import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ua: {
    translation: {
      navigation: {
        habits: 'Звички',
        tracker: 'Трекер',
        shop: 'Магазин',
        levels: 'Рівні',
        profile: 'Профіль'
      },
      profile: {
        edit: 'Редагувати',
        logout: 'Вийти',
        stats: 'Статистика',
        language: 'Мова',
        cards: 'Ваші картки',
        emptyCards: 'Тут порожньо...',
        achievements: 'Досягнення',
        level: 'Рівень',
        logoutMessage: 'вийти з аккаунту?'
      },
      achievements: {
        customer: {
          title: 'Покупець',
          description: 'Зберіть 5 карток'
        },
        cardsMagnate: {
          title: 'Магнат карток',
          description: 'Зберіть 9 карток'
        },
        collector: {
          title: 'Колекціонер',
          description: 'Завершіть перший набір пазлів'
        },
        beginner: {
          title: 'Початківець',
          description: 'Досягніть 350 XP'
        },
        ineedmore: {
          title: 'Я хочу більше!',
          description: 'Досягніть 1000 XP'
        },
        myprecious: {
          title: 'Моє золотце!',
          description: 'Досягніть 2500 XP'
        },
        tester: {
          title: 'Тестер',
          description: 'Досягніть 5 рівня'
        },
        opportunist: {
          title: 'Опортуніст',
          description: 'Досягніть 10 рівня'
        },
        champion: {
          title: 'Чемпіон',
          description: 'Досягніть максимального рівня'
        }
      },
      editModal: {
        title: 'Редагувати нікнейм?',
        confirm: 'Підтвердити',
        loading: 'Завантаження...'
      },
      puzzlesModal: {
        title: 'Пазли',
        puzzle: 'Пазл',
        bonus: '+{{value}}% до отриманого XP'
      },
      statsModal: {
        title: 'Додаткова статистика',
        bonusCurrencyPerHabit: 'Бонусна валюта за звичку',
        bonusXpPerDay: 'Бонусний XP за день',
        bonusXpPerHabit: 'Бонусний XP за звичку'
      },
      levels: {
        level: 'Рівень',
        completed: 'Завершено',
        complete: 'Завершити',
        loading: 'Завантаження...',
        rewardsReceived: 'Нагороди за рівень {{levelId}} отримано!',
        setCompleted: ' Ви зібрали повний набір "{{setName}}" і отримали бонус +{{bonusValue}} XP за звичку!',
        serverError: 'Помилка з\'єднання з сервером'
      },
      shop: {
        title: 'Магазин',
        cards: 'Картки',
        bonusHint: 'Кожна придбана картка дає вам бонус',
        collected: 'Зібрано {{current}} з {{total}} карток',
        owned: 'Придбано',
        purchaseSuccess: 'Картку успішно придбано!',
        purchaseError: 'Щось пішло не так. Спробуйте ще раз.',
        serverError: 'Помилка з\'єднання з сервером'
      },
      cardModal: {
        buyPrompt: 'Бажаєте придбати "{{cardName}}"?',
        bonusXpPerHabit: 'XP за виконану звичку',
        bonusCurrencyPerHabit: 'монет за виконану звичку',
        bonusXpPerDay: 'XP за щоденний бонус',
        loading: 'Завантаження...',
        error: 'Помилка: {{message}}'
      },
      tracker: {
        dailyTracker: 'Щоденний трекер',
        analytics: 'Аналітика',
        loading: 'Завантаження...',
        empty: 'Тут порожньо...',
        collectBonus: 'Зібрати бонус',
        bonusReceived: 'Бонус отримано!',
        habitRemoved: 'Звичку видалено з трекера',
        habitCompleted: 'Звичка виконана'
      },
      analytics: {
        title: 'Аналітика',
        dailyCompletions: 'Активність',
        totalStats: 'Загальна статистика',
        totalXp: 'Загальні XP',
        totalCurrency: 'Загальна валюта',
        topHabit: 'Найчастіша звичка',
        completedTimes: 'Виконано {{count}} разів',
        loading: 'Завантаження...',
        error: 'Помилка завантаження даних',
        noData: 'Дані відсутні'
      },
      habits: {
        default: 'Стандартні',
        custom: 'Користувацькі',
        addSomeMore: '+ Додати ще...',
        empty: 'Тут порожньо...',
        habitAddedToTracker: 'Звичку додано до трекера!',
        permanentlyDelete: 'назавжди видалити цю звичку?',
        serverError: 'Помилка з\'єднання з сервером'
      },
      addHabit: {
        title: 'Додати звичку',
        goBack: 'Назад',
        submit: 'Відправити',
        habitTextLabel: 'Текст звички:',
        xpLabel: 'XP:',
        currencyLabel: 'Валюта:',
        habitAdded: 'Звичку додано!',
        placeholder: {
          habitText: 'Текст звички',
          xp: 'XP за звичку',
          currency: 'Валюта за звичку'
        },
        errors: {
          textRequired: 'Введіть текст звички!',
          textTooShort: 'Текст звички має бути довшим за 3 символи',
          textTooLong: 'Текст звички не може бути довшим за 60 символів',
          xpRequired: 'Введіть XP звички!',
          xpTooHigh: 'XP не може бути більше 15 для користувацьких звичок',
          xpTooLow: 'XP має бути більше 0',
          currencyRequired: 'Введіть валюту звички!',
          currencyTooHigh: 'Валюта не може бути більше 10 для користувацьких звичок',
          currencyNegative: 'Валюта не може бути від’ємною'
        }
      },
      editHabit: {
        title: 'Редагувати звичку',
        goBack: 'Назад',
        submit: 'Відправити',
        habitTextLabel: 'Текст звички:',
        xpLabel: 'XP:',
        currencyLabel: 'Валюта:',
        habitEdited: 'Звичку успішно відредаговано!',
        placeholder: {
          habitText: 'Текст звички',
          xp: 'XP за звичку',
          currency: 'Валюта за звичку'
        },
        errors: {
          textRequired: 'Введіть текст звички!',
          textTooShort: 'Текст звички має бути довшим за 3 символи',
          textTooLong: 'Текст звички не може бути довшим за 60 символів',
          xpRequired: 'Введіть XP звички!',
          xpTooHigh: 'XP не може бути більше 15 для користувацьких звичок',
          xpTooLow: 'XP має бути більше 0',
          currencyRequired: 'Введіть валюту звички!',
          currencyTooHigh: 'Валюта не може бути більше 10 для користувацьких звичок',
          currencyNegative: 'Валюта не може бути від’ємною'
        }
      },
      noMatch: {
        message: 'Тут нічого робити!',
        goBack: 'Назад'
      },
      confirmModal: {
        confirmPrompt: 'Ви впевнені, що хочете {{message}}',
        yes: 'Так',
        no: 'Ні'
      },
      friends: {
        goBack: 'Назад',
        findFriends: 'Знайти друзів 🔍',
        friendRequests: 'Запити на дружбу',
        yourFriends: 'Ваші друзі',
        noFriends: 'Немає друзів'
      },
      friendsList: {
        proposeHabit: 'Запропонувати звичку',
        deleteFriend: 'видалити цього користувача зі списку друзів'
      },
      findFriendsModal: {
        title: 'Знайти нових друзів!',
        placeholder: 'Введіть тут',
        usersWillBeShown: 'Користувачі будуть показані тут',
        noUsersFound: 'Користувачів не знайдено!',
        sendRequest: 'Надіслати запит',
        requestSent: 'Запит надіслано',
        serverError: 'Помилка з\'єднання з сервером'
      },
      friendRequests: {
        noRequests: 'Поки що немає запитів...'
      }
    }
  },
  en: {
    translation: {
      navigation: {
        habits: 'Habits',
        tracker: 'Tracker',
        shop: 'Shop',
        levels: 'Levels',
        profile: 'Profile'
      },
      profile: {
        edit: 'Edit',
        logout: 'Log out',
        stats: 'Stats',
        language: 'Language',
        cards: 'Your cards',
        emptyCards: 'So Empty Here...',
        achievements: 'Achievements',
        level: 'Level',
        logoutMessage: 'logout?'
      },
      achievements: {
        customer: {
          title: 'Customer',
          description: 'Collect 5 cards'
        },
        cardsMagnate: {
          title: 'Cards magnate',
          description: 'Collect 9 cards'
        },
        collector: {
          title: 'Collector',
          description: 'Complete your first puzzle set'
        },
        beginner: {
          title: 'Beginner',
          description: 'Reach 350 XP'
        },
        ineedmore: {
          title: 'I need more!',
          description: 'Reach 1000 XP'
        },
        myprecious: {
          title: 'My precious!',
          description: 'Reach 2500 XP'
        },
        tester: {
          title: 'Tester',
          description: 'Reach level 5'
        },
        opportunist: {
          title: 'Opportunist',
          description: 'Reach level 10'
        },
        champion: {
          title: 'Champion',
          description: 'Reach max level'
        }
      },
      editModal: {
        title: 'Edit Nickname?',
        confirm: 'Confirm',
        loading: 'Loading...'
      },
      puzzlesModal: {
        title: 'Puzzles',
        puzzle: 'Puzzle',
        bonus: '+{{value}}% to the earned XP'
      },
      statsModal: {
        title: 'Additional Stats',
        bonusCurrencyPerHabit: 'Bonus currency per habit',
        bonusXpPerDay: 'Bonus XP per day',
        bonusXpPerHabit: 'Bonus XP per habit'
      },
      levels: {
        level: 'Level',
        completed: 'Completed',
        complete: 'Complete',
        loading: 'Loading...',
        rewardsReceived: 'Rewards for level {{levelId}} received!',
        setCompleted: ' You have collected the full set "{{setName}}" and received a bonus +{{bonusValue}} XP per habit!',
        serverError: 'Server connection error'
      },
      shop: {
        title: 'Shop',
        cards: 'Cards',
        bonusHint: 'Each owned card gives you a bonus',
        collected: 'Collected {{current}} out of {{total}} cards',
        owned: 'Owned',
        purchaseSuccess: 'Successfully purchased card!',
        purchaseError: 'Something went wrong. Please try again.',
        serverError: 'Server connection error'
      },
      cardModal: {
        buyPrompt: 'Would you like to buy "{{cardName}}"?',
        bonusXpPerHabit: 'XP per completed habit',
        bonusCurrencyPerHabit: 'coins per completed habit',
        bonusXpPerDay: 'XP per daily bonus',
        loading: 'Loading...',
        error: 'Error: {{message}}'
      },
      tracker: {
        dailyTracker: 'Daily tracker',
        analytics: 'Analytics',
        loading: 'Loading...',
        empty: 'So Empty Here...',
        collectBonus: 'Collect bonus',
        bonusReceived: 'Bonus received!',
        habitRemoved: 'Habit was removed from the tracker',
        habitCompleted: 'Habit completed'
      },
      analytics: {
        title: 'Analytics',
        dailyCompletions: 'Daily Completions',
        totalStats: 'Total Stats',
        totalXp: 'Total XP',
        totalCurrency: 'Total Currency',
        topHabit: 'Top Habit',
        completedTimes: 'Completed {{count}} times',
        loading: 'Loading...',
        error: 'Error loading data',
        noData: 'No data available'
      },
      habits: {
        default: 'Default',
        custom: 'Custom',
        addSomeMore: '+ Add Some More...',
        empty: 'So empty here...',
        habitAddedToTracker: 'Habit was added to the tracker!',
        permanentlyDelete: 'Permanently delete this habit?',
        serverError: 'Server connection error'
      },
      addHabit: {
        title: 'Add Habit',
        goBack: 'Go Back',
        submit: 'Submit',
        habitTextLabel: 'Habit Text:',
        xpLabel: 'XP:',
        currencyLabel: 'Currency:',
        habitAdded: 'Habit added!',
        placeholder: {
          habitText: 'Habit Text',
          xp: 'XP per habit',
          currency: 'Currency per habit'
        },
        errors: {
          textRequired: 'Enter habit text!',
          textTooShort: 'Habit text should be longer than 3 symbols',
          textTooLong: 'Habit text should not be longer than 60 symbols',
          xpRequired: 'Enter habit XP!',
          xpTooHigh: 'XP can not be more than 15 for custom habits',
          xpTooLow: 'XP must be greater than 0',
          currencyRequired: 'Enter habit currency!',
          currencyTooHigh: 'Currency can not be more than 10 for custom habits',
          currencyNegative: 'Currency cannot be negative'
        }
      },
      editHabit: {
        title: 'Edit Habit',
        goBack: 'Go Back',
        submit: 'Submit',
        habitTextLabel: 'Habit Text:',
        xpLabel: 'XP:',
        currencyLabel: 'Currency:',
        habitEdited: 'Habit edited successfully!',
        placeholder: {
          habitText: 'Habit Text',
          xp: 'XP per habit',
          currency: 'Currency per habit'
        },
        errors: {
          textRequired: 'Enter habit text!',
          textTooShort: 'Habit text should be longer than 3 symbols',
          textTooLong: 'Habit text should not be longer than 60 symbols',
          xpRequired: 'Enter habit XP!',
          xpTooHigh: 'XP can not be more than 15 for custom habits',
          xpTooLow: 'XP must be greater than 0',
          currencyRequired: 'Enter habit currency!',
          currencyTooHigh: 'Currency can not be more than 10 for custom habits',
          currencyNegative: 'Currency cannot be negative'
        }
      },
      noMatch: {
        message: 'Nothing to do here!',
        goBack: 'Go Back'
      },
      confirmModal: {
        confirmPrompt: 'Are you sure you want to {{message}}?',
        yes: 'Yes',
        no: 'No'
      },
      friends: {
        goBack: 'Go Back',
        findFriends: 'Find friends 🔍',
        friendRequests: 'Friend requests',
        yourFriends: 'Your Friends',
        noFriends: 'No friends'
      },
      friendsList: {
        proposeHabit: 'Propose habit',
        deleteFriend: 'delete this user from your friends list'
      },
      findFriendsModal: {
        title: 'Find new friends!',
        placeholder: 'Enter here',
        usersWillBeShown: 'Users will be shown here',
        noUsersFound: 'No users found!',
        sendRequest: 'Send request',
        requestSent: 'Request sent',
        serverError: 'Server connection error'
      },
      friendRequests: {
        noRequests: 'No requests yet...'
      }
    }
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ua',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
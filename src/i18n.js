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
        level: 'Рівень'
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
        level: 'Level'
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
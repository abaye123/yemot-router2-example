# התחלה מהירה

## את תיעוד הספריה ניתן לראות כאן https://github.com/ShlomoCode/yemot-router2

## דרישות מקדימות
לפני הפעלת האפליקציה, וודאו שהכלים הבאים מותקנים בשרת:
* Node.js (גרסה 20.0.0 ומעלה)
* npm (מגיע כחלק מההתקנה של Node.js)

## התקנה
1. הורידו את קוד המקור כקובץ ZIP (או שבט מהמקור) ופתחו אותו בתיקייה הרצויה.

2. התקינו את חבילות ה-npm הנדרשות:
```bash
npm install
```

1. הגדירו את קובץ ה`.env` בתיקיית הפרויקט והגדירו את משתני הסביבה הנדרשים:
```
PORT=7232
```

## הפעלה

### סביבת פיתוח
להפעלת האפליקציה בסביבת פיתוח:
```bash
npm run dev
```

### סביבת ייצור
להפעלת האפליקציה בסביבת ייצור:
```bash
npm start
```

> טיפ: אנחנו ממליצים להשתמש במודול pm2 לשימוש רציף בסביבת פרודקשן

### הגדרה בימות המשיח

```bash
type=api
title=app-name
api_link=https://ex.abaye.co/p/call?key=l3t69qCKlY4
api_url_post=yes
api_end_goto=/
```

שים לב להגדיר את הלינק האמיתי לשרת הפרודקשן שלך, ואת הkey המאומת

## רישיון
כפי המצויין בגיטהאב

## יצירת קשר
* email: cs@abaye.co
* site: https://abaye.co/

לדיווח באג יש לפתוח issue

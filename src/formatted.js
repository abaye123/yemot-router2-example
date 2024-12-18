import moment from 'moment-timezone';
import 'moment/locale/he.js';


export function formatCurrency(amount) {
    amount = amount.toString();
    amount = amount.replace(/-/g, "");

    // Ensure the amount has two decimal places
    amount = parseFloat(amount).toFixed(2);
    // Split the amount into shekels and agorot
    const [shekels, agorot] = amount.split('.');
    // Convert the shekels and agorot to integers
    const shekelsInt = parseInt(shekels, 10);
    const agorotInt = parseInt(agorot, 10);
    // Create the formatted string
    let result = '';
    if (shekelsInt > 0) {
        result += shekelsInt === 1 ? 'שקל' : shekelsInt + ' שקלים';
    }
    if (agorotInt > 0) {
        if (result) result += ' ו ';
        result += agorotInt + ' אגורות';
    }
    return result || '0 שקלים';
}


function formatMinutes(minutes) {
    if (typeof minutes !== 'number' || minutes < 0) {
        throw new Error('Invalid input: minutes should be a non-negative number.');
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    let formattedTime = '';
    if (hours > 0) {
        if (hours === 1) {
            formattedTime += 'שעה אחת';
        } else {
            formattedTime += `${hours} שעות`;
        }
        if (remainingMinutes > 0) {
            formattedTime += ` ו${remainingMinutes} דקות`;
        }
    } else {
        formattedTime = `${remainingMinutes} דקות`;
    }

    return formattedTime;
}


const convertUTCToIsraelTime = (utcDatetime) => {
    // הגדרת הפורמט העברי
    moment.locale('he');

    // המרת הזמן לאזור זמן ירושלים
    const israelTime = moment.tz(utcDatetime, 'UTC').tz('Asia/Jerusalem');

    // החזרת הזמן בפורמט קריא בעברית
    return 'יום ' + israelTime.format('LLLL');
};


export function formatGreeting() {
    const nowInIsrael = moment.tz("Asia/Jerusalem");
    const currentHour = nowInIsrael.hour();

    let greeting;
    if (currentHour >= 5 && currentHour < 12) {
        greeting = "בוקר טוב";
    } else if (currentHour >= 12 && currentHour < 16) {
        greeting = "צהריים טובים";
    } else if (currentHour >= 16 && currentHour < 18) {
        greeting = "אחר צהריים טובים";
    } else if (currentHour >= 18 && currentHour < 23) {
        greeting = "ערב טוב";
    } else {
        greeting = "לילה טוב";
    }

    return greeting;
}


export function formatOpenHours(str) {
    if (!str) return '';

    const daysMap = {
        'א': 'אָלֶף',
        'ב': 'בֵּית',
        'ג': 'גִּימֶל',
        'ד': 'דָּלֶת',
        'ה': 'הֵא',
        'ו': 'וָו'
    };

    let parts = str.split(' ');

    parts = parts.map(part => {
        // אם זה טווח ימים (א-ה)
        if (/^[א-ו]-[א-ו]$/.test(part)) {
            const [start, end] = part.split('-');
            return `ימים ${daysMap[start]} עד ${daysMap[end]}`;
        }
        // אם זה טווח שעות (5-6 או 8-9)
        if (/^\d+-\d+$/.test(part)) {
            const [start, end] = part.split('-');
            return `בין השעות ${start} עד ${end}`;
        }

        return part;
    });

    return parts.join(' ');
}


export function separateChars(str) {
    if (!str) return '';
    return str.split('').join(', ');
}
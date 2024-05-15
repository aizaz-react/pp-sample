import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import { toast } from 'react-toastify';
import validator from 'validator';
import { ProximaNova } from './theme';

export const getFileUrl = (file) =>
  typeof file === 'object' ? URL.createObjectURL(file) : file;

export const getAvatarChar = (string) =>
  typeof string === 'string' ? string.charAt() : '';

export const getUserDetails = () => {
  try {
    const token =
      !!Cookies.get('authToken') && Cookies.get('authToken') !== 'undefined'
        ? JSON.parse(`${Cookies.get('authToken')}`)
        : '';
    if (!token?.accessToken) return '';
    return jwt_decode(token.accessToken);
  } catch (error) {
    window.location.href = '/auth/login';
    Cookies.remove('authToken');
    console.error(error);
  }
};

export const getPreviousWeekDates = (date) => {
  const firstDayOfCurrentWeek = new Date(date);
  firstDayOfCurrentWeek.setDate(date.getDate() - date.getDay()); // Get the first day (Sunday) of the current week

  const lastDayOfPreviousWeek = new Date(firstDayOfCurrentWeek);
  lastDayOfPreviousWeek.setDate(firstDayOfCurrentWeek.getDate() - 1); // Get the last day (Saturday) of the previous week

  const firstDayOfPreviousWeek = new Date(lastDayOfPreviousWeek);
  firstDayOfPreviousWeek.setDate(lastDayOfPreviousWeek.getDate() - 6); // Get the first day (Sunday) of the previous week

  return {
    start: firstDayOfPreviousWeek,
    end: lastDayOfPreviousWeek
  };
};

export const getPreviousMonthDates = (date) => {
  const firstDayOfCurrentMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  );
  const firstDayOfPreviousMonth = new Date(firstDayOfCurrentMonth);
  firstDayOfPreviousMonth.setMonth(firstDayOfCurrentMonth.getMonth() - 1);

  const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth);
  lastDayOfPreviousMonth.setDate(firstDayOfCurrentMonth.getDate() - 1);

  return {
    start: firstDayOfPreviousMonth,
    end: lastDayOfPreviousMonth
  };
};

export const getPreviousYearDates = (date) => {
  const firstDayOfCurrentYear = new Date(date.getFullYear(), 0, 1);
  const firstDayOfPreviousYear = new Date(firstDayOfCurrentYear);
  firstDayOfPreviousYear.setFullYear(firstDayOfCurrentYear.getFullYear() - 1);

  const lastDayOfPreviousYear = new Date(firstDayOfCurrentYear);
  lastDayOfPreviousYear.setDate(firstDayOfCurrentYear.getDate() - 1);

  return {
    start: firstDayOfPreviousYear,
    end: lastDayOfPreviousYear
  };
};

export const getNextOrCurrentWeekDates = (date) => {
  const today = new Date(moment().format('yyyy-MM-DD'));
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - today.getDay()); // Get the first day (Sunday) of the current week
  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6); // Get the last day (Saturday) of the current week

  if (currentWeekStart.toDateString() !== date.toDateString()) {
    const nextWeekStart = new Date(date);
    nextWeekStart.setDate(date.getDate() + (7 - date.getDay()));

    const nextWeekEnd = new Date(nextWeekStart);
    nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
    return {
      start: nextWeekStart,
      end: nextWeekEnd
    };
  } else {
    return {
      start: currentWeekStart,
      end: currentWeekEnd
    };
  }
};

export const getNextMonthDates = (date) => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  if (date <= firstDayOfMonth) {
    const firstDayOfCurrentMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    );
    const firstDayOfNextMonth = new Date(firstDayOfCurrentMonth);
    firstDayOfNextMonth.setMonth(date.getMonth() + 1);

    const lastDayOfNextMonth = new Date(firstDayOfNextMonth);
    lastDayOfNextMonth.setMonth(firstDayOfNextMonth.getMonth() + 1, 0);

    return {
      start: firstDayOfNextMonth,
      end: lastDayOfNextMonth
    };
  } else {
    return getCurrentMonthDates(); // Return the current month's dates if the provided date's month is greater than the current month
  }
};

const getCurrentMonthDates = () => {
  const today = new Date();
  const firstDayOfCurrentMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );
  const lastDayOfCurrentMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  );

  return {
    start: firstDayOfCurrentMonth,
    end: lastDayOfCurrentMonth
  };
};

export const getNextYearDates = (date) => {
  const today = new Date();
  if (date.getFullYear() < today.getFullYear()) {
    const firstDayOfCurrentYear = new Date(date.getFullYear(), 0, 1);
    const firstDayOfNextYear = new Date(firstDayOfCurrentYear);
    firstDayOfNextYear.setFullYear(date.getFullYear() + 1);

    const lastDayOfNextYear = new Date(firstDayOfNextYear);
    lastDayOfNextYear.setFullYear(firstDayOfNextYear.getFullYear(), 11, 31);

    return {
      start: firstDayOfNextYear,
      end: lastDayOfNextYear
    };
  } else {
    return getCurrentYearDates(); // Return the current year's dates if the provided date's year is greater than the current year
  }
};

const getCurrentYearDates = () => {
  const today = new Date();
  const firstDayOfCurrentYear = new Date(today.getFullYear(), 0, 1);
  const lastDayOfCurrentYear = new Date(today.getFullYear(), 11, 31);

  return {
    start: firstDayOfCurrentYear,
    end: lastDayOfCurrentYear
  };
};

export const getCurrentWeekDates = (date) => {
  const today = new Date();
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - today.getDay()); // Get the first day (Sunday) of the current week

  const currentWeekEnd = new Date(currentWeekStart);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 6); // Get the last day (Saturday) of the current week

  return {
    start: currentWeekStart,
    end: currentWeekEnd
  };
};

export const previousDates = {
  Week: getPreviousWeekDates,
  Month: getPreviousMonthDates,
  Year: getPreviousYearDates
};

export const nextDates = {
  Week: getNextOrCurrentWeekDates,
  Month: getNextMonthDates,
  Year: getNextYearDates
};

export const currentDates = {
  Week: getCurrentWeekDates,
  Month: getCurrentMonthDates,
  Year: getCurrentYearDates
};

export const renderDates = {
  Week: ({ startDate, endDate }) => {
    return `${startDate} - ${endDate}`;
  },
  Month: ({ startDate }) => {
    return `${moment(startDate).format('MMMM yyyy')} `;
  },
  Year: ({ startDate }) => {
    return `${moment(startDate).format('yyyy')} `;
  }
};

export const getDirtyValues = (values, initialObject) => {
  const data = { ...values };
  const keyValues = Object.keys(data);

  const dirtyValues = keyValues.filter(
    (keyValue) => data[keyValue] !== initialObject[keyValue]
  );

  keyValues.forEach((key) => {
    if (!dirtyValues.includes(key)) delete data[key];
  });

  return data;
};

export const isBase64 = (input) => {
  return !validator.isBase64(input);
};

export const renderResponse = ({ id = '', string, theme }) => {
  try {
    const codeBlockRegex = /```([\s\S]+?)```/g;
    const linkRegex =
      /(((http?|https?|ftp):\/\/|www\.)[^\s/$.?#].[^\s\'\`\)]*)/g;
    let index = 0;

    return string
      .replace(/\*\*(.*?)\*\*/g, (match, result) => {
        return `<b>${result}</b>`;
      })
      .replace(/(\d+\.\s*.*?:\s)/g, (match, result) => {
        return `<b>${result}</b>`;
      })
      .replace(/\n/g, '<br>')
      .replace(codeBlockRegex, (match, codeBlock) => {
        const uniqueID = `codeBlock${index}-${id}`;
        index++;
        const codeBlock2 = codeBlock.replaceAll('<br>', '\n');
        if (!codeBlock2.includes('\n')) return codeBlock2;
        const [mode, unFormatCode] = splitStringAtFirstMatch(codeBlock2, '\n');
        const code = unFormatCode
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
        return `
          <div
            style="
              border-radius: 6px;
              display: block;
              background-color: #122933;
              font-size: 14px;
              overflow: hidden;
              box-shadow: 0px 0px 3px -2px #fff;
              width:100%;"
          >
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #0A212A;
                padding: 0.5rem 1rem;
              "
            >
              <p style="color: ${
                theme.palette.text.primary
              }; text-transform: capitalize;">${mode || 'Code'}</p>
              <button style="
                border: none;
                padding: 0.2rem 0.7rem;
                border-radius: 5px;
                box-shadow: 0px 0px 3px -1px #ffff;
                background: transparent;
                font-size: 14px;
                font-family: ${ProximaNova.style.fontFamily};
                color: #D1D5DE;
                cursor:pointer;
              " onclick="handleClick('${uniqueID}')">Copy</button>
            </div>
            <pre class="code-block" style="margin-top:-0.3rem;">
              <code id="${uniqueID}" class="language-${mode} " >${code}</code>
        </pre>
            </div>
          </div>
        `;
      })
      .replace(/`([<])/g, '`&lt;')
      .replace(/`[]>]/g, '&gt;')
      .replace(/`([^`]+)`/g, '<b>`$1`</b>')
      .replace(
        linkRegex,
        '<a href="$1" style="color:white" target="_blank";">$1</a>'
      );
  } catch (error) {
    return '';
  }
};

export const megabytesToBytes = (megabytes) => {
  const bytesInAMegabyte = 1024 * 1024; // 1 megabyte = 1024 kilobytes * 1024 bytes
  return megabytes * bytesInAMegabyte;
};

export const checkAllFiles = ({ files, formats }) => {
  const ext = files[0].name.split('.').pop().toLowerCase();
  return files.every((file) => {
    const curExt = file.name.split('.').pop().toLowerCase();
    return (
      curExt === ext &&
      formats.some((format) =>
        curExt.toString().toLowerCase().includes(format.toLowerCase())
      )
    );
  });
};

export function isImageFile(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

  return imageExtensions.includes(ext);
}

export const imageModel = (slug) => {
  const models = ['dalle', 'sdxl'];
  return models.some((modal) => modal === slug);
};

export const extractDomainFromEmail = (email) => {
  const split = email.split('@').pop();
  const DomainName = split.padStart(split.length + 1, '@');

  return DomainName;
};

export const getModelRole = (role) => {
  const roles = ['assistant', 'system'];
  return roles.some((item) => item === role);
};
export const replaceContentWithUserRole = (data, title, inference_time) => {
  return {
    inference_time,
    hyperparameters: data.post_challange.hyperparameters,
    prompts: data.post_challange.prompts,
    product: data.post_challange.model,
    message: data.response.choices[0].message,
    usage: data.response.usage,
    vault_id: data.post_challange.vault,
    prompt: title || ''
  };
};
export const getInferenceTime = (startTime) => {
  const endTime = performance.now();
  const timeDiff = endTime - startTime; // in milliseconds
  const inference_time = (timeDiff / 1000).toFixed(2); // convert to seconds
  return inference_time;
};
export const splitStringAtFirstMatch = (inputString, delimiter) => {
  var index = inputString.indexOf(delimiter);
  if (index !== -1) {
    var firstPart = inputString.substring(0, index);
    var secondPart = inputString.substring(index + delimiter.length);
    return [firstPart, secondPart];
  } else {
    // Return the original string if the delimiter is not found
    return [inputString, ''];
  }
};
export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  toast.info('Copied to clipboard');
};

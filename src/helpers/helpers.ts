import {
  FILE_EXTENSION_DOC,
  FILE_EXTENSION_DOCX,
  FILE_EXTENSION_HEIC,
  FILE_EXTENSION_JPEG,
  FILE_EXTENSION_JPG,
  FILE_EXTENSION_PDF,
  FILE_EXTENSION_PNG,
} from '../constants/fileExtensions';
import LOCAL_STORAGE_KEY_SCROLL_TRACKING from '../constants/localStorageKeyConstants';
import {
  NUTRIENT_COLOR_CODE,
  SUPPLEMENT_COLOR_CODE,
} from '../constants/Supplements';
import { User } from '../types/user/user';

type ScrollData = {
  scrollY: string;
  pathname: string;
};

const notEmptyKey = (key: any) => {
  return key != null && key !== '';
};

const isEmpty = (value: any) => {
  return value == null || value === '' || JSON.stringify(value) === '{}';
};

const isExpired = () => {
  return false; // No need to check for expired sites.
};

const hasRoles = (user: User) => {
  return user?.roles && user?.roles?.length > 0;
};

const convertToSlug = (text = '') => {
  if (!text) return '';
  return text
    .toLowerCase() // Convert the text to lowercase
    .replace(/[\W_]+/g, '-') // Replace non-word characters with dashes
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
};

const convertToSentence = (slug = '') => {
  if (!slug) return '';
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const capitalizeFirstLetter = (text = '') => {
  if (text === '' || text === null || text === undefined) {
    return '';
  }
  const textArray = text.split('_');
  let capitalizedWord = '';
  if (textArray.length === 1) {
    capitalizedWord =
      textArray[0].charAt(0).toUpperCase() + textArray[0].slice(1);
  } else {
    let capitalizedWords = '';
    textArray.forEach((element, key) => {
      if (key === 0) {
        capitalizedWord = element.charAt(0).toUpperCase() + element.slice(1);
      } else {
        capitalizedWord = element;
      }

      capitalizedWords = capitalizedWords.concat(' ', capitalizedWord);
    });
    capitalizedWord = capitalizedWords;
  }
  return capitalizedWord.trim();
};

const findNutrientColor = (key: string) => {
  if (key) {
    return NUTRIENT_COLOR_CODE[key];
  }
  return null;
};

const findSupplementColor = (key: string) => {
  if (key) {
    return SUPPLEMENT_COLOR_CODE[key];
  }
  return null;
};

const limitWords = (sentence = '', maxLength = 0) => {
  if (sentence === '' || sentence === null || sentence === undefined) return '';
  if (maxLength === 0) return sentence;
  const wordsArray = sentence.split(' ');
  if (wordsArray.length <= maxLength) return sentence;
  const limitedWordsArray = wordsArray.slice(0, maxLength);
  return limitedWordsArray.join(' ').concat('...');
};

const getLocalStorageData = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {};
};

const prepareDynamicUrl = (urlConstant: string, id: any) => {
  if (
    (urlConstant === undefined || urlConstant === '') &&
    (id === undefined || id === '')
  ) {
    return '/';
  }

  if (urlConstant && (id === undefined || id === '')) {
    return urlConstant;
  }

  return urlConstant
    .split('/')
    .map((item) => (item === ':id' ? id : item))
    .join('/');
};

const convertToCamelCase = (inputString: any) => {
  if (inputString === '' || inputString === null || inputString === undefined)
    return '';
  let convertedString = inputString.replace(/[^a-zA-Z0-9]/g, ' ');
  convertedString = convertedString.replace(/[_-]/g, ' ');
  convertedString = convertedString
    .split(' ')
    .map((item: string) => item.toLowerCase())
    .join(' ');
  convertedString = convertedString.replace(
    /\s(\w)/g,
    (match: string, letter: string) => letter.toUpperCase()
  );
  convertedString =
    convertedString.charAt(0).toLowerCase() + convertedString.slice(1);
  return convertedString.split(' ').join('');
};

const getLocalStorageScrollData = (pathname: string) => {
  let scrollYValue = 0;
  const encodedData = localStorage.getItem(LOCAL_STORAGE_KEY_SCROLL_TRACKING);
  const scrollData: ScrollData[] = encodedData ? JSON.parse(encodedData) : [];
  if (scrollData.length > 0) {
    const filteredData = scrollData.find((item) => item.pathname === pathname);
    if (filteredData) {
      scrollYValue = Number(filteredData.scrollY);
    }
  }
  return scrollYValue;
};

const setLocalStorageScrollData = (pathname: string, scrollYVal: string) => {
  let preserveData = [];
  const encodedData = localStorage.getItem(LOCAL_STORAGE_KEY_SCROLL_TRACKING);
  const scrollData: ScrollData[] = encodedData ? JSON.parse(encodedData) : [];

  if (scrollData.length === 0) {
    preserveData = [
      {
        scrollY: scrollYVal,
        pathname,
      },
    ];
  } else {
    let filteredData = scrollData.find((item) => item.pathname === pathname);
    const previousData = scrollData.filter(
      (item) => item.pathname !== pathname
    );
    if (filteredData) {
      filteredData = { ...filteredData, scrollY: scrollYVal };
      preserveData = [...previousData, filteredData];
    } else {
      preserveData = [
        ...previousData,
        {
          scrollY: scrollYVal,
          pathname,
        },
      ];
    }
  }

  localStorage.setItem(
    LOCAL_STORAGE_KEY_SCROLL_TRACKING,
    JSON.stringify(preserveData)
  );
};

type CustomFileDownloaderProps = {
  fileData: Blob | File;
  fileName: string;
  fileExtension: string;
};

const customFileDownloader = ({
  fileData,
  fileName,
  fileExtension,
}: CustomFileDownloaderProps) => {
  const url = window.URL.createObjectURL(fileData);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.${fileExtension}`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
  return null;
};

const firstCharOfWords = (words: any) => {
  if (words === '' || words === undefined || words === null) {
    return '';
  }
  return words
    .split(' ')
    .map((word: string) => word.charAt(0))
    .join('');
};

const capitalizeWordFirstLetter = (text = '', splitter = ' ') => {
  if (text === '' || text === null || text === undefined) {
    return '';
  }
  const textArray = text.split(splitter);

  let capitalizedWord = '';
  if (textArray.length === 1) {
    capitalizedWord =
      textArray[0].charAt(0).toUpperCase() + textArray[0].slice(1);
  } else {
    let capitalizedWords = '';
    textArray.forEach((element) => {
      capitalizedWord = element.charAt(0).toUpperCase() + element.slice(1);
      capitalizedWords = capitalizedWords.concat(' ', capitalizedWord);
    });
    capitalizedWord = capitalizedWords;
  }
  return capitalizedWord.trim();
};

const findFileIconFromExtension = (fileExtension: string) => {
  switch (fileExtension) {
    case FILE_EXTENSION_JPEG:
      return 'bx bxs-file-image';
    case FILE_EXTENSION_JPG:
      return 'bx bxs-file-image';
    case FILE_EXTENSION_PNG:
      return 'bx bxs-file-image';
    case FILE_EXTENSION_HEIC:
      return 'bx bxs-file-image';
    case FILE_EXTENSION_PDF:
      return 'bx bxs-file-pdf';
    case FILE_EXTENSION_DOCX:
      return 'bx bxs-file-doc';
    case FILE_EXTENSION_DOC:
      return 'bx bxs-file-doc';
    default:
      return 'bx bxs-file';
  }
};

export {
  notEmptyKey,
  isExpired,
  isEmpty,
  hasRoles,
  convertToSlug,
  capitalizeFirstLetter,
  findNutrientColor,
  findSupplementColor,
  limitWords,
  getLocalStorageData,
  prepareDynamicUrl,
  convertToCamelCase,
  convertToSentence,
  getLocalStorageScrollData,
  setLocalStorageScrollData,
  customFileDownloader,
  firstCharOfWords,
  capitalizeWordFirstLetter,
  findFileIconFromExtension,
};

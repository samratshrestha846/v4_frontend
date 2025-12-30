import {
  DEVICE_CONFIGURATION_TYPE_UDOSE,
  DEVICE_CONFIGURATION_TYPE_UDOSE_MINI,
} from '../constants/constants';

// eslint-disable-next-line import/prefer-default-export
export const deviceConfigurationNameFormat = (name: string) => {
  if (
    name === DEVICE_CONFIGURATION_TYPE_UDOSE_MINI ||
    name === DEVICE_CONFIGURATION_TYPE_UDOSE
  ) {
    const textname = name.split(' ');
    return textname
      .map((word, index) => {
        if (index === 0) {
          return word.charAt(0) + word.charAt(1).toUpperCase() + word.slice(2);
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
};

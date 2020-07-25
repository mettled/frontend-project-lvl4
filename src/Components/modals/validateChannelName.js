import { useTranslation } from 'react-i18next';

const validateChannelName = (collectionChannels) => {
  const { t } = useTranslation();

  return ({ channelName }) => {
    const errors = {};
    const isUniqName = channelName && collectionChannels.find((name) => name === channelName);
    if (!channelName) {
      errors.channelName = t('errors.required');
    } else if (isUniqName) {
      errors.channelName = t('errors.noUniqChannelName');
    } else if (!/\S/gi.test(channelName)) {
      errors.channelName = t('errors.nospace');
    } else if (channelName.length > 20) {
      errors.channelName = t('errors.maxSymbol', { length: 20 });
    }
    return errors;
  };
};

export default validateChannelName;

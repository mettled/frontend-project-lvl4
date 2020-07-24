import { useTranslation } from 'react-i18next';

const useValidateChannelName = (collectionChannels) => {
  const { t } = useTranslation();

  return ({ value }) => {
    const errors = {};
    const isUniqName = value && collectionChannels.find((name) => name === value);
    if (!value) {
      errors.value = t('errors.required');
    } else if (isUniqName) {
      errors.value = t('errors.noUniqChannelName');
    } else if (!/\S/gi.test(value)) {
      errors.value = t('errors.nospace');
    } else if (value.length > 20) {
      errors.value = t('errors.maxSymbol', { length: 20 });
    }
    return errors;
  };
};
export default useValidateChannelName;

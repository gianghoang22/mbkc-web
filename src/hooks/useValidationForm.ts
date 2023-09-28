import * as yup from 'yup';
import useLocales from './useLocales';
import { Language } from 'common/enum';

function useValidationForm() {
  const { translate, currentLang } = useLocales();

  const schemaStore = yup.object({
    Name: yup.string().required(
      translate('page.validation.required', {
        name: translate(
          'page.form.nameExchange',
          currentLang.value === Language.ENGLISH
            ? {
                model: translate('model.lowercase.store'),
                name: translate('page.form.nameLower'),
              }
            : {
                model: translate('page.form.nameLower'),
                name: translate('model.lowercase.store'),
              }
        ),
      })
    ),
    StoreManagerEmail: yup.string().email().required(),
    // kitchenCenter: yup
    //   .string()
    //   .required(translate('page.validation.select', { name: translate('model.lowercase.kitchenCenter') })),
    // brand: yup.string().required(translate('page.validation.select', { name: translate('model.lowercase.brand') })),
  });

  const schemaBrand = yup.object({
    name: yup.string().required(
      translate('page.validation.required', {
        name: translate(
          'page.form.nameExchange',
          currentLang.value === Language.ENGLISH
            ? {
                model: translate('model.lowercase.brand'),
                name: translate('page.form.nameLower'),
              }
            : {
                model: translate('page.form.nameLower'),
                name: translate('model.lowercase.brand'),
              }
        ),
      })
    ),
    email: yup
      .string()
      .required(translate('page.validation.required', { name: translate('model.lowercase.managerEmail') })),
    address: yup
      .string()
      .required(translate('page.validation.required', { name: translate('table.lowercase.address') })),
  });

  return { schemaStore, schemaBrand };
}

export default useValidationForm;

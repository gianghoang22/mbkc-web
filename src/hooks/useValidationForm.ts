import * as yup from 'yup';
import useLocales from './useLocales';
import { Language } from 'common/enum';

function useValidationForm() {
  const { translate, currentLang } = useLocales();

  const schemaStore = yup.object({
    name: yup.string().required(
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
    storeManagerEmail: yup.string().required(
      translate('page.validation.required', {
        name: translate('table.lowercase.email'),
      })
    ),
    kitchenCenterId: yup
      .number()
      .typeError(translate('page.validation.select', { name: translate('model.lowercase.kitchenCenter') }))
      .required(translate('page.validation.select', { name: translate('model.lowercase.kitchenCenter') })),
    brandId: yup
      .number()
      .typeError(translate('page.validation.select', { name: translate('model.lowercase.brand') }))
      .required(translate('page.validation.select', { name: translate('model.lowercase.brand') })),
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

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
    kitchenCenter: yup
      .string()
      .required(translate('page.validation.select', { name: translate('model.lowercase.kitchenCenter') })),
    brand: yup.string().required(translate('page.validation.select', { name: translate('model.lowercase.brand') })),
  });

  return { schemaStore };
}

export default useValidationForm;

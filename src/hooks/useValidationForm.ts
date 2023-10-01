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

  const schemaCategory = yup.object({
    name: yup.string().required(
      translate('page.validation.required', {
        name: translate(
          'page.form.nameExchange',
          currentLang.value === Language.ENGLISH
            ? {
                model: translate('model.lowercase.category'),
                name: translate('page.form.nameLower'),
              }
            : {
                model: translate('page.form.nameLower'),
                name: translate('model.lowercase.category'),
              }
        ),
      })
    ),
    code: yup.string().required(
      translate('page.validation.required', {
        name: translate(
          'page.form.nameExchange',
          currentLang.value === Language.ENGLISH
            ? {
                model: translate('model.lowercase.category'),
                name: translate('page.form.codeLower'),
              }
            : {
                model: translate('page.form.codeLower'),
                name: translate('model.lowercase.category'),
              }
        ),
      })
    ),
    type: yup.string().required(
      translate('page.validation.select', {
        name: translate(
          'page.form.nameExchange',
          currentLang.value === Language.ENGLISH
            ? {
                model: translate('model.lowercase.category'),
                name: translate('table.lowercase.type'),
              }
            : {
                model: translate('table.lowercase.type'),
                name: translate('model.lowercase.category'),
              }
        ),
      })
    ),
    displayOrder: yup
      .number()
      .typeError(
        translate('page.validation.select', {
          name: translate('table.lowercase.displayOrder'),
        })
      )
      .required(
        translate('page.validation.select', {
          name: translate('table.lowercase.displayOrder'),
        })
      ),
    description: yup.string().required(
      translate('page.validation.required', {
        name: translate('table.lowercase.description'),
      })
    ),
  });

  const schemaBrand = yup.object({
    Name: yup.string().required(
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
    ManagerEmail: yup
      .string()
      .required(translate('page.validation.required', { name: translate('model.lowercase.managerEmail') })),
    Address: yup
      .string()
      .required(translate('page.validation.required', { name: translate('table.lowercase.address') })),
  });

  return { schemaStore, schemaBrand, schemaCategory };
}

export default useValidationForm;

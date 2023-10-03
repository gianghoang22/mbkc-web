import * as yup from 'yup';
import useLocales from './useLocales';
import { Language } from 'common/enum';
import { ref } from 'yup';

function useValidationForm() {
  const { translate, currentLang } = useLocales();

  const schemaLogin = yup.object({
    email: yup
      .string()
      .required(translate('page.validation.required', { name: 'email' }))
      .email(translate('page.validation.emailFormat')),
    password: yup.string().required(translate('page.validation.required', { name: translate('page.form.password') })),
  });

  const schemaForgotPassword = yup.object({
    email: yup
      .string()
      .required(translate('page.validation.required', { name: 'Email' }))
      .email(translate('page.validation.emailFormat')),
  });

  const schemaVerifyOtp = yup.object({
    email: yup
      .string()
      .required(translate('page.validation.required', { name: 'Email' }))
      .email(translate('page.validation.emailFormat')),
    otpCode: yup
      .string()
      .required(translate('page.validation.required', { name: translate('page.form.otpCode') }))
      .min(6, translate('page.validation.otpAlLeast'))
      .max(6, translate('page.validation.otpMax'))
      .matches(/^[0-9]+$/, translate('page.validation.otpMatches')),
  });

  const schemaResetPassword = yup.object({
    email: yup
      .string()
      .required(translate('page.validation.required', { name: 'Email' }))
      .email(translate('page.validation.emailFormat')),
    newPassword: yup
      .string()
      .required(translate('page.validation.required', { name: translate('page.form.newPassword') })),
    confirmPassword: yup
      .string()
      .required(translate('page.validation.required', { name: translate('page.form.confirmPassword') }))
      .oneOf([ref('newPassword')], translate('page.validation.matchPassword')),
  });

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
    description: yup
      .string()
      .required(
        translate('page.validation.required', {
          name: translate('table.lowercase.description'),
        })
      )
      .max(100, translate('page.validation.max100')),
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

  return {
    schemaLogin,
    schemaForgotPassword,
    schemaVerifyOtp,
    schemaResetPassword,
    schemaStore,
    schemaBrand,
    schemaCategory,
  };
}

export default useValidationForm;

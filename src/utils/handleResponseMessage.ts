import { Language } from 'common/enum';
import { getLanguage } from './utils';
import { EngMessageConstant } from 'constants/EngMessageConstant';
import { VieMessageConstant } from 'constants/VieMessageConstant';

export const handleResponseMessage = (response: string) => {
  const currentLanguage = getLanguage();

  const responseMessage =
    currentLanguage === Language.ENGLISH
      ? response === EngMessageConstant.ResetPasswordSuccessfully
        ? EngMessageConstant.ResetPasswordSuccessfully
        : response === EngMessageConstant.UpdateAccountSuccessfully
        ? EngMessageConstant.UpdateAccountSuccessfully
        : response === EngMessageConstant.SentEmailConfirmationSuccessfully
        ? EngMessageConstant.SentEmailConfirmationSuccessfully
        : response === EngMessageConstant.ConfirmedOTPCodeSuccessfully
        ? EngMessageConstant.ConfirmedOTPCodeSuccessfully
        : response === EngMessageConstant.CreatedNewKitchenCenterSuccessfully
        ? EngMessageConstant.CreatedNewKitchenCenterSuccessfully
        : response === EngMessageConstant.UpdatedKitchenCenterSuccessfully
        ? EngMessageConstant.UpdatedKitchenCenterSuccessfully
        : response === EngMessageConstant.UpdatedKitchenCenterStatusSuccessfully
        ? EngMessageConstant.UpdatedKitchenCenterStatusSuccessfully
        : response === EngMessageConstant.DeletedKitchenCenterSuccessfully
        ? EngMessageConstant.DeletedKitchenCenterSuccessfully
        : response === EngMessageConstant.CreatedNewBrandSuccessfully
        ? EngMessageConstant.CreatedNewBrandSuccessfully
        : response === EngMessageConstant.UpdatedBrandSuccessfully
        ? EngMessageConstant.UpdatedBrandSuccessfully
        : response === EngMessageConstant.UpdatedBrandStatusSuccessfully
        ? EngMessageConstant.UpdatedBrandStatusSuccessfully
        : response === EngMessageConstant.UpdatedBrandProfileSuccessfully
        ? EngMessageConstant.UpdatedBrandProfileSuccessfully
        : response === EngMessageConstant.DeletedBrandSuccessfully
        ? EngMessageConstant.DeletedBrandSuccessfully
        : response === EngMessageConstant.UpdatedStoreStatusSuccessfully
        ? EngMessageConstant.UpdatedStoreStatusSuccessfully
        : response === EngMessageConstant.UpdatedStoreInformationSuccessfully
        ? EngMessageConstant.UpdatedStoreInformationSuccessfully
        : response === EngMessageConstant.DeletedStoreSuccessfully
        ? EngMessageConstant.DeletedStoreSuccessfully
        : response === EngMessageConstant.RegisteredNewStoreSuccessfully
        ? EngMessageConstant.RegisteredNewStoreSuccessfully
        : response === EngMessageConstant.ConfirmedStoreRegistrationSuccessfully
        ? EngMessageConstant.ConfirmedStoreRegistrationSuccessfully
        : response === EngMessageConstant.CreatedNewCategorySuccessfully
        ? EngMessageConstant.CreatedNewCategorySuccessfully
        : response === EngMessageConstant.UpdatedCategorySuccessfully
        ? EngMessageConstant.UpdatedCategorySuccessfully
        : response === EngMessageConstant.DeletedCategorySuccessfully
        ? EngMessageConstant.DeletedCategorySuccessfully
        : response === EngMessageConstant.CreatedExtraCategoriesToNormalCategorySuccessfully
        ? EngMessageConstant.CreatedExtraCategoriesToNormalCategorySuccessfully
        : response === EngMessageConstant.CreatedNewBankingAccountSuccessfully
        ? EngMessageConstant.CreatedNewBankingAccountSuccessfully
        : response === EngMessageConstant.DeletedBankingAccountSuccessfully
        ? EngMessageConstant.DeletedBankingAccountSuccessfully
        : response === EngMessageConstant.UpdatedStatusBankingAccountSuccessfully
        ? EngMessageConstant.UpdatedStatusBankingAccountSuccessfully
        : response === EngMessageConstant.UpdatedBankingAccountSuccessfully
        ? EngMessageConstant.UpdatedBankingAccountSuccessfully
        : response === EngMessageConstant.CreatedNewProductSuccessfully
        ? EngMessageConstant.CreatedNewProductSuccessfully
        : response === EngMessageConstant.CreatedPartnerSuccessfully
        ? EngMessageConstant.CreatedPartnerSuccessfully
        : response === EngMessageConstant.DeletedProductSuccessfully
        ? EngMessageConstant.DeletedProductSuccessfully
        : response === EngMessageConstant.UpdatedPartnerSuccessfully
        ? EngMessageConstant.UpdatedPartnerSuccessfully
        : response === EngMessageConstant.UpdatedPartnerStatusSuccessfully
        ? EngMessageConstant.UpdatedPartnerStatusSuccessfully
        : response === EngMessageConstant.DeletedPartnerSuccessfully
        ? EngMessageConstant.DeletedPartnerSuccessfully
        : response === EngMessageConstant.CreatedNewStorePartnerSuccessfully
        ? EngMessageConstant.CreatedNewStorePartnerSuccessfully
        : response === EngMessageConstant.DeletedStorePartnerSuccessfully
        ? EngMessageConstant.DeletedStorePartnerSuccessfully
        : response === EngMessageConstant.UpdatedStatusStorePartnerSuccessfully
        ? EngMessageConstant.UpdatedStatusStorePartnerSuccessfully
        : response === EngMessageConstant.UpdatedStorePartnerSuccessfully
        ? EngMessageConstant.UpdatedStorePartnerSuccessfully
        : response === EngMessageConstant.UpdatedStorePartnerStatusSuccessfully
        ? EngMessageConstant.UpdatedStorePartnerStatusSuccessfully
        : response === EngMessageConstant.CreatedCashierSuccessfully
        ? EngMessageConstant.CreatedCashierSuccessfully
        : response === EngMessageConstant.UpdatedCashierSuccessfully
        ? EngMessageConstant.UpdatedCashierSuccessfully
        : response === EngMessageConstant.UpdatedCashierStatusSuccessfully
        ? EngMessageConstant.UpdatedCashierStatusSuccessfully
        : response === EngMessageConstant.DeletedCashierSuccessfully
        ? EngMessageConstant.DeletedCashierSuccessfully
        : response === EngMessageConstant.UpdatedCashierProfileSuccessfully
        ? EngMessageConstant.UpdatedCashierProfileSuccessfully
        : response === EngMessageConstant.CreatedPartnerProductSuccessfully
        ? EngMessageConstant.CreatedPartnerProductSuccessfully
        : response === EngMessageConstant.UpdatedPartnerProductSuccessfully
        ? EngMessageConstant.UpdatedPartnerProductSuccessfully
        : response === EngMessageConstant.DeletedPartnerProductSuccessfully
        ? EngMessageConstant.DeletedPartnerProductSuccessfully
        : response === EngMessageConstant.UpdatedPartnerProductStatusSuccessfully
        ? EngMessageConstant.UpdatedPartnerProductStatusSuccessfully
        : ''
      : currentLanguage === Language.VIETNAMESE
      ? response === EngMessageConstant.ResetPasswordSuccessfully
        ? VieMessageConstant.ResetPasswordSuccessfully
        : response === EngMessageConstant.UpdateAccountSuccessfully
        ? VieMessageConstant.UpdateAccountSuccessfully
        : response === EngMessageConstant.SentEmailConfirmationSuccessfully
        ? VieMessageConstant.SentEmailConfirmationSuccessfully
        : response === EngMessageConstant.ConfirmedOTPCodeSuccessfully
        ? VieMessageConstant.ConfirmedOTPCodeSuccessfully
        : response === EngMessageConstant.CreatedNewKitchenCenterSuccessfully
        ? VieMessageConstant.CreatedNewKitchenCenterSuccessfully
        : response === EngMessageConstant.UpdatedKitchenCenterSuccessfully
        ? VieMessageConstant.UpdatedKitchenCenterSuccessfully
        : response === EngMessageConstant.UpdatedKitchenCenterStatusSuccessfully
        ? VieMessageConstant.UpdatedKitchenCenterStatusSuccessfully
        : response === EngMessageConstant.DeletedKitchenCenterSuccessfully
        ? VieMessageConstant.DeletedKitchenCenterSuccessfully
        : response === EngMessageConstant.CreatedNewBrandSuccessfully
        ? VieMessageConstant.CreatedNewBrandSuccessfully
        : response === EngMessageConstant.UpdatedBrandSuccessfully
        ? VieMessageConstant.UpdatedBrandSuccessfully
        : response === EngMessageConstant.UpdatedBrandStatusSuccessfully
        ? VieMessageConstant.UpdatedBrandStatusSuccessfully
        : response === EngMessageConstant.UpdatedBrandProfileSuccessfully
        ? VieMessageConstant.UpdatedBrandProfileSuccessfully
        : response === EngMessageConstant.DeletedBrandSuccessfully
        ? VieMessageConstant.DeletedBrandSuccessfully
        : response === EngMessageConstant.UpdatedStoreStatusSuccessfully
        ? VieMessageConstant.UpdatedStoreStatusSuccessfully
        : response === EngMessageConstant.UpdatedStoreInformationSuccessfully
        ? VieMessageConstant.UpdatedStoreInformationSuccessfully
        : response === EngMessageConstant.DeletedStoreSuccessfully
        ? VieMessageConstant.DeletedStoreSuccessfully
        : response === EngMessageConstant.RegisteredNewStoreSuccessfully
        ? VieMessageConstant.RegisteredNewStoreSuccessfully
        : response === EngMessageConstant.ConfirmedStoreRegistrationSuccessfully
        ? VieMessageConstant.ConfirmedStoreRegistrationSuccessfully
        : response === EngMessageConstant.CreatedNewCategorySuccessfully
        ? VieMessageConstant.CreatedNewCategorySuccessfully
        : response === EngMessageConstant.UpdatedCategorySuccessfully
        ? VieMessageConstant.UpdatedCategorySuccessfully
        : response === EngMessageConstant.DeletedCategorySuccessfully
        ? VieMessageConstant.DeletedCategorySuccessfully
        : response === EngMessageConstant.CreatedExtraCategoriesToNormalCategorySuccessfully
        ? VieMessageConstant.CreatedExtraCategoriesToNormalCategorySuccessfully
        : response === EngMessageConstant.CreatedNewBankingAccountSuccessfully
        ? VieMessageConstant.CreatedNewBankingAccountSuccessfully
        : response === EngMessageConstant.DeletedBankingAccountSuccessfully
        ? VieMessageConstant.DeletedBankingAccountSuccessfully
        : response === EngMessageConstant.UpdatedStatusBankingAccountSuccessfully
        ? VieMessageConstant.UpdatedStatusBankingAccountSuccessfully
        : response === EngMessageConstant.UpdatedBankingAccountSuccessfully
        ? VieMessageConstant.UpdatedBankingAccountSuccessfully
        : response === EngMessageConstant.CreatedNewProductSuccessfully
        ? VieMessageConstant.CreatedNewProductSuccessfully
        : response === EngMessageConstant.CreatedPartnerSuccessfully
        ? VieMessageConstant.CreatedPartnerSuccessfully
        : response === EngMessageConstant.DeletedProductSuccessfully
        ? VieMessageConstant.DeletedProductSuccessfully
        : response === EngMessageConstant.UpdatedPartnerSuccessfully
        ? VieMessageConstant.UpdatedPartnerSuccessfully
        : response === EngMessageConstant.UpdatedPartnerStatusSuccessfully
        ? VieMessageConstant.UpdatedPartnerStatusSuccessfully
        : response === EngMessageConstant.DeletedPartnerSuccessfully
        ? VieMessageConstant.DeletedPartnerSuccessfully
        : response === EngMessageConstant.CreatedNewStorePartnerSuccessfully
        ? VieMessageConstant.CreatedNewStorePartnerSuccessfully
        : response === EngMessageConstant.DeletedStorePartnerSuccessfully
        ? VieMessageConstant.DeletedStorePartnerSuccessfully
        : response === EngMessageConstant.UpdatedStatusStorePartnerSuccessfully
        ? VieMessageConstant.UpdatedStatusStorePartnerSuccessfully
        : response === EngMessageConstant.UpdatedStorePartnerSuccessfully
        ? VieMessageConstant.UpdatedStorePartnerSuccessfully
        : response === EngMessageConstant.UpdatedStorePartnerStatusSuccessfully
        ? VieMessageConstant.UpdatedStorePartnerStatusSuccessfully
        : response === EngMessageConstant.CreatedCashierSuccessfully
        ? VieMessageConstant.CreatedCashierSuccessfully
        : response === EngMessageConstant.UpdatedCashierSuccessfully
        ? VieMessageConstant.UpdatedCashierSuccessfully
        : response === EngMessageConstant.UpdatedCashierStatusSuccessfully
        ? VieMessageConstant.UpdatedCashierStatusSuccessfully
        : response === EngMessageConstant.DeletedCashierSuccessfully
        ? VieMessageConstant.DeletedCashierSuccessfully
        : response === EngMessageConstant.UpdatedCashierProfileSuccessfully
        ? VieMessageConstant.UpdatedCashierProfileSuccessfully
        : response === EngMessageConstant.CreatedPartnerProductSuccessfully
        ? VieMessageConstant.CreatedPartnerProductSuccessfully
        : response === EngMessageConstant.UpdatedPartnerProductSuccessfully
        ? VieMessageConstant.UpdatedPartnerProductSuccessfully
        : response === EngMessageConstant.DeletedPartnerProductSuccessfully
        ? VieMessageConstant.DeletedPartnerProductSuccessfully
        : response === EngMessageConstant.UpdatedPartnerProductStatusSuccessfully
        ? VieMessageConstant.UpdatedPartnerProductStatusSuccessfully
        : ''
      : '';

  return responseMessage;
};

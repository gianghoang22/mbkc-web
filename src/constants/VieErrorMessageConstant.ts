export const VieErrorMessageConstant = {
  NotExistEmail: 'Email không tồn tại trong hệ thống.',
  AlreadyExistEmail: 'Email đã tồn tại trong hệ thống.',
  AlreadyExistCitizenNumber: 'Số căn cước công dân đã tồn tại trong hệ thống.',
  InvalidKitchenCenterId: 'Id bếp trung tâm không phù hợp với id trong hệ thống.',
  InvalidBrandId: 'Id thương hiệu không phù hợp với id trong hệ thống.',
  InvalidStoreId: 'Id cửa hàng không phù hợp với id trong hệ thống.',
  InvalidCategoryId: 'Id danh mục không phù hợp với id trong hệ thống.',
  InvalidBankingAccountId: 'Id tài khoản ngân hàng không phù hợp với id trong hệ thống.',
  InvalidCashierId: 'Id nhân viên thu ngân không phù hợp với id trong hệ thống.',
  InvalidProductId: 'Id sản phẩm không phù hợp với id trong hệ thống.',
  NotExistKitchenCenterId: 'Id bếp trung tâm không tồn tại trong hệ thống.',
  NotExistKitchenCenter: 'Trung tâm bếp không tồn tại trong hệ thống.',
  NotExistBrandId: 'Id thương hiệu không tồn tại trong hệ thống.',
  NotExistStoreId: 'Id cửa hàng không tồn tại trong hệ thống.',
  NotExistCategoryId: 'Id danh mục không tồn tại trong hệ thống.',
  NotExistBankingAccountId: 'Id tài khoản ngân hàng không tồn tại trong hệ thống.',
  NotExistProductId: 'Id sản phẩm không tồn tại trong hệ thống.',
  NotExistCashierId: 'Id nhân viên thu ngân không tồn tại trong hệ thống.',
  InvalidItemsPerPage: 'Các mục trên mỗi trang được yêu cầu lớn hơn 0.',
  InvalidCurrentPage: 'Số trang hiện tại phải lớn hơn 0.',
  NotExistPartnerId: 'Id đối tác không tồn tại trong hệ thống.',
  NotExistAccountId: 'Id tài khoản không tồn tại trong hệ thống.',
  InvalidPartnerId: 'Id đối tác không phải là id phù hợp trong hệ thống.',
  CategoryIdNotBelongToBrand: 'Id danh mục không thuộc về thương hiệu của bạn.',
  CategoryIdNotBelongToStore: 'Id danh mục không thuộc về cửa hàng của bạn.',
  AlreadyExistPartnerProduct: 'Sản phẩm đối tác đã tồn tại trong hệ thống.',
  NotExistPartnerProduct: 'Sản phẩm đối tác không tồn tại trong hệ thống.',

  DisabledAccount: 'Tài khoản đã bị vô hiệu hóa.',
  InvalidEmailOrPassword: 'Email hoặc Mật khẩu không hợp lệ.',

  AccountIdNotBelongYourAccount: 'Id tài khoản không thuộc về tài khoản của bạn.',

  NotAuthenticatedEmailBefore: 'Email chưa được xác thực trước đó.',
  ExpiredOTPCode: 'Mã OTP đã hết hạn.',
  NotMatchOTPCode: 'Mã OTP của bạn không khớp với mã OTP đã gửi trước đó.',

  InvalidAccessToken: 'Mã truy cập không hợp lệ',
  NotExpiredAccessToken: 'Mã truy cập vẫn chưa hết hạn.',
  NotExistAuthenticationToken: 'Bạn không có mã xác thực trong hệ thống.',
  NotExistRefreshToken: 'Mã xác thực làm mới không tồn tại trong hệ thống.',
  NotMatchAccessToken: 'Mã truy cập của bạn không khớp với mã truy cập đã đăng ký.',
  ExpiredRefreshToken: 'Mã làm mới đã hết hạn.',

  NotAuthenticatedEmail: 'Email chưa được xác thực trước đó.',
  NotVerifiedEmail: 'Email chưa được xác thực bằng mã OTP đã gửi trước đó.',

  DeactiveKitchenCenter_Update: 'Bếp trung tâm đã bị xóa trước đó nên bếp trung tâm này không thể cập nhật.',
  DeactiveKitchenCenter_Delete: 'Bếp trung tâm không thể xóa vì đã bị xóa trước đó.',
  KitchenCenterManagerEmailExisted: 'Email quản lý bếp trung tâm đã tồn tại trong hệ thống.',
  ExistedActiveStores_Delete: 'Bếp trung tâm có các cửa hàng đang hoạt động nên không thể xóa trung tâm bếp này.',
  NotBelongToKitchenCenter: 'Id bếp trung tâm không thuộc về bếp trung tâm của bạn.',

  InvalidStatusFilter: 'Bộ lọc trạng thái được yêu cầu là HOẠT ĐỘNG, KHÔNG HOẠT ĐỘNG trong hệ thống.',
  NotBelongToBrand: 'Id thương hiệu không thuộc về thương hiệu của bạn.',
  DeactiveBrand_Delete: 'Thương hiệu không thể xóa vì đã bị xóa trước đó.',
  DeactiveBrand_Update: 'Thương hiệu đã bị xóa trước đó nên thương hiệu này không thể cập nhật.',
  BrandManagerEmailExisted: 'Email quản lý thương hiệu đã tồn tại trong hệ thống.',
  RoleNotSuitable: 'Vai trò không phù hợp',
  ProductNotBelongToBrand: 'Sản phẩm này không thuộc về thương hiệu.',
  KeySortNotExist: 'Sắp xếp khóa là ASC hoặc DESC',

  BrandNotJoinKitchenCenter: 'Thương hiệu không tham gia vào bếp trung tâm.',
  KitchenCenterNotHaveBrand: 'Bếp trung tâm không có thương hiệu này.',
  BrandNotHaveStore: 'Thương hiệu không có cửa hàng này trong hệ thống.',
  KitchenCenterNotHaveStore: 'Bếp trung tâm không có cửa hàng này trong hệ thống.',
  DeactiveStore_Update: 'Cửa hàng đã bị xóa trước đó nên cửa hàng này không thể cập nhật.',
  DeactiveStore_Delete: 'Cửa hàng không thể xóa vì đã xóa trước đó.',
  ManageremailExisted: 'Email quản lý cửa hàng đã tồn tại trong hệ thống.',
  NotConfirmingStore: 'Cửa hàng không phải là cửa hàng mới để xác nhận trở thành cửa hàng HOẠT ĐỘNG.',
  NotRejectedResonForNewStore: 'Việc đăng ký cửa hàng bị từ chối phải có lý do.',
  StoreIdNotBelongToStore: 'Id cửa hàng không thuộc về cửa hàng của bạn.',
  StoresWithStatusNameParam:
    'Một số loại trạng thái được yêu cầu như: Đang hoạt động, Không hoạt động, Bị từ chối, Đang xác nhận.',

  CategoryCodeExisted: 'Mã danh mục đã tồn tại trong hệ thống.',
  DeactiveCategory_Delete: 'Danh mục không thể xóa vì đã bị xóa trước đó.',
  DeactiveCategory_Update: 'Danh mục đã bị xóa trước đó nên danh mục này không thể cập nhật.',
  InvalidCategoryType: 'Loại là bắt buộc.',
  NotExistCategoryType: 'Loại được yêu cầu NORMAL hoặc EXTRA.',
  StatusInvalid: 'Trạng thái là HOẠT ĐỘNG hoặc KHÔNG HOẠT ĐỘNG.',
  CategoryMustBeNormal: 'CategoryId phải là loại NORMAL.',
  ExtraCategoryGreaterThan0: 'Id danh mục bổ sung phải lớn hơn 0.',
  ListExtraCategoryIdIsExtraType: 'Danh sách Id danh mục extra cần phải là loại EXTRA.',
  ListExtraCategoryIdIsActive: 'Danh sách Id danh mục extra cần có trạng thái HOẠT ĐỘNG.',
  ExtraCategoryIdNotBelongToBrand: 'Id danh mục extra không thuộc về thương hiệu.',
  ExtraCategoryIdDoesNotExist: 'Id danh mục extra không tồn tại trong hệ thống.',

  BankingAccountNotBelongToKitchenCenter: 'Bếp trung tâm của bạn không có id tài khoản ngân hàng này.',
  NumberAccountExisted: 'Số tài khoản đã tồn tại trong hệ thống.',

  ProductCodeExisted: 'Mã đã tồn tại trong hệ thống.',
  ParentProductIdNotExist: 'Id sản phẩm cha không tồn tại trong hệ thống.',
  ParentProductIdNotBelongToBrand: 'Id sản phẩm cha không thuộc về thương hiệu của bạn.',
  CategoryNotSuitableForSingleOrParentProductType:
    'Id danh mục không phải là loại phù hợp cho loại sản phẩm SINGLE hoặc PARENT.',
  CategoryNotSuitableForEXTRAProductType: 'Id danh mục không phải là loại phù hợp cho loại sản phẩm EXTRA.',
  CategoryIdNotBelongToKitchenCenter: 'Bếp trung tâm của bạn không thể nhận được sản phẩm có id danh mục này.',
  InvalidProductType: 'Loại sản phẩm bắt buộc phải có một số loại như: SINGLE, PARENT, CHILD, EXTRA.',
  ProductNotBelongToStore: 'Id sản phẩm không thuộc về cửa hàng của bạn.',
  ProductNotSpendToStore: 'Id sản phẩm không dành cho bếp trung tâm của bạn.',
  ProductNameNotFollowingFormat:
    "Tên sản phẩm loại CHILD bắt buộc phải có định dạng sau: 'ParentName - Size x' Với x là kích thước bạn đã chọn.",
  ProductNameTypeChildNotAllowUpdate: 'Tên sản phẩm thuộc loại CHILD không cho phép cập nhật.',
  ProductIdNotParentType: 'Id sản phẩm không phải là loại PARENT.',

  DupplicatedPartnerName: 'Tên đối tác đã tồn tại trong hệ thống.',
  DupplicatedWebUrl: 'Url Web đã tồn tại trong hệ thống.',
  DeactivePartner_Update: 'Đối tác đã bị xóa trước đó nên đối tác này không thể cập nhật.',
  DeactivePartner_Delete: 'Đối tác không thể xóa vì đã bị xóa trước đó.',
  DeactivePartner_Get: 'Đối tác không thể nhận được vì đã bị xóa trước đó.',
  PartnerHasPartnerStoreActive_Update:
    'Đối tác không thể cập nhật trạng thái vì các cửa hàng đang hoạt động đang sử dụng đối tác này.',
  PartnerHasPartnerStoreActive_Delete:
    'Đối tác không thể xóa trạng thái vì các cửa hàng đang hoạt động đang sử dụng đối tác này.',

  CashierIdNotBelongToKitchenCenter: 'Id nhân viên thu ngân không thuộc về trung tâm nhà bếp của bạn.',
  CashierIdNotBelogToCashier: 'Id nhân viên thu ngân không phù hợp với tài khoản của bạn.',
  StatusIsRequiredWithKitchenCenterManager: 'Trạng thái không rỗng',
  StatusIsNotRequiredWithCashier: 'Nhân viên thu ngân không cho phép cập nhật thuộc tính Trạng thái.',

  InactiveStore_Create: 'Cửa hàng này đã không hoạt động hoặc bị vô hiệu hóa.',
  StoreNotBelongToBrand: 'Cửa hàng không thuộc về thương hiệu.',
  LinkedWithParner: 'Cửa hàng này đã được liên kết với đối tác này.',
  UsernameExisted: 'Tên người dùng đã tồn tại trong hệ thống.',
  NotLinkedWithParner: 'Cửa hàng này không được liên kết với đối tác này và nó vẫn hoạt động.',
  DeactiveStorePartner_Update: 'Không thể cập nhật đối tác cửa hàng đã bị vô hiệu hóa.',
  DupplicatedPartnerId_Create: 'Id đối tác không thể trùng lặp trong danh sách Tài khoản đối tác.',
  GrabFoodAccountMustBeStoreManager: 'Tài khoản GrabFood phải có vai trò Quản lý cửa hàng.',
  ItemOnGrabfoodCanNotMapping: 'Mặt hàng trên GrabFood không thể ánh xạ tới bất kỳ sản phẩm nào trong Hệ thống MBKC.',
  ModifierGroupOnGrabfoodCanNotMapping:
    'Nhóm sửa đổi trên GrabFood không thể ánh xạ tới bất kỳ sản phẩm nào trong Hệ thống MBKC.',

  DeactiveProduct_Create_Update: 'Sản phẩm này đã ngừng hoạt động.',
  InactiveProduct_Create_Update: 'Sản phẩm này không hoạt động.',
  InactiveStore_Update: 'Cửa hàng này đã không hoạt động.',
  StatusInValid: 'Trạng thái là HOẠT ĐỘNG hoặc KHÔNG HOẠT ĐỘNG',
};

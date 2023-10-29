import { OrderSortBy } from '@types';

export const getRuleWidths = (selected: readonly string[]) => ({
  name:
    !selected.includes(OrderSortBy.IMAGE) &&
    !selected.includes(OrderSortBy.CODE) &&
    !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
    !selected.includes(OrderSortBy.SELLING_PRICE) &&
    !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
    !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
    !selected.includes(OrderSortBy.CATEGORY) &&
    !selected.includes(OrderSortBy.TYPE)
      ? 450
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 180
      : 160,
  code:
    !selected.includes(OrderSortBy.IMAGE) &&
    !selected.includes(OrderSortBy.CODE) &&
    !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
    !selected.includes(OrderSortBy.SELLING_PRICE) &&
    !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
    !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
    !selected.includes(OrderSortBy.CATEGORY) &&
    !selected.includes(OrderSortBy.TYPE)
      ? 450
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 180
      : 160,
  display_order:
    !selected.includes(OrderSortBy.IMAGE) &&
    !selected.includes(OrderSortBy.CODE) &&
    !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
    !selected.includes(OrderSortBy.SELLING_PRICE) &&
    !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
    !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
    !selected.includes(OrderSortBy.CATEGORY) &&
    !selected.includes(OrderSortBy.TYPE)
      ? 450
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 180
      : 130,
  selling_price:
    !selected.includes(OrderSortBy.IMAGE) &&
    !selected.includes(OrderSortBy.CODE) &&
    !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
    !selected.includes(OrderSortBy.SELLING_PRICE) &&
    !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
    !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
    !selected.includes(OrderSortBy.CATEGORY) &&
    !selected.includes(OrderSortBy.TYPE)
      ? 450
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 180
      : 140,
  discount_price:
    !selected.includes(OrderSortBy.IMAGE) &&
    !selected.includes(OrderSortBy.CODE) &&
    !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
    !selected.includes(OrderSortBy.SELLING_PRICE) &&
    !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
    !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
    !selected.includes(OrderSortBy.CATEGORY) &&
    !selected.includes(OrderSortBy.TYPE)
      ? 450
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 180
      : 160,
  historical_price:
    !selected.includes(OrderSortBy.IMAGE) &&
    !selected.includes(OrderSortBy.CODE) &&
    !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
    !selected.includes(OrderSortBy.SELLING_PRICE) &&
    !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
    !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
    !selected.includes(OrderSortBy.CATEGORY) &&
    !selected.includes(OrderSortBy.TYPE)
      ? 450
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 180
      : 160,
  category:
    !selected.includes(OrderSortBy.IMAGE) &&
    !selected.includes(OrderSortBy.CODE) &&
    !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
    !selected.includes(OrderSortBy.SELLING_PRICE) &&
    !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
    !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
    !selected.includes(OrderSortBy.CATEGORY) &&
    !selected.includes(OrderSortBy.TYPE)
      ? 450
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 180
      : 180,
  type:
    !selected.includes(OrderSortBy.IMAGE) &&
    !selected.includes(OrderSortBy.CODE) &&
    !selected.includes(OrderSortBy.DISPLAY_ORDER) &&
    !selected.includes(OrderSortBy.SELLING_PRICE) &&
    !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
    !selected.includes(OrderSortBy.HISTORICAL_PRICE) &&
    !selected.includes(OrderSortBy.CATEGORY) &&
    !selected.includes(OrderSortBy.TYPE)
      ? 450
      : !selected.includes(OrderSortBy.IMAGE) &&
        !selected.includes(OrderSortBy.DISCOUNT_PRICE) &&
        !selected.includes(OrderSortBy.HISTORICAL_PRICE)
      ? 180
      : 120,
});

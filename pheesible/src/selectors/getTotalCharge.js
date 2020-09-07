export default ({promotionSettings}) => {
    const {budgetPerDayInDollars, lengthInDaysOfPromotion} = promotionSettings

    return ((budgetPerDayInDollars * lengthInDaysOfPromotion) + 200) * 100
}
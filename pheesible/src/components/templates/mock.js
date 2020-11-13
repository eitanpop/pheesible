export const features = [
  { title: 'Feature 1 Title', description: 'Description for feature 1' },
  { title: 'Feature 2 Title', description: 'Description for feature 2' },
  { title: 'Feature 3 Title', description: 'Description for feature 3' },
  { title: 'Feature 4 Title', description: 'Description for feature 4' },
]

export const getSellingPoint = (promotion, idx, property) => {
  return (
    (promotion.sellingPoints &&
      promotion.sellingPoints[idx] &&
      promotion.sellingPoints[idx][property]) ||
    `Selling Point ${idx + 1} ${
      property.charAt(0).toUpperCase() + property.slice(1)
    }`
  )
}

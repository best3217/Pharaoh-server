export const formatNumber = (value) => {
  if (!isNaN(value)) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  } else {
    return value
  }
} 
  
export const formatPrice = (value) => {
  return value.toString().replace(".", ",")
}
  
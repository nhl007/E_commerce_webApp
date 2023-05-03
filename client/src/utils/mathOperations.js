//!currency formatter
export const currencyFormatter = (num) => {
  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(num));

  return price;
};

//!percentage calculator
export const percentageCal = (num, num2) => {
  return (num * 100) / num2;
};

export const credentials = {
  testUser: {
    email: process.env.TEST_USER_EMAIL ?? '',
    password: process.env.TEST_USER_PASSWORD ?? '',
  },
  practiceUser: {
    email: process.env.PRACTICE_USER_EMAIL ?? '',
    password: process.env.PRACTICE_USER_PASSWORD ?? '',
  },
  studentUser: {
    email: process.env.STUDENT_USER_EMAIL ?? '',
    password: process.env.STUDENT_USER_PASSWORD ?? '',
  },
};

export const checkoutInfoDetails = {
  firstName: 'Jane',
  lastName: 'Doe',
  zipCode: '12345',
};

export const sampleProduct = {
  name: 'Sample Shirt Name',
  price: '$49.99',
};

export const invalidCredentials = {
  invalidEmail: {
    email: 'invalid@qabrains.com',
    password: credentials.testUser.password,
  },
  invalidPassword: {
    email: credentials.testUser.email,
    password: 'WrongPassword',
  },
};

export const orderSummary = {
  paymentInformation: 'SampleCard #43287',
  shippingInformation: 'Free Express Delivery',
  tax: '$2.50',
  total: '$52.49',
};

export const selectDropDown = {
  AtoZ: 'A to Z (ascending)',
  ZtoA: 'Z to A (descending)',
  PriceLowHigh: 'Low to High (Price)',
  PriceHighLow: 'High to Low (Price)',
};

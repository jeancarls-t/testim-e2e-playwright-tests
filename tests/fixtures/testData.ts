// tests/fixtures/testData.ts
export const testData = {
  commonData: {
    departureDate: '2026-06-15',
    returnDate: '2026-06-20',
    adults: 2,
    children: 1,
    name: 'Jean Carlos',
    email: 'jeancarlos@test.com',
    ssn: '123-45-6789',
    phone: '+17871234567',
    promoCode: 'TEST2026',
    filePath: 'tests/data/Upload.txt'
  },
  successScenarios: [
    { price: 1200, destination: 'Madan', expectedMessage: 'Madan Temperatures' },
    { price: 1100, destination: 'Shenji', expectedMessage: 'Shenji Temperatures' }
  ],
  dropdownScenarios: [
    {
      departureDate: '2026-06-28',
      returnDate: '2026-07-12',
      adults: 1,
      children: 3,
      price: 200,
      destination: 'Tongli',
      name: 'Puan Carlos',
      email: 'puancarlos@test.com',
      ssn: '623-65-6790',
      phone: '+12121234567',
      promoCode: 'TEST2026',
      filePath: 'tests/data/Upload.txt',
      expectedMessage: 'Tongli'
    }
  ],
  errorScenarios: [
    {
      departureDate: '2026-06-23',
      returnDate: '2026-06-30',
      adults: 3,
      children: 2,
      price: 1500,
      destination: 'Sant Cugat Del Valles',
      name: 'Kean Carlos',
      email: 'keancarlos@test.com',
      phone: '+573053223117',
      invalidSSN: '12345',
      expectedError: 'Enter a valid US phone number.'
    }
  ]
};
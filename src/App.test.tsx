import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders page headline', () => {
  render(<App/>)
  const headline = screen.getByText(/React JSON Form Builder/i)
  expect(headline).toBeInTheDocument()
})

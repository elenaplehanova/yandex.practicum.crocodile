import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from './Header'

describe('Header', () => {
  it('should render the Header component with correct game name', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    expect(getByText('CROCODILE')).toBeInTheDocument()
  })

  it('should navigate to the home page', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    const homeLink = getByText('Home')
    fireEvent.click(homeLink)
    await waitFor(() => expect(window.location.pathname).toBe('/'))
  })
})

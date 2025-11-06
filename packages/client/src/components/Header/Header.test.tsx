import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Header } from './Header'
import { store } from '../../store'

describe('Header', () => {
  it('should render the Header component with correct game name', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    )
    expect(getByText('CROCODILE')).toBeInTheDocument()
  })

  it('should navigate to the home page', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    )
    const homeLink = getByText('Home')
    fireEvent.click(homeLink)
    await waitFor(() => expect(window.location.pathname).toBe('/'))
  })
})

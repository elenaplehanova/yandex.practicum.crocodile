import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { GamePage } from './GamePage'
import { store } from '../../store'

describe('GamePage', () => {
  it('render GamePage component and check game name', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <GamePage />
        </MemoryRouter>
      </Provider>
    )
    expect(getByText('CROCODILE')).toBeInTheDocument()
  })

  it('check if fullscreen button is exist and click it', async () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <GamePage />
        </MemoryRouter>
      </Provider>
    )
    const fullscreenButton = getByRole('button', {
      name: 'Полноэкранный режим',
    })
    fireEvent.click(fullscreenButton)
    await waitFor(() => expect(document.fullscreenElement).not.toBeNull())
  })

  it('check if word input is exist and type something', async () => {
    const { getByRole, getByTitle } = render(
      <Provider store={store}>
        <MemoryRouter>
          <GamePage />
        </MemoryRouter>
      </Provider>
    )
    // Transition: waiting -> ready (revealed) -> playing (revealed) -> toggle to hidden
    const card = getByTitle('Нажмите, чтобы увидеть слово')
    fireEvent.click(card)
    fireEvent.click(card)
    fireEvent.click(card)

    const wordInput = getByRole('textbox')
    fireEvent.change(wordInput, { target: { value: 'test' } })
    await waitFor(() => expect(wordInput).toHaveValue('test'))
  })
})

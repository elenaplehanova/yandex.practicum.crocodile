import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { GamePage } from './GamePage'
import { store } from '../../store'

const mockCanvasRenderingContext2D = jest.fn().mockImplementation(() => ({
  restore: jest.fn(),
  save: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  fillText: jest.fn(),
  measureText: jest.fn().mockReturnValue({ width: 100 }),
}))

Object.defineProperty(window, 'CanvasRenderingContext2D', {
  value: mockCanvasRenderingContext2D,
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

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
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <GamePage />
        </MemoryRouter>
      </Provider>
    )
    const wordInput = getByRole('textbox')
    fireEvent.change(wordInput, { target: { value: 'test' } })
    await waitFor(() => expect(wordInput).toHaveValue('test'))
  })
})

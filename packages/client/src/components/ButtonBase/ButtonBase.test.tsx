import { render, screen } from '@testing-library/react'
import ButtonBase from './ButtonBase'

describe('Button base', () => {
  it('has button base component', () => {
    render(<ButtonBase text={'Text'} />)
    expect(screen.getByText('Text')).toBeDefined()
  })
})

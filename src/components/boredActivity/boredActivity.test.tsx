import { render, screen, waitFor } from '@testing-library/react'
import BoredActivity from 'src/components/boredActivity/BoredActivity'
import useBoredAPI from 'src/hooks/useBoredAPI'

jest.mock('../hooks/useBoredAPI', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    activity: 'Test activity',
    isLoading: false,
    error: null,
  })),
}))

describe('BoredActivity', () => {
  it('should display the activity', async () => {
    render(<BoredActivity />)

    await waitFor(() => {
      expect(screen.getByText('Bored Activity')).toBeInTheDocument()
      expect(screen.getByText('Test activity')).toBeInTheDocument()
    })
  })

  it('should display a loading indicator when loading', async () => {
    ;(useBoredAPI as jest.Mock).mockReturnValueOnce({
      activity: null,
      isLoading: true,
      error: null,
    })

    render(<BoredActivity />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should display an error message when there is an error', async () => {
    ;(useBoredAPI as jest.Mock).mockReturnValueOnce({
      activity: null,
      isLoading: false,
      error: 'Test error',
    })

    render(<BoredActivity />)

    expect(screen.getByText('Test error')).toBeInTheDocument()
  })
})

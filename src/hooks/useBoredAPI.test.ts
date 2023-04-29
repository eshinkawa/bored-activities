import { renderHook } from '@testing-library/react-hooks'
import useBoredAPI from 'src/hooks/useBoredAPI'

describe('useBoredAPI', () => {
  it('should fetch and return activity data', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        activity: 'Test activity',
        type: 'test',
        participants: 1,
        price: 0.5,
        link: '',
        key: '',
        accessibility: 0.5,
      }),
    })

    const { result, waitForNextUpdate } = renderHook(() => useBoredAPI())

    expect(result.current.activity).toBe(null)
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe(null)

    await waitForNextUpdate()

    expect(result.current.activity).toBe('Test activity')
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('should handle errors', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Test error'))

    const { result, waitForNextUpdate } = renderHook(() => useBoredAPI())

    expect(result.current.activity).toBe(null)
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe(null)

    await waitForNextUpdate()

    expect(result.current.activity).toBe(null)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe('Test error')
  })
})

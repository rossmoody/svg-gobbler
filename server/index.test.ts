// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest'

type FakeResponse = {
  send: ReturnType<typeof vi.fn>
  status: ReturnType<typeof vi.fn>
}

type Handler = (request: { body?: unknown }, response: FakeResponse) => Promise<void>

const mocks = vi.hoisted(() => ({
  download: vi.fn(),
  exists: vi.fn(),
  file: vi.fn(),
  handlers: new Map<string, unknown>(),
  save: vi.fn(),
}))

vi.mock('@google-cloud/functions-framework', () => ({
  http: (name: string, handler: unknown) => mocks.handlers.set(name, handler),
}))

vi.mock('@google-cloud/storage', () => ({
  Storage: class {
    bucket() {
      return {
        file: (name: string) => {
          mocks.file(name)
          return { download: mocks.download, exists: mocks.exists, save: mocks.save }
        },
      }
    }
  },
}))

await import('./index')

const call = async (body: unknown) => {
  const response: FakeResponse = { send: vi.fn(), status: vi.fn() }
  response.status.mockReturnValue(response)
  await (mocks.handlers.get('svgr') as Handler)({ body }, response)
  return response
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  mocks.file.mockReset()
  mocks.save.mockReset().mockResolvedValue()
  mocks.exists.mockReset().mockResolvedValue([false])
  mocks.download.mockReset()
})

describe.each(['error', 'feedback'] as const)('%s messages', (type) => {
  it('stores the message and responds', async () => {
    const response = await call({ payload: { message: 'It broke' }, type })

    expect(mocks.file.mock.calls[0][0]).toMatch(new RegExp(`^${type}/${type}-\\d+\\.txt$`))
    expect(mocks.save).toHaveBeenCalledWith('It broke')
    expect(response.send).toHaveBeenCalledTimes(1)
  })

  it('caps the stored message length', async () => {
    await call({ payload: { message: 'x'.repeat(50_000) }, type })

    expect(mocks.save.mock.calls[0][0]).toHaveLength(10_000)
  })

  it.each([undefined, '', '   ', 42, { nested: true }])(
    'rejects the message %j',
    async (message) => {
      const response = await call({ payload: { message }, type })

      expect(mocks.save).not.toHaveBeenCalled()
      expect(response.status).toHaveBeenCalledWith(400)
      expect(response.send).toHaveBeenCalledTimes(1)
    },
  )

  it('responds when the upload fails', async () => {
    mocks.save.mockRejectedValue(new Error('bucket unavailable'))

    const response = await call({ payload: { message: 'It broke' }, type })

    expect(response.send).toHaveBeenCalledTimes(1)
  })
})

describe('counter', () => {
  const today = new Date().toISOString().split('T')[0]
  const saved = () => JSON.parse(mocks.save.mock.calls[0][0]) as Record<string, number>

  it("adds to today's count", async () => {
    mocks.exists.mockResolvedValue([true])
    mocks.download.mockResolvedValue([Buffer.from(JSON.stringify({ [today]: 5 }))])

    const response = await call({ payload: { message: 12 }, type: 'counter' })

    expect(saved()).toEqual({ [today]: 17 })
    expect(response.send).toHaveBeenCalledTimes(1)
  })

  it.each([
    [-500, 0],
    ['not a number', 0],
    [9_999_999, 10_000],
  ])('clamps an increment of %j to %i', async (message, expected) => {
    await call({ payload: { message }, type: 'counter' })

    expect(saved()).toEqual({ [today]: expected })
  })
})

describe('other requests', () => {
  it.each([undefined, {}, { type: 'unknown' }])('responds to the body %j', async (body) => {
    const response = await call(body)

    expect(response.send).toHaveBeenCalledTimes(1)
  })

  it('transforms an svg into a component', async () => {
    const response = await call({
      payload: {
        config: { plugins: ['@svgr/plugin-jsx'] },
        state: { componentName: 'Icon' },
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><path d="M0 0"/></svg>',
      },
      type: 'svgr',
    })

    expect(response.send.mock.calls[0][0]).toContain('const Icon')
  })
})

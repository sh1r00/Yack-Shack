import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

describe('Pinia setup', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('creates a pinia instance', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    expect(pinia).toBeDefined()
  })
})

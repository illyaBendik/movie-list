import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PaginationList from '@/components/PaginationList.vue'

describe('PaginationList', () => {
  it('renders the correct number of pages', async () => {
    const wrapper = mount(PaginationList, {
      props: {
        totalPages: 10,
        currentPage: 1
      }
    })

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(7)
  })

  it('disables the "Prev" button when on the first page', async () => {
    const wrapper = mount(PaginationList, {
      props: {
        totalPages: 5,
        currentPage: 1
      }
    })

    const prevButton = wrapper.find('button[aria-label="Prev"]')
    expect(prevButton.attributes('disabled')).toBe('')
  })

  it('disables the "Next" button when on the last page', async () => {
    const wrapper = mount(PaginationList, {
      props: {
        totalPages: 5,
        currentPage: 5
      }
    })

    const nextButton = wrapper.find('button[aria-label="Next"]')
    const isDisabled = nextButton.attributes('disabled') !== undefined
    expect(isDisabled).toBeTruthy()
  })

  it('emits "on-change-page" event when a page is clicked', async () => {
    const wrapper = mount(PaginationList, {
      props: {
        totalPages: 5,
        currentPage: 3
      }
    })

    const pageButton = wrapper.find('button:not([aria-label])')
    await pageButton.trigger('click')

    const emittedChangePage = wrapper.emitted('on-change-page')
    expect(emittedChangePage).toBeDefined()
    expect(emittedChangePage?.[0]).toEqual([1])
  })
})

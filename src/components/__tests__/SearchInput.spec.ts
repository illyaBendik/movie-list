import { describe, it, expect } from 'vitest'
import SearchInput from '@/components/SearchInput.vue'
import { mount } from '@vue/test-utils'

describe('SearchInput', () => {
  it('renders the input field correctly', () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('search')
    expect(input.classes()).toContain('block')
    expect(input.classes()).toContain('w-full')
  })

  it('emits "update:modelValue" event when input value changes', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    await input.setValue('test')

    const emittedUpdateModelValue = wrapper.emitted('update:modelValue')
    expect(emittedUpdateModelValue).toBeDefined()
    expect(emittedUpdateModelValue?.[0]).toEqual(['test'])
  })

  it('updates the input value when props.modelValue changes', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.setProps({ modelValue: 'initial value' })
    const input = wrapper.find('input')

    expect(input.element.value).toBe('initial value')
  })
})

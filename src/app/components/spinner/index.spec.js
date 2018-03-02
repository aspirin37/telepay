import { mount } from 'avoriaz';
import component from './index.vue';

describe('spinner test', () => {
  const wrapper = mount(component);
  it('should set className according prop fixed', () => {
    wrapper.setProps({fixed: true});
    expect(wrapper.hasClass('spinner-fixed')).toBe(true);
  });

  it('should have display: none style if value prop is false', () => {
    expect(wrapper.getAttribute('style')).toBe('display: none;');
  });

  it('should have className spinner-md by default', () => {
    expect(wrapper.hasClass('spinner-md')).toBe(true);
  });
});

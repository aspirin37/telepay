import { mount } from 'avoriaz';
import component from './index.vue';
import { UserService } from '@services/api';
sinonStubPromise(sinon);

describe('auth new-pass test', () => {
  const resetPassByMailStub = sinon.stub(UserService, 'resetPassByMail').returnsPromise();
  const resetPassByPhoneStub = sinon.stub(UserService, 'resetPassByPhone').returnsPromise();
  const resetPassSpy = sinon.spy(component.options.methods, 'resetPass');

  const $route = {query: { code: 'test', phone: '+799999999' }};
  let wrapper;

  beforeEach(() => wrapper = mount(component, { globals: { $route } }));


  it('should have right data from props code', () => {
    expect(wrapper.data().reset.code).toBe($route.query.code);
    expect(wrapper.data().reset.phone).toBe($route.query.phone);
  });

  it('should trigger resetPass method on click', () => {
    const button = wrapper.find('button')[0];
    button.trigger('click');
    expect(resetPassSpy.called).toBe(true);
  });

  it('should call resetPassByMail if route has code param', () => {
    expect(resetPassByMailStub.called).toBe(true);
  });
});

import { mount } from 'avoriaz';
import component from './index.vue';
import { AuthService, UserService } from '@services/api';
sinonStubPromise(sinon);

describe('auth registration test', () => {
  if (!global.window.localStorage) {
    global.window.localStorage = {
      getItem: sinon.stub().returns({}),
      setItem: sinon.stub()
    };
  }
  let wrapper;
  const registerApiMethodStub = sinon.stub(AuthService, 'register').returnsPromise().resolves({ token: '1234test' });
  const getUserStub = sinon.stub(UserService, 'getUser').returnsPromise().resolves({});
  const registerSpy = sinon.spy(component.options.methods, 'register');
  const $route = {params: { login: 'test' }};

  beforeEach(() => wrapper = mount(component, { globals: { $route } }));

  it('should set right data from props', () => expect(wrapper.data().user.login).toBe($route.params.login));

  it('should trigger register and registerApi methods on click', () => {
    const button = wrapper.find('button')[0];
    button.trigger('click');
    expect(registerSpy.called).toBe(true);
    expect(registerApiMethodStub.called).toBe(true);
  });

  it('should set token to local storage if registerApi method resolve', () => {
    expect(global.window.localStorage.setItem.called).toBe(true);
  });

  it('should call getUser Api method if registerApi method resolve', () => {
    expect(getUserStub.called).toBe(true);
  });
});

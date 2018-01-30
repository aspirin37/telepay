import { mount } from 'avoriaz';
import component from './index.vue';
import { AuthService, UserService } from '@services/api';
sinonStubPromise(sinon);

describe('auth login', () => {
  if (!global.window.localStorage) {
    global.window.localStorage = {
      getItem: sinon.stub().returns({}),
      setItem: sinon.stub()
    };
  }
  let wrapper;
  const loginSpy = sinon.spy(component.options.methods, 'login');
  const getUserStub = sinon.stub(UserService, 'getUser').returnsPromise();
  const loginStub = sinon.stub(AuthService, 'login').returnsPromise().resolves({ token: '1234test' });
  const $route = {params: { login: 'test' }};
  beforeEach(() => wrapper = mount(component, { globals: { $route } }));

  it('should right user login from props', () => expect(wrapper.data().user.login).toBe($route.params.login));

  it('should trigger login method on click', () => {
    const button = wrapper.find('button')[0];
    button.trigger('click');
    expect(loginStub.called).toBe(true);
  });

  it('should set token to local storage and call getUser api method', () => {
    expect(global.window.localStorage.setItem.called).toBe(true);
    expect(getUserStub.called).toBe(true);
  });
});

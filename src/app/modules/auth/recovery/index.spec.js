import {mount} from 'avoriaz';
import component from './index.vue';
import {UserService} from '@services/api';
sinonStubPromise(sinon);

describe('auth recovery test', () => {
  const requestResetPassStub = sinon.stub(UserService, 'requestResetPass').returnsPromise();
  const recoverSpy = sinon.spy(component.options.methods, 'recover');
  const $route = {params: {login: 'test'}};
  const wrapper = mount(component, {globals: {$route}});

  it('should right user login from props', () => expect(wrapper.data().login).toBe($route.params.login));

  it('should trigger recover method and trigger requestResetPass api method with right param on click', () => {
    const button = wrapper.find('button')[0];
    button.trigger('click');
    expect(recoverSpy.called).toBe(true);
    expect(requestResetPassStub.calledWith({login: $route.params.login}));
  });
});

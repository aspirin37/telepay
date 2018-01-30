import Vuex from 'vuex';
import { mount } from 'avoriaz';
import { UserService } from '@services/api';
import component from './index.vue';
sinonStubPromise(sinon);
Vue.use(Vuex);

describe('auth activate test', () => {
  const goToLoginSpy = sinon.spy(component.options.methods, 'goToLogin');
  const activateSpy = sinon.spy(component.options.methods, 'activate');
  const confirmEmailStub = sinon.stub(UserService, 'confirmEmail').returnsPromise().rejects();
  const $router = { push: sinon.stub() };
  const $notifystr = { success: sinon.stub(), danger: sinon.stub() };

  let store;

  beforeEach(() => {
    store = new Vuex.Store({
  		state: {},
  		mutations: {
  			'TOGGLE_LOADING': sinon.stub(),
        'SET_USER': sinon.stub()
  		}
  	});
  });

  it('should call activate method on mount', () => {
    const $route = { query: { code: '' } };
    const wrapper = mount(component, { store, globals: { $notifystr, $router, $route } });
    expect(activateSpy.called).toBe(true)
  });

  it('shouldn`t call goToLogin and confirmEmail api methods if route param is falsy', () => {
    const $route = { query: { code: '' } };
    const wrapper = mount(component, { store, globals: { $notifystr, $router, $route } });
    expect(confirmEmailStub.called).toBe(false);
    expect(goToLoginSpy.called).toBe(true);
  });

  it('should call confirmEmail api method with route param if there is a route param', () => {
    const $route = { query: { code: 'test' } };
    const wrapper = mount(component, { store, globals: { $notifystr, $router, $route } });
    expect(confirmEmailStub.calledWith($route.query.code)).toBe(true);
    expect(goToLoginSpy.called).toBe(true);
  });
});

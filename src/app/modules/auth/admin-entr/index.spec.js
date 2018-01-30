import Vuex from 'vuex';
import { mount } from 'avoriaz';
import { UserService } from '@services/api';
import component from './index.vue';
sinonStubPromise(sinon);
Vue.use(Vuex);

describe('auth admin-entr test', () => {
  if (!global.window.localStorage) {
    global.window.localStorage = {
      getItem: sinon.stub().returns({}),
      setItem: sinon.stub()
    };
  }
  const getUserStub = sinon.stub(UserService, 'getUser').returnsPromise();

  let store;

  beforeEach(() => {
    store = new Vuex.Store({
  		state: {},
  		mutations: {
  			'SET_USER': sinon.stub()
  		}
  	});
  });


  it('shouldn`t call getUser api method on mount if route param is falsy', () => {
    const $route = { query: { t: '' } };
    const wrapper = mount(component, { store, globals: { $route } });
    expect(getUserStub.called).toBe(false);
  });

  it('should call getUser api method', () => {
    const $route = { query: { t: 'test' } };
    const wrapper = mount(component, { store, globals: { $route } });
    expect(getUserStub.called).toBe(true);
  });

  it('should set to local storage', () => {
    const $route = { query: { t: 'test' } };
    const wrapper = mount(component, { store, globals: { $route } });
    expect(global.window.localStorage.setItem.called).toBe(true);
  });

});

import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import 'regenerator-runtime/runtime'
import { Provider } from 'react-redux'
import * as endpoints from 'endpoints'

import { UserLogin, UserSignup, List, Register } from 'pages'
import { sagaMiddleware, store } from 'store'
import { rootSaga } from 'saga'

configure({ adapter: new Adapter() })

describe('Testing Pages', () => {
    let loginMockFunc
    let signupMockFunc
    let listMockFunc
    let regMockFunc
    let editMockFunc
    let detailsMockFunc

    sagaMiddleware.run(rootSaga)
    beforeAll(() => {
        loginMockFunc = jest
            .spyOn(endpoints, 'login')
            .mockReturnValue(
                Promise.resolve({ success: true, data: { token: 'abc' } })
            )
        signupMockFunc = jest
            .spyOn(endpoints, 'signup')
            .mockReturnValue(
                Promise.resolve({ success: true, data: { token: 'abc' } })
            )
        listMockFunc = jest
            .spyOn(endpoints, 'listEmployee')
            .mockReturnValue(
                Promise.resolve({ success: true, message: 'success' })
            )

        regMockFunc = jest
            .spyOn(endpoints, 'addEmployee')
            .mockReturnValue(
                Promise.resolve({ success: true, message: 'success' })
            )
        editMockFunc = jest
            .spyOn(endpoints, 'editEmployee')
            .mockReturnValue(
                Promise.resolve({ success: true, message: 'success' })
            )
        detailsMockFunc = jest
            .spyOn(endpoints, 'getProfile')
            .mockReturnValue(
                Promise.resolve({ success: true, message: 'success' })
            )
    })

    it('testing Login Page ui', () => {
        const wrapper = mount(
            <Provider store={store}>
                <UserLogin />
            </Provider>
        )
        wrapper
            .find('input')
            .at(0)
            .simulate('change', {
                target: { name: 'email', value: 'appu@gmail.com' },
            })
        wrapper
            .find('input')
            .at(1)
            .simulate('change', {
                target: { name: 'password', value: 'appus' },
            })
        wrapper.find('form').simulate('submit')
        expect(wrapper.find('form')).toHaveLength(1)
        expect(wrapper.find('input')).toHaveLength(2)
        expect(wrapper.find('button')).toHaveLength(2)
        expect(wrapper.find('button').at(0).text()).toBe('Register Here')
        expect(wrapper.find('button').at(1).text()).toBe('Login')
        expect(loginMockFunc).toHaveBeenCalledTimes(1)
        loginMockFunc.mockClear()
    })

    it('testing signup Page redirection from login ', () => {
        const wrapper = mount(
            <Provider store={store}>
                <UserLogin />
            </Provider>
        )
        wrapper.find('button').at(0).simulate('click')
        expect(window.location.pathname).toMatch('/signup')
    })

    it('testing signup Page ui', () => {
        const wrapper = mount(
            <Provider store={store}>
                <UserSignup />
            </Provider>
        )
        wrapper
            .find('input')
            .at(0)
            .simulate('change', {
                target: { name: 'email', value: 'appu@gmail.com' },
            })
        wrapper
            .find('input')
            .at(1)
            .simulate('change', {
                target: { name: 'password', value: 'appus' },
            })
        wrapper
            .find('input')
            .at(2)
            .simulate('change', {
                target: { name: 'cpassword', value: 'appus' },
            })

        wrapper.find('form').simulate('submit')
        expect(wrapper.find('form')).toHaveLength(1)
        expect(wrapper.find('input')).toHaveLength(3)
        expect(wrapper.find('button')).toHaveLength(2)
        expect(wrapper.find('button').at(0).text()).toBe('Have an Account')
        expect(wrapper.find('button').at(1).text()).toBe('Signup')
        expect(signupMockFunc).toHaveBeenCalledTimes(1)
        signupMockFunc.mockClear()
    })

    it('testing loginPage redirection from signup ', () => {
        const wrapper = mount(
            <Provider store={store}>
                <UserSignup />
            </Provider>
        )

        wrapper.find('button').at(0).simulate('click')
        expect(window.location.pathname).toMatch('/login')
    })

    it('testing list page', () => {
        const wrapper = mount(
            <Provider store={store}>
                <List />
            </Provider>
        )
        wrapper.find('button').at(0).simulate('click')
        expect(wrapper.find('table')).toHaveLength(1)
        expect(wrapper.find('button')).toHaveLength(2)
        expect(wrapper.find('button').at(0).text()).toBe('Add Employee')
        expect(listMockFunc).toHaveBeenCalledTimes(1)
        expect(window.location.pathname).toMatch('/register')
        listMockFunc.mockClear()
    })

    it('testing register page', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Register />
            </Provider>
        )
        wrapper
            .find('input')
            .at(0)
            .simulate('change', {
                target: { name: 'firstname', value: 'appu' },
            })
        wrapper
            .find('input')
            .at(0)
            .simulate('change', {
                target: { name: 'lastname', value: 'appu' },
            })
        wrapper
            .find('input')
            .at(0)
            .simulate('change', {
                target: { name: 'email', value: 'appu@gmail.com' },
            })
        wrapper
            .find('input')
            .at(0)
            .simulate('change', {
                target: { name: 'dob', value: '12/05/2021' },
            })
        wrapper
            .find('input')
            .at(0)
            .simulate('change', {
                target: { name: 'doj', value: '12/05/2023' },
            })
        wrapper
            .find('input')
            .at(0)
            .simulate('change', {
                target: { name: 'desg', value: 'manager' },
            })
        wrapper
            .find('input')
            .at(0)
            .simulate('change', {
                target: { name: 'exp', value: '2' },
            })
        wrapper
            .find('input')
            .at(0)
            .simulate('change', {
                target: { name: 'phone', value: '8907654321' },
            })
        expect(wrapper.find('form')).toHaveLength(1)
        wrapper.find('form').simulate('submit')
        expect(wrapper.find('input')).toHaveLength(8)
        expect(wrapper.find('button')).toHaveLength(2)
        expect(wrapper.find('button').at(0).text()).toBe('Register')
        expect(wrapper.find('button').at(1).text()).toBe('Cancel')
        expect(regMockFunc).toHaveBeenCalledTimes(1)
        regMockFunc.mockClear()
    })

    it('testing list Page redirection from Register ', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Register />
            </Provider>
        )
        wrapper.find('button').at(1).simulate('click')
        expect(window.location.pathname).toMatch('/list')
    })
})

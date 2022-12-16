import React from 'react'
import { shallow, configure } from 'enzyme'
import { Redirect, Route } from 'react-router'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import 'regenerator-runtime/runtime'
import { Routes } from 'routes'
import {UserSignup,UserLogin,Notfound} from 'pages'
import * as tokenValidation from 'protectedRoutes'

configure({ adapter: new Adapter() })

describe('Testing Routes with token absent', () => {
    let pathMap = {}
    beforeAll(() => {
        const routes = shallow(<Routes />)
        jest.spyOn(tokenValidation, 'isTokenValid').mockReturnValue(false)
        pathMap = routes.find(Route).reduce((pathMap, route) => {
            const routeProps = route.props()
            if (routeProps.component) {
                pathMap[routeProps.path || '/random'] = routeProps.component
            } else if (routeProps.render) {
                pathMap[routeProps.path] = routeProps.render({}).type
            }
            return pathMap
        }, {})
    })
    it('should render Login page', () => {
        expect(pathMap['/']).toBe(UserLogin)
    })

    it('should render User page', () => {
        expect(pathMap['/signup']).toBe(UserSignup)
    })
    it('should redirect ', () => {
        expect(pathMap['/list']).toBe(Redirect)
    })

    it('should redirect ', () => {
        expect(pathMap['/register']).toBe(Redirect)
    })

    it('should render page not found page', () => {
        expect(pathMap['/random']).toBe(Notfound)
    })
})

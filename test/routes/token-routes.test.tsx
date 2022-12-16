import React from 'react'
import { shallow, configure } from 'enzyme'
import { Redirect, Route } from 'react-router'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import 'regenerator-runtime/runtime'
import { Routes } from 'routes'
import {Register,List,Notfound} from 'pages'
import * as tokenValidation from 'protectedRoutes'

configure({ adapter: new Adapter() })

describe('Testing Routes with token present', () => {
    let pathMap = {}
    beforeAll(() => {
        const routes = shallow(<Routes />)
        jest.spyOn(tokenValidation, 'isTokenValid').mockReturnValue(true)
        pathMap = routes.find(Route).reduce((pathMap, route) => {
            
            const routeProps = route.props()
            if (routeProps.component) {
                pathMap[routeProps.path || '/random'] = routeProps.component
            } else if (routeProps.render) {
                pathMap[routeProps.path ] = routeProps.render({}).type
            }
            return pathMap
        }, {})

    })
    it('should render redirect', () => {
        expect(pathMap['/']).toBe(Redirect)
    })

    it('should render redirect', () => {
        expect(pathMap['/signup']).toBe(Redirect)
    })
    it('should render list page ', () => {
        expect(pathMap['/list']).toBe(List)
    })

    it('should render register page ', () => {
        expect(pathMap['/register']).toBe(Register)
    })

    it('should render page not found page ', () => {
        expect(pathMap['/random']).toBe(Notfound)
    })
})

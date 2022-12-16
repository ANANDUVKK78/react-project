import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import {Button,Textbox,Label,Table} from 'components'

configure({ adapter: new Adapter() })

describe('Testing Components', () => {
    it('testing button component', () => {
        const mockFunc: jest.Mock = jest.fn()

        const wrapper = shallow(
            <Button
                type="button"
                label="Reg"
                className="sample"
                disabled={false}
                click={mockFunc}
            ></Button>
        )
        wrapper.find('button').simulate('click')
        expect(wrapper.find('button')).toHaveLength(1)
        expect(wrapper.find('button').text()).toBe('Reg')
        expect(wrapper.find('button').props().className).toBe('sample')
        expect(wrapper.find('button').props().disabled).toBe(false)
        expect(mockFunc.mock.calls.length).toEqual(1)

        const tree = renderer.create(<Button label="reg" />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('testing textbox component', () => {
        const mockChangeFunc: jest.Mock = jest.fn()
        const mockBlurFunc: jest.Mock = jest.fn()

        const wrapper = shallow(
            <Textbox
                type="text"
                className="sample"
                placeholder="sample"
                disabled={true}
                change={mockChangeFunc}
                blur={mockBlurFunc}
            ></Textbox>
        )
        wrapper.find('input').simulate('change')
        wrapper.find('input').simulate('blur')
        expect(wrapper.find('input')).toHaveLength(1)
        expect(wrapper.find('input').props().type).toBe('text')
        expect(wrapper.find('input').props().className).toBe('sample')
        expect(wrapper.find('input').props().placeholder).toBe('sample')
        expect(wrapper.find('input').props().disabled).toBe(true)
        expect(mockChangeFunc.mock.calls.length).toEqual(1)
        expect(mockBlurFunc.mock.calls.length).toEqual(1)
        const tree = renderer.create(<Textbox />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('testing label component', () => {
        const wrapper = shallow(<Label text="text" className="sample"></Label>)
        expect(wrapper.find('label')).toHaveLength(1)
        expect(wrapper.find('label').text()).toBe('text')
        expect(wrapper.find('label').props().className).toBe('sample')
        const tree = renderer.create(<Label />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('testing Table component', () => {
        const wrapper = shallow(
            <Table className="sample">
                <tr>
                    <td>sample</td>
                </tr>
            </Table>
        )
        expect(wrapper.find('table')).toHaveLength(1)
        expect(wrapper.find('table').props().className).toBe('sample')
        const tree = renderer
            .create(
                <Table>
                    <tr></tr>
                </Table>
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})

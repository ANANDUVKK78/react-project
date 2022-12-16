import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import CustomForm from 'container';

configure({ adapter: new Adapter() })

describe('Testing Custom form', () => {
    const mockSubmitFunc: jest.Mock = jest.fn()
    it('testing form component', () => {
        const wrapper = shallow(
            <CustomForm formSubmit={mockSubmitFunc} className="sample">
                <button type="submit"></button>
            </CustomForm>
        )
        wrapper.find('form').simulate('submit')
        expect(wrapper.find('form')).toHaveLength(1)
        expect(wrapper.find('button')).toHaveLength(1)
        expect(wrapper.find('form').props().className).toBe('sample')
        expect(mockSubmitFunc.mock.calls.length).toEqual(1)
        const tree = renderer
            .create(
                <CustomForm formSubmit={mockSubmitFunc} className="sample">
                    <button type="submit"></button>
                </CustomForm>
            )
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})

import React from 'react'
import App from './App.test'
import ReactShallowRender from 'react-test-renderer/shallow'
import {shallow} from 'enzyme'


describe ('componentes -> App ' , ()=>{

    test('deberia poder renderizar el componente (enzyme)',()=>{
        const wrapper = shallow(<App/>)
        expected(wrapper).toMatchSnapshot()
    })


    test('Busqueda de elementos css', ()=>{
        const wrapper = shallow(<App/>)
        expected(wrapper.find('div')).toHaveLenght(1)
        expected(wrapper.find('.user-row')).toHaveLenght(3)
    })

})
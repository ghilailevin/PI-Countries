import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Reducer from "../reducer/reducer.js"
const { expect } = require("chai")
configure({adapter: new Adapter()});


xdescribe('Reducer', () => {
    it('Deberia retornar el estado inicial', () => {
        expect(Reducer(undefined, {allCountries: [],
            countryDetail:{}}
        )).to.deep.equal({allCountries: [], countryDetail:{}})
    })
})
import {findNameCountry, orderBy, getAllCountries} from '../actions/actions.js'
import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import './styles/SearchBar.css'

const SearchBar = ({setCurrentPage}) => {
    const dispatch = useDispatch()

    const[input, setInput]= useState({
        name:"",
        order: "",
        continent: "",
        tourism: ""
    })

    const [state, setState] = useState([])

    useEffect(()=>{
        fetch("http://localhost:3001/countries/extra/all")
        .then( res => res.json() )
        .then(data => setState(data))
        
        if (input.name) {
            setCurrentPage(1)
            dispatch(findNameCountry(input.name))
        } else {
            setCurrentPage(1)
            dispatch(getAllCountries())
        }
        if(input.continent || input.order || input.tourism) {
            setCurrentPage(1)
            dispatch(orderBy(input.continent, input.order, input.tourism))
        }else{
            setCurrentPage(1)
            dispatch(orderBy(input.continent, input.order, input.tourism))
        }
        
    },[dispatch, input.name, input.order, input.continent, input.tourism])

    function handleName (e) {setInput({...input, name:e.target.value})}
    function handleOrder(e) {setInput({...input, order:e.target.value})}
    function handleFilterContinent(e) {setInput({...input, continent:e.target.value})}
    function handleFilterTourism(e) {setInput({...input, tourism:e.target.value})}

    return ( 
        <div className='filterBar'>
            <div className='filterBar'>
                <select className='selectOption' onChange={handleOrder} value={input.order}>
                <option value=''>Order By</option>
                <option value='ASC'>ASC</option>
                <option value='DESC'>DESC</option>
                <option value='population DESC'>Major Population</option>
                <option value='population ASC'>Menor Population</option>
                </select>
                
                <select className='selectOption' onChange={handleFilterContinent} value={input.continent}>
                    <option value="">Filter By Continent</option>
                    <option value="Europe">Europe</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Polar">Polar</option>
                </select>

                <select className='selectOption' onChange={handleFilterTourism} value={input.tourism}>
                    <option value="">Filter By Tourism</option>
                    {
                        state.map((country) => country.activities.map(activity => (
                            <option value={activity.name}>{activity.name}</option>
                        )))
                    }
                </select>

            </div> 
            
            <input type="text" placeholder="Search" className='input' onChange={handleName} value={input.name}/>
        </div>
     );
}
 
export default SearchBar;
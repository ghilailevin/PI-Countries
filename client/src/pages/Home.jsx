import "./styles/Home.css";
import Country from "./Country";
import { MdArrowBack, MdArrowForward, MdOutlineHourglassDisabled } from "react-icons/md";  
import React, { useEffect, useState } from 'react'; 
import {useDispatch, useSelector} from 'react-redux';
import { getAllCountries} from '../actions/actions.js';
import SearchBar from './SearchBar'

const Home = () => {

  //* METODO DE REDIRECCION EN EL BOTON PARA IR A LA RUTA 

  const handleRoute = () =>{ 
    window.location.href = "/home/newActivity";
  }
  
  //* DESPACHA LA ACCION GET_ALL_COUNTRIES
  const dispatch = useDispatch();
  const allCountries = useSelector(state => state.allCountries);
  const sortedCountries = useSelector(state => state.sortedCountries);
  const renderCountries = sortedCountries?.length > 0 ? sortedCountries : allCountries

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 16;
  const currentCountries = sortedCountries?.length > 0 ? sortedCountries.length : allCountries.length
  const total = Math.ceil(currentCountries / postsPerPage);


  const clickNextPage = () => {
    setCurrentPage(currentPage + 10);
  };
  const clickPrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 10);
  };


  useEffect(()=>{
    dispatch(getAllCountries())
  },[dispatch])

  return (
    <div className="home">
      <div className="navBar">
        <label className="title">List Countries</label>
        <SearchBar setCurrentPage={setCurrentPage}/>
      </div> 
      {
        renderCountries?.length > 0 ? 
        <div className='countries_grid'>
          {
            renderCountries?.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map((country) => (
              <Country 
                key={country.id}
                name={country.name.length > 11 ? country.name.slice(0,11) + "..." : country.name}
                image={country.imageFlag}
                region={country.continent}
                id={country.id}
              />
            )) 
          }
        </div>  : 
        <div className='notAvalaible'>
          <MdOutlineHourglassDisabled className='notFound-icon'/>
          <label className='notFound-text'>Not avalaible</label>
        </div>
      }
      <button className="float" onClick={handleRoute}>Create Activity</button>
      
      { 
        currentPage < 240 ? <h3 className="nextFloat" onClick={clickNextPage}>
        <MdArrowForward/>
        </h3> : null
      }
      
      { 
        currentPage > 0 ? <h3 className="beforeFloat" onClick={clickPrevPage}>
        <MdArrowBack/>
        </h3> : null
      }
      
    </div>
  );
};

export default Home;
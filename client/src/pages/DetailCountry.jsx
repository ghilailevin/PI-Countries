import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { findIdCountry } from '../actions/actions.js';
import {useParams} from 'react-router-dom';
import './styles/DetailCountry.css'

const DetailCountry = () =>{

    const dispatch = useDispatch();
    const countryDetail = useSelector(state => state.countryDetail)

    const km = countryDetail.area / 100000

    const handleRoute = () =>{
        window.location.href = '/home/newActivity'
    }

    const {id} = useParams();

    useEffect(() =>{
        dispatch(findIdCountry(id))
    },[dispatch, id])

    return(
        <div className='pageDetail'>
            <div className='navBarDetail'>
                <h2 className='navTitle'>DETAIL COUNTRY</h2>
            </div>
            <div className='countryDetail'>
                <img className='imgDetail' src={countryDetail?.imageFlag} alt={countryDetail?.name}/>
                <div>
                    <h1 className='idDetail'>{countryDetail?.id}</h1>
                    <h1 className='nameDetail'>{countryDetail?.name}</h1>
                    <h3 className='continentDetail'>continent: {countryDetail.continent}</h3>
                    <h3 className='capitalDetail'>capital: {countryDetail?.capital}</h3>
                    <h3 className='subregionDetail'>subreion: {countryDetail?.subregion}</h3>
                    <h3 className='areaDetail'>area: {km} km2</h3>
                    <h3 className='populationDetail'>population: {countryDetail?.population}</h3>
                </div>
            </div>
            <h1 className='showActivity'>Tourism Activities</h1>
            <button className='avtivity' onClick={handleRoute}>activities</button>
            {
                countryDetail.activities === undefined || countryDetail?.activities?.length === 0 ?<h2 className='loading'>There Are Not Activities Created</h2> : countryDetail?.activities?.map((activity) =>(
                    <div key={activity.id} className='cardActivity'>
                        <h1 className='titleActivity'>{activity.name}</h1>
                        <div className='containerActivity'>
                            <h4 className='difficultActivity'>Difficult: {activity.difficult}</h4>
                            <h4 className='durationActivity'>Duration: {activity.duration}</h4>
                            <h4 className='seasonActivity'>Season: {activity.season}</h4>
                        </div>
                        
                    </div>
                ))          
            }
        </div>
    )
}

export default DetailCountry
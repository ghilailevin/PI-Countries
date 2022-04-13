import './styles/Country.css'
import { Link } from 'react-router-dom'

const Country = (props) => {
    return(
        <div className='card'>
            <img src={props.image} alt={props.name} className='img'/>
            <h2 className='titleCard'>{props.name}</h2>
            <h4 className='continentTitle'>Continent: {props.region}</h4>
            <Link to={`/home/countries/${props.id}`} className='infoTitle'><h5>Show more</h5></Link>
        </div>
    )
}

export default Country
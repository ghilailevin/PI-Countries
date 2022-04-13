import React, { useEffect, useState } from 'react';
import './styles/CreateActivity.css'

function post (input) {
    fetch('http://localhost:3001/activity', {
        method: 'POST',
        body: JSON.stringify(input),
        headers:{
          'Content-Type': 'application/json'
        }
    })
}

const CreateActivity = () => {

    //* LOGICA EL ESTADO DEL FORM 
    const [input, setInput]= useState({
        name:"",
        duration: "",
        season: "",
        difficult: "",
        codeCountry: [],
    })

    function handleTitle(e){setInput({...input, name:e.target.value})}
    function handleDifficult(e){setInput({...input, difficult:e.target.value})}
    function handleDuration(e){setInput({...input, duration:e.target.value})} 
    function handleSeason(e){setInput({...input, season:e.target.value})}
    function handleCountries(e){setInput({...input, codeCountry:input.codeCountry.concat(e.target.value)})}

    function submitForm(e){
        e.preventDefault()
        
            if (!input.name) {
                alert('Title is required')
            } else if(!input.difficult){
                alert('Difficult is required')
            } else if(!input.duration){
                alert('Duration is required')
            } else if(!input.season){
                alert('Season is required')
            } else if(input.codeCountry.length === 0){
                alert('CodeCountry is required')
            } else {
                post(input)
                stateReset()
                alert('Actividad Agregada')
                window.location.href = "/home" 
            }    
    }

    
    function stateReset(){
        setInput({
            name:"",
            duration: "",
            season: "",
            difficult: "",
            codeCountry: [],
        })
    }  
    
    function resetCodeCountry(e){
        e.preventDefault()
        setInput({...input, codeCountry:[]})
    }

    //* FETCH DEL BACK PARA LOS DATOS QUE USARA EL CHECKBOX
    const [state, setState] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/countries/extra/all")
        .then( res => res.json() )
        .then(data => setState(data))
    },[])

    return ( 
        <div className='pageCreateTourism'>
            <div className='navTourism'>
                <h2 className='navTitle'>CREATE NEW TOURISM</h2>
            </div>
            <form onSubmit={submitForm} className='containerCreate' >
                <div >
                    <label className='titleCreate'>Title</label>
                    <input type="text" placeholder="Title of activity"  onChange={handleTitle} value={input.name}/>     
                </div>
                    <select onChange={handleDifficult} value={input.difficult} className='selectCreate'>
                        <option value='default'>Select difficult</option>
                        <option value="Baja">Baja</option>
                        <option value="Media-Baja">Media-Baja</option>
                        <option value="Media">Media</option>
                        <option value="Media-Alta">Media-Alta</option>
                        <option value="Alta">Alta</option>
                        <option value="Extrema">Extrema</option>
                    </select>

                    <select onChange={handleDuration} value={input.duration} className='selectCreate'>
                        <option value='default'>Select duration</option>
                        <option value="1 hr aprox">1 hr aprox</option>
                        <option value="2 hrs aprox">2 hrs aprox</option>
                        <option value="4 hrs aprox">4 hrs aprox</option>
                        <option value="6 hrs aprox">6 hrs aprox</option>
                        <option value="8 hrs aprox">8 hrs aprox</option>
                        <option value="10 hrs aprox">10 hrs aprox</option>
                        <option value="Dias indefinidos">Dias indefinidos</option>
                    </select>

                    <select onChange={handleSeason} value={input.season} className='selectCreate'>
                        <option value='default'>Select season</option>
                        <option value='Summer'>Summer</option>
                        <option value='Autumn'>Autumn</option>
                        <option value='Winter'>Winter</option>
                        <option value='Spring'>Spring</option>
                    </select>

                    <button className='btnClear' onClick={resetCodeCountry}>Clear Check</button>

                <div >

                <div className='scrollDiv'>
                    {
                    state.map((country) =>( 
                        
                        <div key={country.id}  onChange={handleCountries} value={input.codeCountry}className='listCreate'>
                            <input type="checkbox" value={country.id} key={country.id} />
                            {country.name}
                        </div>
                        
                    ))
                    } 
                </div>

                    <button className='button'>
                        Create
                    </button>
                </div>
                
            </form>        

        </div> 
    );
}
 
export default CreateActivity;
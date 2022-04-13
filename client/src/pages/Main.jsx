import './styles/Main.css'

const Main = () => {  
    
    const handleRoute = () =>{ 
        window.location.href = "/home";
    }

    return ( 
        <div className='main'>
            <div className='centerStack'>
                <h1 className='titleMain'>Henry Countries</h1>

                 <button
                    onClick={handleRoute} className='btn'>
                    Ingresar
                </button>
            </div>
           
        </div>        
     );
}
 
export default Main;
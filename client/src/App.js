import './App.css';
import { Route, Routes } from "react-router-dom";
import Main from './pages/Main'
import Home from './pages/Home'
import CreateActivity from './pages/CreateActivity'
import DetailCountry from './pages/DetailCountry'

function App() {
  return (

    <div className="App">

      <Routes>

      {/* RUTEAMOS LA LANGIND PAGE */}
       <Route exact path='/' element={<Main/>}/>
      
      {/* LLAMAMOS A NUESTRO COMPONENTE HOME PARA REDIRECIONAR LA RUTA */}
       <Route exact path ="/home" element={<Home/>}/>
        

       <Route exact path="/home/newActivity" element={<CreateActivity/>}/>
      

       <Route exact path='/home/countries/:id' element={<DetailCountry/>}/>

      </Routes>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import NavBar from "./components/NavBar"
import Smjerovi from "./pages/smjerovi/Lijekovi"

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import LijekoviDodaj from "./pages/Lijekovi/LijekoviDodaj"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <>
          <Route path={RoutesNames.HOME} element={<Pocetna />} />
          <Route path={RoutesNames.LIJEKOVI_PREGLED} element={<Lijekovi />} />
          <Route path={RoutesNames.LIJEKOVI_NOVI} element={<LijekoviDodaj />} />
        </>
      </Routes>
    </>
  )
}

export default App

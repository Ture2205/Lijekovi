import { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import NavBar from "./components/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Lijekovi from "./pages/lijekovi/Lijekovi"
import LijekoviDodaj from "./pages/lijekovi/LijekoviDodaj"
import LijekoviPromjeni from "./pages/lijekovi/LijekoviPromjeni"

import Recepti from "./pages/recepti/Recepti"
import ReceptiDodaj from "./pages/recepti/ReceptiDodaj"
import ReceptiPromjeni from "./pages/recepti/ReceptiPromjeni"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <>
          <Route path={RoutesNames.HOME} element={<Pocetna />} />
          <Route path={RoutesNames.LIJEKOVI_PREGLED} element={<Lijekovi />} />
          <Route path={RoutesNames.LIJEKOVI_DODAJ} element={<LijekoviDodaj />} />
          <Route path={RoutesNames.LIJEKOVI_PROMJENI} element={<LijekoviPromjeni />} />

          <Route path={RoutesNames.RECEPTI_PREGLED} element={<Recepti />} />
          <Route path={RoutesNames.RECEPTI_DODAJ} element={<ReceptiDodaj />} />
          <Route path={RoutesNames.RECEPTI_PROMJENI} element={<ReceptiPromjeni />} />
        </>
      </Routes>
    </>
  )
}

export default App
import './App.css'
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage.tsx";
import {MeteoPage} from "./pages/MeteoPage.tsx";

export enum Urls {
    Home = "/",
    Meteo = "/meteo",
}

function App() {

  return (
      <>
          <Routes>
              <Route path={Urls.Home} element={<HomePage/>} />
              <Route path={Urls.Meteo} element={<MeteoPage/>} />
          </Routes>
      </>
  )
}

export default App

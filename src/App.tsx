import './App.css'
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage.tsx";
import {MeteoPage} from "./pages/MeteoPage.tsx";
import {MarkerProvider} from "./contexts/MarkerContext.tsx";
import {CookiesProvider} from "react-cookie";

export enum Urls {
    Home = "/",
    Meteo = "/meteo",
}

function App() {

  return (
      <CookiesProvider>
          <Routes>
              <Route path={Urls.Home} element={<HomePage/>} />
              <Route path={Urls.Meteo} element={
                  <MarkerProvider>
                      <MeteoPage/>
                  </MarkerProvider>
              } />
          </Routes>
      </CookiesProvider>
  )
}

export default App

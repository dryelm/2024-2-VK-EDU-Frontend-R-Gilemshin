
import './App.css'
import {HashRouter, Route, Routes} from "react-router";
import {TranslatePage} from "./pages/TranslatePage/TranslatePage.tsx";
import {HistoryPage} from "./pages/HistoryPage/HistoryPage.tsx";


function App() {


  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<TranslatePage />}/>
          <Route path={"/history"} element={<HistoryPage/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App

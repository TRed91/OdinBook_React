import './App.css'
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import {Outlet} from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar.jsx";
import {useState} from "react";


function App() {

    const [user, setUser] = useState(true);

  return (
    <>
        <Header user={user} />
        <section>
            {user && <aside>
                <Sidebar/>
            </aside>}
            <main>
                <Outlet />
            </main>
        </section>
        <Footer />
    </>
  )
}

export default App

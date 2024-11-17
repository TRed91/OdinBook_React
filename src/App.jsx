import './App.css'
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import {Outlet} from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar.jsx";
import {useEffect, useState} from "react";

function App() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            fetch('http://localhost:3000/login', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        setUser(data.data);
                    }
                })
                .catch(err => console.log(err));
        }
    }, [user])

  return (
    <>
        <Header user={user} logoutUser={() => setUser(null)} />
        <section>
            {user && <aside>
                <Sidebar user={user} />
            </aside>}
            <main>
                <Outlet context={[user, setUser]} />
            </main>
        </section>
        <Footer />
    </>
  )
}

export default App

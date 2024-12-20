import './App.css'
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar.jsx";
import {useEffect, useState} from "react";

function App() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            fetch('https://site--odinbookapi--q2l8yjbfk2dn.code.run/login', {
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

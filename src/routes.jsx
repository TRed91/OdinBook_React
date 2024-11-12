import App from "./App.jsx";
import Login from "./components/signupLogin/login.jsx";
import Signup from "./components/signupLogin/signup.jsx";
import Profile from "./components/profile/profile.jsx";
import Posts from "./components/posts/posts.jsx";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Profile /> },
            { path: "posts", element: <Posts /> },
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
        ],
    },
];

export default routes;
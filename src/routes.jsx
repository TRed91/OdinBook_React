import App from "./App.jsx";
import Login from "./components/signupLogin/login.jsx";
import Signup from "./components/signupLogin/signup.jsx";
import Profile from "./components/profile/profile.jsx";
import RecentPosts from "./components/recentPosts/recentPosts.jsx";
import PostDetails from "./components/postDetails/postDetails.jsx";
import PostForm from "./components/postForm/postForm.jsx";
import Community from "./components/community/community.jsx";
import Requests from "./components/community/requests.jsx";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, path: "profile/:userId", element: <Profile /> },
            { path: "posts", element: <RecentPosts /> },
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
            { path: "posts/:postId", element: <PostDetails /> },
            { path: "new/:commentedId", element: <PostForm /> },
            { path: "community", element: <Community /> },
            { path: "requests", element: <Requests /> },
        ],
    },
];

export default routes;
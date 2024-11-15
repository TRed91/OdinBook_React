import App from "./App.jsx";
import Login from "./components/signupLogin/login.jsx";
import Signup from "./components/signupLogin/signup.jsx";
import Profile from "./components/profile/profile.jsx";
import RecentPosts from "./components/recentPosts/recentPosts.jsx";
import PostDetails from "./components/postDetails/postDetails.jsx";
import PostForm from "./components/postForm/postForm.jsx";
import Community from "./components/community/community.jsx";

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
            { path: "new", element: <PostForm /> },
            { path: "community", element: <Community /> },
        ],
    },
];

export default routes;
// import { Routes, Route, Navigate } from "react-router-dom";  
// import { useState, useEffect } from "react";
// import styled from "styled-components";
// import ResponsiveAppBar from "./components/Navigation/Navigation";
// import GlobalStyle from "./styles/GlobalStyles";
// import Dashboard from "./components/Dashboard/Dashboard";
// import Income from "./components/Income/Income";
// import Expenses from "./components/Expense/Expense";
// import Transactions from "./components/Transactions/Transactions";
// import Login from "./components/Auth/Login";
// import Signup from "./components/Auth/Signup";
// import Profile from "./components/Profile/Profile";
// import ChangePassword from "./components/Auth/ChangePassword";
// import EditProfile from "./components/Profile/EditProfile"
// import ChangeAccountDetails from "./components/Auth/ChangeAccountDetails";

// function App() {
//     const [userId, setUserId] = useState(localStorage.getItem("userId"));

//     useEffect(() => {
//         const storedUserId = localStorage.getItem("userId");
//         if (storedUserId) {
//             setUserId(storedUserId);
//         }
//     }, []);

//     return (
//         <>
//             <GlobalStyle />
//             <AppStyled>
//                 <ResponsiveAppBar /> 
//                 <main>
//                     <Routes>  
//                         <Route path="/signup" element={<Signup setUserId={setUserId} />} />
//                         <Route path="/login" element={<Login setUserId={setUserId} />} />
//                         <Route path="/" element={!userId ? <Navigate to="/signup" /> : <Dashboard userId={userId} />} />
//                         <Route path="/income" element={userId ? <Income userId={userId} /> : <Navigate to="/signup" />} />
//                         <Route path="/expenses" element={userId ? <Expenses userId={userId} /> : <Navigate to="/signup" />} />
//                         <Route path="/transactions" element={userId ? <Transactions userId={userId} /> : <Navigate to="/signup" />} />
//                         <Route path="/profile" element={userId ? <Profile userId={userId} /> : <Navigate to="/signup" />} />
//                         <Route path="/update-password" element={userId ? <ChangePassword /> : <Navigate to="/signup" />} />
//                         <Route path="/update-account" element={userId ? <ChangeAccountDetails /> : <Navigate to="/signup" />} />
//                         <Route path="/edit-profile" element={userId ? <EditProfile /> : <Navigate to="/signup" />} />

                        
//                     </Routes>
//                 </main>
//             </AppStyled>
//         </>
//     );
// }

// const AppStyled = styled.div`
//     height: 100vh;
//     padding: 0;
//     margin: 0;
// `;

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";  
import { useState, useEffect } from "react";
import styled from "styled-components";
import ResponsiveAppBar from "./components/Navigation/Navigation";
import GlobalStyle from "./styles/GlobalStyles";
import Dashboard from "./components/Dashboard/Dashboard";
import Income from "./components/Income/Income";
import Expenses from "./components/Expense/Expense";
import Transactions from "./components/Transactions/Transactions";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";  

function App() {
    const [userId, setUserId] = useState(localStorage.getItem("userId"));

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    return (
        <>
            <GlobalStyle />
            <AppStyled>
                <ResponsiveAppBar /> 
                <main>
                    <Routes>  
                        <Route path="/signup" element={<Signup setUserId={setUserId} />} />
                        <Route path="/login" element={<Login setUserId={setUserId} />} />
                        <Route path="/" element={!userId ? <Navigate to="/signup" /> : <Dashboard userId={userId} />} />
                        <Route path="/income" element={userId ? <Income userId={userId} /> : <Navigate to="/signup" />} />
                        <Route path="/expenses" element={userId ? <Expenses userId={userId} /> : <Navigate to="/signup" />} />
                        <Route path="/transactions" element={userId ? <Transactions userId={userId} /> : <Navigate to="/signup" />} />
                        <Route path="/profile" element={userId ? <Profile userId={userId} /> : <Navigate to="/signup" />} />
                        <Route path="/edit-profile" element={userId ? <EditProfile /> : <Navigate to="/signup" />} /> 
                    </Routes>
                </main>
            </AppStyled>
        </>
    );
}

const AppStyled = styled.div`
    height: 100vh;
    padding: 0;
    margin: 0;
`;

export default App;

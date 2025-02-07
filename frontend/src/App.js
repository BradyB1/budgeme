
// import styled from 'styled-components'
// import ResponsiveAppBar from './components/Navigation/Navigation'
// import GlobalStyle from './styles/GlobalStyles'
// import React, { useState }from 'react'
// import Dashboard from './components/Dashboard/Dashboard'
// import Income from './components/Income/Income'
// import Expenses from './components/Expense/Expense'
// import Transactions from './components/Transactions/Transactions'

// function App() {
//     const [active, setActive] = useState(1);
//     const userId = "67a27b6038bb6e0e8d286df7";  // 🔥 Replace with dynamic user authentication later

//     const displayData = () => {
//         switch (active) {
//             case 1: return <Dashboard userId={userId} />;
//             case 2: return <Income userId={userId} />;  // ✅ Pass userId to Income.js
//             case 3: return <Expenses userId={userId} />;
//             case 4: return <Transactions userId={userId} />;
//             default: return <Dashboard userId={userId} />;
//         }
//     };

//     return (
//         <>
//             <GlobalStyle />
//             <AppStyled>
//                 <ResponsiveAppBar active={active} setActive={setActive} />
//                 <main>{displayData()}</main>
//             </AppStyled>
//         </>
//     );
// }




// const AppStyled = styled.div`
//     height: 100vh;
//     padding: 0;
//     margin: 0;
// `

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
                <ResponsiveAppBar /> {/* ✅ No longer need active/setActive */}
                <main>
                    <Routes>  
                        <Route path="/signup" element={<Signup setUserId={setUserId} />} />
                        <Route path="/login" element={<Login setUserId={setUserId} />} />
                        <Route path="/" element={!userId ? <Navigate to="/signup" /> : <Dashboard userId={userId} />} />
                        <Route path="/income" element={userId ? <Income userId={userId} /> : <Navigate to="/signup" />} />
                        <Route path="/expenses" element={userId ? <Expenses userId={userId} /> : <Navigate to="/signup" />} />
                        <Route path="/transactions" element={userId ? <Transactions userId={userId} /> : <Navigate to="/signup" />} />
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
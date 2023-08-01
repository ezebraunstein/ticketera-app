// import React from 'react';
// import Header from './Header';
// import Footer from './Footer';

// const Layout = ({ children }) => {
//     return (
//         <div className="layout">
//             <Header />
//             <main className="content">{children}</main>
//             <Footer />
//         </div>
//     );
// };

// export default Layout;

import React from 'react';
import Header from './Header';
import HeaderRRPP from './HeaderRRPP';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();
    const isRRPPRoute = location.pathname === "/publica-events";

    return (
        <div className="layout">
            {isRRPPRoute ? <HeaderRRPP /> : <Header />}
            <main className="content">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;

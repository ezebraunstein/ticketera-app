import React from 'react';
import HeaderRRPP from './HeaderRRPP';
import Footer from './Footer';

const LayoutRRPP = ({ children }) => {
    return (
        <div className="layout">
            <HeaderRRPP />
            <main className="content">{children}</main>
            <Footer />
        </div>
    );
};

export default LayoutRRPP;

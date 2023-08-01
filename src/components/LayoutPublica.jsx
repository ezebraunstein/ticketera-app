import React from 'react';
import HeaderPublica from './HeaderPublica';
import Footer from './Footer';

const LayoutPublica = ({ children }) => {
    return (
        <div className="layout">
            <HeaderPublica />
            <main className="content">{children}</main>
            <Footer />
        </div>
    );
};

export default LayoutPublica;

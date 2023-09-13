import React from 'react';
import { Outlet } from 'react-router-dom';
import DashHeader from './DashHeader.js';
import DashFooter from './DashFooter.js';

function DashLayout() {
    return (
        <>
            <DashHeader />
            <div className="dash-container">
                <Outlet />
            </div>
            <DashFooter />
        </>
    );
}

export default DashLayout;

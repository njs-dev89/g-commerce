import React from 'react'
import Header from './Header'

function Layout({children}) {
    return (
        <div>
            <Header />
            <div className="container mx-auto">
            {children}
            </div>
        </div>
    )
}

export default Layout

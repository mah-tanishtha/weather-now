import React from 'react'
import SearchCity from '../components/SearchCity';
import '../styles/style.css'

const Layout = () => {
    return (
        <div className='main-container'>
            <div className='content-container d-flex '>
                <h3  style={{ margin: '0px',}}>Weather Checker</h3>
                <SearchCity />
            </div>
        </div>
    )
}

export default Layout

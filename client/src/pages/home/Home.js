import React, {useContext} from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import './Home.css';
import {AuthContext} from "../../context/AuthContext";

const Home = () => {
    const {user} = useContext(AuthContext);
    return (
        <>
            <Topbar/>
            <div className='homeContainer'>
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div>
        </>
    );
};

export default Home;
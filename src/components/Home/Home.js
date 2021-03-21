import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import FakeData from '../../data/FakeData.json'
import './Home.css'
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
const Home = () => {
    const [info, setInfo] = useContext(userContext)
    const [vehicles, setVehicles] = useState()
    useEffect(()=> {
        setVehicles(FakeData)
        setInfo(FakeData)
    },[setVehicles, setInfo],)
    return (
        <div className="home">
            <div className="vehicle-items">
                {
                    vehicles && vehicles.map(vehicle => {
                        return <Link to= {`/destination/${vehicle.id}`} style={{ textDecoration: 'none' }}>
                            <div className="vehicle">
                                <img src={vehicle.photoUrl} alt=""/>
                                <h2>{vehicle.name}</h2>
                            </div>
                        </Link>
                    })
                }
            </div>
        </div>
    );
};

export default Home;
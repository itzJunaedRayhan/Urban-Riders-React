import React, { useEffect, useState } from 'react';
import './Destination.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import MapImage from '../../images/Map.png'
import Car from '../../images/car.png'
import { useParams } from 'react-router';
import FakeData from '../../data/FakeData.json'
import MapContainer from '../MapContainer/MapContainer';
const Destination = () => {
    const {id} = useParams()
    const [isValid, setValid] = useState(false)
    const [location, setLocation] = useState({
        from : '',
        to : '',
        isLocated: false
    })

    // input validation
    const handleChange = (event) => {
        if(event.target.name === 'from'){
            const info = {...location};
            info.from = event.target.value; 
            info.isLocated = true;
            setLocation(info)
        }
        if(event.target.name === 'to'){
            const info = {...location};
            info.to = event.target.value; 
            info.isLocated = true;
            setLocation(info)
        }
        
        
    }
    const handleSubmit = (event) =>{
        event.preventDefault()
        if(!isValid && location.isLocated === true){
            setValid(true)
        }
    }




    //      get images by using map
    const [vehicles, setVehicles] = useState([])
    useEffect(()=> {
        setVehicles(FakeData)
    },[])
    

    var result = vehicles.find((vehicle) => { 
        if(vehicle.id === parseFloat(id)){
            return vehicle.photoUrl;
        } 
    }); 




    return (
        <div className="destination">
                <div className="location col-md-6 col-sm-12">
                    {
                    isValid ? <div className="get-location">
                                    <div className="location-info">
                                        <h2 id="form">{location.from}</h2>
                                        <h2 id="to">{location.to}</h2>
                                    </div>
                                    <div className="pricing">
                                        <div className="pricing-info">
                                            <img src={result.photoUrl || Car} alt=""/>
                                            <h3>Car</h3>
                                            <div className="logo"><FontAwesomeIcon icon={ faUserFriends} /> 4</div>
                                        </div>
                                        <h3>$67</h3>
                                    </div>
                                    <div className="pricing">
                                        <div className="pricing-info">
                                            <img src={result.photoUrl || Car} alt=""/>
                                            <h3>Car</h3>
                                            <div className="logo"><FontAwesomeIcon icon={ faUserFriends} /> 4</div>
                                        </div>
                                        <h3>$67</h3>
                                    </div>
                                    <div className="pricing">
                                        <div className="pricing-info">
                                            <img src={result.photoUrl || Car} alt=""/>
                                            <h3>Car</h3>
                                            <div className="logo"><FontAwesomeIcon icon={ faUserFriends} /> 4</div>
                                        </div>
                                        <h3>$67</h3>
                                    </div>
                                </div> 
                            :
                                <div className="set-location">
                                    <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="From">Pick From</label><br/>
                                        <input type="text" onBlur={handleChange} name="from" placeholder="Mirpur 1" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="To">Pick To</label><br/>
                                        <input type="text" onBlur={handleChange} name="to" placeholder="Danmondi" required/>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn locationBtn">Search</button>
                                    </div>
                                </form>
                                </div>

                    }
                </div>
                <div className="map col-md-6">
                    <MapContainer/>
                </div>
            </div>
    );
};

export default Destination;
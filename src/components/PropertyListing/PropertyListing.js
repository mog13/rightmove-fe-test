import React, {useEffect} from 'react';

//store
import {useDispatch, useSelector} from "react-redux";
import {getProperties} from "../../store/reducers/properties";
import {fetchAllProperties} from "../../store/actions/properties";

//components
import PropertyCard from '../PropertyCard';

//style
import './PropertyListing.scss';


const PropertyListing = () => {

    const properties = useSelector(getProperties);
    const dispatch = useDispatch();
    //load all the properties on first render. Add some sort of check either here
    // or in the action to prevent re-fetching warm data
    useEffect(()=>{
        dispatch(fetchAllProperties())
    },[dispatch])

    return (
        <div className="PropertyListing">
            {
                properties.map((property, index) => <PropertyCard key={index} {...property}/>)
            }
        </div>
    )
};

export default PropertyListing;

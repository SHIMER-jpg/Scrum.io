import React from "react";
import {useSelector} from 'react-redux'
import advertisements from './dataTest'
import Advertisement from "../../components/Advertisement/Advertisement";

export function Advertisements (){
    return (
        <div>
            <div>Advertisements</div>
            {advertisements && advertisements.map( (ad) =>(
                <Advertisement 
                title={ad.title}
                description={ad.description}/>
            ))}
        </div>
    )
}

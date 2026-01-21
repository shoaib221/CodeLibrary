"use client"

import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useNavContext } from '../Nav/context';

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});


const cities = [
    { name: "Dhaka", latitude: 23.8103, longitude: 90.4125 },
    { name: "Chattogram", latitude: 22.3569, longitude: 91.7832 },
    { name: "Khulna", latitude: 22.8456, longitude: 89.5403 },
    { name: "Rajshahi", latitude: 24.3745, longitude: 88.6042 },
    { name: "Sylhet", latitude: 24.8949, longitude: 91.8687 },
    { name: "Barishal", latitude: 22.7010, longitude: 90.3535 },
    { name: "Rangpur", latitude: 25.7439, longitude: 89.2752 },
    { name: "Mymensingh", latitude: 24.7471, longitude: 90.4203 },
    { name: "Cumilla", latitude: 23.4607, longitude: 91.1809 },
    { name: "Narayanganj", latitude: 23.6238, longitude: 90.5000 },
    { name: "Gazipur", latitude: 23.9999, longitude: 90.4203 },
    { name: "Bogra", latitude: 24.8465, longitude: 89.3773 },
    { name: "Jessore", latitude: 23.1667, longitude: 89.2167 },
    { name: "Cox's Bazar", latitude: 21.4272, longitude: 92.0058 },
    { name: "Pabna", latitude: 24.0064, longitude: 89.2372 },
    { name: "Tangail", latitude: 24.2513, longitude: 89.9167 },
    { name: "Dinajpur", latitude: 25.6279, longitude: 88.6332 },
    { name: "Faridpur", latitude: 23.6070, longitude: 89.8429 },
    { name: "Noakhali", latitude: 22.8696, longitude: 91.0994 },
    { name: "Feni", latitude: 23.0159, longitude: 91.3976 },
    { name: "Brahmanbaria", latitude: 23.9571, longitude: 91.1119 },
    { name: "Kushtia", latitude: 23.9013, longitude: 89.1208 },
    { name: "Satkhira", latitude: 22.7085, longitude: 89.0718 },
    { name: "Sirajganj", latitude: 24.4577, longitude: 89.7080 },
    { name: "Narsingdi", latitude: 23.9322, longitude: 90.7154 },
    { name: "Gopalganj", latitude: 23.0051, longitude: 89.8266 },
    { name: "Patuakhali", latitude: 22.3596, longitude: 90.3299 },
    { name: "Lakshmipur", latitude: 22.9447, longitude: 90.8301 },
    { name: "Jamalpur", latitude: 24.9375, longitude: 89.9370 },
    { name: "Thakurgaon", latitude: 26.0330, longitude: 88.4699 }
];



export const SearchOutlets = () => {

    const mapRef = useRef(null);
    const { screen } = useNavContext();



    function Search(val) {

        let country = cities.find(x => x.name.toLowerCase().includes(val.toLowerCase()))
        if (country) {
            let coord = [country.latitude, country.longitude]
            mapRef.current.flyTo(coord, 12);
        }
    }


    return (
        <div className='flex flex-col w-full p-4 relative' >

            <div className='header-2' >Locate Us</div>

            <input
                className='bg-(--color1) text-(--color2) absolute bottom-6 right-6 z-10 rounded-lg w-[50vw] p-2 ring-(--color1)' style={{ width: '15rem' }}
                placeholder='Search by city' onChange={(e) => Search(e.target.value)} />

            <div className='rounded-lg' >
                <MapContainer ref={mapRef} center={[24, 90]} zoom={6} scrollWheelZoom={false} className='h-90 z-0 w-full' >

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                    {cities && cities.map(center => (
                        <Marker key={center.name} position={[center.latitude, center.longitude]}>
                            <Popup>
                                {center.name}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

            </div>
        </div>
    )
}




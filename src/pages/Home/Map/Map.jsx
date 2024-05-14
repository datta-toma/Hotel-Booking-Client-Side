
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';



const Map = () => {

    useEffect(() => {
        Aos.init( );
    }, []);

    return (
        <div className='mt-10'>
            <h2 className="text-5xl mb-5 text-center font-extrabold" data-aos="flip-down">Hotel Map Location</h2>
            <MapContainer
            center={[51.505, -0.09]} // Set the initial map center [latitude, longitude]
            zoom={13} // Set the initial map zoom level
            style={{ height: '500px', width: '100%' }} // Set the size of the map
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Tile source (OpenStreetMap)
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[51.505, -0.09]}> 
           
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>

        </div>
    );
};

export default Map;
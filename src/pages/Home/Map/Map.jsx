
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';




const Map = () => {
    return (
        <div className='mt-10'>
            <h2 className="text-4xl mb-5 text-center font-extrabold">Map</h2>
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
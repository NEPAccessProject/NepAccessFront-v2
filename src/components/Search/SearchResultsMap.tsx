import { Box } from '@mui/material';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
const SearchResultsMap = () => {

    return (
        <Box flex={1} height={500} width={1000}>
        <MapContainer center={[32.2540, 110.9742]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[32.2540, 110.9742]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer></Box>
    )

}

export default SearchResultsMap;
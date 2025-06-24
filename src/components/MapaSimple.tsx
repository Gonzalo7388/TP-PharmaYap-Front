// src/components/MapaSimple.tsx
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState, useEffect, useRef } from 'react';

// IMPORTANT: Fix Leaflet default icon issues with Webpack/CRA
// This is a common issue and this fix ensures the marker icons load correctly.
// @ts-ignore

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Componente interno para manejar los eventos del mapa (clic) y actualizar la posición
interface MapEventsHandlerProps {
  setPosition: React.Dispatch<React.SetStateAction<[number, number]>>;
  geocodificar: (lat: number, lon: number) => void;
}

const MapEventsHandler: React.FC<MapEventsHandlerProps> = ({ setPosition, geocodificar }) => {
  const map = useMap(); // Get the map instance

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      geocodificar(lat, lng);
      // Optional: pan the map to the clicked point if not already centered
      map.setView([lat, lng], map.getZoom());
    },
  });
  return null;
};

// Componente para controlar el centro del mapa dinámicamente
interface ChangeViewProps {
  center: [number, number];
  zoom: number;
}

const ChangeView: React.FC<ChangeViewProps> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Props esperadas por MapaSimple desde AddressModal
interface MapaSimpleProps {
  onLocationSelect: (
    address: string,
    additionalReferences: string,
    numeroEncontrado: boolean
  ) => void;
}

// Componente principal del mapa
const MapaSimple: React.FC<MapaSimpleProps> = ({ onLocationSelect }) => {
  // Coordenadas de Lima, Perú (centro aproximado)
  const LIMA_CENTER: [number, number] = [-12.046374, -77.042793]; 

  const [position, setPosition] = useState<[number, number]>(LIMA_CENTER);
  const [localDireccion, setLocalDireccion] = useState<string>('');
  const [localReferencias, setLocalReferencias] = useState<string>('');
  const [localNumeroEncontrado, setLocalNumeroEncontrado] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>('');

  // Función para geocodificación inversa (coordenadas a dirección)
  const geocodificarInversa = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`
      );
      const data = await res.json();
      const addr = data?.address;

      if (addr) {
        const calle = addr.road || addr.pedestrian || addr.cycleway || addr.footway || addr.path || 'Calle desconocida';
        const numero = addr.house_number || addr.building_number || addr.house || '';

        const barrio = addr.suburb || addr.neighbourhood || addr.village || '';
        const distrito = addr.city_district || addr.county || addr.town || addr.city || '';
        const provincia = addr.county || ''; // Added province as it's common in Peru
        const departamento = addr.state || ''; // Added department
        const pais = addr.country || '';
        const codigoPostal = addr.postcode || '';

        let direccionFormateada = calle;
        let numFound = true;

        if (numero) {
          direccionFormateada += ` ${numero}`;
          numFound = true;
        } else {
          numFound = false;
        }
        
        // Build address string, prioritizing more specific details
        if (barrio) direccionFormateada += `, ${barrio}`;
        if (distrito && !direccionFormateada.includes(distrito)) direccionFormateada += `, ${distrito}`; // Avoid duplication
        if (provincia && !direccionFormateada.includes(provincia)) direccionFormateada += `, ${provincia}`;
        if (departamento && !direccionFormateada.includes(departamento)) direccionFormateada += `, ${departamento}`;
        if (pais && !direccionFormateada.includes(pais)) direccionFormateada += `, ${pais}`; // Ensure country is last if present
        if (codigoPostal) direccionFormateada += `, CP ${codigoPostal}`;

        setLocalDireccion(direccionFormateada);
        setLocalNumeroEncontrado(numFound);
        setLocalReferencias(''); // Clear local references on new map selection

        // Pass data up to parent (AddressModal)
        onLocationSelect(direccionFormateada, '', numFound); // Pass empty string for references here, let user type them
      } else {
        setLocalDireccion('Dirección no encontrada');
        setLocalNumeroEncontrado(true); // Treat as found to not force references
        setLocalReferencias('');
        onLocationSelect('Dirección no encontrada', '', true);
      }
    } catch (error) {
      console.error('Error al obtener dirección (geocodificación inversa):', error);
      setLocalDireccion('Error al obtener dirección');
      setLocalNumeroEncontrado(true);
      setLocalReferencias('');
      onLocationSelect('Error al obtener dirección', '', true);
    }
  };

  // Función para geocodificación directa (texto a coordenadas)
  const buscarDireccionEnMapa = async () => {
    if (!searchInput.trim()) {
      alert('Por favor, ingresa una dirección para buscar.');
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchInput)}, Lima, Peru&format=json&limit=1&countrycodes=pe`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newPosition: [number, number] = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPosition);

        // Perform reverse geocoding to get the formatted address for the new position
        geocodificarInversa(newPosition[0], newPosition[1]);
        setLocalReferencias(''); // Clear local references on new search
      } else {
        alert('No se encontraron resultados para la dirección ingresada. Intenta ser más específico (ej. "Av. Arequipa 123, Miraflores, Lima").');
        setLocalDireccion('Dirección no encontrada');
        setLocalNumeroEncontrado(true);
        setLocalReferencias('');
        onLocationSelect('Dirección no encontrada', '', true); // Indicate address not found
      }
    } catch (error) {
      console.error('Error al buscar dirección:', error);
      alert('Hubo un error al buscar la dirección. Inténtalo de nuevo.');
      setLocalDireccion('Error al buscar dirección');
      setLocalNumeroEncontrado(true);
      setLocalReferencias('');
      onLocationSelect('Error al buscar dirección', '', true);
    }
  };

  // Effect to geocode the initial position when the component mounts
  useEffect(() => {
    geocodificarInversa(position[0], position[1]);
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-4">
        <label htmlFor="searchAddress" className="block text-gray-700 text-sm font-bold mb-2">
          Buscar dirección:
        </label>
        <div className="flex gap-2">
          <input
            id="searchAddress"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                buscarDireccionEnMapa();
              }
            }}
            placeholder="Ej: Av. Arequipa 123, Miraflores"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="button"
            onClick={buscarDireccionEnMapa}
            className="px-4 py-2 bg-[#B73852] text-white rounded-md hover:bg-[#a02e45] transition-colors duration-300"
          >
            Buscar
          </button>
        </div>
      </div>

      <div style={{ height: '400px', width: '100%', marginBottom: '1rem' }}>
        <MapContainer center={position} zoom={16} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>Ubicación seleccionada</Popup>
          </Marker>
          <MapEventsHandler setPosition={setPosition} geocodificar={geocodificarInversa} />
          <ChangeView center={position} zoom={16} />
        </MapContainer>
      </div>

      <label className="block text-gray-700 text-sm font-bold mb-2">Dirección obtenida:</label>
      <input
        type="text"
        value={localDireccion}
        readOnly
        placeholder="Dirección automática del mapa"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />

      <label className="block text-gray-700 text-sm font-bold mb-2">
        Referencias adicionales (ej: Color de casa, entre calles, etc):
      </label>
      <input
        type="text"
        value={localReferencias}
        onChange={(e) => {
          setLocalReferencias(e.target.value);
          // Pass the updated references immediately to the parent
          onLocationSelect(localDireccion, e.target.value, localNumeroEncontrado);
        }}
        placeholder="Agrega detalles para que el motorizado llegue mejor"
        disabled={localNumeroEncontrado} // Disable if a number was found, assuming it's less critical
        className={`
          shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
          ${localNumeroEncontrado ? 'bg-gray-100 cursor-not-allowed' : ''}
        `}
      />
      {!localNumeroEncontrado && (
        <p className="text-xs text-red-500 mt-1">
          *Por favor, agrega una referencia detallada, ya que no se encontró número de calle para esta ubicación.
        </p>
      )}
    </div>
  );
};

export default MapaSimple;
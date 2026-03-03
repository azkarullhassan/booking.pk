'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Hotel } from '@/lib/hotels-data';

interface HotelMapProps {
  hotels: Hotel[];
  onHotelSelect: (hotel: Hotel) => void;
  selectedHotel?: Hotel;
  onClose?: () => void;
}

export default function HotelMap({ hotels, onHotelSelect, selectedHotel, onClose }: HotelMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const popupRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initMap = async () => {
      // Dynamically import Leaflet
      const L = (await import('leaflet')).default;
      
      // Import CSS
      await import('leaflet/dist/leaflet.css');

      if (!mapRef.current || mapInstanceRef.current) return;

      // Create map
      const map = L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        touchZoom: true
      }).setView([35.9197, 74.3078], 7);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(map);

      mapInstanceRef.current = map;

      // Custom marker icons
      const defaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      const selectedIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [30, 49],
        iconAnchor: [15, 49],
        popupAnchor: [1, -42],
        shadowSize: [49, 49]
      });

      // Add markers for hotels
      hotels.forEach((hotel) => {
        const marker = L.marker(hotel.coordinates, { icon: defaultIcon })
          .addTo(map)
          .bindPopup(`
            <div class="p-3 min-w-[200px]">
              <img src="${hotel.image}" alt="${hotel.name}" class="w-full h-32 object-cover rounded-lg mb-3 shadow-md" />
              <h3 class="font-bold text-base text-gray-800 mb-1">${hotel.name}</h3>
              <div class="flex items-center mb-2">
                <svg class="w-3 h-3 text-gray-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                </svg>
                <p class="text-xs text-gray-600">${hotel.location}</p>
              </div>
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <svg class="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span class="text-xs text-gray-600">${hotel.rating}</span>
                </div>
                <p class="text-sm font-bold text-green-600">₹${hotel.price.toLocaleString()}/night</p>
              </div>
              <button 
                onclick="window.selectHotel(${hotel.id})" 
                class="w-full bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200 shadow-md"
              >
                View Details
              </button>
            </div>
          `, {
            maxWidth: 250,
            className: 'custom-popup'
          });

        markersRef.current.push(marker);

        marker.on('click', () => {
          onHotelSelect(hotel);
          // Zoom to marker when clicked
          map.setView(hotel.coordinates, 12, { animate: true });
        });

        // Add hover effects
        marker.on('mouseover', function() {
          this.openPopup();
        });
      });

      // Global function for popup button
      (window as any).selectHotel = (hotelId: number) => {
        const hotel = hotels.find(h => h.id === hotelId);
        if (hotel) {
          onHotelSelect(hotel);
        }
      };

      // Fit map to show all markers
      if (hotels.length > 0) {
        const group = new L.featureGroup(markersRef.current);
        map.fitBounds(group.getBounds().pad(0.1));
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
    };
  }, [hotels, onHotelSelect]);

  // Update selected hotel marker
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedHotel) return;

    const L = require('leaflet');
    
    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const selectedIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [30, 49],
      iconAnchor: [15, 49],
      popupAnchor: [1, -42],
      shadowSize: [49, 49]
    });

    // Reset all markers
    markersRef.current.forEach(marker => {
      marker.setIcon(defaultIcon);
    });

    // Highlight selected hotel marker
    const selectedMarker = markersRef.current.find(marker => 
      marker.getLatLng().lat === selectedHotel.coordinates[0] &&
      marker.getLatLng().lng === selectedHotel.coordinates[1]
    );

    if (selectedMarker) {
      selectedMarker.setIcon(selectedIcon);
      selectedMarker.openPopup();
      // Center map on selected hotel
      mapInstanceRef.current.setView(selectedHotel.coordinates, 12, { animate: true });
    }
  }, [selectedHotel]);

  return (
    <div className="relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[10000] bg-white hover:bg-red-50 p-3 rounded-full shadow-2xl border-2 border-gray-300 hover:border-red-300 transition-all duration-200 transform hover:scale-110"
        >
          <X className="h-5 w-5 text-gray-600 hover:text-red-600" />
        </button>
      )}
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-xl shadow-lg border border-gray-200"
        style={{ minHeight: '400px' }}
      />
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
        .leaflet-container {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}
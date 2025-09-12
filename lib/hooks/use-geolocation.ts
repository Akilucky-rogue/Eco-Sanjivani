"use client"

import { useState, useEffect } from "react"

interface GeolocationState {
  latitude: number | null
  longitude: number | null
  accuracy: number | null
  error: string | null
  loading: boolean
  isUsingMockData: boolean
  locationName: string | null
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean
  timeout?: number
  maximumAge?: number
  useMockData?: boolean
}

// Mock locations for major Indian cities and ecosystems
const MOCK_LOCATIONS = {
  "Mumbai, Maharashtra": { lat: 19.076, lng: 72.8777 },
  "Delhi, NCR": { lat: 28.6139, lng: 77.209 },
  "Bangalore, Karnataka": { lat: 12.9716, lng: 77.5946 },
  "Sundarbans, West Bengal": { lat: 21.9497, lng: 88.4297 },
  "Western Ghats, Kerala": { lat: 10.8505, lng: 76.2711 },
  "Kaziranga, Assam": { lat: 26.5775, lng: 93.1714 },
  "Ranthambore, Rajasthan": { lat: 26.0173, lng: 76.5026 },
  "Gir Forest, Gujarat": { lat: 21.1249, lng: 70.7947 },
  "Himalayas, Uttarakhand": { lat: 30.0668, lng: 79.0193 },
  "Andaman Islands": { lat: 11.7401, lng: 92.6586 },
}

export function useGeolocation(options: GeolocationOptions = {}) {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    loading: true,
    isUsingMockData: false,
    locationName: null,
  })

  useEffect(() => {
    if (options.useMockData) {
      // Use mock location data
      const locations = Object.entries(MOCK_LOCATIONS)
      const randomLocationEntry = locations[Math.floor(Math.random() * locations.length)]
      const [locationName, coordinates] = randomLocationEntry

      setState({
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        accuracy: 100, // Mock accuracy
        error: null,
        loading: false,
        isUsingMockData: true,
        locationName: `${locationName} (Mock Data)`,
      })
      return
    }

    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: "Geolocation is not supported by this browser",
        loading: false,
      }))
      return
    }

    const defaultOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
      ...options,
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        error: null,
        loading: false,
        isUsingMockData: false,
        locationName: "Real-time GPS Location",
      })
    }

    const handleError = (error: GeolocationPositionError) => {
      let errorMessage = "Unknown location error"

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Location access denied by user"
          break
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information unavailable"
          break
        case error.TIMEOUT:
          errorMessage = "Location request timed out"
          break
      }

      setState((prev) => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }))
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, defaultOptions)
  }, [options]) // Fixed dependency array to include entire options object

  const getCurrentLocation = () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
          loading: false,
          isUsingMockData: false,
          locationName: "Real-time GPS Location",
        })
      },
      (error) => {
        setState((prev) => ({
          ...prev,
          error: error.message,
          loading: false,
        }))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  const setMockLocation = (locationName?: string) => {
    const locations = Object.entries(MOCK_LOCATIONS)
    let selectedLocationName: string
    let selectedLocation: { lat: number; lng: number }

    if (locationName && locationName in MOCK_LOCATIONS) {
      selectedLocationName = locationName
      selectedLocation = MOCK_LOCATIONS[locationName as keyof typeof MOCK_LOCATIONS]
    } else {
      const randomEntry = locations[Math.floor(Math.random() * locations.length)]
      selectedLocationName = randomEntry[0]
      selectedLocation = randomEntry[1]
    }

    setState({
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
      accuracy: 100, // Mock accuracy
      error: null,
      loading: false,
      isUsingMockData: true,
      locationName: `${selectedLocationName} (Mock Data)`,
    })
  }

  return {
    ...state,
    location:
      state.latitude && state.longitude
        ? {
            lat: state.latitude,
            lng: state.longitude,
          }
        : null,
    getCurrentLocation,
    setMockLocation, // Renamed from useMockLocation to avoid hook naming confusion
    mockLocations: Object.keys(MOCK_LOCATIONS),
  }
}

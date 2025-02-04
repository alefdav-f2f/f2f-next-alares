export interface StoreProps {
    id: string
    name: string
    longitude: string
    latitude: string
    address: string
    openingHours: string
    cityId: string,
    isActive: boolean,
    accessibility: boolean,
    bus_station: boolean,
    parking: boolean,
    reference_point: string
}

export interface StoreListProps {
    address: string
    city: string
    createdAt: string
    id: string
    latitude: string
    longitude: string
    name: string
    openingHours: string
    uf: string
    updatedAt: string
}
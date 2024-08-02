import { Location } from 'src/shared/interface'


export const calculateDistance = (pickup: Location, dropoff: Location): number => {
  const toRadians = (degree: number): number => (degree * Math.PI) / 180

  const radius = 6371
  const dLat = toRadians(dropoff.lat - pickup.lat)
  const dLon = toRadians(dropoff.lng - pickup.lng)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(pickup.lat)) * Math.cos(toRadians(dropoff.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return radius * c
}
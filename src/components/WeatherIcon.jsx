import { Image } from 'react-bootstrap'
import icon01d from '../assets/img/01d.png'
import icon01n from '../assets/img/01n.png'
import icon02d from '../assets/img/02d.png'
import icon02n from '../assets/img/02n.png'
import icon03d from '../assets/img/03d.png'
import icon03n from '../assets/img/03n.png'
import icon04d from '../assets/img/04d.png'
import icon04n from '../assets/img/04n.png'
import icon09d from '../assets/img/09d.png'
import icon09n from '../assets/img/09n.png'
import icon10d from '../assets/img/10d.png'
import icon10n from '../assets/img/10n.png'
import icon11d from '../assets/img/11d.png'
import icon11n from '../assets/img/11n.png'
import icon13d from '../assets/img/13d.png'
import icon13n from '../assets/img/13n.png'
import icon50d from '../assets/img/50d.png'
import icon50n from '../assets/img/50n.png'

const iconMap = {
  '01d': icon01d,
  '01n': icon01n,
  '02d': icon02d,
  '02n': icon02n,
  '03d': icon03d,
  '03n': icon03n,
  '04d': icon04d,
  '04n': icon04n,
  '09d': icon09d,
  '09n': icon09n,
  '10d': icon10d,
  '10n': icon10n,
  '11d': icon11d,
  '11n': icon11n,
  '13d': icon13d,
  '13n': icon13n,
  '50d': icon50d,
  '50n': icon50n,
}

function WeatherIcon({ iconCode }) {
  const imageSrc = iconMap[iconCode] || icon01d

  return (
    <>
      <Image src={imageSrc} thumbnail alt="weather icon" />
    </>
  )
}

export default WeatherIcon

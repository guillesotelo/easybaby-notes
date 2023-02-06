import React from 'react'
import { VERSION } from 'src/constants/app'
import FooterLogo from '../../assets/logos/easy_logo.png'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className="footer__container">
      <img src={FooterLogo} alt="" className="footer__logo" />
      <h4 className="footer__text">EASY Notes © 2023</h4>
      <h4 className="footer__version">{VERSION}</h4>
    </div>
  )
}

export default Footer
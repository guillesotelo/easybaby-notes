import React, { Dispatch, SetStateAction } from 'react'
import { AiOutlineClose, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string,
  setTitle: Dispatch<SetStateAction<string>>,
  menuOpened: boolean,
  setMenuOpened: Dispatch<SetStateAction<boolean>>
}

const Header: React.FC<Props> = (props) => {
  const navigate = useNavigate()

  const {
    title,
    setTitle,
    menuOpened,
    setMenuOpened
  } = props

  return (
    <div className="header__container">
      {menuOpened ?
        <AiOutlineClose size='8vw' onClick={() => {
          setMenuOpened(false)
          setTitle('')
        }} />
        :
        <AiOutlineMenu size='7vw' onClick={() => {
          setMenuOpened(true)
          setTitle('Menu')
        }} />
      }
      <h4 className="header__title">{title || 'E.A.S.Y Notes'}</h4>
      <AiOutlineUser size='8vw' onClick={() => {
        setMenuOpened(false)
        setTitle('Account')
        navigate('/account')
      }} />
    </div>
  )
}

export default Header
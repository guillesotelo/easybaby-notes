import React from 'react'
import { useNavigate } from "react-router-dom";

type Props = {
  menuOpened: boolean
}

const Sidebar: React.FC<Props> = ({ menuOpened }) => {
  const navigate = useNavigate()

  return (
    <div className={`sidebar__wrapper ${menuOpened ? 'sidebar__opened' : ''}`}>
      <div className='sidebar__container'>
        <h4 className="sidebar__module" onClick={() => navigate('/')}>New Notebook</h4>
        <h4 className="sidebar__module" onClick={() => navigate('/')}>Settings</h4>
        <h4 className="sidebar__module" onClick={() => navigate('/')}>Logout</h4>
      </div>
    </div>
  )
}

export default Sidebar
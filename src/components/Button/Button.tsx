import React from 'react'

interface Props {
    label?: string | number,
    svgPath?: string,
    type?: string,
    color?: string,
    variant?: string,
    style?: React.CSSProperties | Object,
    handleClick?: () => void
}

const Button: React.FC<Props> = (props) => {
    const {
        label,
        svgPath,
        style,
        handleClick,
        type,
        color,
        variant
    } = props

    const addButtonStyle = {
        position: 'fixed',
        bottom: 0,
        right: 0,
        margin: '8vw'
    }

    const removeButtonStyle = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        margin: '8vw'
    }

    const btnStyle = variant === 'add' ? { ...style, ...addButtonStyle } :
        variant === 'remove' ? { ...style, ...removeButtonStyle } : style

    return (
        <div className={type ? `button__container-${type}` : "button__container-default"}
            style={{ ...btnStyle, backgroundColor: color && color }}
            onClick={handleClick}>
            {label ? <h4 className="button__label" >{label}</h4> : ''}
            {svgPath ? <img src={svgPath} alt="Button Image" className="button__svg" /> : ''}
        </div>
    )
}

export default Button
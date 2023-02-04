import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
    label?: string,
    name: string,
    updateData: (key: string | number, value: any, index?: number) => void,
    items?: string[],
    setItems?: Dispatch<SetStateAction<string[]>>,
    options: string[],
    value?: string | number | boolean,
    index?: number,
    style?: React.CSSProperties | Object,
    size?: number | string,
    placeholder?: number | string
}

const Dropdown: React.FC<Props> = (props) => {
    const [openDrop, setOpenDrop] = useState<boolean>(false)
    const [selected, setSelected] = useState<string>('')

    const {
        label,
        name,
        updateData,
        items,
        setItems,
        options,
        value,
        index,
        style,
        size,
        placeholder
    } = props

    useEffect(() => {
        window.addEventListener('mouseup', e => {
            if (e.target && e.target instanceof HTMLElement && e.target.className) {
                if (e.target.className !== 'dropdown-option') setOpenDrop(false)
            } else setOpenDrop(false)
        })
    }, [])

    return (
        <div className='dropdown-container' style={style}>
            {label ?
                <h4 className='dropdown-label'>
                    {label || ''}
                </h4> : ''}
            <div className='dropdown-select-section'>
                <div
                    className='dropdown-select'
                    style={{
                        border: openDrop ? '1px solid #CCB7AE' : '',
                        width: size ? size : ''
                    }}
                    onClick={() => setOpenDrop(!openDrop)}>
                    <h4 className='dropdown-selected'>
                        {value ? value : selected ? selected : placeholder ? placeholder : 'Select'}
                    </h4>
                    < h4 className='dropdown-selected'>▾</h4>
                </div>
                {openDrop ?
                    <div
                        className='dropdown-options'
                        style={{
                            border: openDrop && '1px solid #CCB7AE',
                            borderTop: 'none',
                            width: size ? size : ''
                        }}>
                        {options.map((option, i) =>
                            option && option !== '' &&
                            <h4
                                key={i}
                                className='dropdown-option'
                                style={{ borderTop: i === 0 ? 'none' : '' }}
                                onClick={() => {
                                    updateData(name, option, index)
                                    setSelected(option)
                                    if (items && setItems) {
                                        let newItems = items
                                        newItems.push(option)
                                        setItems([...new Set(newItems)])
                                    }
                                    setOpenDrop(false)
                                }}>{option}</h4>
                        )}
                    </div>
                    : ''}
            </div>
        </div >
    )
}

export default Dropdown
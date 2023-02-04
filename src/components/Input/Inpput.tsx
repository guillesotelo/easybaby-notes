import React from 'react'

interface Props {
    updateData: (key: string | number, value: any) => void,
    name: string,
    type?: string,
    data: { [key: string]: any },
    rows?: number,
    label?: string
}

const Inpput: React.FC<Props> = (props) => {

    const {
        updateData,
        name,
        type,
        data,
        rows,
        label
    } = props

    const handleChange = (newValue: React.SyntheticEvent | React.BaseSyntheticEvent) => {
        const { valueAsNumber, value } = newValue.target
        if (type === 'number') {
            updateData(name, valueAsNumber)
        }
        else {
            updateData(name, value)
        }
    }

    return (
        <div className="input__container">
            {type === 'textarea' ?
                <div className='input__col'>
                    {label ? <h4 className="input__label">{label}</h4> : ''}
                    <textarea
                        className="input__field-textarea"
                        onChange={handleChange}
                        value={data[name]}
                        rows={rows}
                    />
                </div>
                :
                <div className='input__col'>
                    <input
                        type={type || 'text'}
                        className="input__field"
                        onChange={handleChange}
                        value={data[name]}
                    />
                </div>
            }
        </div>
    )
}

export default Inpput
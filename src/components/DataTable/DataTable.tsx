import React, { Dispatch, SetStateAction, useState } from 'react'
import MoonLoader from "react-spinners/MoonLoader"
import './styles.css'

interface Props {
    tableData?: { [key: string | number]: any }
    tableTitle?: string
    tableYear?: string
    setIsEdit?: Dispatch<SetStateAction<boolean>>
    isEdit?: boolean
    setCheck: Dispatch<SetStateAction<number>>
    check?: number
    tableHeaders: { [key: string | number]: any }[],
    loading?: boolean
}


const DataTable: React.FC<Props> = (props) => {
    const [maxItems, setMaxItems] = useState(10)
    const {
        tableData,
        tableHeaders,
        tableTitle,
        tableYear,
        setIsEdit,
        isEdit,
        setCheck,
        check,
        loading
    } = props
    const rowData = tableData && tableData.length ? tableData : []

    const handleCheck = (key: number) => {
        if (setCheck && setIsEdit) {
            if (isEdit) {
                if (key !== check) setCheck(key)
                else {
                    setCheck(-1)
                    setIsEdit(!isEdit)
                }
            }
            else {
                setCheck(key)
                setIsEdit(!isEdit)
            }
        }
    }

    const calculateTimePassed = (log: { [key: string | number]: any }) => {
        if(log.date && log.finish) {
            const date = new Date(log.date).getTime()
            const finish = new Date(log.finish).getTime()
            let time = String((finish - date) / 6E4).split('.')[0]
    
            if (Number(time) > 59) return `${(Number(time) / 60).toFixed(1)} h`
            return time + ' min'
        }
        return '--'
    }

    return (
        <div className='table-container'>
            <div className='table-titles'>
                <h4 className='table-title'>{tableTitle || ''}</h4>
                <h4 className='table-year'>{tableYear || ''}</h4>
            </div>
            <div className='table-headers'>
                {
                    tableHeaders.map((header, i) =>
                        <h4
                            key={i}
                            className='table-header'
                            style={{ width: `${100 / tableHeaders.length}%` }}
                        >
                            {header.name}
                        </h4>)
                }
            </div>
            {loading ? <div style={{ alignSelf: 'center', display: 'flex', marginTop: '5vw' }}><MoonLoader color='#A6808C' /></div>
                :
                rowData.length ?
                    <>
                        {rowData.map((row: { [key: string | number]: any }, i: number) => i < maxItems &&
                            <div
                                key={i}
                                className='table-row'
                                onClick={() => handleCheck(i)}
                                style={{
                                    backgroundColor: check === i ? '#ffe49f' : i % 2 === 0 ? '#f7f7f7' : '#eaeaea'
                                }}>
                                {tableHeaders.map((header, j) =>
                                    <h4
                                        key={j}
                                        className={`table-row-item`}
                                        style={{
                                            width: `${100 / tableHeaders.length}%`,
                                            color: header.value === 'timePassed' ? 'blue' : ''
                                        }}
                                        onClick={() => setCheck(i)}
                                    >
                                        {header.value === 'timePassed' ? calculateTimePassed(row) :
                                            header.value === 'createdAt' || header.value === 'updatedAt' || (header.name !== 'Start' && header.value === 'date') ?
                                                `${new Date(row[header.value]).toLocaleDateString().replace(':00 ', ' ')}`
                                                : header.name === 'Start' || header.name === 'Finish' ? `${row[header.value] ? new Date(row[header.value]).toLocaleTimeString().replace(':00 ', ' ') : '--'}`
                                                    : row[header.value] ? String(row[header.value])
                                                        : '--'}
                                    </h4>
                                )}
                            </div>
                        )}
                        {maxItems < rowData.length &&
                            <button className='table-lazy-btn' onClick={() => setMaxItems(maxItems + 10)}>▼</button>
                        }
                    </>
                    :
                    <div className='table-row' style={{ backgroundColor: '#E5E5E5', height: '2.5vw', justifyContent: 'center' }}>
                        No data to show
                    </div>
            }
        </div>
    )
}

export default DataTable
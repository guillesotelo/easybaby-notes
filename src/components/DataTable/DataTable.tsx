import React, { Dispatch, SetStateAction, useState } from 'react'
import './styles.css'

interface Props {
    tableData?: { [key: string | number]: any },
    tableTitle?: string,
    tableYear?: string,
    setIsEdit?: Dispatch<SetStateAction<boolean>>,
    isEdit?: boolean,
    setCheck: Dispatch<SetStateAction<number>>,
    check?: number,
    tableHeaders: { [key: string | number]: any }[]
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
        check
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
            {
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
                                        style={{ width: `${100 / tableHeaders.length}%` }}
                                        onClick={() => setCheck(i)}
                                    >
                                        {header.value === 'createdAt' || header.value === 'updatedAt' || header.value === 'date' ?
                                            `${new Date(row[header.value]).toLocaleDateString()} ${new Date(row[header.value]).toLocaleTimeString()}`
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
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Button from '../Button/Button'
import Inpput from '../Input/Inpput'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { createLog } from '../../services';
import { toast } from 'react-hot-toast';
import Dropdown from '../Dropdown/Dropdown';

interface Props {
    setLogModal: Dispatch<SetStateAction<boolean>>,
    updateData: (key: string | number, value: any) => void,
    whipeData: () => void;
    getLogs: () => void;
    data: { [key: string | number]: any }
}

const LogModal: React.FC<Props> = ({ setLogModal, updateData, data, whipeData, getLogs }) => {
    const [showDate, setShowDate] = useState<boolean>(false)
    const [showTime, setShowTime] = useState<boolean>(false)
    const [logTypes, setLogTypes] = useState<string[]>([])

    useEffect(() => {
        const easyTypes = [
            'Eat',
            'Activity',
            'Sleep',
            'Other'
        ]
        setLogTypes(easyTypes)
    }, [])

    const handleCancel = () => {
        setLogModal(false)
        whipeData()
    }

    const handleSave = async () => {
        toast.promise(
            createLog(data),
            {
                loading: 'Saving...',
                success: <b>Note saved successfully</b>,
                error: <b>Error saving note</b>,
            }
        )
        setLogModal(false)
        getLogs()
    }

    return (
        <div className="log-modal__container">
            <div className="log-modal__fill-section">
                <Dropdown
                    name='type'
                    options={logTypes}
                    updateData={updateData}
                    size='55vw'
                    placeholder='Log Type'
                />
                <div className="log-modal__date-pickers-container">
                    <div className="log-modal__date-pickers">
                        {showDate ?
                            <DatePicker
                                selected={data.date ? data.date : new Date()}
                                onChange={(date: Date) => {
                                    updateData('date', date)
                                    setTimeout(() => {
                                        setShowDate(false)
                                        setShowTime(false)
                                    }, 200)
                                }}
                                dateFormat="dd/MM/YYY"
                                inline
                            />
                            :
                            <Button
                                label={data.date ? data.date.toLocaleDateString('en-GB') : 'Add date'}
                                handleClick={() => setShowDate(true)}
                                style={{ fontSize: data.date ? '3.5vw' : '4.5vw' }}
                            />}
                        {showTime ?
                            <DatePicker
                                selected={data.date ? data.date : new Date()}
                                onChange={(date: Date) => {
                                    updateData('date', date)
                                    setTimeout(() => {
                                        setShowDate(false)
                                        setShowTime(false)
                                    }, 200)
                                }}
                                dateFormat="h:mm aa"
                                inline
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={5}
                            />
                            : data.date ?
                                <Button
                                    label={data.date && data.hasTime ? data.date.toTimeString().substring(0, 5) : 'Add Time'}
                                    handleClick={() => {
                                        setShowTime(true)
                                        updateData('hasTime', true)
                                    }}
                                    style={{ fontSize: '3.5vw' }}
                                />
                                : ''
                        }
                    </div>
                </div>
                <Inpput
                    updateData={updateData}
                    name='comments'
                    data={data}
                    type='textarea'
                    rows={7}
                    label='Comments'
                />
            </div>
            <div className="log-modal__btns">
                <Button
                    label='Cancel'
                    handleClick={handleCancel}
                />
                <Button
                    label='Save'
                    handleClick={handleSave}
                />
            </div>
        </div>
    )
}

export default LogModal
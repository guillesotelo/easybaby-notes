import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Button from '../Button/Button'
import Inpput from '../Input/Inpput'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { createLog, deleteLog, updateLog } from '../../services';
import { toast } from 'react-hot-toast';
import Dropdown from '../Dropdown/Dropdown';
import { noteOptions } from 'src/constants/options';

interface Props {
    setLogModal: Dispatch<SetStateAction<boolean>>
    updateData: (key: string | number, value: any) => void
    whipeData: () => void
    getLogs: () => void
    data: { [key: string | number]: any }
    setIsEdit: Dispatch<SetStateAction<boolean>>
    isEdit?: boolean
    setRemoveModal: Dispatch<SetStateAction<boolean>>
    removeModal?: boolean
}

const LogModal: React.FC<Props> = (props) => {
    const {
        setLogModal,
        updateData,
        data,
        whipeData,
        getLogs,
        setIsEdit,
        isEdit,
        setRemoveModal,
        removeModal
    } = props
    const [showDate, setShowDate] = useState<boolean>(false)
    const [showTime, setShowTime] = useState<boolean>(false)
    const [showFinish, setShowFinish] = useState<boolean>(false)

    const handleCancel = () => {
        setLogModal(false)
        setRemoveModal(false)
        whipeData()
    }

    const handleSave = async () => {
        const parsedData = { ...data }
        parsedData.date = data.date ? data.date : new Date()

        if (isEdit) {
            await toast.promise(
                updateLog(parsedData),
                {
                    loading: 'Updating...',
                    success: <b>Note updated successfully</b>,
                    error: <b>Error updating note</b>,
                }
            )
        } else {
            await toast.promise(
                createLog(parsedData),
                {
                    loading: 'Saving...',
                    success: <b>Note saved successfully</b>,
                    error: <b>Error saving note</b>,
                }
            )
        }
        setLogModal(false)
        setIsEdit(false)
        setTimeout(() => getLogs(), 500)
    }

    const handleRemove = async () => {
        await toast.promise(
            deleteLog(data),
            {
                loading: 'Removing...',
                success: <b>Note removed successfully</b>,
                error: <b>Error removing note</b>,
            }
        )
        setLogModal(false)
        setRemoveModal(false)
        setIsEdit(false)
        setTimeout(() => getLogs(), 500)
    }

    return removeModal ?
        <div className="log-modal__container">
            <div className="log-modal__fill-section">
                <h4 className="log-modal__remove-text">
                    {`Are you sure you want to remove ${data.type} - ${data.comments}?`}
                </h4>
                <div className="log-modal__btns">
                    <Button
                        label='No'
                        handleClick={handleCancel}
                    />
                    <Button
                        label='Yes'
                        handleClick={handleRemove}
                    />
                </div>
            </div>
        </div>
        :
        <div className="log-modal__container">
            <div className="log-modal__fill-section">
                <Dropdown
                    name='type'
                    options={noteOptions}
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
                                        setShowFinish(false)
                                    }, 200)
                                }}
                                dateFormat="dd/MM/YYY"
                                inline
                            />
                            :
                            <Button
                                label={data.date ? data.date.toLocaleDateString('en-GB') : 'Add date'}
                                handleClick={() => {
                                    setShowDate(true)
                                    setShowTime(false)
                                    setShowFinish(false)
                                }}
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
                                        setShowFinish(false)
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
                                    label={data.date && (data.hasTime || isEdit) ? data.date.toTimeString().substring(0, 5) : 'Start'}
                                    handleClick={() => {
                                        setShowTime(true)
                                        setShowDate(false)
                                        setShowFinish(false)
                                        updateData('hasTime', true)
                                    }}
                                    style={{ fontSize: '3.5vw' }}
                                />
                                : ''
                        }
                        {showFinish ?
                            <DatePicker
                                selected={data.finish ? data.finish : new Date()}
                                onChange={(date: Date) => {
                                    updateData('finish', date)
                                    setTimeout(() => {
                                        setShowDate(false)
                                        setShowTime(false)
                                        setShowFinish(false)
                                    }, 200)
                                }}
                                dateFormat="h:mm aa"
                                inline
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={5}
                            />
                            :
                            data.date && (data.hasTime || isEdit) ?
                                <Button
                                    label={data.finish ? data.finish.toTimeString().substring(0, 5) : 'Finish'}
                                    handleClick={() => {
                                        setShowDate(false)
                                        setShowTime(false)
                                        setShowFinish(true)
                                    }}
                                    style={{ fontSize: '3.5vw' }}
                                />
                                : ''}
                    </div>
                </div>
                <Inpput
                    updateData={updateData}
                    name='comments'
                    data={data}
                    type='textarea'
                    rows={4}
                    label='Comments'
                />
            </div>
            <div className="log-modal__btns">
                <Button
                    label='Cancel'
                    handleClick={handleCancel}
                />
                <Button
                    label={isEdit ? 'Update' : 'Save'}
                    handleClick={handleSave}
                />
            </div>
        </div>
}

export default LogModal
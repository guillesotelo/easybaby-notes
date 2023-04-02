import React, { useEffect, useState } from 'react'

type Props = {
    pushLog: (action: string) => void,
    counter: string,
    setPushed: (action: string) => void,
    pushed: string
}

const Keypad = (props: Props) => {

    const {
        pushLog,
        counter,
        setPushed,
        pushed
    } = props

    return (
        <div className='keypad__container'>
            <div className="keypad__btns">
                <div className={`keypad__btn --eat ${pushed === 'eat' ? '--ongoing' : ''}`} onClick={() => {
                    setPushed('eat')
                    pushLog('eat')
                }}>
                    <h4 className="keypad__btn-label">EAT</h4>
                    {pushed === 'eat' ? <h4 className="keypad__btn-counter">Timer: {counter || '0:0'}</h4> : ''}
                </div>
                <div className={`keypad__btn --activity ${pushed === 'activity' ? '--ongoing' : ''}`} onClick={() => {
                    setPushed('activity')
                    pushLog('activity')
                }}>
                    <h4 className="keypad__btn-label">ACTIVITY</h4>
                    {pushed === 'activity' ? <h4 className="keypad__btn-counter">Timer: {counter || '0:0'}</h4> : ''}
                </div>
                <div className={`keypad__btn --sleep ${pushed === 'sleep' ? '--ongoing' : ''}`} onClick={() => {
                    setPushed('sleep')
                    pushLog('sleep')
                }}>
                    <h4 className="keypad__btn-label">SLEEP</h4>
                    {pushed === 'sleep' ? <h4 className="keypad__btn-counter">Timer: {counter || '0:0'}</h4> : ''}
                </div>
                <div className={`keypad__btn --diaper1 ${pushed === 'diaper1' ? '--ongoing' : ''}`} onClick={() => {
                    setPushed('diaper1')
                    pushLog('diaper1')
                }}>
                    <h4 className="keypad__btn-label">DIAPER <br />(PEE)</h4>
                    {pushed === 'diaper1' ? <h4 className="keypad__btn-counter">Timer: {counter || '0:0'}</h4> : ''}
                </div>
                <div className={`keypad__btn --diaper2 ${pushed === 'diaper2' ? '--ongoing' : ''}`} onClick={() => {
                    setPushed('diaper2')
                    pushLog('diaper2')
                }}>
                    <h4 className="keypad__btn-label">DIAPER <br />(PEE+)</h4>
                    {pushed === 'diaper2' ? <h4 className="keypad__btn-counter">Timer: {counter || '0:0'}</h4> : ''}
                </div>
                <div className={`keypad__btn --other ${pushed === 'other' ? '--ongoing' : ''}`} onClick={() => {
                    setPushed('other')
                    pushLog('other')
                }}>
                    <h4 className="keypad__btn-label">OTHER</h4>
                    {pushed === 'other' ? <h4 className="keypad__btn-counter">Timer: {counter || '0:0'}</h4> : ''}
                </div>
            </div>
        </div>
    )
}

export default Keypad
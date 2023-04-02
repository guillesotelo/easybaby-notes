import React, { useEffect, useState } from 'react'
import BarChart from 'src/components/BarChart/BarChart'
import { CHART_PALETTE } from 'src/constants/app'
import { noteOptions } from 'src/constants/options'
import Button from '../../components/Button/Button'
import DataTable from '../../components/DataTable/DataTable'
import LogModal from '../../components/LogModal/LogModal'
import { noteHeaders } from '../../constants/tableHeaders'
import { getAllLogs } from '../../services'
import Plus from '../../assets/icons/plus.svg'
import Edit from '../../assets/icons/edit.svg'
import Delete from '../../assets/icons/delete.svg'
import { LineChart } from 'src/components/LineChart/LineChart'
import Keypad from 'src/components/Keypad/Keypad'
import toast from 'react-hot-toast'
import { createLog, deleteLog, updateLog } from '../../services';

interface Props { }

const Home: React.FC<Props> = (props) => {
  const [logModal, setLogModal] = useState<boolean>(false)
  const [data, setData] = useState<{ [key: string]: any }>({})
  const [logs, setLogs] = useState<{ [key: string]: any }[]>([])
  const [check, setCheck] = useState<number>(-1)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [removeModal, setRemoveModal] = useState<boolean>(false)
  const [logsChart, setLogsChart] = useState<{ [key: string]: any }>({ labels: [], datasets: [] })
  const [logsByDay, setLogsByDay] = useState<{ [key: string]: any }>({ labels: [], datasets: [] })
  const [loading, setLoading] = useState<boolean>(false)
  const [pushed, setPushed] = useState('')
  const [counter, setCounter] = useState('')

  // console.log("data", data)
  // console.log("logs", logs)
  // console.log("logsChart", logsChart)

  useEffect(() => {
    getLogs()
  }, [])

  useEffect(() => {
    if (Array.isArray(logs)) setChartsData()
  }, [logs])

  const startCounter = (date: Date) => {
    setInterval(() => {
      setCounter(() => {
        const lastLogDate = date.getTime()
        const timer = new Date().getTime() - lastLogDate
        return `${new Date(timer).getMinutes()}:${new Date(timer).getSeconds()}`

        // const minutes = counter ? Number(counter.split(':')[0]) : 0
        // const seconds = counter ? Number(counter.split(':')[1]) : 0
        // return `${seconds === 59 ? minutes + 1 : minutes}:${seconds === 59 ? 0 : seconds + 1}`
      })
    }, 1000)
  }

  const updateData = (key: string | number, value: any) => {
    setData({ ...data, [key]: value })
  }

  const whipeData = () => setData({})

  const getLogs = async () => {
    setLoading(true)
    const _logs = await getAllLogs()
    setLogs(_logs)
    setLoading(false)
  }

  const randomColors = (array: string[]) => {
    return array.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  const setChartsData = () => {
    const colorPattern = logs.map((_: any) => randomColors(CHART_PALETTE)[0])

    // setLogsByDay({
    //   labels: logs.map(log => new Date(log.date).toLocaleDateString()),
    //   datasets: [{
    //     data: logs.map(log => getLogCountByType(type)),
    //     backgroundColor: colorPattern
    //   }]
    // })
    getLastWeekData()

    setLogsChart({
      labels: noteOptions,
      datasets: [{
        data: noteOptions.map(type => getLogCountByType(type)),
        backgroundColor: colorPattern
      }]
    })
  }

  const getLastWeekData = () => {
    // const now = new Date()
    // let lastDay = new Date(logs[logs.length - 1].date).getDate()
    // let count = 0

    // const data = logs.filter(log => {

    // })
  }

  const getLogCountByType = (type: string) => {
    let count = 0
    logs.forEach((log: { [key: string]: any }) => {
      if (log.type === type) count++
    })
    return count
  }

  const pushLog = async (action: string) => {
    if (pushed) {
      const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);
      for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
      }
      setCounter('')
      setPushed('')

      await toast.promise(
        updateLog({
          ...logs[0],
          finish: new Date()
        }),
        {
          loading: 'Saving...',
          success: <b>Log saved successfully</b>,
          error: <b>Error saving log</b>,
        }
      )

      return setTimeout(() => {
        getLogs()
      }, 500)
    }

    await toast.promise(
      createLog({
        ...data,
        hasTime: true,
        date: new Date(),
        finish: new Date(new Date().setTime(new Date().getTime() + 1.8E6)),
        comments: '',
        type: action
      }),
      {
        loading: '',
        success: <b>Timer started</b>,
        error: <b>Error</b>,
      }
    )

    setTimeout(() => {
      getLogs()
      startCounter(new Date())
    }, 500)
  }

  return (
    <div className="home__container" style={{ justifyContent: logModal ? 'center' : undefined }}>
      {removeModal || logModal ?
        <LogModal
          whipeData={whipeData}
          setLogModal={setLogModal}
          updateData={updateData}
          data={data}
          getLogs={getLogs}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          removeModal={removeModal}
          setRemoveModal={setRemoveModal}
        /> :
        <div className="home__section">
          <Keypad
            pushLog={pushLog}
            counter={counter}
            pushed={pushed}
            setPushed={setPushed}
          />
          <DataTable
            tableTitle='Latest Notes'
            tableData={logs}
            tableHeaders={noteHeaders}
            setCheck={setCheck}
            check={check}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
          <BarChart
            chartData={logsChart}
            position='y'
            title='Logs by type'
          />
          <LineChart
            chartData={logsChart}
            title='Las week logs'
          />
          <Button
            handleClick={() => {
              if (isEdit) {
                const item = logs[check]
                setData({
                  ...item,
                  date: new Date(item.date),
                  finish: item.finish ? new Date(item.finish) : ''
                })
                return setLogModal(true)
              }
              setData({})
              setLogModal(true)
            }}
            type='rounded'
            variant='add'
            svgPath={isEdit ? Edit : Plus}
          />
          {isEdit ?
            <Button
              handleClick={() => {
                const item = logs[check]
                setData({
                  ...item,
                  date: new Date(item.date),
                  finish: item.finish ? new Date(item.finish) : ''
                })
                setRemoveModal(true)
              }}
              type='rounded'
              variant='remove'
              svgPath={Delete}
              color='#A6808C'
            />
            : ''}
        </div>}
    </div>
  )
}

export default Home
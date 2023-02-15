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

interface Props { }

const Home: React.FC<Props> = (props) => {
  const [logModal, setLogModal] = useState<boolean>(false)
  const [data, setData] = useState<{ [key: string]: any }>({})
  const [logs, setLogs] = useState<{ [key: string]: any }[]>([])
  const [check, setCheck] = useState<number>(-1)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [removeModal, setRemoveModal] = useState<boolean>(false)
  const [logsChart, setLogsChart] = useState<{ [key: string]: any }>({ labels: [], datasets: [] })
  const [loading, setLoading] = useState<boolean>(false)

  // console.log("data", data)
  // console.log("logs", logs)
  // console.log("logsChart", logsChart)

  useEffect(() => {
    getLogs()
  }, [])

  useEffect(() => {
    if (Array.isArray(logs)) setChartsData()
  }, [logs])

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

  const setChartsData = async () => {
    const colorPattern = logs.map((_: any) => randomColors(CHART_PALETTE)[0])

    setLogsChart({
      labels: noteOptions,
      datasets: [{
        data: noteOptions.map(type => getLogCountByType(type)),
        backgroundColor: colorPattern
      }]
    })
  }

  const getLogCountByType = (type: string) => {
    let count = 0
    logs.forEach((log: { [key: string]: any }) => {
      if (log.type === type) count++
    })
    return count
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
import React, { useEffect, useState } from 'react'
import BarChart from 'src/components/BarChart/BarChart'
import { CHART_PALETTE } from 'src/constants/app'
import Button from '../../components/Button/Button'
import DataTable from '../../components/DataTable/DataTable'
import LogModal from '../../components/LogModal/LogModal'
import { noteHeaders } from '../../constants/tableHeaders'
import { getAllLogs } from '../../services'

interface Props { }

const Home: React.FC<Props> = (props) => {
  const [logModal, setLogModal] = useState<boolean>(false)
  const [data, setData] = useState<{ [key: string]: any }>({})
  const [logs, setLogs] = useState<{ [key: string]: any }[]>([])
  const [check, setCheck] = useState<number>(-1)
  const [logsChart, setLogsChart] = useState<{ [key: string]: any }>({ labels: [], datasets: [] })

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
    const _logs = await getAllLogs()
    setLogs(_logs)
  }

  const randomColors = (array: string[]) => {
    return array.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  const setChartsData = async () => {
    const colorPattern = logs.map((_: any) => randomColors(CHART_PALETTE)[0])
    const easyTypes = [
      'Eat',
      'Activity',
      'Sleep',
      'Other'
    ]
    
    setLogsChart({
      labels: easyTypes,
      datasets: [{
        data: easyTypes.map(type => getLogCountByType(type)),
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
      {logModal ?
        <LogModal
          whipeData={whipeData}
          setLogModal={setLogModal}
          updateData={updateData}
          data={data}
          getLogs={getLogs}
        /> :
        <div className="home__section">
          <DataTable
            tableTitle='Latest Notes'
            tableData={logs}
            tableHeaders={noteHeaders}
            setCheck={setCheck}
            check={check}
          />
          <BarChart
            chartData={logsChart}
            position='y'
            title='Logs by type'
          />
          <Button
            label='+'
            handleClick={() => setLogModal(true)}
            type='rounded'
            variant='add'
          />
        </div>}
    </div>
  )
}

export default Home
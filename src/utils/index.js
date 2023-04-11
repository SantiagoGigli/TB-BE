import axios from 'axios'

const options = {
  headers: {
    Authorization: 'Bearer aSuperSecretKey'
  }
}

export const fetchFilesList = async () => {
  try {
    const response = await axios.get(
      'https://echo-serv.tbxnet.com/v1/secret/files',
      options
    )
    return response.data
  } catch (error) {
    return error
  }
}

export const fetchAndParse = async (data) => {
  try {
    const CSVData = await Promise.allSettled(
      data?.map(async (fileName) => {
        const response = await axios.get(
          `https://echo-serv.tbxnet.com/v1/secret/file/${fileName}`,
          options
        )

        if (response.status === 200) {
          return toJSON(response.data)
        }
      })
    )

    const mappedData = []
    for (let i = 0; i < CSVData.length; i++) {
      const csvFile = CSVData[i]
      if (csvFile.status === 'fulfilled') {
        mappedData.push(csvFile.value)
      }
    }

    const flattenArray = mappedData.map((item) => JSON.parse(item)).flat(1)

    const arrayPush = validateFields(flattenArray)

    const groupedData = groupData(arrayPush)

    return groupedData
  } catch (error) {
    return error
  }
}

function isHex (item) {
  return (Boolean(item?.match(/[0-9A-Fa-f]{6}/g)) && item.length === 32)
}

const toJSON = (csv) => {
  const wholeLines = csv.split('\n')
  const lines = wholeLines.map((wl) => {
    const [
      file = undefined,
      text = undefined,
      number = undefined,
      hex = undefined
    ] = wl.split(',')
    return {
      file,
      lines: [
        {
          text,
          number: Number(number),
          hex
        }
      ]
    }
  })
  const [_header, ...content] = lines
  return JSON.stringify(content)
}

const groupData = (data) => {
  const groupedData = {}
  data.forEach((obj, index) => {
    const file = obj.file
    if (!groupedData[file]) {
      groupedData[file] = {
        file,
        lines: obj.lines
      }
    } else {
      const [line] = obj.lines
      groupedData[file].lines.push(line)
    }
  })

  return groupedData
}

const validateFields = (dataArray) => {
  const arrayPush = []

  dataArray.forEach((item) => {
    if (!item.file || typeof item.file !== 'string') return
    item.lines.forEach(line => {
      if (!line.text || typeof line.text !== 'string') return
      if (!line.number || isNaN(line.number)) return
      if (!isHex(line.hex)) return
      return arrayPush.push(item)
    })
  })

  return arrayPush
}

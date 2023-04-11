import { fetchAndParse, fetchFilesList } from '../utils/index.js'

export const getFilesParsed = async (req, res) => {
  try {
    const response = await fetchFilesList()

    if (!response?.files || response?.files?.length === 0) {
      return res.status(200).json({
        statusCode: 400,
        success: 'Error'
      })
    }

    const response2 = await fetchAndParse(response.files)

    if (!response2 || response.length === 0) {
      return res.status(200).json({
        statusCode: 400,
        success: 'Error'
      })
    }

    return res.status(200).json({
      statusCode: 200,
      success: 'Ok',
      data: response2 || []
    })
  } catch (error) {
    return res.status(400)
  }
}

export const getOriginalList = async (req, res) => {
  try {
    const response = await fetchFilesList()

    if (!response?.files || response?.files?.length === 0) {
      return res.status(200).json({
        statusCode: 400,
        success: 'Error'
      })
    }

    return res.status(200).json({
      statusCode: 200,
      success: 'Ok',
      data: response || []
    })
  } catch (error) {
    return res.status(400)
  }
}

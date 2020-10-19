import useApi from './useApi'
import { getReport } from '../../services/api'

export default (id) => {
  return useApi(getReport, null, id)
}

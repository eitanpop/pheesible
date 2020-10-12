import useApi from './useApi'
import { getCampaignsPendingReview } from '../../services/admin/api'

export default (dependency = null) => {
  return useApi(getCampaignsPendingReview, dependency)
}

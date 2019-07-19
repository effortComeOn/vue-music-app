import axios from 'axios'
import { commonParams, options} from './config'

export function getRecommends () {
  const url = '/api/getRecommends'
  const data = Object.assign({}, commonParams, {
    picmid: 1,
    rnd: 0.4284980247203438,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 19,
  })

  return axios.get(url, {
    params: data
  })
  .then(function (response) {
    return Promise.resolve(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });
}

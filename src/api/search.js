import axios from 'axios'
import { commonParams, options} from './config'

export function getHotKey () {
  const url = '/slide/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: '1935936886',
    loginUin: '1746189007',
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    })

  return axios.get(url,{
    params: data,
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongList (query, page, zhida) {
  const url = '/slide/soso/fcgi-bin/client_search_cp'

  const data = Object.assign({}, commonParams, {
    ct: 24,
    qqmusic_ver: 1298,
    new_json: 1,
    remoteplace: 'txt.yqq.center',
    searchid: '42673948986253736',
    t: 0,
    aggr: 1,
    cr: 1,
    catZhida: zhida ? 0 : 1,
    lossless: 0,
    flag_qc: 0,
    p: page,
    n: 10,
    w: query,
    g_tk: '1472589684',
    loginUin: '1746189007',
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
      })

  return axios.get(url,{
    params: data,
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function search () {

}

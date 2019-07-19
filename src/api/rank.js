import axios from 'axios'
import { commonParams, options} from './config'

export function getTopList (mid) {
  const url = '/slide/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    _: '1561729466707',
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    })

  return axios.get(url,{
    params: data,
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

function _pad(num, n = 2) {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}

export function getTopListDetail (topId) {
  const url = '/song/cgi-bin/musicu.fcg'

  let time = new Date()
  let str = time.getFullYear() + '-' + _pad(time.getMonth() + 1) + '-' + _pad(time.getDate())
  const data = Object.assign({}, commonParams, {
    '-': 'getUCGI21259699929190568',
    g_tk: '5381',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      detail:{
        module:"musicToplist.ToplistInfoServer",
        method:"GetDetail",
        param:{
          topId:topId,
          offset:0,
          num:20,
          period: str
        }
      },
      comm:{
        ct:24,
        cv:0
      }
    }
    })

  return axios.get(url,{
    params: data,
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

import axios from 'axios'
import { commonParams, options} from './config'

export function getSongPlayUrl (songmid) {
  const url = '/song/cgi-bin/musicu.fcg'

  const data = Object.assign({},commonParams, {
    '-': 'getplaysongvkey9583394031586994',
    g_tk: 1307296262,
    loginUin: 1746189007,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      req:{
        module:"CDN.SrfCdnDispatchServer",
        method:"GetCdnDispatch",
        param:{
          guid:"8359380168",
          calltype:0,
          userip:""
        }
      },
      req_0:{
        module:"vkey.GetVkeyServer",
        method:"CgiGetVkey",
        param:{
          guid:"8359380168",
          songmid:[songmid],
          songtype:[0],
          uin:"1746189007",
          loginflag:1,
          platform:"20"
        }
      },
      comm:{
        uin:1746189007,
        format:"json",
        ct:24,
        cv:0
      }
      },
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

export function getLyric (mid) {
  const url = '/api/getLyric'

  const data = Object.assign({}, commonParams, {
    "-": 'MusicJsonCallback_lrc',
    pcachetime: +new Date(),
    songmid: mid,
    g_tk: '1307296262',
    loginUin: '1746189007',
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  })

  return axios.get(url,{
    params: data,
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

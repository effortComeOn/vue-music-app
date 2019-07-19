import axios from 'axios'
import { commonParams, options} from './config'

export function getSinger (index) {
  const url = '/song/cgi-bin/musicu.fcg'

  const data = Object.assign({},
    commonParams, {
    '-': 'getUCGI3099959879583656',
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      comm:{
        ct:24,
        cv:0
      },
      singerList:{
        module:"Music.SingerListServer",
        method:"get_singer_list",
        param:{
          area:-100,
          sex:-100,
          genre:-100,
          index:-100 || index,
          sin:0,
          cur_page:1
        }
      }
    }
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

export function getSingerDetail (id) {
  const url = '/song/cgi-bin/musicu.fcg'

  const data = Object.assign({},commonParams, {
    '-': 'getUCGI06307696898279547',
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      comm:{
        ct:24,
        cv:0
      },
      singer:{
        method:"get_singer_detail_info",
        param:{
          sort:5,
          singermid: id,
          sin:0,
          num:10
        },
      module:"music.web_singer_info_svr"
      }
    }
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




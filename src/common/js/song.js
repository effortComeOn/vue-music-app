import {getSongPlayUrl} from '@/api/song'
import {ERR_OK} from '@/api/config'
import {getLyric} from '@/api/song'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then(res => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}



export async function getPlayLink (mid) {
  let res = await getSongPlayUrl(mid).then((res) => {
    if (res.code === ERR_OK) {
      let ip = 'http://dl.stream.qqmusic.qq.com/'
      let res_url = res.req_0.data.midurlinfo[0].purl
      let url = `${ip}${res_url}`
      return url
    }
  }).catch(err => {
    console.log(err)
  })
  return res
}

export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    mid: musicData.mid,
    singer: filterSinger(musicData.singer),
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R800x800M000${musicData.album.mid}.jpg?max_age=2592000`,
    url: ''
   })
}

export function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}


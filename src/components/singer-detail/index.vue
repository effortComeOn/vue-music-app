<template>
  <transition name="slide">
    <music-list :title="title" :songs="songs" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { getSingerDetail } from '@/api/singer.js'
  import {ERR_OK} from '@/api/config.js'
  import {createSong, getPlayLink} from '@/common/js/song.js'

  import MusicList from '@/components/music-list/index.vue'

  export default {
    data () {
      return {
        songs: [],
        imgMid: ''
      }
    },
    computed: {
      title () {
        return this.singer.name
      },
      bgImage () {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created () {
      this._getSingerDetail()
    },
    methods: {
      _getSingerDetail () {
        if (!this.singer.id) {
          this.$router.push({
            path: '/singer'
          })
          return
        }
        getSingerDetail(this.singer.id).then(res => {
          if (res.code === ERR_OK) {
            this.imgMid = res.singer.data.singer_info.mid
            this.songs = this._normalizeSongs(res.singer.data.songlist)
            console.log(this.songs)
          }
        })
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach((item) => {
          let musicData = item
          if (musicData.id && musicData.album.mid) {
            let song = createSong(musicData)
            getPlayLink(musicData.mid).then(res => {
              song.url = res
              ret.push(song)
            })
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

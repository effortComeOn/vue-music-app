<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="discSongList"></music-list>
  </transition>
</template>

<script>
import MusicList from '@/components/music-list/index.vue'
import {mapGetters} from 'vuex'
import {getDiscList} from '@/api/disc.js'
import {ERR_OK} from '@/api/config.js'
import {createSong, getPlayLink} from '@/common/js/song.js'

  export default {
    data () {
      return {
        discSongList: []
      }
    },
    computed: {
      title () {
        return this.disc.dissname
      },
      bgImage () {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    mounted () {
      this._getDiscList()
    },
    methods: {
      _getDiscList () {
        if (!this.disc.dissid) {
          this.$router.push({
            path: '/recommend'
          })
        }
        getDiscList(this.disc.dissid).then(res => {
          if (res.code === ERR_OK) {
            this.discSongList = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.id && musicData.album.id) {
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
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

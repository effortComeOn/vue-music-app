<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import musicList from '@/components/music-list/index.vue'
import {mapGetters} from 'vuex'
import {getTopListDetail} from '@/api/rank.js'
import {ERR_OK} from '@/api/config.js'
import {createSong, getPlayLink} from '@/common/js/song.js'

  export default {
    data () {
      return {
        songs: [],
        rank: true
      }
    },
    computed: {
      title () {
        return this.topList.topTitle
      },
      bgImage () {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return this.topList.picUrl
      },
      ...mapGetters([
        'topList'
      ])
    },
    mounted () {
      this._getTopListDetail()
    },
    methods: {
      _getTopListDetail () {
        if (!this.topList.id) {
          this.$router.push('/rank')
          return
        }
        getTopListDetail(this.topList.id).then(res => {
          if (res.code === ERR_OK && res.detail.data.songInfoList.length > 0) {
            this.songs = this._normalizeSongs(res.detail.data.songInfoList)
          }
        })
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach(item => {
          const musicData = item
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
      musicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

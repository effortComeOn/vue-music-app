<template>
  <div class="singer" ref="singer">
    <list-view ref="listview" @select="selectSinger" :data="singers"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
  import { getSinger } from '@/api/singer.js'
  import { ERR_OK } from '@/api/config.js'
  import Singer from '@/common/js/singer.js'
  import ListView from '@/base/listview/index.vue'
  import { mapMutations } from 'vuex'
  import {playlistMixin} from '@/common/js/mixin.js'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 5

  export default {
    mixins: [playlistMixin],
    data () {
      return {
        singers: [],
        temp: [],
        tags: []
      }
    },
    created () {
      this._getSinger()
    },
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.listview.refresh()
      },
      selectSinger (singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      async _getSinger () {
        await getSinger().then(res => {
          if (res.code === ERR_OK) {
            this.temp = res.singerList.data.singerlist
            this.tags = res.singerList.data.tags.index
          }
        })
        this.singers = this._normalizeSinger(this.temp)
      },

      _normalizeSinger (list) {
        let map = {}

        if (this.tags.length > 0){
          this.tags.map((item, index) => {
            let key = item.name

            list.forEach((item, index) => {
              if (index < HOT_SINGER_LEN) {

                if (!map[key]) {
                  map[key] = {
                    title: key,
                    items: []
                  }
                }

                map[key].items.push(new Singer({
                  id: item.singer_mid,
                  name: item.singer_name
                }))
              }
            })
          })

          let ret = []
          let hot = []
          for (let key in map) {
            let val = map[key]
            if (val.title.match(/[a-zA-Z]/)) {
              ret.push(val)
            } else if (val.title === HOT_NAME) {
              hot.push(val)
            }
          }
          ret.sort((a, b) => {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0)
          })
          return hot.concat(ret)
        }
        return []
      },

      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>

<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item, index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import {getSongList} from '@/api/search.js'
import {ERR_OK} from '@/api/config.js'
import {createSong} from '@/common/js/song.js'

const TYPE_SINGER = "singer"

  export default {
    data () {
      return {
        page: 1,
        result: []
      }
    },
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      query () {
        // console.log('query change')
        this.search()
      }
    },
    methods: {
      search () {
        getSongList(this.query, this.page, this.showSinger).then(res => {
          if (res.code === ERR_OK) {
            console.log(res.data)
            this.result = this._getResult(res.data)
          }
        })
      },
      getDisplayName (item) {
        if (item.type === TYPE_SINGER) {
          return 'item-mine'
        } else {
          return 'item-music'
        }
      },

      getIconCls (item) {
        if (item.type === TYPE_SINGER) {
          return item.desc
        } else {
          return `${item.name}-${item.singer}`
        }
      },

      _getResult (data) {
        let ret = []
        if (data.zhida && data.zhida.zhida_mv.id) {
          ret.push({...data.zhida.zhida_mv, ...{type: 'TYPE_SINGER'}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSong(data.song.list))
        }
        return ret
      },

      _normalizeSong (list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.id && musicData.album.id) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

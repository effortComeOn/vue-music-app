<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length > 0" class="slider-wrapper">
          <slider>
            <div v-for="(item, index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img class="neeedsClick" @load="loadImg" :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>

        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="(item, index) in discList" :key="index" class="item">
                <div class="icon">
                  <img width="60" height="60" v-lazy="item.imgurl">
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.dissname"></h2>
                  <p class="desc" v-html="item.creator.name"></p>
                </div>
              </li>
          </ul>
        </div>
      </div>

      <div v-show="!discList.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>

    <router-view></router-view>
  </div>
</template>

<script>
  import { getRecommends } from '@/api/recommend.js'
  import { ERR_OK } from '@/api/config.js'
  import Slider from '@/base/slider/index.vue'
  import Scroll from '@/base/scroll/index.vue'
  import Loading from '@/base/loading/loading.vue'
  import {playlistMixin} from '@/common/js/mixin.js'
  import {mapMutations} from 'vuex'

  export default {
    mixins: [playlistMixin],
    data () {
      return {
        recommends: [],
        discList: []
      }
    },
    created () {
      this._getRecommends()
    },
    components: {
      Slider,
      Scroll,
      Loading
    },
    methods: {
      selectItem (item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      async _getRecommends () {
        await getRecommends().then(res => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },

      loadImg () {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      },

      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    },
    destroyed () {
      clearTimeout(this.timer)
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

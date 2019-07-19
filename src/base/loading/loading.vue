<template>
  <div class="loading">
    <img width="24" height="24" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561035676793&di=92633ca51786186e54cb136fe18d3fef&imgtype=0&src=http%3A%2F%2Fwww.3d2000.com%2Fwp-content%2Fuploads%2F2016%2F05%2F294194-3c190efdba33a322-1.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>

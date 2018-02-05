<style lang="scss">
@import "~sass-rem";
$rem-baseline: 46.68px;

.loading {
  .hide-img{
    position: absolute;
    width: 1px;
    height: 1px;
    left: -1000px;
  }
  img.bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  img.immortal {
    position: absolute;
    top: rem(368px);
    left: rem(184px);
    width: rem(328px);
    height: rem(377px);
  }

  .scroll {
    left: 4rem;
    bottom: rem(25px);
    .text {
      font-size: rem(26px);
    }
  }

  .dots {
    display: block;
    position: absolute;
    top: rem(795px);
    left: rem(310px);
    list-style: none;
    height: rem(14px);
    width: rem(160px);
    padding: 0;
    margin: 0;

    li {
      display: block;
      float: left;
      width: rem(14px);
      height: rem(14px);
      border-radius: rem(7px);
      margin-right: rem(20px);
      background: #fde6d0;
      &.active {
        background: #e5807b;
      }
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
</style>

<template>
  <div class="loading">
      <img src="/draw/static/img/loadingbg.jpg" class="bg" alt="Loading">
      <img src="/draw/static/img/immortal.png" class="immortal" alt="Immortal" :class="loaded?'animated bounceInDown':'hide'">
      <ul class="dots" :class="loaded?'animated flash':'hide'">
          <li :class="isActive(0)&&'active'"></li>
          <li :class="isActive(1)&&'active'"></li>
          <li :class="isActive(2)&&'active'"></li>
          <li :class="isActive(3)&&'active'"></li>
          <li :class="isActive(4)&&'active'"></li>
      </ul>
      <scroll class="scroll">
        <div class="text">闪秀技术支持：牛商网</div>
      </scroll>
  </div>
</template>
<script>
import { mapStates, mapActions } from "vuex";
import scroll from "@/components/DrawScroll.vue";

export default {
  metaInfo: {    
    link: [
      // 预加载页面图片
      { name: "prefetch", content: "/draw/static/img/temple-cloud-left.png" },
      { name: "prefetch", content: "/draw/static/img/temple-cloud-right.png" },
      { name: "prefetch", content: "/draw/static/img/tree-left.png" },
      { name: "prefetch", content: "/draw/static/img/tree-right.png" },
      { name: "prefetch", content: "/draw/static/img/temple.png" },
      { name: "prefetch", content: "/draw/static/img/logo.png" },
      { name: "prefetch", content: "/draw/static/img/music.png" },      
      { name: "prefetch", content: "/draw/static/img/music-off.png" },      
      { name: "prefetch", content: "/draw/static/img/lantern.png" },      
      { name: "prefetch", content: "/draw/static/img/result-bg.png" }, 
      { name: "prefetch", content: "/draw/static/music/bgmusic.mp3" },      
      { name: "prefetch", content: "/draw/home/draw" },
    ]
  },
  data() {
    return {
      activeIndex: 0,
      interval: null,
      loaded: false
    };
  },
  computed: {},
  components: { scroll },
  methods: {
    isActive(index) {
      return index >= this.activeIndex;
    }
  },
  async asyncData(e) {},
  beforeMount() {
    this.loaded = true;
  },
  mounted() {
    this.interval = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % 6;
    }, 1000);
  },
  destoryed() {
    clearInterval(this.interval);
  }
};
</script>

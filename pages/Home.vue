<style lang="scss">
@import "~sass-rem";
$rem-baseline: 46.68px;
.page-home {
  position: absolute;
  background: #de1c29;
  height: 100%;
  width: 100%;

  .lantern {
    position: absolute;
    left: 0;
    top: 0;
    width: rem(750px);
    height: rem(230px);
    background: url(/draw/static/img/lantern.png) no-repeat;
    background-size: rem(750px) rem(230px);
  }

  .logo {
    position: absolute;
    left: rem(60px);
    top: rem(30px);
    width: rem(145px);
    height: rem(61px);
    background: url(/draw/static/img/logo.png) no-repeat;
    background-size: rem(145px) rem(61px);
  }

  .music {
    position: absolute;
    right: rem(26px);
    top: rem(26px);
    width: rem(57px);
    height: rem(57px);
    background: url(/draw/static/img/music.png) no-repeat;
    background-size: rem(57px) rem(57px);
    transform-origin: center;
    z-index: 7;
  }
  .introduce{
    position: absolute;
    right: rem(26px);
    top: rem(96px);
    width: rem(57px);
    height: rem(57px);
    background: url(/draw/static/img/introduce.png) no-repeat;
    background-size: rem(57px) rem(57px);
    transform-origin: center;
    z-index: 7;
  }
  .stop {
    background-image: url(/draw/static/img/music-off.png);
  }
  .dialog-draw-info{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 8;
    top:0;
    .bg{
      width: 100%;
      height: 100%;
      background-image:linear-gradient(to bottom, #000000, rgba(51,51,51,0.4)); 
    }
    .submit-info{
        position: absolute;
        width: rem(674px);
        height: rem(732px);
        top: 50%;
        left: 50%;
        margin: rem(-366px) 0 0 rem(-337px); 
        background: url(/draw/static/img/dialog-bg.png) center no-repeat;
        background-size: rem(674px) rem(732px);
        .info-title{
          font-size: rem(48px);
          margin: rem(96px) 0 rem(30px);
          p{
            padding: 0;
            margin: 0 auto;
            color: red;
          }
        }
        .info-content{
          font-size: rem(23.5px);
          padding:0 rem(106px);
          text-align: left;
          p{
            margin:0;
            .content-li{
              display:inline-block;
              margin-top:rem(8px);
              vertical-align: top;
              width: rem(26px);
              height: rem(26px);
              text-align: center;
              border-radius:rem(13px); 
              background:rgb(239,41,28);
              color:white;
            }
            .content{
              display:inline-block;
              width: rem(416px);
              line-height:180%;
              margin-left: rem(16px); 
            }
          }
        }
        .info-close{
            margin: rem(60px) 0;
            padding: 0;
            background: transparent;
            .close{
                margin: auto;
                border: none;
                width: rem(400px);
                height: rem(74px);
                background: url(/draw/static/img/close-1.png) center no-repeat;
                background-size: rem(400px) rem(74px);
            }
        }
    }
  }
  .footer {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    height: rem(550px);
    background: #fff;

    .footer-ctn {
      position: absolute;
      bottom: 0;
      width: rem(750px);
      height: rem(307px);
    }

    .cloud-left {
      position: absolute;
      bottom: 0;
      width: rem(283px);
      height: rem(117px);
      background: url(/draw/static/img/footer-cloud-left.png) no-repeat;
      background-size: rem(283px) rem(117px);
    }

    .cloud-right {
      position: absolute;
      bottom: 0;
      right: 0;
      width: rem(226px);
      height: rem(140px);
      background: url(/draw/static/img/footer-cloud-right.png) no-repeat;
      background-size: rem(226px) rem(140px);
    }

    .tree-left {
      position: absolute;
      left: rem(-75px);
      top: rem(35px);
      width: rem(266px);
      height: rem(193px);
      background: url(/draw/static/img/tree-left.png) no-repeat;
      background-size: rem(266px) rem(193px);
    }

    .tree-right {
      position: absolute;
      right: 0;
      top: rem(-25px);
      width: rem(165px);
      height: rem(195px);
      background: url(/draw/static/img/tree-right.png) no-repeat;
      background-size: rem(190px) rem(195px);
    }
  }

  .temple-ctn {
    position: absolute;
    top: rem(414px);
    left: 0;
    width: 100%;
    height: rem(295px);
    overflow: hidden;
    .temple {
      background: url(/draw/static/img/temple.png) no-repeat;
      background-size: rem(750px) rem(278px);
      width: rem(750px);
      height: rem(278px);
      position: absolute;
      bottom: 0;
    }

    .cloud-ctn {
      width: rem(750px);
    }
    .cloud-left {
      position: absolute;
      left: 0;
      width: rem(338px);
      height: rem(300px);
      background: url(/draw/static/img/temple-cloud-left.png) no-repeat;
      background-size: rem(338px) rem(300px);
    }

    .cloud-right {
      position: absolute;
      right: 0;
      width: rem(356px);
      height: rem(282px);
      background: url(/draw/static/img/temple-cloud-right.png) no-repeat;
      background-size: rem(356px) rem(282px);
    }

    .tree-left {
      position: absolute;
      left: 0;
      top: rem(18px);
      width: rem(185px);
      height: rem(134px);
      background: url(/draw/static/img/tree-left.png) no-repeat;
      background-size: rem(185px) rem(134px);
    }

    .tree-right {
      position: absolute;
      right: 0;
      top: rem(18px);
      width: rem(126px);
      height: rem(129px);
      background: url(/draw/static/img/tree-right.png) no-repeat;
      background-size: rem(126px) rem(129px);
    }
  }
}
</style>
<template>
  <div class="page">
    <div class="page-home " :class="loaded?animationIn:'hide'">
        <firework size="1.45rem" left="4.306rem" top="1.928rem" delay="0.1s"></firework>
        <firework size="1.071rem" left="13.669rem" top="2.164rem" delay="0.3s"></firework>
        <firework size="0.8997rem" left="0.9rem" top="7.197rem" delay="0.25s"></firework>
        <firework size="1.585rem" left="7.391rem" top="10.626rem" delay="0.15s"></firework>
        <firework size="0.835rem" left="14.31rem" top="7.455rem" delay="0.2s"></firework>
        <section class="lantern"></section>
        <section class="logo"></section>
        <section class="music music-ctr " :class="{'start animated fadeRotateZ duration-5000 timing-linear count-infinite':isPlay,'stop':!isPlay}" @click="playOrStop()">
        </section>
        <section class="introduce introduce-ctr" @click="openIntroduce()">
        </section>
        <section class="footer">
          <div class="footer-ctn">
            <section class="cloud-left" :class="{'animated fadeInLeft':loaded,'hide':!loaded}"></section>
            <section class="cloud-right" :class="{'animated fadeInRight':loaded,'hide':!loaded}"></section>
            <section v-show="showFooterTree" class="tree-left" :class="{'animated duration-3000 fadedispaly':loaded,'hide':!loaded}"></section>
            <section v-show="showFooterTree" class="tree-right" :class="{'animated duration-3000 fadedispaly':loaded,'hide':!loaded}"></section>
          </div>          
        </section>
        <section class="temple-ctn" :style="templePosCSS">          
          <div class="fl cloud-ctn">
            <section class="cloud-left fl" :class="{'animated fadeInLeft':loaded,'hide':!loaded}"></section>
            <section class="cloud-right fr" :class="{'animated fadeInRight':loaded,'hide':!loaded}"></section>
            <section class="tree-left" :class="{'animated duration-3000 fadedispaly':loaded,'hide':!loaded}"></section>
            <section class="tree-right" :class="{'animated duration-3000 fadedispaly':loaded,'hide':!loaded}"></section>
          </div>          
          <section class="temple"></section>          
        </section>
        <div class="dialog-draw-info" v-if="isIntroduce">
          <div class="bg"></div>
          <div class="submit-info"  :class="{'animated zoomIn duration-2000':isIntroduce,'hide':!isIntroduce}">
                <div class="info-title">
                    <p>活动说明</p>
                </div>
                <div class="info-content">
                  <p><span class="content-li">1</span><span class="content">活动时间：2.14-2.24</span></p>
                  <p><span class="content-li">2</span><span class="content">求签玩法：6种类型的签可以各求一种</span></p>
                  <p><span class="content-li">3</span><span class="content">精美礼品：抽签祈福中，您有机会获得闪秀送出的礼品，请填写准确的收货信息，我们将安排在2.25发放礼品。</span></p>
                  <p><span class="content-li">4</span><span class="content">本活动由牛商网旗下品牌闪秀主办，解释权在法律规定的范围内归本公司所有如有疑问可致电联系：<span style="color:red">4000-333-087</span></span></p>
                </div>
                <div class="info-close">
                  <div class="close" @click="closeIntroduce()"></div>
                </div>
          </div>
        </div>
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Firework from "@/components/Firework.vue";

export default {
  components: {
    firework: Firework
  },
  computed: {
    ...mapState("pageDraw", {
      isIntroduce: state => state.isIntroduce,
      currentTime: state => state.currentTime,
      isPlay: state => state.isPlay,
      audioCtr: state => state.audioCtr
    }),
    ...mapState("pageHome", {
      showFooterTree: s => s.showFooterTree,
      animationIn: state => state.animationIn,
      templePosCSS: s => {
        return { top: s.templePosition };
      }
    })
  },
  data() {
    return { loaded: false };
  },
  methods: {
    playOrStop() {
      this.$store.commit("pageDraw/setIsPlay", !this.isPlay);
      this.isPlay ? this.audioCtr.play() : this.audioCtr.stop();
    },
    openIntroduce(){
      this.$store.commit("pageDraw/setIsIntroduce", true);
    },
    closeIntroduce(){
      this.$store.commit("pageDraw/setIsIntroduce", false);
    }
  },
  mounted() {
    this.loaded = true;
  }
};
</script>



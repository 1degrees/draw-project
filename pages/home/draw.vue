<template>
    <div class="page-draw">
        <scroll class="scroll">
            <div class="text">
                <div>2018，你的新年愿望是什么呢？</div>
                <div>心诚则灵，摆好姿势，抽取您的幸运签！</div>
            </div>
        </scroll>
        <section class="draw-text" :class="loaded?'animated bounceInDown delay-500':'hide'"></section>  
        <section class="draws-pot" :class="loaded?'animated wobble delay-1000':'hide'"></section> 
        <section class="star-btn" @click="goDraw()"></section> 
        <section :class="loaded?'dog':'hide'"></section>   
        <section :class="loaded?'immortal':'hide' "></section>   
    </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import scroll from "@/components/DrawScroll.vue";

export default {
  enableShare: true,
  data() {
    return {
      loaded: false,
      share: {
        title: "新年到，摇一摇，摇出新春好运道！", // 分享标题
        desc: "我是【%name%】，祝亲朋好友“旺”事如意！来领取你的新年祝福吧~" // 分享标题
      }
    };
  },
  components: { scroll },
  computed: {
    ...mapState("pageDraw", {
      userInfo: state => state.userInfo
    })
  },
  methods: {
    ...mapMutations("pageHome", [
      "setFooterTreeState",
      "setTemplePosition",
      "setEnterAnimation",
      "resetEnterAnimation"
    ]),
    goDraw() {
      this.$router.push("/home/options");
    },
    async getUserInfo() {
      if (!this.userInfo || !this.userInfo.icon || !this.userInfo.name) {
        await this.$store
          .dispatch("pageDraw/getUserId", {
            params: { token: axios.defaults.headers.common["token"] }
          })
          .catch(error => {
            this.$message({ message: error, type: "error" });
            console.warn('getUserId error');
          });
        await this.$store
          .dispatch("pageDraw/getUserInfo", {
            appId: this.userInfo.appId,
            openid: this.userInfo.openid
          })
          .catch(error => {
            console.warn('getUserId error');
            this.$message({ message: error, type: "error" });
            this.loading = false;
          });
      }
    }
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    this.loaded = true;
    this.setEnterAnimation("animated bounceInUp duration-2000");
    this.setFooterTreeState(false);
    this.setTemplePosition("9.712rem");
  },
  beforeDestroy() {
    this.resetEnterAnimation();
  }
};
</script>

<style lang="scss">
@import "~sass-rem";
$rem-baseline: 46.68px;
.page-draw {
  position: absolute;
  width: 100%;
  height: 100%;

  .scroll {
    position: absolute;
    left: rem(110px);
    top: rem(352px);
    .text {
      font-size: rem(24px);
    }
  }

  .draw-text {
    position: absolute;
    top: rem(100px);
    left: rem(144px);
    width: rem(495px);
    height: rem(243px);
    background: url(/draw/static/img/draw-text.png) no-repeat;
    background-size: rem(495px) rem(243px);
  }

  .draws-pot {
    position: absolute;
    bottom: rem(170px);
    left: rem(244px);
    width: rem(270px);
    height: rem(439px);
    background: url(/draw/static/img/draw.png) no-repeat;
    background-size: rem(270px) rem(439px);
    animation-iteration-count: 2;
  }

  .star-btn {
    position: absolute;
    bottom: rem(56px);
    left: rem(215px);
    width: rem(346px);
    height: rem(76px);
    background: url(/draw/static/img/star-btn.png) no-repeat;
    background-size: rem(346px) rem(76px);
  }

  .immortal {
    position: absolute;
    bottom: rem(161px);
    left: rem(18px);
    width: rem(260px);
    height: rem(297px);
    background: url(/draw/static/img/immortal.png) no-repeat;
    background-size: rem(260px) rem(297px);
  }

  .dog {
    position: absolute;
    bottom: rem(158px);
    right: rem(47px);
    width: rem(228px);
    height: rem(251px);
    background: url(/draw/static/img/dog.png) no-repeat;
    background-size: rem(228px) rem(251px);
  }
}

// .page-home {
//   .footer {
//     .tree-left,
//     .tree-right {
//       display: none !important;
//     }
//   }

//   .temple-ctn {
//     top: rem(453px) !important;
//   }
// }
</style>
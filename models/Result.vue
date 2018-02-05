<template>
  <div class="page-draw-detail">
    <div class="detail-bg-color"></div>
    <div class="detail-bg" :class="{'animated zoomIn duration-2000':show,'hide':!show}" >
        <div class="zhongguojie"><div class="left"></div><div class="right"></div></div>
        <div class="draw-text"><p>恭喜施主！</p><p>抽中了<span>{{drawInfo.level}}</span></p></div>
        <div class="draw-details">
            <span class="draw-content">{{drawName}}</span>
            <span class="draw-class" :class="level"></span>
        </div>
        <section class="immortal"></section> 
        <div class="draw-but" @click="look()">点击查看</div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import scroll from "@/components/DrawScroll";
import axios from 'axios'
export default {
  data() {
    return {
      show: false,
      drawName : '事业签',
    };
  },
  props:['value'],
  computed : {
    ...mapState("pageDraw", {
      level: state => {
        let map = {'上上签':'shangshangqian','上签':'shangqian','中签':'zhongqian','下签':'xiaqian','幸运签':'xingyunqian'}
        return map[state.drawInfo.level]
      },
      drawInfo: state => state.drawInfo
    }),
  },
  components: { scroll },
  methods : {
    look(){
      this.$emit('input', true);
    }
  },
  created(){
    this.drawName = `${this.$route.query.name}签`;
    this.show = true;
  },
  mounted(){}
}
</script>

<style lang="scss">
@import "~sass-rem";
$rem-baseline: 46.68px;
.page-draw-detail {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 8;
  .detail-bg-color{
    position: absolute;
    width: 100%;
    height: 100%;
    background-image:linear-gradient(to bottom, #000000, rgba(51,51,51,0.4)); 
    z-index: 6;
  }
  .detail-bg{
    position: relative;
    top: 50%;
    left: 50%;
    margin-left: rem(-292px);
    margin-top: rem(-464px);
    width: rem(584px);
    height:  rem(928px);
    background: url(/draw/static/img/result-bg.png) center no-repeat;
    background-size: rem(584px) rem(928px);
    z-index: 7;
  }
  .zhongguojie{
      position: absolute;
      width: rem(584px);
      height: rem(180px);
      .left{
        float: left;
        margin-left:rem(32px); 
        width: rem(106px);
        height: rem(180px);
        background: url(/draw/static/img/china-jie_01.png) center no-repeat;
        background-size: rem(106px) rem(180px);
      }
      .right{
        float: right;
        margin-right:rem(32px);
        width: rem(106px);
        height: rem(180px);
        background: url(/draw/static/img/china-jie_02.png) center no-repeat;
        background-size: rem(106px) rem(180px);
      }
  }
  .draw-text{
    position: absolute;
    top: rem(130px);
    left: 0;
    height: rem(136px);
    width: 100%;
    text-align: center;
    p {
      margin: rem(7px) 0;
    }
    p:nth-child(1){
      color:#ffe9cf;
      font-size: rem(45.5px);
    }
    p:nth-child(2){
      color:#ffe9cf;
      font-size: rem(56.86px);
      span{
        font-weight: bold;
      }
    }
  }
  .draw-details{
    position: absolute;
    top:rem(340px);
    left:rem(380px);
    width: rem(121px);
    height: rem(248px);
    transform: scale(0.9);
    background: url(/draw/static/img/draw-0.png) no-repeat;
    background-size: rem(121px) rem(248px);
    .draw-content{
      display: block;
      margin: 0 auto;
      width: rem(26px);
      height: rem(120px);
      padding: rem(40px) rem(28px) 0 0;
      transform: rotate(22deg);
      transform-origin: bottom;
      font-family: lixukexingshu;
      font-size: rem(34px);
      color:red;
    }
    .draw-class{
      display: block;
      margin: 0 rem(16px);
      width: rem(42px);
      height: rem(76px);
    }
    .shangshangqian{
      background: url(/draw/static/img/shangshangqian.png) no-repeat;
      background-size: rem(42px) rem(76px);
    }
    .shangqian{
      background: url(/draw/static/img/shangqian.png) no-repeat;
      background-size: rem(42px) rem(76px);
    }
    .zhongqian{
      background: url(/draw/static/img/zhongqian.png) no-repeat;
      background-size: rem(42px) rem(76px);
    }
    .xiaqian{
      background: url(/draw/static/img/xiaqian.png) no-repeat;
      background-size: rem(42px) rem(76px);
    }
    .xingyunqian{
      background: url(/draw/static/img/xingyunqian.png) no-repeat;
      background-size: rem(42px) rem(76px);
    }
  }
  .immortal{
    position: absolute;
    top: rem(330px);
    left: rem(106px);
    width: rem(300px);
    height: rem(348px);
    background: url(/draw/static/img/immortal.png) no-repeat;
    background-size: rem(300px) rem(348px);
  }
  .draw-but{
    position: absolute;
    top:rem(770px);
    left:rem(120px);
    width: rem(360px);
    height: rem(74px);
    line-height: rem(74px);
    border-radius:rem(37px); 
    font-size: rem(40.5px);
    background: #ffe9cf;
    color:red;
  }
}
</style>
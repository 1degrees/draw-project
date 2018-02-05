<template>
  <div class="page-options" v-loading="loading"
    element-loading-spinner="el-icon-loading animated fadeRotateZ duration-2000 timing-linear count-infinite"
    element-loading-background="rgba(0, 0, 0, 0.2)">
    <div class="empty-draw" :class="{'animated fadeInDownDraw duration-3000':show,'hide':!show}"></div>
    <scroll class="scroll">
      <div class="text">施主，请问你所谓何求?</div>
    </scroll>
    <div class="draw-bg"></div>
    <section class="draws-list">
          <div  v-for="(ele,index) of draws" class="draws-tag" :class="cclass(index)" :key="index" @click="drawAction($event,ele)"><span>{{ele.name}}</span></div>
    </section>
    <section class="draws-pot" :class="{'animated wobble delay-1000':show,'hide':!show}"></section>
    <section class="immortal" :class="{'animated fadeInDownDraw duration-5000':show,'hide':!show}"></section> 
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState,mapMutations } from "vuex";
import detail from '@/models/Detail';
import scroll from "@/components/DrawScroll";

export default {
  enableShare:true,
  data() {
    return {
      show: false,
      loading: false,
      draws : []
    };
  },
   computed : {
    ...mapState("pageDraw", {
      userInfo: state => state.userInfo
    }),
  },
  components: { scroll,detail },
  methods : {
    ...mapMutations("pageHome", ['setFooterTreeState','setTemplePosition']),
    cclass(i){
      return this.show? `animated fadeInRotate delay-${i*500}`:'hide';
    },
    async getAllDraw(){
      this.loading = true;
      let rs = await this.$store.dispatch('pageDraw/getDrawClass').catch(error=>{
          this.$message({ message: error, type: 'error' });
          console.warn('getDrawClass error');
      })
      this.draws = rs.data.data;
      this.loading = false;
    },
    async getUserInfo(){
      if(!this.userInfo || !this.userInfo.icon || !this.userInfo.name) {
        this.loading = true;
        await this.$store.dispatch('pageDraw/getUserId', {params: {'token': axios.defaults.headers.common['token']}}).catch(error=>{
            this.$message({ message: '网络不稳定,请稍后再试', type: 'error' });
            console.warn('getUserId error');
        });
        await this.$store.dispatch('pageDraw/getUserInfo', {'appId': this.userInfo.appId, 'openid' : this.userInfo.openid }).catch(error=>{
            this.$message({ message: '网络不稳定,请稍后再试', type: 'error' });
            console.warn('getUserInfo error');
        });
        this.loading = false;
      }
    },
    async drawAction(event,e){
      if(this.loading) return;
      this.loading = true;
      let el = event.currentTarget;
      el.className = el.className.replace(/fadeInRotate\s+delay-\d*/,'fadeUpDraw duration-5000');
      await this.$store.dispatch('pageDraw/getDrawInfo', {params: { 'ctgId': e.id }}).then(()=>{
        this.loading = false;
        this.$router.push({path:`/home/options/result`, query : { id: e.id, name:e.name }});
      }).catch(error=>{
        console.warn('getDrawInfo error');
        this.$message({ message: '当前求签人数过多，请稍后再试！', type: 'error' });
        el.className = el.className.replace(/fadeUpDraw\s+duration-5000/,'');
        this.loading = false;
      })
    }
  },
  created(){
    this.getUserInfo();
  },
  mounted(){
    this.show = true;
    this.getAllDraw();
    this.setFooterTreeState(true);
    this.setTemplePosition('8.85rem');
  }
}
</script>

<style lang="scss">
@import "~sass-rem";
$rem-baseline: 46.68px;
.page-options {
  position: absolute;
  width: 100%;
  height: 100%;
  .scroll {
    position: absolute;    
    left: rem(110px) ;
    top: rem(184px) ;
    .text{
      width:rem(430px);
      font-size: rem(30px);
    }
  }
  .draws-list{
    position: absolute;
    display:flex;
    flex-flow:row;
    justify-content: center;
    top:rem(740px);
    width: 100%;
    height: rem(240px);
    z-index: 7;
    .draws-tag{
      display: inline-flex;
      align-items : center;
      justify-content : center;
      height: 100%;
      width: rem(64px);
      color:white;
      font-size: rem(28.8px);
      margin-right:  rem(40px);
      background: url(/draw/static/img/empty-draw.png) no-repeat;
      background-size: rem(64px) rem(240px);
      span{
        display: block;
        width: rem(36px);
        margin-right: rem(6px); 
      }
    }
    .draws-tag:last-child{
      margin-right: 0;
    }
  }
  .draw-bg{
    position: absolute;
    top : rem(703px);
    left : rem(37px);
    width : rem(639px);
    height : rem(398px);
    background : url(/draw/static/img/bg-draw.png) no-repeat;
    background-size : rem(639px) rem(398px);
  }
  .empty-draw{
    position: absolute;
    left: rem(168px);
    top: rem(128px);
    height:rem(116px);
    width: rem(84px);
    background: url(/draw/static/img/draw-1.png) no-repeat;
    background-size: rem(84px) rem(116px);
    z-index: 7;
  }
  .draws-pot{
    position: absolute;
    bottom: rem(-136px);
    left: rem(240px);
    width: rem(214px);
    height: rem(336px);
    background: url(/draw/static/img/draw.png) no-repeat;
    background-size: rem(214px) rem(336px);
  }
  .immortal{
    position: absolute;
    top: rem(304px);
    left: rem(150px);
    width: rem(378px);
    height: rem(428px);
    background: url(/draw/static/img/immortal.png) no-repeat;
    background-size: rem(378px) rem(428px);
    z-index: 6;
  }
}
</style>
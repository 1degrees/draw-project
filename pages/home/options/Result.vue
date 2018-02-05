<template>
  <div class="page-result" v-loading="loading"
    element-loading-spinner="el-icon-loading animated fadeRotateZ duration-2000 timing-linear count-infinite"
    element-loading-background="rgba(0, 0, 0, 0.2)">
    <detail v-if="showDetail"></detail>
    <result v-if="!showDetail" v-model="showDetail"></result>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
// import {updateShare} from '@/middlewares/wx-share';
import result from "@/models/Result";
import detail from "@/models/Detail";

export default {
  enableShare:true,
  data() {
    return { show: false, showDetail: false ,loading:false};
  },
  computed: {
    ...mapState("pageDraw", {
      userInfo: state => state.userInfo,
      drawInfo: state => state.drawInfo
    })
  },
  components: { result, detail },
  methods: {
    async init() {
      /*解决页面刷新签文无法查看 */
      if(!this.userInfo || !this.userInfo.icon || !this.userInfo.name) {
        this.loading = true;
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
            this.$message({ message: error, type: "error" });
            console.warn('getUserInfo error');
          });
        this.loading = false;
      }
      if(!this.drawInfo || !this.drawInfo.icon){
          this.loading = true;
          await this.$store
          .dispatch('pageDraw/getDrawInfo', {
              params: { 
                'ctgId': this.$route.query.id
              }
            })
            .catch(error=>{
              this.$message({ message: error, type: 'error' });
              console.warn('getDrawInfo error');
            });
          this.loading = false;
      }
    }
  },  
  async mounted() {
    await this.init();
  },
  async afterWxReady(){
    await this.init();
    this.updateShare({
      title: "新年到，摇一摇，摇出新春好运道！", // 分享标题
      desc: `我是【%name%】，祝朋友圈“旺”事如意！我抽的幸运签是【${this.drawInfo.title}】哦~` // 分享标题
    });
  }
};
</script>

<style lang="scss">
@import "~sass-rem";
$rem-baseline: 46.68px;
.page-result {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
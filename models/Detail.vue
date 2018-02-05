<template>
  <div  class="draw-result-detail" v-loading="loading"
    element-loading-spinner="el-icon-loading animated fadeRotateZ duration-2000 timing-linear count-infinite"
    element-loading-background="rgba(0, 0, 0, 0.2)">
      <div class="card-img" :class="{'animated fadeZoomRotate duration-2000':show,'hide':!show}">
            <div class="card-close" @click="closePage()"></div>
            <img id="result-img" :src="image" />
            <img id="bg-card-img" src="/draw/static/img/card-border.png" />
            <div class="share-guide">
                <div class="guide"  :class="{'animated fadeUpDown duration-2000 count-infinite':show,'hide':!show}"></div>
                <p class="guide-content">长按保存即可分享朋友圈</p>
            </div>
      </div>
      <!-- <div class="detail-opt"><a class="save"></a><a class="share"></a></div> -->
      <div class="dialog-draw-info" :class="{'animated zoomIn duration-2000':showDl,'hide':!showDl}">
          <div class="bg"></div>
          <div class="submit-info">
                <div class="form-close" @click="close()"></div>
                <div class="info-title">
                    <p>恭喜你</p>
                </div>
                <div class="info">
                    <p>抽中了幸运礼品</p>
                    <p>闪秀会安排在2018年2月25日开始配送礼品</p>
                    <p>请准确填写配送地址</p>
                </div>
                <form>
                    <div class="form-item">
                        <label>姓名</label><input v-model="name"/>
                    </div>
                    <div class="form-item">
                        <label>手机</label><input  v-model="telephone"/>
                    </div>
                    <div class="form-item">
                        <label style="vertical-align: top;">收货地址</label><textarea v-model="address" />
                    </div>
                    <div class="form-item form-submit">
                        <div class="submit" @click="submitInfo()"></div>
                    </div>
                </form>
          </div>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import axios from 'axios';
import scroll from "@/components/DrawScroll";
import DrawImg from '@/service/drawImg';

export default {
  data() {
    return {
        show: false,
        loading:true,
        showDl: false,
        cavasObj : null,
        image: '',
        name:'',
        telephone:'',
        address:'',
    };
  },
  computed : {
    color(){
        let colors = {'事业':'#000000','财富':'#000000','家庭':'#ffffff','健康':'#000000','情感':'#000000','友谊':'#ffffff'};
        return colors[this.$route.query.name] || '#000000';
    },
    ...mapState("pageDraw", {
      userInfo: state =>state.userInfo,
      drawInfo: state =>state.drawInfo
    }),
  },
  components: { scroll },
  methods : {
        async isWrite(){
            this.loading = true;
            await this.$store.dispatch('pageDraw/isSetContacts').catch(error=>{
                this.$message({ message: error, type: 'error' });
                console.warn('isSetContacts error');
            }).then(rs => {
                this.showDl = !rs.data.data;
            })
            this.loading = false;
        }, 
        async submitInfo(){
            this.loading = true;
            if(!this.name){
                this.$message({ message: '姓名未填写', type: 'warning' });
                this.loading = false;
                return;
            } else if(!this.telephone || !/^1\d{10}$/.test(this.telephone)){
                this.$message({ message: '手机号码未填写或格式不正确', type: 'warning' });
                this.loading = false;
                return;
            } else if(!this.address){
                 this.$message({ message: '地址未填写', type: 'warning' });
                 this.loading = false;
                 return;
            }
            await this.$store.dispatch('pageDraw/setContacts', {name:this.name,telephone:this.telephone,address:this.address}).catch(error=>{
                this.$message({ message: '信息提交失败，请稍后再试', type: 'error' });
            }).then(rs => {
                this.showDl = false;
                this.$message({ message: '提交成功，请保持电话畅通', type: 'success' });
            })
            this.loading = false;
        }, 
        close(){
            this.showDl = false;
        },
        closePage(){
            this.$router.push({path:`/home/options`});
        },
        async init(){
            this.loading = true;
            let userIcon = this.userInfo.icon || '/draw/static/img/dog.png';
            this.canvasObj = new DrawImg({width:750,height:1200,src1:this.drawInfo.icon, src2:userIcon.replace('http://wx.qlogo.cn/','/wxresource/'), name:this.userInfo.name,color:this.color});
            this.canvasObj.build().then(()=>{
                this.image =  this.canvasObj.exportJpeg();
                this.loading = false;
                this.show = true;
            }).catch(err=>{
                this.$message({ message: '签筒已抽空,请稍后再试', type: 'error' });
                console.warn(err);
                this.loading = false;
                this.value = false;
                setTimeout(()=>{
                    this.$router.push({path:`/home/options`});
                },3000)
            });
            setTimeout(()=>{
                this.drawInfo['level'] && this.drawInfo['level'].includes('幸运签') && this.isWrite();
            },4000)
        }
  },
  mounted(){
        this.init();
  }
}
</script>

<style lang="scss">
@import "~sass-rem";
$rem-baseline: 46.68px;
.draw-result-detail {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 8;
    background-image:linear-gradient(to bottom, #000000, rgba(51,51,51,0.4)); 
    .card-img{
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 7;
        .card-close{
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: rem(-525px);
            margin-left: rem(291px);
            width: rem(53px);
            height: rem(53px);
            background: url(/draw/static/img/close.png) center no-repeat;
            background-size: rem(53px) rem(53px);
        }
        #result-img{
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: rem(-465px);
            margin-left: rem(-291px);
            width: rem(582px);
            height: rem(930px);
            z-index: 1;
        }
        #bg-card-img{
            pointer-events: none;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: rem(-465px);
            margin-left: rem(-291px);
            width: rem(582px);
            height: rem(930px);
            z-index: 2;
        }
        .share-guide{
            pointer-events: none;
            position: absolute;
            width: rem(661px);
            height: rem(302px);
            top: 50%;
            left: 50%;
            margin-top: rem(244px);
            margin-left: rem(-338.5px);
            z-index: 3;
            background: url(/draw/static/img/guide-img.png) center no-repeat;
            background-size: rem(661px) rem(302px);
            .guide{
                pointer-events: none;
                margin:rem(160px) 0 0 rem(319px);
                width: rem(43px);
                height: rem(54px);
                background: url(/draw/static/img/guide.png) center no-repeat;
                background-size: rem(43px) rem(54px);
            }
            .guide-content{
                font-size:rem(23px);
                color:#ffecc8;
                margin-top:rem(36px) 
            }
        }
    }
  .dialog-draw-info{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 8;
    top:0;
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
          font-size: rem(68px);
          margin: rem(90px) 0 rem(30px);
          p{
            padding: 0;
            margin: 0 auto;
            color: red;
          }
        }
        .info{
            margin-top: 0; 
            p{
                margin: rem(14px) auto;
                font-size: rem(24.96px);
            }
        }
        .form-close{
            position: absolute;
            top: rem(-70px);
            right: rem(40px);
            width: rem(53px);
            height: rem(53px);
            background: url(/draw/static/img/close.png) center no-repeat;
            background-size: rem(53px) rem(53px);
        }
        form{
             font-size: rem(24.96px);
             error{
                color: red;
                display: block;
             }
             .form-item{
                text-align: left;
                background: #dbbc89;    vertical-align: top;
                border-radius: rem(10px);
                margin: rem(15px) auto;
                width: rem(400px);
                padding: 0 rem(15px);
                box-sizing: border-box;
                label{
                    display: inline-block;
                    height: rem(50px);
                    line-height: rem(50px);
                }
                input,
                input:focus{
                    margin-left: rem(15px);
                    height: rem(50px);
                    width: rem(220px);
                    outline: none;
                    border: none !important;
                    background: transparent;
                }
                textarea,
                textarea:focus{
                    margin-left: rem(15px);
                    width: rem(200px);
                    height: rem(90px);
                    line-height: rem(45px);
                    outline: none;
                    border: none !important;
                    background: transparent;
                }
            }
            .form-submit{
                margin: rem(30px) auto;
                padding: 0;
                background: transparent;
                .submit{
                    border: none;
                    width: rem(400px);
                    height: rem(74px);
                    background: url(/draw/static/img/submit.png) center no-repeat;
                    background-size: rem(400px) rem(74px);
                }
            }
        }
    }
  }
  .detail-opt{
    position: absolute;
    width: 100%;
    height: rem(78px);
    bottom:rem(90px);
    display: flex;
    justify-content: center;
    .save{
        width: rem(214px);
        height: rem(78px);
        background: url(/draw/static/img/save.png) center no-repeat;
        background-size: rem(214px) rem(78px);
    }
    .share{
        margin-left: rem(46px); 
        width: rem(214px);
        height: rem(78px);
        background: url(/draw/static/img/share.png) center no-repeat;
        background-size: rem(214px) rem(78px);
    }
  }
}
</style>
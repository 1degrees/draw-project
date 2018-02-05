<template>
    <div id="app">
        <div class="bg-music"><audio loop="loop" :src="musicUrl"></audio></div>
        <transition
            :name="pageTransitionEffect">
            <keep-alive v-if="$route.meta.keepAlive">
                <router-view
                    :key="$route.fullPath"
                    class="app-view"
                    :class="[pageTransitionClass]"
                    ></router-view>
            </keep-alive>
            <router-view
                :key="$route.fullPath"
                v-if="!$route.meta.keepAlive"
                class="app-view"
                :class="[pageTransitionClass]"
                ></router-view>
        </transition>
        <update-toast></update-toast>
    </div>
</template>

<script>
import "@/assets/css/common.scss";
import { mapState } from "vuex";
import UpdateToast from "@/components/UpdateToast";
import fontSize from "@/service/font-size";

export default {
  name: "app",
  metaInfo: {
    title: "新年到，摇一摇，摇出新春好运道！",
    meta: [
      { name: "keywords", content: "闪秀 抽签 牛商 牛商网" },
      { name: "description", content: "祝亲朋好友“旺”事如意！来领取你的新年祝福吧~" }
    ],
    script:[
        {type:'text/javascript', src:'/draw/static/lib/jweixin-1.2.0.js'},
        {type:'text/javascript', src:'https://hm.baidu.com/hm.js?aa18380d635aef74c78f15afa11d7ba2'}
        // {type:'text/javascript', body: true,innerHtml:`var _hmt = _hmt || [];(function() {  var hm = document.createElement("script");  hm.src = "https://hm.baidu.com/hm.js?aa18380d635aef74c78f15afa11d7ba2";  var s = document.getElementsByTagName("script")[0];   s.parentNode.insertBefore(hm, s);})();`} //百度统计
    ]
  },
  data() {
    return {musicUrl:'/draw/static/music/bgmusic.mp3'};
  },
  components: {
    UpdateToast
  },
  computed: {
    ...mapState("pageTransition", {
      pageTransitionType: state => state.type,
      pageTransitionEffect: state => state.effect
    }),
    ...mapState("pageDraw", {
      isPlay : state => state.isPlay,
      audioCtr: state => state.audioCtr
    }),
    pageTransitionClass() {
      return `transition-${this.pageTransitionType}`;
    }
  },
  methods : {
    async audioInitPlay(){
        //解决苹果播放暂停bug
        if(navigator.userAgent.match(/(iPhone)|(iPad)/)){
            document.addEventListener("WeixinJSBridgeReady", () => {
                this.isPlay && this.audioCtr.play();
            }, false);
            document.addEventListener('YixinJSBridgeReady', () => {
                this.isPlay && this.audioCtr.play();
            }, false);
        }else{
            this.isPlay && this.audioCtr.play();
        }
    },
    async initMusic(){
        let rs = await this.$store.dispatch('pageDraw/getMusic').catch(error=>{
            console.warn('getMusic error');
        });
        console.log('-----音乐选取----',rs)
        this.musicUrl = (rs && rs.music) || '/draw/static/music/bgmusic.mp3';
    }
  },
  mounted() {
    fontSize();
    this.initMusic().then(()=>{
        if(/home/.test(window.location.pathname)){
            this.$store.dispatch('pageDraw/initAudioCtr');
            this.audioCtr.setAudio(this.$el.querySelector('.bg-music>audio'));
            if(!this.audioCtr.inited){
                this.audioCtr.setInited(true);
                this.audioInitPlay();
            }
        }
    })
  }
};
</script>

<style lang="stylus">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    .app-view {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow-x: hidden;
        overflow-y: hidden;
        background: white;

        &::-webkit-scrollbar {
            width: 0;
            background: transparent;
        }

        &.transition-slide {
            transition: transform 0.4s cubic-bezier(0.55, 0, 0.1, 1);

            &.slide-left-enter {
                transform: translate(100%, 0);
            }

            &.slide-right-enter {
                transform: translate(-100%, 0);
            }

            &.slide-right-leave-active {
                transform: translate(100%, 0);
            }

            &.slide-left-leave-active {
                transform: translate(-100%, 0);
            }
        }

        &.transition-fade {
            opacity: 1;
            transition: opacity 1s ease;

            &.fade-enter {
                opacity: 0;
            }

            &.fade-leave-active {
                opacity: 0;
            }
        }
    }
}
</style>

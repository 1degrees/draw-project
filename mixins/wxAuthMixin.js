import * as wxShare from '../service/wx-share.js';

async function initShare() {
    if (this.$router.currentRoute.name !== 'index') {
        await wxShare.wxShare();
        if (this.$options.afterWxReady) {
            this.$options.afterWxReady.call(this);
        }
    }

    if (this.share) {
        await wxShare.updateShare(this.share);
    }
}

let mixin = {
    data() {
        return {
            $isWxLoading: false
        }
    },
    async beforeMount() {
        if(!this.$options.enableShare){
            return;
        }
        if (this.$isWxLoading) {
            console.log('$isWxLoading loading')
            return;
        }
        this.$isWxLoading = true;
        console.log('component mounted!');
        await initShare.call(this);
        this.$isWxLoading = false;
    },
    async activated() {
        if(!this.$options.enableShare){
            return;
        }
        if (this.$isWxLoading) {
            return;
        }
        this.$isWxLoading = true;
        console.log('component actived!')
        await initShare.call(this);
        this.$isWxLoading = false;
    },
    methods: {
        async updateShare(data) {
            await wxShare.updateShare(data);
        }        
    }
};

export default mixin;

class AudioCtr {
    constructor(){
        this.inited = false;
        this.audio = null;
    }

    setAudio(audio){
        this.audio = audio;
    }

    setInited(inited){
        this.inited = inited;
    }

    setTime(time){
        if(this.audio)
            this.audio.currentTime = time;
    }

    getTime(){
        return this.audio && this.audio.currentTime;
    }

    async play(){
        if(this.audio)
            await this.audio.play();
    }

    async stop(){
        if(this.audio)
            await this.audio.pause();
    }

    destroy(){
        this.audio = null;
    }
}
export default AudioCtr
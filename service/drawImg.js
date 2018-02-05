/**
 * @file DrawImg
 * @author (zhangx@nsw88.com)
 */

const defaultConf = {
    width:750,
    height:1200,
    src1:'/draw/static/img/canvas.jpg',
    src2:'/draw/static/img/dog.png',
    name:'原来是你二',
    color:'#000000'
}
class DrawImg {
    constructor(config){
        this.defaultConf = defaultConf;
        Object.keys(this.defaultConf).forEach((e,i)=>{
            this[e] = (config && config[e])||this.defaultConf[e];
        })
    }
    async build(){
        this.el = document.createElement('canvas');
        this.el.width = this.width;
        this.el.height = this.height;
        this.context = this.el.getContext("2d");
        await this.render().catch(err =>{throw err})
    }
    async render(){
        let {context,width,height,src1,src2,name,color} = this;
        let bgImg;
        await this.loadImage(src1,width,height).then(rs=>{
            bgImg = rs;
        },err=>{
            throw err;
        }).catch(err=>{
            throw err;
        });
        let iconImg;
        await this.loadImage(src2,175,175).then(rs=>{
            iconImg = rs;
        },err=>{
            throw err;
        }).catch(err=>{
            throw err;
        });;
        //绘制背景
        context.drawImage(bgImg,0,0);
        //绘制头像
        context.save(); // 保存当前ctx的状态
        context.arc(381, 664, 87.5, 0, 2*Math.PI);
        context.clip(); //裁剪上面的圆形
        context.drawImage(iconImg, 381-87.5, 664-87.5, 175,175); // 在刚刚裁剪的园上画图
        context.restore();
        //绘制昵称
        context.beginPath();
        context.font="24px Arial";
        context.textAlign="center";
        context.fillStyle = color;
        context.fillText(name,381,780);
    }
    exportJpeg(canvas) {
        return this.el.toDataURL("image/jpeg", 0.85);
    }
    exportBold(){
        return new Promise((resolve, reject) => {
            try {
                this.el.toBlob(blob => resolve(blob), "image/jpeg", 0.85);
            } catch (err) {
                reject(err);
            }
        });
    }
    addEvent(){}
    loadImage(src, width, height) {
        return new Promise((resolve, reject) => {
            let img = new Image(width, height);
            img.onload = function(){ resolve(img) };
            img.onerror = function(err){
                alert(src);
                reject(err); 
            };
            img.src = src;
        });
    }
}
export default DrawImg
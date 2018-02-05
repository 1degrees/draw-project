<template>
  <div class="component">
      <div class="fireworks animated zoomIn delay" :class="delayClass" :style="style">

      </div>
  </div>
</template>
//1080 1560
<script>
export default {
  data() {
    return {
      delayClass: "none",
      style: {
        width: "30px"
      }
    };
  },
  props: ["size", "left", "top", "delay"],
  mounted() {
    this.style.width = this.size;
    this.style.height = this.size;
    this.style.left = this.left;
    this.style.top = this.top;
    this.style.backgroundSize = `${this.size} ${this.size}`;
    // this.style.animationDelay = this.delay;
    // this.style["-moz-animation-delay"] = this.delay;
    // this.style["-webkit-animation-delay"] = this.delay;
    switch (this.delay) {
      case "0.15s":
        this.delayClass = "d150";
        break;
      case "0.25s":
        this.delayClass = "d250";
        break;
      case "0.2s":
        this.delayClass = "d200";
        break;
      case "0.3s":
        this.delayClass = "d300";
        break;
       case "0.1s":
        this.delayClass = "d100";
        break;
    }
  }
};
</script>

<style lang="scss">
.fireworks {
  position: absolute;
  animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  -o-animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  background: url(/draw/static/img/fireworks.png) no-repeat;
  animation-duration: 2s;
  -moz-animation-duration: 2s;
  -o-animation-duration: 2s;
  -webkit-animation-duration: 2s;

  &.delay {
    &.d100 {
      animation-delay: 100ms;
      -moz-animation-delay: 100ms;
      -webkit-animation-delay: 100ms;
    }
    &.d200 {
      animation-delay: 200ms;
      -moz-animation-delay: 200ms;
      -webkit-animation-delay: 200ms;
    }
    &.d150 {
      animation-delay: 150ms;
      -moz-animation-delay: 150ms;
      -webkit-animation-delay: 150ms;
    }
    &.d250 {
      animation-delay: 250ms;
      -moz-animation-delay: 250ms;
      -webkit-animation-delay: 250ms;
    }
    &.d300 {
      animation-delay: 300ms;
      -moz-animation-delay: 300ms;
      -webkit-animation-delay: 300ms;
    }
  }
}
</style>

<template>
    <div  class="draw-scroll">
        <div class="wrpper fadeView-enter-active">
            <div class="scroll-bar left">
                <div class="top-img"></div>
                <div class="btn-img"></div>
            </div>
            <div class="scroll-content " ref="content">
                <slot></slot>
            </div>
            <div class="scroll-bar right">
                <div class="top-img"></div>
                <div class="btn-img"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  
};
</script>

<style lang="scss" scoped>
@import "~sass-rem";
$rem-baseline: 46.68px;

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: scaleX(0.1);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

.fadeView-enter-active {
  animation: fadeInDown 1.5s;
}

.draw-scroll {
  z-index: 6;
  position: absolute;

  .wrpper {
    position: relative;
  }

  .scroll-bar {
    height: 100%;
    position: relative;
    width: rem(19px);
    background: #ffe9cf;
    .top-img {
      background: url("/draw/static/img/scroll-top.png") no-repeat;
      background-size: rem(19px) rem(14px);
      position: absolute;
      width: rem(19px);
      height: rem(14px);
      top: rem(-14px);
      left: 0;
    }

    .btn-img {
      background: url("/draw/static/img/scroll-btn.png") no-repeat;
      background-size: rem(19px) rem(14px);
      position: absolute;
      width: rem(19px);
      height: rem(14px);
      bottom: rem(-14px);
      left: 0;
    }

    &.left {
      position: absolute;
      vertical-align: middle;
      height: 100%;
      left: 0;
      top: 0;
    }

    &.right {
      position: absolute;
      vertical-align: middle;
      right: 0;
      top: 0;
      height: 100%;
    }
  }
  .scroll-content {
    display: inline-block;
    border: rem(6px) solid #ffe9cf;
    box-sizing: border-box;
    margin: 0 rem(26px);
    padding: rem(15px) rem(25px);
    font-size: rem(12px);
    color: #fff;
    .text {
      overflow: hidden;
    }
  }
}
</style>

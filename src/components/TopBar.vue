<style scoped>
div {
  position: relative;
  opacity: 0.5;
  -webkit-app-region: drag;
  user-select: none;
   /* width: 100%; */
   z-index: 99;

}
.el-menu {

  /*border-top: 3px rgb(255, 0, 0) solid;*/

  background: #fdf4ec;
}
.el-menu li {
  -webkit-app-region: no-drag;
}
li.el-menu-item{
transition: all .5s;
}
.is-active{
  color: #fffdfb !important;
  border-bottom-color: red !important;
  background: red !important;
}
li.el-menu-item:hover{
  color: red !important;
  background: #fdf4ec !important;
  border-bottom-color: red !important;
}
.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 30px;
  line-height: 30px;
}
.closeicon {
  -webkit-app-region: no-drag;
  position: absolute;
  right: 0%;
  top: 0px;
  z-index: 100;
}
.closeicon i {
  cursor: pointer;
  width: 60px;
  height: 25px;
  padding-top: 5px;
  text-align: center;
  color: red;
  transition: all 0.4s;
}
.closeicon i:hover {
  color: rgb(255, 255, 255);
  background: rgb(97, 97, 97);
}
.closeicon i:nth-child(3):hover {
  color: white;
  background: rgb(255, 25, 25);
}
</style>
<template>
<div>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    text-color="#ff2222"
    active-text-color="#2222ff"
  >
    <el-menu-item index="1" @click="backhome"><i class="el-icon-house"></i> 主页</el-menu-item>
    <el-menu-item index="2"  @click="getTopBarFunc('collect')"><i class="el-icon-star-off"></i>我的收藏</el-menu-item>
    <!-- <el-menu-item index="3" @click="$emit('getTopBarfunc','deleted')"><i class="el-icon-delete"></i>回收中心</el-menu-item> -->
    <el-menu-item index="4" @click="getTopBarFunc('download')"><i  class="el-icon-download"></i>下载中心</el-menu-item>
    <el-menu-item index="5"  @click="getmore"><i class="el-icon-loading"></i>加载更多</el-menu-item>
  </el-menu>
  <div class="closeicon">
    <i class="el-icon-minus" @click="minfunc()"></i>
    <i class="el-icon-full-screen" @click="maxfunc()"></i>
    <i class="el-icon-close" @click="closefunc()"></i>
  </div>
  <div class="line"></div>
  <!-- <el-progress  status="exception" :percentage="nowdataslength" :stroke-width="18" :text-inside="true"></el-progress> -->
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  props: { nowdataslength: Number },
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    closefunc () {
      ipcRenderer.send('close')
    },
    maxfunc () {
      ipcRenderer.send('max')
    },
    minfunc () {
      ipcRenderer.send('min')
    },

    // 给元素绑定动画
    animateCSS (element, animationName, callback) {
      const node = document.querySelector(element)
      node.classList.add('animated', animationName)

      function handleAnimationEnd () {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
      }

      node.addEventListener('animationend', handleAnimationEnd)
    },

    // 给group元素绑定动画
    animateGroupCSS (element, animationName, callback) {
      element.classList.add('animated', animationName)

      function handleAnimationEnd () {
        element.classList.remove('animated', animationName)
        element.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
      }

      element.addEventListener('animationend', handleAnimationEnd)
    },

    // topbar 按钮点击事件
    backhome () {
      this.animateCSS('.allpicture', 'bounceInRight')
      this.$store.commit('laycontChange', 24)
      this.$store.commit('folderflagChange', false)
      this.$store.commit('clearallHrefs')
      this.$store.commit('backhome')
      // let imgdoms = document.querySelectorAll('.tImgCard');
      // imgdoms.forEach(e => {
      //   this.animateGroupCSS(e, "bounceInUp");
      // });
    },

    // 我的收藏 collect 点击事件 and 回收中心点击事件
    getTopBarFunc (mainstr) {
      // this.animateCSS(".allpicture", "bounceInRight");
      this.$store.commit('laycontChange', 24)
      this.$store.commit('folderflagChange', false)
      this.$store.commit('clearallHrefs')
      this.$store.commit('filterAllHrefs', mainstr)
    },

    getmore () {
      this.animateCSS('.allpicture', 'bounceInRight')
      this.$store.commit('laycontChange', 24)
      this.$store.commit('folderflagChange', false)
      this.$store.commit('clearallHrefs')
      this.$store.commit('getmoredata')
    }

  }
}
</script>

<style lang="scss" scoped>
#topbar {
  position: relative;
  -webkit-app-region: drag;
  user-select: none;
  /* width: 100%; */
  z-index: 99;
}
$halfred: rgb(255, 125, 125);
.el-menu {
  /*border-top: 3px rgb(255, 0, 0) solid;*/

  background: #fff9f5;
}
.el-menu li {
  -webkit-app-region: no-drag;
}
li.el-menu-item {
  transition: all 0.5s;
}
.is-active {
  color: #fffdfb !important;
  border-bottom-color: $halfred !important;
  background: $halfred !important;
}
li.el-menu-item:hover {
  color: $halfred !important;
  background: #fdf4ec !important;
  border-bottom-color: $halfred !important;
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
  color: $halfred;
  transition: all 0.4s;
}
.closeicon i:hover {
  color: rgb(255, 255, 255);
  background: rgb(97, 97, 97);
}
.closeicon i:nth-child(3):hover {
  color: white;
  background: $halfred;
}
</style>
<template>
  <div id="topbar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#FF7D7D"
      active-text-color="#FF7D7D"
    >
      <el-menu-item index="1" @click="backhome">
        <i class="el-icon-house"></i> 主页
      </el-menu-item>
      <el-menu-item index="2" @click="getTopBarFunc('collect')">
        <i class="el-icon-star-off"></i>我的收藏
      </el-menu-item>
      <!-- <el-menu-item index="3" @click="$emit('getTopBarfunc','deleted')"><i class="el-icon-delete"></i>回收中心</el-menu-item> -->
      <el-menu-item index="4" @click="getTopBarFunc('download')">
        <i class="el-icon-download"></i>下载中心
      </el-menu-item>
      <el-menu-item index="5" @click="getmore">
        <i class="el-icon-light-rain"></i>加载更多
      </el-menu-item>
    </el-menu>
    <div class="closeicon">
      <i class="el-icon-minus" @click="minfunc()"></i>
      <i class="el-icon-full-screen" @click="maxfunc()"></i>
      <i class="el-icon-close" @click="closefunc()"></i>
    </div>
    <div class="line"></div>
    <div class="arrowdownmenu"></div>
    <el-progress
      v-show="$store.state.progressflag"
      status="exception"
      :percentage="$store.state.progressNumber"
      :stroke-width="18"
      :text-inside="true"
    ></el-progress>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
  props: { nowdataslength: Number },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    closefunc() {
      ipcRenderer.send("close");
    },
    maxfunc() {
      ipcRenderer.send("max");
    },
    minfunc() {
      ipcRenderer.send("min");
    },

    // 给元素绑定动画
    animateCSS(element, animationName, callback) {
      const node = document.querySelector(element);
      node.classList.add("animated", animationName);

      function handleAnimationEnd() {
        node.classList.remove("animated", animationName);
        node.removeEventListener("animationend", handleAnimationEnd);

        if (typeof callback === "function") callback();
      }

      node.addEventListener("animationend", handleAnimationEnd);
    },

    // 给group元素绑定动画
    animateGroupCSS(element, animationName, callback) {
      element.classList.add("animated", animationName);

      function handleAnimationEnd() {
        element.classList.remove("animated", animationName);
        element.removeEventListener("animationend", handleAnimationEnd);

        if (typeof callback === "function") callback();
      }

      element.addEventListener("animationend", handleAnimationEnd);
    },

    // topbar 按钮点击事件
    backhome() {
      this.animateCSS(".allpicture", "bounceInRight");
      this.$store.commit("laycontChange", 24);
      this.$store.commit("folderflagChange", false);
      this.$store.commit("clearallHrefs");
      this.$store.commit("backhome");
      // let imgdoms = document.querySelectorAll('.tImgCard');
      // imgdoms.forEach(e => {
      //   this.animateGroupCSS(e, "bounceInUp");
      // });
    },

    // 我的收藏 collect 点击事件 and 回收中心点击事件
    getTopBarFunc(mainstr) {
      // this.animateCSS(".allpicture", "bounceInRight");
      this.$store.commit("laycontChange", 24);
      this.$store.commit("folderflagChange", false);
      this.$store.commit("clearallHrefs");
      this.$store.commit("filterAllHrefs", mainstr);
    },

    getmore() {
      this.animateCSS(".allpicture", "bounceInRight");
      this.$store.commit("laycontChange", 24);
      this.$store.commit("folderflagChange", false);
      if (this.$store.state.newHrefs.length === 0) {
        this.$store.dispatch("actionA").then(() => {
          this.$store.dispatch("actionB").then(() => {
            this.$store.commit("saveFile");
          });
        });
      } else {
        this.$store.state.allHrefs = this.$store.state.newHrefs;
      }
    }
  }
};
</script>

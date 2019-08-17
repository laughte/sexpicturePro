<style lang="scss" scoped>
$halfred: rgb(255, 125, 125);
.showmenu {
  top: 30px;
}
.noshowmenu {
  top: -8px;
}
.filtermenu {
  position: absolute;
  transition: all 0.3s;
  width: 100%;
  z-index: 98;

  .ftmenucontent {
    height: 27px;
    background: rgba(255, 125, 125, 0.7);
    display: flex;
    justify-content: flex-start;
    padding: 3px 0 2px 0;

    p {
      margin: 0;
      margin-left: 15px;
      padding: 2px 5px 0 5px;
      //   padding-top: 3px;
      font-size: 14px;
      letter-spacing: 2px;
      border: 1px solid white;
      color: white;
      cursor: pointer;
      text-align: center;
      vertical-align: baseline;
    }
  }
  i {
    opacity: 0.7;
    margin: 0;
    padding: 0;
    right: 50%;
    font-size: 35px;
    color: $halfred;
    cursor: pointer;
  }
}
.active {
  background-color: yellow;
}
</style>

<template>
  <div :class="showmenuOrno[ftmcflag]" class="filtermenu">
    <div
      class="ftmenucontent animated fadeInDown"
      @mouseover="showfiltermenu"
      @mouseleave="noshowfiltermenu"
    >
    <div :key='i' v-for="(e,i) in $store.state.hreftype">
      <p class="pFilter" @click="filtermenu(e)">{{e.title}}</p>
    </div>
    
    </div>
    <i class="el-icon-arrow-down" @click="ftmcflag = !ftmcflag;"></i>
  </div>
</template>

<script>
let pdom = document.querySelectorAll(".pFilter");
pdom.forEach(e => {
  e.classList.add("active");
});

export default {
  data() {
    return {
      ftmcflag: false,
      showmenuOrno: {
        true: "showmenu",
        false: "noshowmenu"
      }
    };
  },
  methods: {
    showfiltermenu() {
      this.ftmcflag = true;
    },
    noshowfiltermenu() {
      setTimeout(() => {
        this.ftmcflag = false;
      }, 25000);
    },
    filtermenu(e) {
      this.$store.commit("laycontChange", 24);
      this.$store.commit("folderflagChange", false);
      this.$store.commit("clearallHrefs");
      this.$store.commit("filterAllHrefs", e.title);
    }
  }
};
</script>

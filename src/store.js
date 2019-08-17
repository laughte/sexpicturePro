import Vue from 'vue'
import Vuex from 'vuex'
import fs from 'fs'
let dore = require('./jsRequest');
let reqHref = require('./requestHref');

let file = './sexpicturehref.json';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allHrefs: [],
    allhref: [],
    allHrefsTemp: [],
    newHrefs: [],
    progressNumber: 0,
    hreflength: [],
    progressflag: false,
    laycont: null,
    folderflag: false,
    showtopbarflag: true,
    hreftype: [],
    url: {
        "type":"清纯唯美",
        "href":"http://bbsk2048.biz/2048/thread.php?fid-21"
      // "title": "2048核基地",
      // "href": 'http://bbsk2048.biz/2048/thread.php?fid-7.html'
    }
  },
  getters: {

  },
  mutations: {
    getimgsrc(state) {
      // readhref()

      fs.readFile(file, (err, data) => {
        if (err) {
          this.dispatch('actionrequest').then(() => {
            this.dispatch('actionA').then(() => {
              state.allHrefsTemp = state.allHrefs;
              // this.commit('saveFile')
            })
          })

        } else {
          let filedata = JSON.parse(data.toString());
          state.allHrefsTemp = filedata;
          state.allHrefs = state.allHrefsTemp
        }
      })
    },
    clearallHrefs(state) {
      state.allHrefs = []
    },
    backhome(state) {
      state.allHrefs = state.allHrefsTemp
    },
    laycontChange(state, n) {
      state.laycont = n
    },
    folderflagChange(state, f) {
      state.folderflag = f
    },
    topbarflagChange(state, f) {
      state.showtopbarflag = f
    },
    filterAllHrefs(state, f) {
      state.allHrefsTemp.forEach(e => {
        const imgdoms = document.querySelectorAll('.tImgCard');
        if (f === 'collect') {
          // this.animateCSS('.allpicture','bounceInRight');
          imgdoms.forEach(e => {
            animateGroupCSS(e, 'bounceInUp')
          });
          if (e.collect === true) {
            state.allHrefs.unshift(e)
          }
        } else if (f === 'download') {
          // this.animateCSS(".allpicture", "bounceInRight");
          imgdoms.forEach(e => {
            animateGroupCSS(e, 'bounceInUp')
          });
          if (e.download === true) {
            state.allHrefs.unshift(e)
          }
        } else if (f === e.type) {
          state.allHrefs.unshift(e)
        }
      })
    },


    saveFile(state) {
      let data = JSON.stringify(state.allHrefsTemp)
      fs.writeFile(file, data, err => {
        if (err) return window.console.error(err)
        window.console.log('success')
      })
    },
    getrequest(state, resolve) {
      reqHref.requertHref(state, resolve)
    },
    getmoredata(state, resolve) {
      state.allHrefs = [];
      // reqHref.requertHref(state)
      dore.jsRequest(state, resolve)

      // dore.doRequest(state.url.href, state, resolve)

    },
    arrayNoSame(state) {
      let arr = state.allHrefsTemp.push(...state.newHrefs);



      let result = new Set(arr);
      state.allHrefsTemp = [...result]
    }
  },
  actions: {
    actionrequest({
      commit
    }) {
      return new Promise((resolve) => {
        commit('getrequest', resolve)
      })
    },
    actionA({
      commit
    }) {
      return new Promise((resolve) => {
        commit('getmoredata', resolve);
      })
    },
    actionB({
      commit
    }) {
      return new Promise((resolve) => {
        commit('arrayNoSame');
        resolve()
      })
    }

  }
})





// 给group元素绑定动画
function animateGroupCSS(element, animationName, callback) {
  element.classList.add('animated', animationName)

  function handleAnimationEnd() {
    element.classList.remove('animated', animationName)
    element.removeEventListener('animationend', handleAnimationEnd)

    if (typeof callback === 'function') callback()
  }

  element.addEventListener('animationend', handleAnimationEnd)
}
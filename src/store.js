import Vue from 'vue'
import Vuex from 'vuex'
import fs from 'fs'
const user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.2) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13'
const headers = {
  'User-Agent': user_agent
}
const request = require('request')
const cheerio = require('cheerio')
let file = './sexpicturehref.json'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allHrefs: [],
    allHrefsTemp: [],
    newHrefs: [],
    laycont: null,
    folderflag: false,
    showtopbarflag: true
  },
  getters: {

  },
  mutations: {
    getimgsrc (state) {
      fs.readFile(file, (err, data) => {
        if (err) {
          getmoredatas(state)
          state.allHrefsTemp = state.newHrefs
          this.commit('saveFile')
        } else {
          let filedata = JSON.parse(data.toString())
          state.allHrefsTemp = filedata
          state.allHrefs = state.allHrefsTemp
        }
      })
    },
    clearallHrefs (state) {
      state.allHrefs = []
    },
    backhome (state) {
      state.allHrefs = state.allHrefsTemp
      if (state.newHrefs.length !== 0) {
        this.commit('arrayNoSame')
      }
    },
    laycontChange (state, n) {
      state.laycont = n
    },
    folderflagChange (state, f) {
      state.folderflag = f
    },
    topbarflagChange (state, f) {
      state.showtopbarflag = f
    },
    filterAllHrefs (state, f) {
      state.allHrefsTemp.forEach(e => {
        const imgdoms = document.querySelectorAll('.tImgCard')
        if (f === 'collect') {
          // this.animateCSS('.allpicture','bounceInRight');
          imgdoms.forEach(e => {
            animateGroupCSS(e, 'bounceInUp')
          })
          if (e.collect === true) {
            state.allHrefs.unshift(e)
          }
        } else if (f === 'download') {
          // this.animateCSS(".allpicture", "bounceInRight");
          imgdoms.forEach(e => {
            animateGroupCSS(e, 'bounceInUp')
          })
          if (e.download === true) {
            state.allHrefs.unshift(e)
          }
        }
      })
    },
    saveFile (state) {
      let data = JSON.stringify(state.allHrefsTemp)
      fs.writeFile(file, data, err => {
        if (err) return console.error(err)
        console.log('success')
      })
    },
    getmoredata (state) {
      if (state.newHrefs.length === 0) {
        getmoredatas(state)
        // [...new Set(state.allHrefsTemp.concat(state.newHrefs))]
      } else {
        state.allHrefs = state.newHrefs
        // state.allHrefsTemp = Array.from(new Set([...state.allHrefsTemp,...state.newHrefs]))
      }
    },
    arrayNoSame (state) {
      let newArr = state.allHrefsTemp.concat(state.newHrefs)
      state.allHrefsTemp = [...new Set(newArr)]
      this.commit('saveFile')
    }
  }
})

// js爬虫相关
function getmoredatas (state) {
  const url = 'http://jinwandafiji.club/pw/thread.php?fid=14'
  // const url = 'http://t66y.com/thread0806.php?fid=8'
  let opts = {
    url,
    headers
  }
  request(opts, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      let hreflist = []
      let b = /html_data([^<>"\']*)/gi
      let hrefs = body.match(b)
      hrefs.forEach((e, i) => {
        if (i % 2 === 0) {
          let href = 'http://k6.csnjcbnxdnb.xyz/pw/' + e
          // let href = 'http://t66y.com/' + e
          hreflist.unshift(href)
        }
      })
      console.log(hreflist.length)
      if (hreflist.length !== 0) {
        // let alldatalist = []
        hreflist.forEach(e => {
          //   console.log(e);
          let srclist = []
          open_imgUrl(e, data => {
            if (data === null || data === undefined) {
              return false
            } else {
              // 匹配img 的 src 属性
              const $ = cheerio.load(data)
              $('.f14 img').each(function (i, e) {
                srclist[i] = $(this).attr('src')
              })

              let title = $('#subject_tpc').text()
              // 匹配 img 的 title 值
              state.newHrefs.unshift({
                title: title,
                href: srclist,
                star: 0,
                collect: false,
                delete: false,
                download: false
              })
              console.log(title)
            }
          })
        })
      }
    }
  })
  state.allHrefs = state.newHrefs
}

function open_imgUrl (url, callback) {
  let opts = {
    url,
    headers
  }
  // console.log(user_agent)
  request(opts, (err, res, body) => {
    if (err) console.error(err)
    callback(body)
  })
}

// 给group元素绑定动画
function animateGroupCSS (element, animationName, callback) {
  element.classList.add('animated', animationName)

  function handleAnimationEnd () {
    element.classList.remove('animated', animationName)
    element.removeEventListener('animationend', handleAnimationEnd)

    if (typeof callback === 'function') callback()
  }

  element.addEventListener('animationend', handleAnimationEnd)
}

<template>
  <div class="bottom-msg">
    <!-- <el-rate v-model="ratevalue"></el-rate> -->
    <el-button
      type="success"
      size="mini"
      :icon="downiconflag[downtooldata.download]"
      @click.stop.prevent="downLoad(downtooldata)"
      circle
    ></el-button>
    <el-button
      :type="coliconflag[downtooldata.collect]"
      size="mini"
      icon="el-icon-star-off"
      @click.stop.prevent="collectfunc(downtooldata)"
      circle
    ></el-button>
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-thumb"
      @click.stop.prevent="downtooldata.star++"
      circle
    ></el-button>
    <el-button
      type="danger"
      size="mini"
      icon="el-icon-delete"
      @click.stop.prevent="delpicture(downtooldata)"
      circle
    ></el-button>
  </div>
</template>
<script>
import fs from 'fs'
import request from 'request'
export default {
  name: 'downloadtool',
  props: {
    downtooldata: {}
  },
  data () {
    return {
      imgcount: 0,
      downiconflag: { true: 'el-icon-circle-check', false: 'el-icon-download' },
      coliconflag: { true: 'warning', false: 'info' }
    }
  },
  methods: {

    downLoad (e) {
      let path = './images/' + e.title + '/'
      // let imgcount = 0
      fs.mkdir(path, { recursive: true }, err => {
        if (err) {
          return console.error(err)
        } else {
          e.href.forEach((element, i) => {
            let name = i + '.jpeg'
            let writeStream = fs.createWriteStream(path + name)
            request(element).pipe(writeStream)
            // file write finished
            writeStream.on('finish', () => {
              e.star++
              // console.log(this.imgcount)
            })
          })
          e.download = true
          this.$store.commit('saveFile')
        }
      })
    },
    collectfunc (e) {
      e.collect = !e.collect
      this.$store.commit('saveFile')
      // console.log(e.collect)
    },
    delpicture (e) {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          e.delete = true
          this.$store.commit('saveFile')
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })

        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

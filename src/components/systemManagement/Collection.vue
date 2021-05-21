<template>
  <div class="collection">
    <div class="top">
      <HeadTitle params="数据对接情况" />
      <div class="border">
        <el-table
        :data="tableData"
        style="width: 100%"
        show-header
        :header-cell-style="{background:'#E6E9F2',color:'#000' ,fontWeight:'400'}"
        :highlight-current-row="true"
        stripe
      >
        <el-table-column align="center" type="index" width="50"></el-table-column>
        <el-table-column prop='startTime' label="开始时间" align="center"></el-table-column>
        <el-table-column prop='endTime' label="结束时间" align="center"></el-table-column>
        <el-table-column prop='tableNameSource' label="源表" align="center"></el-table-column>
        <el-table-column prop='tableChinanameSource' label="源表中文名" align="center"></el-table-column>
        <el-table-column prop='tableNameTarget' label="目标表" align="center"></el-table-column>
        <el-table-column prop='tableChinanameTarget' label="目标表中文名" align="center"></el-table-column>
        <el-table-column prop='duration' label="耗时" align="center"></el-table-column>
        <el-table-column prop='status' label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status ==='1'">成功</span>
            <span v-if="scope.row.status ==='0'">失败</span>
            <span v-if="scope.row.status ==='2'">运行中</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="res">
              <!-- <div class="alignItemOne" v-if="res.row.status ==='1'">
                <el-button type="text" size="small" class="cour table_cz alignItemOne">
                <img class="img_img" src="../../assets/portraitImg/ClientBehavior/triangle.png" alt="">
                <span class="resetColor">重跑</span>
                </el-button>
              </div>
              <div class="alignItemOne" v-if="res.row.status ==='0'">
                <el-button :loading="loading" type="text" size="small" class="cour table_cz alignItemOne" @click='reset(res)'>
                <img class="img_img" src="../../assets/portraitImg/ClientBehavior/triangle.png" alt="">
                <span class="resetColorA">重跑</span>
                </el-button>
              </div> -->
              <div class="alignItemOne">
                <el-button :loading="loadingList[res.$index]" type="text" size="small" class="cour table_cz alignItemOne" @click='reset(res)' v-if="res.row.status ==='0'">
                <img class="img_img" src="../../assets/portraitImg/ClientBehavior/triangle.png" alt="">
                <span class="resetColorA">重跑</span>
                </el-button>
                <el-button type="text" size="small" class="cour table_cz alignItemOne" v-if="res.row.status ==='1' || res.row.status === '2'">
                <img class="img_img" src="../../assets/portraitImg/ClientBehavior/triangle.png" alt="">
                <span class="resetColor">重跑</span>
                </el-button>
              </div>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import HeadTitle from '../../common/HeadTitle'
import { findLodeData, lodeData } from '../../api/getApi'

export default {
  components: {
    HeadTitle
  },
  data () {
    return {
      tableData: [],
      loadingList: []
      // timer: null
    }
  },
  created () {
    this.getUser()
    this.query()
    let timer = setInterval(() => {
      findLodeData({}).then((res) => {
        this.tableData = res.data.data.list
      })
    }, 30000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
      timer = null
    })
  },
  // beforeDestroy () {
  //   clearInterval(this.timer)
  //   this.timer = null
  // },
  methods: {
    query () {
      const loadingList = []
      findLodeData({}).then((res) => {
        this.tableData = res.data.data.list
        for (let i = 0; i < res.data.data.list; i++) {
          loadingList.push(false)
        }
        this.loadingList = loadingList
      })
    },
    reset (e) {
      const loadingList = this.loadingList.slice(0)
      loadingList[e.$index] = true
      this.loadingList = loadingList
      lodeData(e.row).then((e) => {
        this.query()
      })
    }
    // getUser () {
    //   this.user = []
    //   findUserRe().then((res) => {
    //     console.log(res.data.data)
    //     for (let i = 0; i < res.data.data.length; i++) {
    //       if (res.data.data[i].resName === '系统管理') {
    //         for (let j = 0; j < res.data.data[i].children.length; j++) {
    //           if (res.data.data[i].children[j].resName === '数据补录') {
    //             console.log('xtgl')
    //             this.user = res.data.data[i].children[j].prmsIdentity
    //           }
    //         }
    //       }
    //     }
    //     console.log(this.user)
    //   })
    // }
  }
}
</script>

<style lang='less' scoped>
// span{
//   display: flex!important;
//   align-items: center!important;
//   flex-direction: row-reverse!important;
// }
.resetColor{
  color: #d7d7d7 !important;
}
.resetColorA{
  color:#33aed3 !important;
}
.collection{
  margin: 20px 15px 0 15px;
  width: 98%;
  height: 100%;
}
.alignItemOne{
  display: flex;
  align-items: center;
}
// .alignItemOne {
//   img{
//     padding-left: 10px;
//   }
// }
// .alignItemOne{
//   span{
//     cursor: pointer;
//   }
// }
.table_cz{
  margin-left: 24px;
}
.img_img{
  margin-right: 8px;
}
.top{
  background-color: #fff;
}
/deep/ .el-button span{
  display: flex;
  align-items: center;
}
.border{
  padding: 0 20px 20px;
}
</style>

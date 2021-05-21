<template>
  <div class="head">
    <HeadTitle params="渠道隐藏" />
    <div class="hide">
      <el-checkbox-group v-model="checkedCities">
        <el-checkbox class="checkBox" v-for="(item, index) in data" :label="index" :value='index' :key="index">{{item.sales_channename}}</el-checkbox>
      </el-checkbox-group>
      <el-button @click="submit">确定</el-button>
    </div>
  </div>
</template>

<script>
import HeadTitle from '../../common/HeadTitle'
import { findChannelAll, updateChannel } from '../../api/nameList'

export default {
  components: {
    HeadTitle
  },
  data () {
    return {
      data: [],
      checkedCities: []
    }
  },
  created () {
    findChannelAll().then((res) => {
      const arr = []
      for (let i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].status === '0') {
          arr.push(i)
        }
      }
      console.log(arr)
      this.checkedCities = arr
      this.data = res.data.data
    })
  },
  mounted () {
  },
  methods: {
    submit () {
      console.log(this.data)
      console.log(this.checkedCities)
      const arr = []
      for (let i = 0; i < this.checkedCities.length; i++) {
        arr.push(this.data[this.checkedCities[i]].sales_channelcode)
      }
      updateChannel('channelCodeList=' + arr).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.$message.success('修改成功')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.head{
  margin: 20px 0 0 15px;
  background: white;
}
.hide{
  width: 100%;
  background: white;
  padding: 20px 40px;
}
.checkBox{
  width: 150px;
  margin-bottom: 20px;
}
/deep/.el-button{
  background-color: #02a4ff;
  color: #fff;
  width: 90px;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 1px 16px;
  justify-content: center;
}
</style>

<template>
  <div id='factor'>
    <el-row>
      <el-form :gutter="24" label-width="80px" class="form" ref='factorRules' :v-model="$store.state.strategy.sitConditions[num].sitConditionFactors[params]">
        <el-col :span="24" v-if="$store.state.strategy.sitConditions[num].sitConditionFactors[params].name.length > 12">
          <el-form-item label="因子：" >
            <!-- <span>{{ $store.state.strategy.sitConditions[num].sitConditionFactors[params].name }}</span> -->
            <el-tooltip class="item" effect="light" :content="$store.state.strategy.sitConditions[num].sitConditionFactors[params].name" placement="top-start">
              <span class="cardValue">{{ $store.state.strategy.sitConditions[num].sitConditionFactors[params].name }}</span>
            </el-tooltip>
          </el-form-item>
          <!-- <el-popover
            class="card"
            placement="top-end"
            width="150"
            trigger="hover"
            content= this.$store.state.strategy.sitConditions[num].sitConditionFactors[params].name>
          </el-popover> -->
        </el-col>
        <el-col :span="24" v-else>
          <el-form-item label="因子：" >
            <span>{{ $store.state.strategy.sitConditions[num].sitConditionFactors[params].name }}</span>
          </el-form-item>
          <!-- <el-popover
            class="card"
            placement="top-end"
            width="150"
            trigger="hover"
            content= this.$store.state.strategy.sitConditions[num].sitConditionFactors[params].name>
          </el-popover> -->
        </el-col>
        <el-col :span="24">
          <!-- {{ $store.state.strategy.sitConditions[num].sitConditionFactors[params].tagValueType }} -->
          <el-form-item label="运算符：" prop='sitOperator'>
            <!-- 数值型 日期型 -->
            <el-select
              :disabled='typeParams'
              v-model="$store.state.strategy.sitConditions[num].sitConditionFactors[params].sitOperator"
              v-if="$store.state.strategy.sitConditions[num].sitConditionFactors[params].tagValueType === '1' || $store.state.strategy.sitConditions[num].sitConditionFactors[params].tagValueType === '3'">
              <el-option label="大于" value=">"></el-option>
              <el-option label="大于等于" value=">="></el-option>
              <el-option label="等于" value="="></el-option>
              <el-option label="小于" value="<"></el-option>
              <el-option label="小于等于" value="<="></el-option>
            </el-select>
            <!-- 文本型 -->
            <el-select
              :disabled='typeParams'
              v-model="$store.state.strategy.sitConditions[num].sitConditionFactors[params].sitOperator"
              v-if="$store.state.strategy.sitConditions[num].sitConditionFactors[params].tagValueType === '4'">
              <el-option label="包含" value="contain"></el-option>
              <el-option label="等于" value="equa"></el-option>
            </el-select>
            <!-- 枚举型 -->
            <!-- <el-select v-model="$store.state.strategy.sitConditions[num].sitConditionFactors[params].sitOperator" v-if="$store.state.strategy.sitConditions[num].sitConditionFactors[params].tagValueType === '2'"> -->
              <!-- <el-option label="属于"></el-option> -->
              <el-input readonly v-if="$store.state.strategy.sitConditions[num].sitConditionFactors[params].tagValueType === '2'" value="属于" ></el-input>
            <!-- </el-select> -->
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="值" prop="tagValue">
            <!-- 数值型 文本型 -->
            <el-input
              :readonly='typeParams'
              v-if="$store.state.strategy.sitConditions[num].sitConditionFactors[params].tagValueType === '1' || $store.state.strategy.sitConditions[num].sitConditionFactors[params].tagValueType === '4'"
              v-model="$store.state.strategy.sitConditions[num].sitConditionFactors[params].tagValue" />
            <!-- <el-input
              :readonly='typeParams'
              v-if="$store.state.strategy.sitConditions[num].sitConditionFactors[params].tagValueType === '4'"
              v-model="$store.state.strategy.sitConditions[num].sitConditionFactors[params].tagValue" />
            <el-input
              :readonly='typeParams'
              v-if="$store.state.strategy.sitConditions[num].sitConditionFactors[params].tagValueType === '1'"
              v-model="$store.state.strategy.sitConditions[num].sitConditionFactors[params].tagValue">
              <el-select slot="prepend" v-model="abc">
                <el-option label="数值" value="1"></el-option>
                <el-option label="标签" value="2"></el-option>
              </el-select>
            </el-input> -->
              <!-- 日期型 -->
            <el-date-picker
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd" v-if="$store.state.strategy.sitConditions[num].sitConditionFactors[params].tagValueType === '3'"
              v-model="$store.state.strategy.sitConditions[num].sitConditionFactors[params].tagValue" />
              <!-- 枚举型 -->
              <el-select filterable multiple v-model="$store.state.strategy.sitConditions[num].sitConditionFactors[params].tagEnumValues" v-if="$store.state.strategy.sitConditions[num].sitConditionFactors[params].tagValueType === '2'">
                <el-option v-for="(item, index) in $store.state.strategy.sitConditions[num].sitConditionFactors[params].enumerateData" :key="index" :value='item' :label="item"></el-option>
              </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <span class="cha cursor" @click="deleteOne()"  v-if="typeParams!=='readonly'" style='fontSize: 24px;'>×</span>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'asd',
  props: ['params', 'num', 'typeParams'],
  components: {
  },
  data () {
    return {
      abc: '',
      factorRules: {
        sitOperator: { required: true, message: '请选择运算符', trigger: 'blur' },
        tagValue: { required: true, message: '请输入值', trigger: 'blur' }
      }
    }
  },
  created () {
  },
  watch: {
  },
  methods: {
    deleteOne () {
      console.log(this.num, this.params)
      console.log(this.$store.state.strategy.sitConditions[this.num].sitConditionFactors[this.params])
      this.$store.state.strategy.sitConditions[this.num].sitConditionFactors.splice(this.params, 1)
    }
  }
}
</script>
<style>
.el-select__tags {
  flex-wrap: nowrap !important;
  overflow: hidden;
}
</style>
<style scoped lang="less">
/deep/ .factors{
  width: 81%!important;
}
.factor{
  width: 260px;
  height: 160px;
  position: relative;
  padding: 0!important;
  padding-right: 10px!important;
}
.cha{
  position: absolute;
  top: 0;
  right: 0;
}
.cursor{
  cursor: pointer;
}
/deep/ .el-form-item__content{
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
}
</style>

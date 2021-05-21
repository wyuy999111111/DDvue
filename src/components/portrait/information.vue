<template>
  <div class="information" id="information">
    <div class="informationLeft">
      <div class="informationCard_one">
        <div class="cardSign info" id="personalInfo"><p>个人信息</p></div>
        <div class="info_one">
          <div class="card">
          <span class="cardKey">姓名：</span>
          <span class="cardValue">{{ $store.state.salesTagMemberDto ? $store.state.salesTagMemberDto.sales_name : '456' }}</span>
          </div>
          <div class="card">
          <span class="cardKey">年龄：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.age }}</span>
          </div>
          <div class="card">
          <span class="cardKey">性别：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.sales_sex }}</span>
          </div>
          <div class="card">
          <span class="cardKey">学历：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.education }}</span>
          </div>
          <div class="card">
          <span class="cardKey">入职时间：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.employ_date }}</span>
          </div>
          <div class="card">
          <span class="cardKey">转销时间：</span
          ><span class="cardValue">{{ $store.state.salesPortrayDto.change_sales_date }}</span>
          </div>
        </div>
      </div>
      <div class="informationCard_two">
        <div class="cardSign_two">
          <div class="cardSignA">
            <div class="leftOrange_two ">
              <div class="yi"></div>
              <p>职业信息</p>
            </div>
            <div class="occupation_two">
              <img src="../../assets/portraitImg/newAddimg/inJob.png" alt="" v-if="$store.state.salesTagMemberDto.sales_status === '在职'">
              <img src="../../assets/portraitImg/newAddimg/probation.png" alt="" v-else-if="$store.state.salesTagMemberDto.sales_status === '试用期'">
              <img src="../../assets/portraitImg/newAddimg/dimission.png" alt="" v-else>
            </div>
          </div>
        </div>
        <div class="info_two">
          <div class="card">
          <span class="cardKey">二级机构：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.sales_comname2 }}</span>
          </div>
          <div class="card" v-if="$store.state.salesTagMemberDto.sales_comname3.length <= 8">
          <span class="cardKey">三级机构：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.sales_comname3 }}</span>
          </div>
          <div class="card" v-if="$store.state.salesTagMemberDto.sales_comname3.length > 8">
            <span class="cardKey">三级机构：</span>
            <el-tooltip class="item" effect="light" :content="$store.state.salesTagMemberDto.sales_comname3" placement="top-start">
              <span class="cardValue">{{ $store.state.salesTagMemberDto.sales_comname3 }}</span>
            </el-tooltip>
          </div>
          <el-popover
            class="card"
            placement="top-start"
            width="200"
            trigger="hover"
            content= this.$store.state.salesTagMemberDto.sales_comname3>
          </el-popover>
          <div class="card">
          <span class="cardKey">渠道：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.sales_channename }}</span>
          </div>
          <div class="card">
          <span class="cardKey">职级：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.actual_rank }}</span>
          </div>
          <div class="card">
          <span class="cardKey">职务：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.duty }}</span>
          </div>
          <div class="card">
          <span class="cardKey">司龄：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.seniority }}年</span>
          </div>
          <div class="card">
          <span class="cardKey">地区/县城：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.area }}</span>
          </div>
          <div class="card">
          <span class="cardKey">从业经验：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.working_experience }}</span>
          </div>
          <div class="card">
          <span class="cardKey">用工关系：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.employ_type }}</span>
          </div>
        </div>
      </div>
      <div class="informationCard_three">
          <!-- <div class="hg_img">
            <img src="../../assets/portraitImg/newAddimg/qualified.png" alt="" v-if="$store.state.salesTagMemberDto.asmt_status === '正常考核'">
            <img src="../../assets/portraitImg/newAddimg/disqualification.png" alt="" v-else >
          </div> -->
          <div class="cardSign_three">
              <div class="leftOrange_three">
                <div class="cool">
                  <div class="yii"></div><p>考核状态</p>
                </div>
              </div>
          </div>
          <div class="info_three">
          <!-- <div class="card">
          <span class="cardKey">考核状态：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.asmt_status }}</span>
          </div> -->
          <div class="card">
          <span class="cardKey">是否保护期：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.is_protect }}</span>
          </div>
          <div class="card">
          <span class="cardKey">定级判断：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.grade_judge }}</span>
          </div>
          <div class="card">
          <span class="cardKey">级差：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.grade_gap }}</span>
          </div>
          <div class="card">
          <span class="cardKey">定级保费：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.grade_prm }}</span>
          </div>
          <div class="card">
          <span class="cardKey">国家薪酬标准类型：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.fixed_salary_type }}</span>
          </div>
          <div class="card">
          <span class="cardKey">定级保费类型：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.grade_prm_type }}</span>
          </div>
          <div class="card">
          <span class="cardKey">标准职级：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.std_rank }}</span>
          </div>
          <div class="card">
          <span class="cardKey">实际职级：</span
          ><span class="cardValue">{{ $store.state.salesTagMemberDto.rank }}</span>
        </div>
          </div>
      </div>
    </div>
    <div class="informationRight">
      <div class="flex topOne">
        <div :class="$store.state.salesTagMemberDto.sales_sex == '男' ? 'peopleB' : 'peopleG'">
          <div class="wgOut" ref="myChart" ></div>
          <!-- style="width:300px; height:300px;" -->
          <!-- <img src="../../assets/portraitImg/newAddimg/男_1.png" alt="" v-if="$store.state.salesTagMemberDto.sales_sex == '男'" />
          <img src="../../assets/portraitImg/newAddimg/女_1.png" alt="" v-else/> -->
        </div>
        <div class="peopleRight">
          <div class="topOneR">
            <div class="course"><p>成长历程</p></div>
            <div class="lineChart" ref="discountChart" v-if="$store.state.salesTagMemberDto.seniority >= 0.25">
              <!-- <lineChart :params="paramsLine" v-if="$store.state.salesTagMemberDto.seniority >= 0.25" />{{ 111111 }} -->
            </div>
            <div class="grouptype">
              <img src="../../assets/portraitImg/newAddimg/dabiao.png" alt="" v-if="$store.state.salesPortrayDto.achimt_growth_type === '达标'"/>
              <img src="../../assets/portraitImg/newAddimg/feiyue.png" alt="" v-else-if="$store.state.salesPortrayDto.achimt_growth_type === '飞跃成长型'" />
              <img src="../../assets/portraitImg/newAddimg/pingwen.png" alt="" v-else-if="$store.state.salesPortrayDto.achimt_growth_type === '平稳型'" />
              <img src="../../assets/portraitImg/newAddimg/shuaitui.png" alt="" v-else-if="$store.state.salesPortrayDto.achimt_growth_type === '缓慢衰退型'" />
              <img src="../../assets/portraitImg/newAddimg/sushuai.png" alt="" v-else-if="$store.state.salesPortrayDto.achimt_growth_type === '快速衰退型'" />
              <img src="../../assets/portraitImg/newAddimg/wenjian.png" alt="" v-else-if="$store.state.salesPortrayDto.achimt_growth_type === '稳健成长型'" />
              <img src="../../assets/portraitImg/newAddimg/yucheng.png" alt="" v-else-if="$store.state.salesPortrayDto.achimt_growth_type === '育成'" />
              <img src="../../assets/portraitImg/newAddimg/Tobebred.png" alt="" v-else-if="$store.state.salesPortrayDto.achimt_growth_type === '待育成'" />
              <img src="../../assets/portraitImg/newAddimg/low.png" alt="" v-else-if="$store.state.salesPortrayDto.achimt_growth_type === '低产能'" />
              <img src="../../assets/portraitImg/newAddimg/unknow.png" alt="" v-else />
              <p>{{ $store.state.salesPortrayDto.achimt_growth_type }}</p>
            </div>
          </div>
          <div class="courseTwo">
            <img src="../../assets/portraitImg/IMG/course.png" alt="">
          </div>
          <div class="topOneBody">
            <!-- 柱状图 -->
            <div class="axisOut"><div class="text"><p>月考核趋势图</p></div><div class="columnEchart" ref="columnEchart" ></div></div>
          </div>
        </div>
        <!-- <div class="peopleBefore">
          <div class="flex">
          </div>
          <div class="spaceBetween">
          </div>
        </div> -->
      </div>
      <div class="topB">
        <div class="wing">
          <img src="../../assets/portraitImg/IMG/wing.png" alt="">
        </div>
        <div class="topT">
          <div class="flex topFooter">
            <div class="numDiv">
              <div class="numLog">实收保费</div>
              <p>{{ $store.state.salesPortrayDto.dy_tot_prm | fixNumber}}元</p>
            </div>
            <div class="numDiv appraise">
              <div class="numLog">考核保费</div>
              <!-- <p>{{ $store.state.salesPortrayDto.dy_jbf_prm }}元</p> -->
              <p>{{ $store.state.salesPortrayDto.dy_jbf_prm | fixNumber }}元</p>
            </div>
            <div class="numDiv appraise">
              <div class="numLog">缺口保费</div>
              <p>{{ $store.state.salesPortrayDto.dy_jbf_prm_gap | fixNumber }}元</p>
            </div>
          </div>
          <div class="numFooter">
            <div class="num_a">
            <el-progress
              stroke-width='10'
              :width=prowidth
              type="circle"
              :percentage="$store.state.salesPortrayDto.dy_fmcar_renew_ratio"
              color="#917BFF"
            >
            </el-progress>
            <p>续保率</p>
          </div>
          <div class="num_b">
            <el-progress
              stroke-width='10'
              :width=prowidth
              type="circle"
              :percentage="$store.state.salesPortrayDto.dy_acti_ratio"
              color="#917BFF"
            ></el-progress>
            <p>月活率</p>
          </div>
          <div class="num_c">
            <el-progress
              stroke-width='10'
              :width=prowidth
              type="circle"
              :percentage="$store.state.salesPortrayDto.dy_onlinebind_ratio"
              color="#917BFF"
            ></el-progress>
            <p>线上化绑定率</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
// import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
// import lineChart from '../charts/lineChart'
// import '../../utils/rem'
// import axisChart from '../charts/axisChart'
Vue.prototype.$echarts = echarts

export default {
  name: 'information',
  // components: {
  //   lineChart
  // },
  data () {
    return {
      prowidth: 149,
      pic1: '',
      pic2: '',
      pic3: '',
      returnList: '',
      symbol1: '',
      symbol2: '',
      symbol3: '',
      symbol4: '',
      symbol5: '',
      symbol6: '',
      symbol7: '',
      symbol8: '',
      symbol9: '',
      // 销售员信息
      personalInfo: {
        sales_name: '', // 姓名
        sales_code: '', // 工号
        age: '',
        sales_sex: '',
        actual_rank: '', // 职级
        area: '', // 区域市县
        asmt_status: '', // 考核状态
        dimission_date: '', // 离职时间
        duty: '', // 职务
        education: '', // 学历
        employ_date: '', // 入职时间
        employ_type: '', // 用工关系
        fixed_salary_type: '', // 固定薪酬标准类型
        grade_gap: '', // 级差
        grade_judge: '', // 定级判断
        grade_prm: '', // 定级保费
        grade_prm_type: '', // 保费类型
        is_cha_channel: '', // 最近一年是否转渠道
        is_protect: '', // 是否保护期
        rank: '', // 职级
        sales_channename: '', // 所属渠道
        sales_comcode: '', // 归属机构
        seniority_type: '', // 司龄
        std_rank: '', // 标准职级
        working_experience: '' // 工作经验
      },
      // 图表数据
      salesPortrayDto: {
        sales_code: '', // 业务员名称
        sales_comcode: '', // 归属机构
        sales_comcode1: '', // 归属一级机构
        sales_comcode2: '', // 归属二级机构
        sales_comcode3: '', // 归属三级机构
        sales_channelcode: '', // 所属渠道
        last1y_tot_prm: '', // 最近1年内总保费收入（非年化）2020
        last2y_tot_prm: '', // 最近1-2年总保费收入（非年化）相减2019
        last3y_tot_prm: '', // 最近2-3年总保费收入（非年化）再减2018
        last1m_tot_prm: '', // 最近1月内总保费收入
        last2m_tot_prm: '', // 最近1-2月总保费收入
        last3m_tot_prm: '', // 最近2-3月总保费收入
        ast1_tot_prms: '', // 当年(月)的
        last2_tot_prms: '', // 上年(月)的
        last3_tot_prms: '', // 上上年（月）的
        X_data: [], // 保费x轴数据
        achimt_growth_type: '', // 业绩成长类型
        dy_fmcar_renew_ratio_caps: '', // 当年累计续保率（家用车）能力分
        dy_paidrate_caps: '', // 当年满期赔付率能力分
        dy_custacti_ratio_caps: '', // 当年客户活跃率能力分
        dy_bills_ratio_caps: '', // 当年开单率能力分
        capacity_caps: '', // 产能能力分
        dy_tot_prm: '', // 当年实收保费
        dy_jbf_prm: '', // 当年基本法考核保费
        dy_jbf_prm_gap: '', // 基本法当年累计考核保费缺口
        dy_acti_ratio: '', // 当年月活率
        dy_onlinebind_ratio: '', // 当年线上化绑定率
        dy_cpr: '', // 当年CPR
        dy_paidrate: '', // 当年满期赔付率
        kpi_target: '', // KPI的指标待定
        dy_car_prm: '', // 当年车险保费收入
        dy_car_prm0: '', // 当年车险保费收入占比
        dy_prop_prm: '', // 当年财产险保费收入
        dy_prop_prm0: '', // 当年财产险保费收入占比
        dy_e_prm: '', // 当年意外险保费收入
        dy_e_prm0: '', // 当年意外险保费收入占比
        dy_jk_prm: '', // 当年健康险保费收入
        dy_jk_prm0: '', // 当年健康险保费收入占比
        dy_car_polnum: '', // 当年车险出单数
        dy_prop_polnum: '', // 当年财产险出单数
        dy_e_polnum: '', // 当年意外险出单数
        dy_jk_polnum: '', // 当年健康险出单数
        dy_biz_hc_prm: '', // 当年营业货车保费收入
        dy_nonbiz_hc_prm: '', // 当年非营业货车保费收入
        dy_biz_kc_prm: '', // 当年营业客车保费收入
        dy_nonbiz_kc_prm: '', // 当年非营业客车保费收入
        dy_cerv_prm: '', // 当年特种车保费收入
        dy_fmcar_prm: '', // 当年家庭自用车保费收入
        dy_fmcar_newcar_prm: '', // 当年家庭自用车（新车）保费收入
        dy_fmcar_newcar_prm0: '', // 当年家庭自用车（新车）保费收入占比
        dy_fmcar_newcar_prm2: '', // 当年家庭自用车（非新车）保费收入
        dy_fmcar_newcar_prm20: '', // 当年家庭自用车（非新车）保费收入占比
        dy_fmcar_dj_prm: '', // 当年家庭自用车（单交强）保费收入
        dy_fmcar_dj_prm0: '', // 当年家庭自用车（单交强）保费收入占比
        dy_fmcar_dj_prm2: '', // 当年家庭自用车（非单交强）保费收入
        dy_fmcar_dj_prm20: '', // 当年家庭自用车（非单交强）保费收入占比
        dy_nocar_top10_pro_prm: '', // 当年大非车（财意健）保费收入top10的产品保费收入
        dy_nocar_top10_pro_prm_name: '', // 当年大非车（财意健）保费收入top10的产品名称
        dy_nocar_top10_pro_prm_money: '', // 当年大非车（财意健）保费收入top10的产品保费
        months: '', // 存放横坐标月份
        datas: '', // 存放宗坐标数据
        dy_nocar_top10_pro_polnum: '', // 当年大非车（财意健）保费收入top10的产品出单数
        dy_pers_prm: '', // 当年个人业务保费收入
        dy_org_prm: '', // 当年团体业务保费收入
        dy_legal_prm: '', // 当年法人业务保费收入
        dy_unlegal_prm: '', // 当年非法人业务保费收入
        cust_num: '', // 累计客户数
        dy_newcust_num: '', // 当年新增客户数
        undinsur_cust_num: '', // 当前在保客户数
        offinsur_cust_num: '', // 当前脱保客户数
        cust_avg_polinum: '', // 客均保单数
        bind_wx_cust_num: '', // 绑定官微客户数
        reg_ca_cust_num: '', // 注册超A客户数
        male_cust_num: '', // 累计男性客户数
        famale_cust_num: '', // 累计女性客户数
        agelt25_cust_num: '', // 25岁以下客户数量
        age25to35_cust_num: '', // 25（含）-35岁客户数量
        age35to45_cust_num: '', // 35（含）-45岁客户数量
        age45to55_cust_num: '', // 45（含）-55岁客户数量
        agegt55_cust_num: '', // 55（含）岁以上客户数量
        dy_fmcar_renew_ratio: '', // 当年累计续保率（家用车）
        dm_fmcar_renew_ratio: '', // 当月续保率（家用车）
        nm_fmcar_renew_ratio: '', // 下月续保率（家用车）
        dy_fmcar_ahead_renew_prd: '', // 当年提前续保周期（家用车）
        dy_fmcar_renew_avg_quotn_num: '', // 当年已续保保单平均报价次数（家用车）
        dy_fmcar_unrenew_avg_quotn_num: '', // 当年未续保保单平均报价次数（家用车）
        dm_fmcar_renew_1stquotn_ratio: '', // 当月续保保单的首报率（家用车）
        dm_fmcar_renew_2ndquotn_ratio: '', // 当月续保保单的二报率（家用车）
        dm_fmcar_renew_3rdquotn_ratio: '', // 当月续保保单的三报率（家用车）
        dy_fmcar_1stquotn_ratio: '', // 当年累计首报率（家用车）
        dy_fmcar_2ndquotn_ratio: '', // 当年累计二报率（家用车）
        dy_fmcar_3rdquotn_ratio: '', // 当年累计三报率（家用车）
        dy_fmcar_quotnsuc_ration: '', // 当年车险报价成功率（家用车）
        dy_applogin_num: '', // 当年大地行APP登录次数
        dy_rig_remind_num: '', // 当年权益到期转发次数
        dy_birth_wish_num: '', // 当年生日券转发次数
        dy_issue_warn_num: '', // 当年出险提醒点击关注次数
        dy_vio_query_num: '', // 当年查违章次数
        dy_assist_report_num: '', // 当年协助报案次数
        dy_claim_query_num: '', // 当年理赔查询次数
        dy_invite_reg_num: '', // 当年邀请注册次数
        dy_car_appissue_num: '', // 当年APP车险出单数
        low_cust_num: '', // 低端车客户数
        common_cust_num: '', // 普通车客户数
        middle_cust_num: '', // 中端车客户数
        high_cust_num: '', // 高端车客户数
        gls_cust_num: '', // 豪华车客户数
        high_bq_cust_num: '', // 高保全度客户数
        middle_bq_cust_num: '', // 中保全度客户数
        low_bq_cust_num: '', // 低保全度客户数
        data_date: '', // 数据日期
        etl_date: '' // etl日期
      },
      progressIn: '80%',
      // axisParams: {
      // },
      // paramsLine: {
      //   title: '保费',
      //   xData: '',
      //   yData: ['0', '20', '40', '60', '80', '100'],
      //   textColor: '#6C9BCF',
      //   lineColor: '#2DE93D',
      //   data: '',
      //   yName: '保费',
      //   company: ''
      // },
      name3: false,
      // khbf: ''
      GetWindowInfo: {
        width: ''
      },
      radarSize: 110,
      xSize: 18
    }
  },
  created () {
    window.addEventListener('resize', this.GetWindowInfo)
    this.GetWindow()
  },
  mounted () {
    // this.abc()
    this.drawLine()
    this.drow()
    this.drowLine()
    this.resizeEcharts = () => {
      this.$echarts.init(document.getElementById('chartmainbar3')).resize()
    }
    window.addEventListener('resize', this.resizeEcharts)
    // this.$nextTick(() => {
    //   window.addEventListener('resize', this.GetWindowInfo)
    // })
  },
  watch: {
    '$store.state.salesPortrayDto' () {
      setTimeout(() => {
        // this.paramsLine = {
        //   title: '保费',
        //   xData: this.$store.state.salesPortrayDto.x_data,
        //   yData: ['0', '20', '40', '60', '80', '100'],
        //   textColor: '#6C9BCF',
        //   lineColor: '#2DE93D',
        //   data: this.$store.state.salesPortrayDto.y_data,
        //   yName: '保费',
        //   company: ''
        // }
        this.drawLine()
        this.drow()
        this.drowLine()
      }, 1000)
      this.drawLine()
      this.drow()
      this.drowLine()
    }
  },
  methods: {
    GetWindow () {
      this.GetWindowInfo.width = window.outerWidth
      console.log(this.GetWindowInfo.width)
      if (this.GetWindowInfo.width === 1366) {
        this.prowidth = 99
        this.radarSize = 65
        this.xSize = 14
      }
      if (this.GetWindowInfo.width === 1600) {
        this.prowidth = 119
        this.radarSize = 85
        this.xSize = 16
      }
      if (this.GetWindowInfo.width === 1920) {
        this.prowidth = 149
        this.radarSize = 110
        this.xSize = 18
      }
    },
    enter () {
      this.name3 = true
    },
    leave () {
      this.name3 = false
    },
    drowLine () {
      var asd = this.$refs.discountChart
      const myChart = this.$echarts.init(asd)
      const option = {
        tooltip: {
          show: true,
          // trigger: 'axis'
          formatter: '{b}: {c}元'
        },
        xAxis: {
          name: '保费',
          type: 'category',
          data: this.$store.state.salesPortrayDto.x_data,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#1e1e1e',
              fontSize: this.xSize
            }
          },
          axisLine: {
            lineStyle: {
              color: '#1e1e1e'
            },
            show: false
          },
          axisTick: { // y轴刻度线
            show: false
          // },
          // axisLine: { // y轴
          //   show: false
          }
        },
        grid: {
          left: 85,
          top: '20%',
          bottom: '25%'
        },
        yAxis: {
          name: '保费',
          type: 'value',
          splitLine: {
            show: true
          },
          axisLabel: {
            show: true,
            // formatter: `{value} ${_this.params.company}`,
            // formatter: (a) => {
            //   console.log(a)
            //   return (a) => {
            //     if (a >= 10000) {
            //       var str = (a / 10000) + ''
            //       var head = str.split('.')[0]
            //       var tail = str.split('.')[1].slice(0, 2)
            //       var reg = /\d(?=(\d{3})+$)/g
            //       head = head.replace(reg, (content) => {
            //         return content + ','
            //       })
            //       return head + '.' + tail + '万'
            //     } else {
            //       return a
            //     }
            //   }
            // },
            textStyle: {
              color: '#aaa',
              fontSize: 14
            }
          },
          axisLine: {
            lineStyle: {
              color: '#000'
            },
            show: false
          },
          axisTick: { // y轴刻度线
            show: false
          // },
          // axisLine: { // y轴
          //   show: false
          }
        },
        series: [{
          data: this.$store.state.salesPortrayDto.y_data,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#2FEC38', // 改变折线点的颜色
              lineStyle: {
                color: '#2FEC38' // 改变折线颜色
              }
            }
          }
        }]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drow () {
      var column = this.$refs.columnEchart
      const myChart = this.$echarts.init(column)
      var pathSymbols = {
        defend: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAdCAYAAACuc5z4AAAACXBIWXMAAAsSAAALEgHS3X78AAACgElEQVRIiaWWzWsTQRjGn4btIdK0EUFDUVvbUg8emoOeFMye3IPBCt4bz17qf5DSk7devOtdsLIH14ubQsGLYHrIIdBq/aBERTRNaYQUIs84k25mZ3eT9oFlNzP7/vaZdz7ejHS7XcSp6PlZAHmtueo69p+4uEhw0fNLAJYBLETEbgFYcx372UDgoufT3TqAqdihHOszgJLr2JVgY8rg8sMQUMh3fRkbdlz0/EUAL4cAmvRQpUaAi54/zQkBMHFKcJMT7Tr2riUbyiaoc2kSF9JpvPm2h/y5s0bSdrOF7f2W+kkGHRdG7r5+S7efTEGrN/Ii8Hu7jaX5WWw2fvT1z01kRP/TWl0PvULHiybo2KiFufEMntd3BOCg0wkBHl27GpWSEsEFUw/TQBiHSTCVO5OOAukqEJw19dzMnddGMIrV6wvizg+qNj09UtME39ZbH8xcxphl9X5Xf/3GQa0uIBz+zn4L3tc9kaoITXHyqvq2vSXdLs3PiBVx5+Jkn3PlWInvvPj4pa+NtkKHCZ2pfNLZZuOneKbbXACm2vUPAdiw5MYIpUPpoHMkLqaHgOphWyw/NQe6U6ldnhUVI7E3dEs4nR3P4Em1Jh0eiWemiGvdkOtKynXsdXlCGcWNQbiCKjUO23j87r24a2ryvFBTv6wfQBx2o/03tCmYBjpWzg27jqy+043O78WlZQBtuI4tNlzwPC7JqnBSbQWPhx5Y1jB+7dVJnDI2WAeNNU9Wg/IAlYSTXjbVvdgqnVBV7ssVZVQqqgP/08PAFUPXShwUSWAJL2vrnOVnLSkuESxVDj4n/VkZGCwnh055Gf+g6Do+dJNFYHYQt8OCmVdjtQkJwD9Fmw9N/KkZMwAAAABJRU5ErkJggg==', // bao
        fall: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAcCAYAAACK7SRjAAAACXBIWXMAAAsSAAALEgHS3X78AAACTklEQVRIiaVVPU8bQRB9QVZMg2zJBUmFK0IBAkSBqKBLgxTxC9Y/wd2VgY6roKXKXZkGmTJKQVwRmsRWKAiVqawUiLNI4dAcejd79n3sfQSetPKub/fN7JuZnVe+7yMTtrsGoAWAv9uRbV0APQAdWOpb1nEzuZAeJwiz0AfQNhmZMRDT058liYlVAOew3f18z4X4U0lSE1xYqpUmt92dwIOXYw+W6iRlcWK89TlgbXE6uCbULtB8K2uO2ddJdxzYbp2TSkSOhdgWEmxvANcDYKkJjC+ApQUhe78Vpzs5ja5qQYCB/dDztlGN8T+gfzNdv6ORR+DzVxnE5ZXpZEs0P3R4hfvUZ0qxuSzk8w3gzx1wfSvery4Cs1Xg8hfw3UhOrFd0gWSD3v4eAIPhlJjzNw2Z1+aA26HIl3AvnedJkJgk1J+gHLwFtT/rAqMHU1CJZqWQvHcDbK4A3lCMcBCU5YOus+4P49FicgaQgaWH4wbw5UIyiUbCoHoPppMeZUmJFQPTjl5Wq9rQY3qPWZaeVKjtDlJ5HmYLUy0azAlhVW5EMKPiWTOCpeqhLKzOj0bPezrPeTgkCA3HiyeKWPkfB9ai4PW9v+ajed8EwQsZfbhYpUd5J0riAJZKkIsByqNeQNyHpSZFGS8ieYvdZxKz9e1E/8hqc22tW60E6SiImZaimFwM1PXrlmVkpBPBgaWMtZLf/ZHboSYdJwvFD5d09WQczoqIUYpc0E7Ugbm5PIvcUl5YdbrD579H/0UuYPCIQjkmYEBLj0OnU3qv7+MJ89IV4oR8VekAAAAASUVORK5CYII=', // jiang
        hoist: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAcCAYAAABlL09dAAAACXBIWXMAAAsSAAALEgHS3X78AAAB60lEQVRIia2WsUvDUBDGv8ZqwVgEnRxqNeCkYnASBBtXF3V0COrm6OTiUgcXJwv+AdUMjnZytRkEJ6mzEGwdXC0awVKtXPpSX5OXNm36QSjN8X7v7t69u8QajQZEUgxbBXAIQAOQ9pifAOQBFCxdfhGt94EVw55hizLCHf3KAchauvweCFYMm7wrABgPCeUj0Hh4C8ygdz0CA+ES/sMvRICSlniGxH6zovCnx2I4XUm0HkuXsTMXR3F7FKtTQyJ4RjHsPQfMvN3lrRvpuAMhwOKE5Dwk7eYL18/1bp6Tk4izkmrTbbkOxWgCDuaHkUpKOH74DpuSNJ0XuaKGXdGDtNjs1afvhlA+KZdhRSmqtGNMIZiXKBWUe/p///YTtMyUgiyuCPr68dtzLrqCqSIqnYMKBJtBRiq7VDLWKeQgFQlcEhnp8C7WEjh7rKFa69ljB3zufbswKeFoecQ5oBAXwquypctFpwkphp333r4I2rd0Oc/3iuoAoCZB4VYFmwJbEaFlntEqN8oLgPU+PaderPKNvq2OGVztVIIC5bzTA6KZ54oNU8r9ZgDwhGZj6GEq2KDEpgOvnKXLvnbLq+uVFvTrstvMI4FZ3i+5V75R3xeYyalNqhi3TgcCZl67Xz+hFH5MNHsKbdBdAP4AvTe0f2OrjdsAAAAASUVORK5CYII=' // sheng
      }
      // console.log(this.$store.state.histogram.LAST12M_ERYMON_UPDN.mapLAST12M_ERYMON_UPDN_data[0])
      // this.$nextTick(() => console.log(this.symbol1))
      this.picList = this.$store.state.histogram.LAST12M_ERYMON_UPDN.mapLAST12M_ERYMON_UPDN_data
      // this.symbol1 = ''
      // if (this.$store.state.histogram.LAST12M_ERYMON_UPDN.mapLAST12M_ERYMON_UPDN_data[0] === '降') {
      //   this.symbol1 = pathSymbols.defend
      // } else if (this.$store.state.histogram.LAST12M_ERYMON_UPDN.mapLAST12M_ERYMON_UPDN_data[0] === '升') {
      //   this.symbol1 = pathSymbols.fall
      // } else {
      //   this.symbol1 = pathSymbols.hoist
      // }
      const option = {
        grid: {
          top: '25%',
          left: '5%',
          right: '5%',
          bottom: '0%',
          containLabel: true
        },
        tooltip: {
          show: false,
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            return params[0].name + ': ' + params[0].value
          }
        },
        xAxis: {
          data: this.$store.state.histogram.LAST12M_ERYMON_SCORE.mapLAST12M_ERYMON_SCORE_month,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            color: '#000',
            interval: 0
          }
        },
        yAxis: {
          type: 'value',
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false },
          label: {
            formatter: '{c}'
          }
        },
        color: ['#80b4ff'],
        series: [{
          name: 'hill',
          type: 'pictorialBar',
          barCategoryGap: '-50%',
          // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
          symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          itemStyle: {
            opacity: 1
          },
          emphasis: {
            itemStyle: {
              opacity: 1
            }
          },
          // itemStyle: {
          //   normal: {
          //     label: {
          //       show: true,
          //       position: 'top',
          //       textStyle: {
          //         color: 'black',
          //         fontSize: 16
          //       }
          //     }
          //   }
          // },
          data: this.$store.state.histogram.LAST12M_ERYMON_SCORE.mapLAST12M_ERYMON_SCORE_data,
          label: {
            normal: {
              // 设置每根柱子上字的位置和颜色
              show: true,
              // position: ['35%', '-10%'],
              position: 'top',
              textStyle: {
                color: 'black',
                fontSize: this.xSize
              }
            }
          }
          // markLine: { // jigexian
          //   silent: false,
          //   lineStyle: {
          //     normal: {
          //       color: 'hotpink'
          //     }
          //   },
          //   data: [{
          //     yAxis: 50
          //   }],
          //   label: {
          //     normal: {
          //       formatter: '合格'
          //     }
          //   }
          // },
          // z: 10
        },
        {
          name: 'glyph',
          type: 'pictorialBar',
          barGap: '-100%',
          symbolPosition: 'end',
          symbolSize: 50,
          symbolOffset: [0, '-190%'],
          data: [{
            value: this.$store.state.histogram.LAST12M_ERYMON_SCORE.mapLAST12M_ERYMON_SCORE_data[0],
            symbol: this.picList[0] === '降' ? pathSymbols.fall : this.picList[0] === '升' ? pathSymbols.hoist : pathSymbols.defend, // bao
            symbolSize: [17, 22]
          }, {
            value: this.$store.state.histogram.LAST12M_ERYMON_SCORE.mapLAST12M_ERYMON_SCORE_data[1],
            symbol: this.picList[1] === '降' ? pathSymbols.fall : this.picList[0] === '升' ? pathSymbols.hoist : pathSymbols.defend,
            symbolSize: [17, 22]
          }, {
            value: this.$store.state.histogram.LAST12M_ERYMON_SCORE.mapLAST12M_ERYMON_SCORE_data[2],
            symbol: this.picList[2] === '降' ? pathSymbols.fall : this.picList[2] === '升' ? pathSymbols.hoist : pathSymbols.defend,
            symbolSize: [17, 22]
          }, {
            value: this.$store.state.histogram.LAST12M_ERYMON_SCORE.mapLAST12M_ERYMON_SCORE_data[3],
            symbol: this.picList[3] === '降' ? pathSymbols.fall : this.picList[3] === '升' ? pathSymbols.hoist : pathSymbols.defend,
            symbolSize: [17, 22]
          }, {
            value: this.$store.state.histogram.LAST12M_ERYMON_SCORE.mapLAST12M_ERYMON_SCORE_data[4],
            symbol: this.picList[4] === '降' ? pathSymbols.fall : this.picList[4] === '升' ? pathSymbols.hoist : pathSymbols.defend,
            symbolSize: [17, 22]
          }, {
            value: this.$store.state.histogram.LAST12M_ERYMON_SCORE.mapLAST12M_ERYMON_SCORE_data[5],
            symbol: this.picList[5] === '降' ? pathSymbols.fall : this.picList[5] === '升' ? pathSymbols.hoist : pathSymbols.defend,
            symbolSize: [17, 22]
          }, {
            value: this.$store.state.histogram.LAST12M_ERYMON_SCORE.mapLAST12M_ERYMON_SCORE_data[6],
            symbol: this.picList[6] === '降' ? pathSymbols.fall : this.picList[6] === '升' ? pathSymbols.hoist : pathSymbols.defend,
            symbolSize: [17, 22]
          }, {
            value: this.$store.state.histogram.LAST12M_ERYMON_SCORE.mapLAST12M_ERYMON_SCORE_data[7],
            symbol: this.picList[7] === '降' ? pathSymbols.fall : this.picList[7] === '升' ? pathSymbols.hoist : pathSymbols.defend,
            symbolSize: [17, 22]
          },
          {
            value: this.$store.state.histogram.LAST12M_ERYMON_SCORE.mapLAST12M_ERYMON_SCORE_data[8],
            symbol: this.picList[8] === '降' ? pathSymbols.fall : this.picList[8] === '升' ? pathSymbols.hoist : pathSymbols.defend,
            symbolSize: [17, 22]
          },
          {
            value: this.$store.state.histogram.LAST12M_ERYMON_SCORE.mapLAST12M_ERYMON_SCORE_data[9],
            symbol: this.picList[9] === '降' ? pathSymbols.fall : this.picList[9] === '升' ? pathSymbols.hoist : pathSymbols.defend,
            symbolSize: [17, 22]
          },
          {
            value: this.$store.state.histogram.LAST12M_ERYMON_SCORE.mapLAST12M_ERYMON_SCORE_data[10],
            symbol: this.picList[9] === '降' ? pathSymbols.fall : this.picList[9] === '升' ? pathSymbols.hoist : pathSymbols.defend,
            symbolSize: [17, 22]
          },
          {
            value: this.$store.state.histogram.LAST12M_ERYMON_SCORE.mapLAST12M_ERYMON_SCORE_data[11],
            symbol: this.picList[9] === '降' ? pathSymbols.fall : this.picList[9] === '升' ? pathSymbols.hoist : pathSymbols.defend,
            symbolSize: [17, 22]
          }]
        }]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drawLine () {
      const _this = this
      var asd = this.$refs.myChart
      const myChart = this.$echarts.init(asd)
      const option = {
        grid: {
          top: '10%',
          left: '10%',
          right: '10%',
          bottom: '10%',
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'item',
          backgroundColor: '#999'
          // formatter: '{b}: {c}分'
        },
        textStyle: {
          color: ['#CCCCCC'],
          fontSize: 12,
          margin: [
            20,
            10,
            5,
            0
          ]
        },
        radar: {
          nameGap: 30,
          radius: _this.radarSize,
          splitArea: {
            show: true,
            areaStyle: {
              color: 'transparent' // 图表背景的颜色
            }
          },
          axisLine: {
            lineStyle: {
              // color: '#efefef'
              color: '#ccc'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              // color: '#EFEFEF' // 设置网格的颜色
              color: '#ccc' // 设置网格的颜色
            }
          },
          name: {
            textStyle: {
              color: 'black',
              backgroundColor: 'transparent',
              borderRadius: 3,
              padding: [-20, -20]
            }
            // formatter: function (value) {
            //   const     = value.split('')
            //   let result = ''
            //   for (let i = 1: ' ',   i <=    .length: ' ',   i++) {
            //     if (!(i % 4) &&    [i] !== undefined) {
            //       result +=    [i - 1] + '\n'
            //     } else {
            //       result +=    [i - 1]
            //     }
            //   }
            //   return result
            // }
          },
          indicator: [
            { name: '续保率（家用车）', max: 10 },
            { name: '产能', max: 10 },
            { name: '非车保费占比', max: 10 },
            { name: '客户活跃率', max: 10 },
            { name: '开单率', max: 10 }
          ]
        },
        series: [
          {
            name: '',
            type: 'radar',
            symbol: 'none',
            data: [
              {
                value: [this.$store.state.salesPortrayDto.dy_fmcar_renew_ratio_caps, this.$store.state.salesPortrayDto.capacity_caps, this.$store.state.salesPortrayDto.dy_nocar_prm_score, this.$store.state.salesPortrayDto.dy_custacti_ratio_caps, this.$store.state.salesPortrayDto.dy_bills_ratio_caps],
                areaStyle: {
                  opacity: 0.7,
                  color: '#82E0F9'
                },
                itemStyle: {
                  normal: {
                    color: '#08C2F4'
                  }
                }
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.information {
  width: 1780px;
  height: 881px;
  display: flex;
  background: white;
  padding: 15px 0 0 30px;
  // margin-top: 20px;
}
.informationLeft {
  width: 294px;
  height: 881px;
  min-width: 200px;
  font-size: 14px;
  color: #33aed3;
}
.informationRight {
  width: 82%;
  padding-left: 31px;
  position: relative;
}
.informationCard_one {
  width: 285px;
  height: 232px;
  background: #f6f7fc;
  // margin: 15px 0 15px 30px;
  box-sizing: border-box;
  // padding: 10px 0 10px 10px;
}
#personalInfo p{
  color: #fff;
}
.info_one{
  width: 240px;
  height: 150px;
  margin: 23px 0 15px 11px;
  // position: relative;
}
.informationCard_two {
  position: relative;
  width: 285px;
  height: 296px;
  background: #f6f7fc;
  margin-top: 12px;
  box-sizing: border-box;
}
.info_two{
  width: 222px;
  height: 230px;
  margin: 23px 0 15px 11px;
  // background-color: lime;
}
.informationCard_three {
  position: relative;
  width: 285px;
  height: 296px;
  background: #f6f7fc;
  margin-top: 12px;
  box-sizing: border-box;
}
.hg_img{
  // position: absolute;
  // top: 10px;
  // right: 15px;
  width: 68px;
  height: 24px;
}
.info_three{
  width: 222px;
  height: 250px;
  margin: 23px 0 15px 11px;
  // background-color: lime;
}
.card span{
  font-size: 16px !important;
  line-height: 25px;
}
.cardSign_two {
  width: 162px;
  height: 30px;
  display: flex;
}
.cardSignA{
  display: flex;
  justify-content: space-between;
  width: 285px;
  height: 30px;
}
.occupation_two {
  // width: 100%;
  // height: 100%;
  margin-left: 20px;
  margin-top: 10px;
  // position: absolute;
  // top: 10px;
  // right: 15px;
}
.occupation_two img{
  display: block;
  // width: 100%;
  width: 68px;
  height: 25px;
}
.leftOrange_two {
  width: 150px;
  height: 30px;
  line-height: 18px;
  font-size: 20px;
  padding: 15px 0 0 23px;
  display: flex;
}
.leftOrange_two p{
  font-size: 20px;
  color: #000000;
  margin-left: 10px;
}
.cardSign_three {
  width: 162px;
  height: 30px;
}
.check {
  width: 158px;
  height: 26px;
  // background: url('../../assets/portraitImg/IMG/合格.png') no-repeat right center ;
  // position: absolute;
  // top: 9px;
  // left: 112px;
}
.leftOrange_three {
  width: 100px;
  height: 21px;
  line-height: 21px;
  font-size: 20px;
  padding: 14px 0 0 21px;
}
.leftOrange_three p{
  font-size: 20px;
  color: #000000;
  margin-left: 10px;
}
.cool{
  width: 100px;
  height: 26px;
  display: flex;
  // position: absolute;
  // top: 0;
  // left: -85px;
}
.yi{
  width: 5px;
  height: 21px;
  background-color: #ff6b00;
  // position: absolute;
  // top: 13px;
  // left: 15px;
}
.yii{
  width: 5px;
  height: 21px;
  background-color: #ff6b00;
  // position: absolute;
  // top: 3px;
  // left: -15px;
}
.peopleBefore {
  width: 100%;
}
.flex {
  justify-content: space-between;
}
// .people_t{
//   width: 200px;
//   height: 100px;
//   background-color: lime;
// }
.lineChart{
  width: 600px;
  height: 240px;
  // margin-left: 40px;
}
.grouptype {
  width: 200px;
  height: 200px;
  color: #fff;
  text-align: center;
  margin-right: 20px;

  img {
    width: 200px;
    height: 200px;
  }
  p {
    position: relative;
    top: -98px;
    font-size: 20px;
  }
}
.cardSign {
  width: 162px;
  height: 30px;
  color: black;
  font-weight: bold;
  font-size: 14px;
  font-family: Microsoft YaHei;
  line-height: 30px;
  box-sizing: border-box;
  margin: 10px 0;
  // padding-left: 10px;
  display: flex;
  align-items: center;
  // text-align: center;
}
.info {
  margin-left: -30px;
  background: url(../../assets/portraitImg/IMG/个人信息.png) no-repeat;
  height: 41px;
  width: 220px;
  font-size: 20px;
  background-size: 100% 100%;
  padding-left: 70px;
}
.cardKey {
  font-size: 16px;
  color: #808080;
}
.cardValue {
  font-size: 16px;
  color: black;
}
.card{
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
}
.card_name{
  white-space: nowrap;
  width: 100%;
  height: 100%;
  background-color: pink;
  border: 1px solid #ccc;
}
.flex {
  display: flex;
  width: 100%;
}
.topOne {
  width: 100%;
  height: 570px;
  position: relative;
}
.topOneR{
  display: flex;
  height: 210px;
}
.wing{
  width: 1102px;
  height: 37px;
  margin: 0 0 0 300px;
  // background: url('../../assets/portraitImg/IMG/wing.png') no-repeat;
  // bottom: -225px;
  // left: 330px;
}
.wing img{
  width: 1102;
  height: 37px;
}
.course{
  width: 240px;
  height: 126px;
  background: url('../../assets/portraitImg/IMG/course2.png') no-repeat;
  // position: absolute;
  // top: 70px;
  // left: 350px;
  font-size: 20px;
  padding: 10px 0 0 10px;
  margin: 80px 0 0 -50px;
  background-size: cover;
}
.course p{
  width: 80px;
  height: 20px;
  margin: 42px 0 0 130px;
}
.courseTwo{
  margin-left: 170px;
}
.courseTwo img{
  width: 863px;
  height: 18px;
}
.topOneBody{
  display: flex;
}
.peopleB {
  min-width: 300px;
  height: 511px;
  width: 333px;
  // border: 1px solid black;
  margin: 40px 0px 0px 50px;
  background: url('../../assets/portraitImg/newAddimg/男_1.png') no-repeat;
  background-size: cover;
}
.peopleG {
  min-width: 300px;
  height: 511px;
  width: 333px;
  // border: 1px solid black;
  margin: 40px 0px 0px 50px;
  background: url('../../assets/portraitImg/newAddimg/女_1.png') no-repeat;
  background-size: cover;
}
.wgOut {
  width: 300px;
  height: 300px;
  // min-width: 200px;
  margin: 200px 0 0 20px;
}
.axisOut {
  width: 775px;
  height: 300px;
  // position: absolute;
  // top: 298px;
  // left: 440px;
}
.columnEchart{
  width: 975px;
  height: 268px;
  margin-left: 40px;
}
.text{
  width: 235px;
  height: 42px;
  line-height: 39px;
  background: url(../../assets/portraitImg/IMG/框线.png) no-repeat;
  margin: 30px 0 0 50px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #000000;
  // padding: 4px 0 0 45px;
  background-size: cover;
}
.text p{
  margin: 4px 0 0 45px;
}
.spaceBetween {
  justify-content: space-between;
}
.topB{
  // position: absolute;
  // top: 570px;
  // left: 0;
  width: 1440px;
  height: 300px;
  margin-left: 20px;
  margin-right: 137px;
}
.topT{
  // width: 745px;
  // height: 200px;
  display: flex;
}
.topFooter{
  width: 700px;
  height: 200px;
  margin: 40px 50px 0 45px;
}
.numDiv {
  width: 206px;
  height: 188px;
  // position: relative;
  background: url('../../assets/portraitImg/IMG/实收.png') no-repeat;
  margin-right: 24px;
  background-size: cover;
}
.numLog{
  padding: 20px 0 0 55px;
  font-size: 20px;
}
.numDiv p{
  text-align: center;
  font-size: 24px;
  margin-top: 80px;
}
.progress {
  width: 450px;
  height: 46px;
  background: #f7f5f5;
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-weight: 400;
  font-size: 14px;
  margin: auto;
  margin-top: 24px;
  font-family: Microsoft YaHei;
}
.numFooter{
  display: flex;
  padding-top: 25px;
}
.num_a {
  // margin: 40px 10px 0 20px;
  text-align: center;
  padding: 30px 59px 0 0 ;
}
.num_b {
  // margin: 40px 10px 0 20px;
  text-align: center;
  padding: 30px 59px 0 0 ;
}
.num_c {
  // margin: 40px 10px 0 20px;
  text-align: center;
  padding: 30px 70px 0 0 ;
}
.num p{
  margin-top: 15px;
}
</style>

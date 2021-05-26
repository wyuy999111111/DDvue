import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inputList: [],
    user: '',
    roleName: '',
    isFind: false,
    role: {
      orglResult: '',
      channelResult: '',
      date: '',
      state: false,
      orglOption: '',
      level: '',
      dateMonth: '',
      dateYear: '',
      channelOption: '',
      mechanismOption: []
    },
    findRole: {
      channelResult: ''
    },
    switch: false,
    adminSendState: false,
    strategy: { // 策略部分
      groupList: [], // 弹出框选项树
      switch: false,
      sitConditions: [], // 策略动作
      sitStratrgyTegTags: [], // 关注指标
      strategyName: '',
      groupId: '',
      strategyDesc: '',
      strategyStartTime: '',
      strategyEndTime: '',
      dockSystems: '',
      tagNames: [],
      tagIds: [],
      cron: '',
      sendType: '',
      sitStrategySendTagfields: [],
      groupListNumEnum: [], // 数值型文本型
      groupListAll: [],
      cronExpression: '',
      strategyVisible: false,
      messageList: [],
      strategyStatus: '1',
      dataId: '',
      messageCronType: '',
      sendDay: '',
      exceptionDay: '',
      messageLabelList: [],
      tagEnumList: [],
      managerMessageList: [{
        messageContent: '', // 消息模板
        manageIdList: '', // id 1，2，3
        text: '总公司',
        manageList: [],
        sendMethod: '1'
      }, {
        messageContent: '',
        manageIdList: '',
        text: '分公司',
        manageList: [],
        sendMethod: '1'
      }, {
        messageContent: '',
        manageIdList: '',
        text: '中支公司',
        manageList: [],
        sendMethod: '1'
      }]
    },
    // 左侧菜单栏
    menuList: {},
    asd: '123',
    // 权限
    rights: [],
    // 画像侧边数据
    salesTagMemberDto: {
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
    specialDto: [],
    // 图表数据
    salesPortrayDto: {
      change_sales_date: '', // 转销事件
      dy_nocar_prm_score: '', // 非车占比分
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
    histogram: {
      LAST12M_ERYMON_FMCAR_1STQUOTN_RATIO: {},
      LAST12M_ERYMON_FMCAR_2NDQUOTN_RATIO: {},
      LAST12M_ERYMON_FMCAR_3RDQUOTN_RATIO: {},
      LAST12M_ERYMON_FMCAR_QUOTNSUC_RATIO: {},
      LAST12M_ERYMON_FMCAR_QUOTN_NUM: {},
      LAST12M_ERYMON_JBF_PRM: {},
      LAST12M_ERYMON_NOBILLS_DAYS: {},
      LAST12M_ERYMON_SCORE: {},
      LAST12M_ERYMON_UPDN: {},
      DY_ERYMON_APPISSUE_NUM: {},
      DY_ERYMON_APPLOGIN_NUM: {},
      DY_ERYMON_CUSTCARE_SUC_RATIO: {},
      DY_ERYMON_RIG_REMIND_NUM: {},
      DY_ERYMON_BIRTH_WISH_NUM: {},
      DY_ERYMON_ISSUE_WARN_NUM: {},
      DY_ERYMON_VIO_QUERY_NUM: {},
      DY_ERYMON_ASSIST_REPORT_NUM: {},
      DY_ERYMON_CLAIM_QUERY_NUM: {},
      DY_ERYMON_INVITE_REG_NUM: {},
      DY_ERYMON_CUSTACTI_NUM: {}
    }

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

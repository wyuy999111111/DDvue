// import axiosservice from '../util/server'
import axiosservice from '../service'
export const postGroupOld = (params) => axiosservice.post('/sit-web/sit/tag/findAllTagClassAndTag')
export const postGroup = (params) => axiosservice.post('/sit-web/sit/group/findAllTagClassAndTag')
export const postFindSaleGroup = (params) => axiosservice.post('/sit-web/sit/group/findSaleGroup', params)
export const findNumTagClassAndTag = (params) => axiosservice.post('/sit-web/sit/group/findNumTagClassAndTag', params)
export const getFindUserOrg = (params) => axiosservice.get(`/sit-web/sit/prms/user/findUserOrg.do?userName=${params}`)
export const postSaveSaleGroup = (params) => axiosservice.post('/sit-web/sit/group/saveSaleGroup', params)
export const getFindGroupList = (params) => axiosservice.get(`/sit-web/sit/group/findGroupList?${params}`)
export const getUpdateCreateUser = (params) => axiosservice.post('/sit-web/sit/group/updateCreateUser', params)
export const getCreateUser = (params) => axiosservice.get(`/sit-web/sit/group/getCreateUser?comcode=${params}`)
export const updateGroupStatus = (params) => axiosservice.post('/sit-web/sit/group/updateGroupStatus', params)
export const findGroupInfo = (params) => axiosservice.post('/sit-web/sit/group/findGroupInfo', params)
export const findGroupPortary = (params) => axiosservice.post('/sit-web/sit/group/findGroupPortary', params)
export const findUploadSales = (params) => axiosservice.post('/sit-web/sit/salesTag/findUploadSales', params)
export const customTagList = (params) => axiosservice.post('/sit-web/sit/group/customTagList', params)
export const findConditions = (params) => axiosservice.post('/sit-web/sit/group/findConditions', params)
export const updateGroup = (params) => axiosservice.post('/sit-web/sit/group/updateGroup', params)
export const getStrategyQuery = (params) => axiosservice.post('/sit-web/sit/strategy/query', params) // 策略分页
export const getStrategySelectOne = (params) => axiosservice.post('/sit-web/sit/strategy/selectOne', params) // 策略单条

// get
export const findRoleList = (params) => axiosservice.get(`/sit-web/sit/prms/role/findRoleList.do?${params}`) // 一期
export const findResource = (params) => axiosservice.get(`/sit-web/sit/prms/role/findResource.do?${params}`)
export const findUserRe = () => axiosservice.get('/sit-web/sit/sys/user/findUserRes')
export const findOrgByUser = () => axiosservice.get('/sit-web/sit/prms/user/findOrgByUser.do')
export const myinfo = () => axiosservice.get('/sit-web/sit/sys/user/myinfo')
export const orgTree = () => axiosservice.get('/sit-web/sit/prms/user/orgTree.do')
export const findRoles = (params) => axiosservice.get(`/sit-web/sit/prms/role/findRoles.do?dataComcode=${params}`)
export const findUserList = (params) => axiosservice.get(`/sit-web/sit/prms/user/findUserList.do?${params}`)
export const findRoleDetail = (params) => axiosservice.get(`/sit-web/sit/prms/role/findRoleDetail.do?${params}`)

export const checkTagName = (params) => axiosservice.get(`/sit-web/sit/group/checkTagName?tagName=${params}`)

// post
export const postSaveRole = (params) => axiosservice.post('/sit-web/sit/prms/role/saveRole.do', params)
export const updateRole = (params) => axiosservice.post('/sit-web/sit/prms/role/updateRole.do', params)
export const updateRoleStatus = (params) => axiosservice.post(`/sit-web/sit/prms/role/updateRoleStatus.do?partId=${params}&partStatus=0`)
export const updateRoleStatusEnd = (params) => axiosservice.post(`/sit-web/sit/prms/role/updateRoleStatus.do?partId=${params}&partStatus=1`)
export const queryAllTagClass = () => axiosservice.post('/sit-web/sit/tag/queryAllTagClass')
export const queryAllTag = (params) => axiosservice.post('/sit-web/sit/tag/queryAllTag', params)
export const saveupdateTagById = (params) => axiosservice.post('/sit-web/sit/tag/saveupdateTagById', params)
export const saveinsertTag = (params) => axiosservice.post('/sit-web/sit/tag/saveinsertTag', params)
export const findByTagClassName = (params) => axiosservice.post('/sit-web/sit/tagClass/findByTagClassName', params)
export const deleteByTagClassId = (params) => axiosservice.post('/sit-web/sit/tagClass/deleteByTagClassId', params)
export const addByTagClassId = (params) => axiosservice.post('/sit-web/sit/tagClass/addByTagClassId', params)
export const findChannel = (params) => axiosservice.post('/sit-web/sit/salesTag/findChannel', params)
export const resultTagClassAndTag = (params) => axiosservice.post('/sit-web/sit/tag/ResultTagClassAndTag', params)
export const findSalesTagMemberPage = (pageNow, pageSize, params) => axiosservice.post(`/sit-web/sit/salesTag/findSalesTagMemberPage?pageNow=${pageNow}&pageSize=${pageSize}`, params)
export const findSalesTagMemberPageGroup = (pageNow, pageSize, groupId, params) => axiosservice.post(`/sit-web/sit/group/findSalesTagMemberPage?pageNow=${pageNow}&pageSize=${pageSize}&groupId=${groupId}`, params)
export const saveCheckTagById = (params) => axiosservice.post('/sit-web/sit/tag/saveCheckTagById', params)
export const findSalesPortrayByTagDataDate = (params) => axiosservice.post(`/sit-web/sit/salesPortray/findSalesPortrayByTagDataDate?sales_code=${params}`)
export const updateUserStatus = (params) => axiosservice.post('/sit-web/sit/prms/user/updateUserStatus.do', params)
export const saveUser = (params) => axiosservice.post('/sit-web/sit/prms/user/saveUser.do', params)
export const updateUser = (params) => axiosservice.post('/sit-web/sit/prms/user/updateUser.do', params)
export const strategyUpdate = (params) => axiosservice.post('/sit-web/sit/strategy/update', params) // 修改
export const strategyAdd = (params) => axiosservice.post('/sit-web/sit/strategy/add', params) // 创建
export const strategyQuery = (params) => axiosservice.post('/sit-web/sit/strategy/query', params) // 获取
export const selectGroup = (params) => axiosservice.post('/sit-web/sit/strategy/selectGroup', params) // 分组
export const updateCreatUser = (params) => axiosservice.post('/sit-web/sit/strategy/updateCreatUser', params)

export const findAllTagClassAndTagCustom = (params) => axiosservice.get('/sit-web/sit/tag/findAllTagClassAndTagCustom?groupId=' + params)
export const updateStatus = (params) => axiosservice.post('/sit-web/sit/strategy/updateStatus', params)
export const findNumAndEnumTagClassAndTag = (params) => axiosservice.post('/sit-web/sit/group/findNumAndEnumTagClassAndTag', params)
export const findStrategyTagClassAndTag = (params) => axiosservice.post('/sit-web/sit/group/findStrategyTagClassAndTag', params)
export const findAllTags = (params) => axiosservice.get(`/sit-web/sit/tag/findAllTags?groupId=${params}`)
export const formulaCheck = (params) => axiosservice.post('/sit-web/sit/group/formulaCheck', params)
export const setReturnDate = (params) => axiosservice.post('/sit-web/sit/lodeData/setReturnDate', params)

export const getReturnDate = (params) => axiosservice.get(`/sit-web/sit/lodeData/getReturnDate?groupId=${params}`)
export const getStrategyReturnDate = (params) => axiosservice.get(`/sit-web/sit/lodeData/getStrategyReturnDate?strategyId=${params}`)

export const setSalesReturnDate = (params) => axiosservice.post('/sit-web/sit/lodeData/setSalesReturnDate', params)
export const setStrategyReturnDate = (params) => axiosservice.post('/sit-web/sit/lodeData/setStrategyReturnDate', params)

export const getSalesReturnDate = (params) => axiosservice.get(`/sit-web/sit/lodeData/getSalesReturnDate?salesId=${params}`)
export const checkAddGroup = (params) => axiosservice.post('/sit-web/sit/group/checkAddGroup', params)
export const selectPresident = (params) => axiosservice.post('/sit-web/sit/strategy/selectPresident', params)
export const cronParse = (params) => axiosservice.get(`/sit-web/sit/strategy/cronParse?cron=${params}`)
export const findStrategyPresident = (params) => axiosservice.post('/sit-web/sit/strategypresident/findStrategyPresident', params)
export const queryStrategyLog = (params) => axiosservice.post('/sit-web/sit/strategyLog/query', params)
export const findGroupByGroupId = (params) => axiosservice.get(`/sit-web/sit/group/findGroupByGroupId?groupId=${params}`)
export const findAllTagsMessage = (params) => axiosservice.get(`/sit-web/sit/tag/findAllTagsMessage?groupId=${params}`)
export const findLodeData = (params) => axiosservice.post('/sit-web/sit/lodeData/findLodeData', params)
export const lodeData = (params) => axiosservice.post('/sit-web/sit/lodeData/loadData', params)

export const updateJobStatus = (params) => axiosservice.post('/sit-web/sit/strategy/updateJobStatus', params)

export const checkDelTag = (params) => axiosservice.get(`/sit-web/sit/group/checkDelTag?groupId=${params}`)

export const RoleshowYwjg = (params) => axiosservice.post('/sit-web/sit/roleShow/findSecondcompanyRoleshowYwjg', params)
export const RoleshowKhyy = (params) => axiosservice.post('/sit-web/sit/roleShow/findSecondcompanyRoleshowKhyy', params)
export const RoleshowXbqk = (params) => axiosservice.post('/sit-web/sit/roleShow/findSecondcompanyRoleshowXbqk', params)
export const RoleshowBjqk = (params) => axiosservice.post('/sit-web/sit/roleShow/findSecondcompanyRoleshowBjqk', params)
export const findRoleshow111 = (params) => axiosservice.post('/sit-web/sit/roleShow/findSecondcompanyRoleshow111', params)
export const RoleshowXwxx = (params) => axiosservice.post('/sit-web/sit/roleShow/findSecondcompanyRoleshowXwxx', params)
export const findChannelList = (params) => axiosservice.get('/sit-web/sit/roleShow/findChannelList')
export const findOrglList = (params) => axiosservice.get('/sit-web/sit/roleShow/findOrglList')

export const salesTagFindChannelList = (params) => axiosservice.post('/sit-web/sit/salesTag/findChannelList', params)

export const organizationTree = (params) => axiosservice.get('/sit-web/sit/prms/user/organizationTree.do')

export const uploadSales = (params) => axiosservice.post('/sit-web/sit/upLoad/findSitUpload', params)
// export const downLoadFile = (params) => axiosservice.get(`/sit-web/sit/upLoad/downLoadFileFromS3?fileName=${params}`)
export const viewMessage = (params) => axiosservice.post('/sit-web/sit/strategy/viewMessage', params)

export const findStrategyList = (params) => axiosservice.post('/sit-web/sit/strategyReport/findStrategyList', params)

export const findStrategyReportChannelList = (params) => axiosservice.get('/sit-web/sit/strategyReport/findStrategyReportChannelList')

export const findStrategyReportOrgList = (params) => axiosservice.get('/sit-web/sit/strategyReport/findStrategyReportOrgList')

export const findStrategyReportListByStrategyList = (params) => axiosservice.post('/sit-web/sit/strategyReport/findStrategyReportListByStrategyList', params)

export const findStrategyReportList = (params) => axiosservice.post('/sit-web/sit/strategyReport/findStrategyReportList', params)

export const copySalesNameList = (params) => axiosservice.get(`/sit-web/sit/group/copySalesNameList?groupId=${params}`)

export const findOrgByDataComcode = (params) => axiosservice.get('/sit-web/sit/prms/user/findOrgByDataComcode')

export const findUserComcodeResultList = (params) => axiosservice.get(`/sit-web/sit/prms/user/findUserComcodeResultList.do?userName=${params}`)

// 自建标签
export const findTagList = (params) => axiosservice.post('/sit-web/sit/customTag/findTagList', params)

export const findTagHistory = (params) => axiosservice.post('/sit-web/sit/customTag/findTagHistory', params)

// 03.19
export const findGroupEnumTagClassAndTag = (params) => axiosservice.post('/sit-web/sit/group/findGroupEnumTagClassAndTag', params)

// 03.25 策略报表总数
export const findStrategyListTotal = (params) => axiosservice.post('/sit-web/sit/strategyReport/findStrategyListTotal', params)

// 03.29
export const findStrategyTrendChart = (params) => axiosservice.post('/sit-web/sit/strategyReport/findStrategyTrendChart', params)

export const groupShareUser = (params) => axiosservice.get(`/sit-web/sit/prms/user/groupShareUser?groupId=${params}`)
export const shareUserList = (params) => axiosservice.get(`/sit-web/sit/group/shareUserList?groupId=${params}`)
export const groupShare = (params) => axiosservice.post('/sit-web/sit/group/groupShare', params)

// 04.21
export const managerTagClass = (params) => axiosservice.post('/sit-web/sit/strategy/managerTagClass', params)
// export const managerTagClass = (params) => axiosservice.get(`/sit-web/sit/strategy/managerTagClass?groupId=${params}`)

export const viewManagerMessage = (params) => axiosservice.post('/sit-web/sit/strategy/viewManagerMessage', params)

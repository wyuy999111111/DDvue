import axiosservice from '../service'

export const salesNameList = (params) => axiosservice.post('/sit-web/sit/group/salesNameList', params)
export const getGroupId = () => axiosservice.post('/sit-web/sit/group/getGroupId')
export const addSalesNameList = (params) => axiosservice.post('/sit-web/sit/group/addSalesNameList', params)
export const delSalesNameList = (params) => axiosservice.post('/sit-web/sit/group/delSalesNameList ', params)

// 群组
export const addTagGroupTemplate = (params) => axiosservice.post('/sit-web/tag/group/tagGroupTemplate ', params)
export const getGroupTemplates = (params) => axiosservice.post('/sit-web/tag/group/userGroupTemplates ', params)
export const delTemplate = (params) => axiosservice.post('/sit-web/tag/group/delTemplate ', params)

// 隐藏
export const findChannelAll = () => axiosservice.post('/sit-web/sit/salesTag/findChannelAll ')
export const updateChannel = (params) => axiosservice.get('/sit-web/sit/salesTag/updateChannel?' + params)

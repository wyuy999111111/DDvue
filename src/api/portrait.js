import axiosservice from '../service'

// export const getPortraitData = (params) => axios.post('/sit/salesPortray/findSalesPortrayByTagDataDate', params)
export const SecondcompanyRoleshow = (params) => axiosservice.post('/sit-web/sit/roleShow/secondcompanyRoleshow', params)

export const PersonnelInformation = (params) => axiosservice.post('/sit-web/sit/roleShow/personnelInformation', params)

export const TeamList = (params) => axiosservice.post('/sit-web/sit/roleShow/teamList', params)

export const TeamAssessment = (params) => axiosservice.post('/sit-web/sit/roleShow/teamAssessment', params)

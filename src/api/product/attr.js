import request from '@/utils/request'

export const getCategory1 = () => request({ url: `/admin/product/getCategory1/`, method: 'get' })
export const getCategory2 = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })
export const getCategory3 = (categoryid2) => request({ url: `/admin/product/getCategory3/${categoryid2}/`, method: 'get' })
// 三级分类属性获取
export const getAttrList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
// 添加修改属性
export const addOrEditAttr = (data) => request({ url: `/admin/product/saveAttrInfo`, method: 'post', data })

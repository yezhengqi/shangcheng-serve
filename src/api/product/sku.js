import request from '@/utils/request'
// 获取图片数据
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
// 获取销售属性数据
export const reqSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })
// 获取平台属性数据
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })

// 保存平台数据
export const reqSaveSku = (skuInfo) => request({ url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo })

// 获取Sku列表数据
export const getSkuList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' })

// 商品上下架
export const reqSale = (skuId) => request({ url: `/admin/product/onSale/${skuId}`, method: 'get' })
export const reqCancel = (skuId) => request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' })

// sku详情
export const rqSkuInfo = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' })

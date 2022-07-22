import request from '@/utils/request'

// 获取spu列表展示数据
export const getSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id }})

// 获取新建spu form表单数据
export const reqSqu = (spuId) => request({ url: `admin/product/getSpuById/${spuId}`, method: 'get' })
export const reqTradeMarkList = () => request({ url: `admin/product/baseTrademark/getTrademarkList`, method: 'get' })
export const reqSquImageList = (spuId) => request({ url: `admin/product/spuImageList/${spuId}`, method: 'get' })
export const reqBaseSaleAttrList = () => request({ url: `admin/product/baseSaleAttrList`, method: 'get' })

// 保存spu
export const reqSaveSpu = (spuInfo) => {
  if (spuInfo.id) {
    // 修改的接口
    return request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo })
  } else {
    // 新建的接口
    return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo })
  }
}
// 删除Spu
export const reqDeleteSpu = (spuId) => request({ url: `admin/product/deleteSpu/${spuId}`, method: 'delete' })

// 查看sku
export const reqLookSku = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })

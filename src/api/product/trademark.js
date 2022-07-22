import request from '@/utils/request'
export const getList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })
// 添加修改商品
export const reqAddOrUpdateTrademark = (tradeMark) => {
  if (tradeMark.id) {
    return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark })
  } else {
    return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark })
  }
}
// 删除商品
export const deleTrademark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })

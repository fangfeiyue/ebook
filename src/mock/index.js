import Mock from 'mockjs'
import BookHomeApi from './bookHome'
/*
第一个参数：匹配请求的url
第二个参数：请求方法
第三个参数：返回数据
*/
console.log('Mock', Mock)
Mock.mock(/\/book\/home/, 'get', BookHomeApi)
export default Mock

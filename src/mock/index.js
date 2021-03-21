import Mock from 'mockjs'
import shelf from './bookShelf'
import BookHomeApi from './bookHome'
// /*
// 第一个参数：匹配请求的url
// 第二个参数：请求方法
// 第三个参数：返回数据
// */
// console.log('Mock', Mock)
Mock.mock(/\/book\/shelf/, 'get', shelf)
Mock.mock(/\/book\/home/, 'get', BookHomeApi)
export default Mock
// http://47.99.166.157:3000/book/detail?fileName=2016_Book_NewHorizonsForAData-DrivenEcon

// http://47.99.166.157:3000/book/detial?fileName=2016_Book_NewHorizonsForAData-DrivenEcon
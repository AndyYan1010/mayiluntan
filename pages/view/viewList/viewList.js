// pages/view/viewList/viewList.js
const app=getApp();
var cate=0;
var order=0;
var area='';
var lock=false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderArray: ['排序', '发布时间', '刷新时间'],
    orderIndex: 0,
    areaArray: ['区域', '地区1', '地区2'],
    areaIndex: 0,
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    cate = options.cate ? options.cate:0;
    this.getIndexList()
  },
  getIndexList() {
    wx.request({
      url: app.globalData.apiUrl + 'get_list.php?cate=' + cate + '&order=' + order + '&area='+area,
      success: res => {
        console.log(app.globalData.apiUrl + 'get_list.php?cate=' + cate + '&order=' + order + '&area=' + area)
        console.log(res)
        this.setData({
          listData: res.data.data
        })
      }
    })
  },
  areaChange(e) {
    area = e.detail.value
    this.setData({
      areaIndex: e.detail.value
    })
    this.getIndexList()
  },
  orderChange(e) {
    order = e.detail.value
    this.setData({
      orderIndex: e.detail.value
    })
    this.getIndexList()
  },
  copyText(e) {
    lock = true;
    var v = e.currentTarget.dataset.wechat
    if (v == '') {
      wx.showToast({
        title: '未填写微信号',
        icon: 'none'
      })
    } else {
      wx.setClipboardData({
        data: v,
        success: function (res) {
          wx.showToast({
            title: '已复制',
            icon: 'success'
          })
        }
      })
    }
  },
  callPhone(e) {
    lock = true;
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
      complete: res => {
        lock = false;
      }
    })

  },
  viewDetail(e) {
    if (lock) {
      return
    }
    //console.log(e);
    var v = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/view/viewDetail/viewDetail?id=' + v,
    })
  }
})
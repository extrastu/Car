// pages/index/index.js
import citys from '../../utils/city'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    color: '#000',
    background: '#ffffff',
    isShow: true,
    animated: false,
    location: null,
    show: false,
    // buttons: [{
    //     type: 'default',
    //     className: '',
    //     text: '辅助操作',
    //     value: 0
    //   },
    //   {
    //     type: 'primary',
    //     className: '',
    //     text: '主操作',
    //     value: 1
    //   }
    // ],
    title: null,
    city:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.name);
    if (options.name) {
      this.setData({
        title: options.name
      },()=>{
        this.getCityInfo(options.code)
      })
    } else {
      this.getLocation()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.vibrateShort({
      complete: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getLocation: function () {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(res)
        that.getLocationName(latitude, longitude)
      }
    })
  },
  getLocationName: function (latitude, longitude) {
    let that = this;
    wx.serviceMarket.invokeService({
      service: 'wxc1c68623b7bdea7b',
      api: 'rgeoc',
      data: {
        location: latitude + "," + longitude
      },
    }).then(res => {
      console.log('invokeService success', res)
      that.setData({
        location: res.data.result,
        loading: false
      },()=>{
        that.getCityInfo(res.data.result.ad_info.city_code)
      })
    }).catch(err => {
      console.error('invokeService fail', err)
    })
  },
  open: function () {
    this.setData({
      show: true
    })
  },
  buttontap(e) {
    console.log(e.detail)
  },
  getCityInfo: function (name) {
    citys.forEach((item, i) => {
      item.sub.map((b, a) => {
        if(name.indexOf(b.code)>0 || name === b.code){
         this.setData({
           city:b,
           loading:false
         })
        }
      })
    })
  },
  copyUrl:function(){
    wx.vibrateShort({
      complete: (res) => {},
    })
    wx.setClipboardData({
      data: 'https://zh.wikipedia.org/wiki/%E5%85%A8%E5%9B%BD%E4%BA%A4%E9%80%9A%E4%B8%80%E5%8D%A1%E9%80%9A%E4%BA%92%E8%81%94%E4%BA%92%E9%80%9A#cite_note-88',
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  onPageScroll:function(e){
    console.log(e);
    if(e.scrollTop>50){
      this.setData({
        navTitle:"新交通互联"
      })
    }else{
      this.setData({
        navTitle:""
      })
    }
  }
})
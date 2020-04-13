// pages/city/city.js
import citys from '../../utils/city'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    citys,
    loading: true,
    color: '#000',
    background: '#ffffff',
    isShow: true,
    animated: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  showChildren:function(e){
    wx.vibrateShort({
      complete: (res) => {},
    })
    let {index} = e.target.dataset;
    let {citys} = this.data;
    citys[index].isShow = !citys[index].isShow;
    this.setData({
      citys
    })
  },
  getCity:function(e){
    wx.vibrateShort({
      complete: (res) => {},
    })
    console.log(e)
    let {index,subindex} = e.currentTarget.dataset;
    let {citys} = this.data;
    console.log(citys[index].sub[subindex])
    wx.redirectTo({
      url: '/pages/index/index?name='+citys[index].sub[subindex].name+"&code="+citys[index].sub[subindex].code,
    })
  }
})
Page({
    data: {
        phoneCode: '86',
        verifyCode: '',
        telPhone: '',
    },

    choosePhoneCode() {
        wx.navigateTo({
            url: '/pages/countryPhoneCode/countryPhoneCode',
        })
    },

    getTelValue(e) {
        this.setData({
            telPhone: e.detail.value
        })
    },

    getCodeValue(e) {
        this.setData({
            verifyCode: e.detail.value
        })
    },

    submitData() {
        wx.showToast({
          title: '祝您生活开心愉快~',
          icon: 'none',
          duration: 1500
        })
    }
})
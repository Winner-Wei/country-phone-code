import countryCodeData from '../../mocks/countryCode';
import { throttle } from '../../utils/util';

Page({
    data: {
        countryCodeList: [],
        allCode: [],
        intoPosition: '',
        clickIndex: 0,
        topVal: '',
        titleHeight: 0,
        contentHeight: 0
    },
    onLoad() {
        let newCountryData = countryCodeData.map(item => {
            if(item.data && item.data.length) {
                return {...item}
            }
        }).filter(item => item);
        this.setData({
            countryCodeList: newCountryData,
            allCode: newCountryData.map(item => item.key)
        })
    },
    onReady() {
        let totalTop = 0;
        const query = wx.createSelectorQuery()
        query.select('.title').boundingClientRect()
        query.select('.ind_content').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec((res) => {
            let titleHeight = res[0].height;
            let contentHeight = res[1].height;
            this.data.countryCodeList.map(item => {
                let height = (item.data.length * contentHeight) + titleHeight; 
                item.distance = totalTop;
                totalTop += height;
                return {...item}
            })
            this.setData({
                countryCodeList: this.data.countryCodeList
            })
        })
    },
    jumpItemPosition(e) {
        let tip = e.currentTarget.dataset.info;
        let one = tip.split("-")[0];
        let two = tip.split("-")[1];
        this.setData({
            intoPosition: one,
            clickIndex: two,
            topVal: one
        })
    },
    handleScroll: throttle(function(e) {
        for(let i = 0; i < this.data.countryCodeList.length; i++){
            if(i > 0 && e.detail.scrollTop < this.data.countryCodeList[i].distance){
                this.setData({
                    topVal: this.data.countryCodeList[i - 1].key,
                    clickIndex: i - 1,
                })
                return;
            }
        }
    }),
    backInputPhone(e) {
        let code = e.currentTarget.dataset.code;
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];  //上一个页面
        wx.navigateBack({
            delta: 1
        })
        prevPage.setData({
            phoneCode: code
        })
    }
})
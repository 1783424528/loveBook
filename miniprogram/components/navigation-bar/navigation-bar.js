const app = getApp()
Component({
    properties: {
        // defaultData（父页面传递的数据-就是引用组件的页面）
        tabData: {
            type: Array,
        },
        selectTab:{
            type:Number,
        }
    },
    data: {
        navBarHeight: app.globalData.navBarHeight,
        menuRight: app.globalData.menuRight,
        menuTop: app.globalData.menuTop+app.globalData.menuHeight*0.2,
        menuHeight: app.globalData.menuHeight*0.8,
        selected:1
    },
    attached: function() {},
    methods: {
        selecttap(e){
            let myEventDetail = { // 需要传递什么数据就在这个对象中写
                type: e.target.dataset.type
              }
              this.triggerEvent('changeNaviIndex', myEventDetail)
              this.selected = e.target.dataset.type
        }
    }
})
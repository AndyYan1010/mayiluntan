//index.js
//获取应用实例
const app = getApp()
var lock=false;
Page({
  data: {
    cateSelected:0,
    imgUrls: [
      {
        link: '',
        url: '/images/banner.png'
      }
    ],
    cateArray: ['全部分类','房屋出租', '房屋求租', '二手市场', '求职招聘', '汽车交易', '求助问事', '拼车信息', '短租民宿', '生意转让', '交友项目', '宠物相关', '二手教材', '二手房产', '同城交友', '家居家具', '数码电子'],
    cateIndex:0,
    orderArray:['排序','时间','置顶'],
    orderIndex:0,
    listData:[],
    cityArray:[
      ['亚洲','北美',"大洋洲","欧洲","南美洲","非洲"],
      ['中国', '韩国', '日本', '新加坡', '马来西亚', '泰国', '越南', '菲律宾', '印度尼西亚', '阿联酋', '土耳其'],
      ['香港', '澳门', '台湾']
    ],
    cityIndex:[0,0,0],
    stateNameArray: [
      ['中国', '韩国','日本','新加坡','马来西亚','泰国','越南','菲律宾','印度尼西亚','阿联酋','土耳其'],
      ['美国', '加拿大','墨西哥'],
      ['澳大利亚','新西兰'],
      ['英国', '法国', '德国', '西班牙', '意大利', '荷兰', '捷克', '葡萄牙', '瑞士', '瑞典', '希腊', '俄罗斯'],
      ['阿根廷','巴西'],
      ['南非','埃及']
    ],
    cityNameArray: [
      [
        ['香港', '澳门', '台湾'],
        ['首尔', '釜山','济州岛','京畿道','仁川'],
        // ['','','']
        ['东京', '大阪', '名古屋','横滨'],
        ['新加坡'],
        ['吉隆坡', '槟城'],
        ['曼谷', '清迈', '芭提雅','普吉岛'],
        ['河内', '胡志明'],
        ['马尼拉'],
        ['雅加达'],
        ['迪拜'],
        ['伊斯坦布尔']
      ],
      [
        ['洛杉矶', '纽约', '旧金山', '圣地亚哥', '圣何塞', '伯克利', '芝加哥', '华盛顿', '西雅图', '休斯顿', '达拉斯', '费城', '波士顿', '夏威夷','奥兰多','拉斯维加斯','波特兰','丹佛','亚特兰大','佛罗里达'],
        ['多伦多', '温哥华','蒙特利尔','卡尔加里','渥太华','伦敦','滑铁卢','温尼伯'],
        ['墨西哥城']
      ],
      [
        ['悉尼', '墨尔本', '布里斯班','珀斯','阿德莱德','堪培拉','霍巴特','卧龙岗','纽卡斯尔','黄金海岸','凯恩斯'],
        ['奥克兰','惠灵顿','基督城']
      ],
      [
        ['伦敦', '伯明翰', '曼彻斯特','爱丁堡'],
        ['巴黎'],
        ['柏林', '慕尼黑', '法兰克福','汉堡','科隆'],
        ['马德里', '巴塞罗那'],
        ['罗马', '米兰', '佛伦伦萨'],
        ['阿姆斯特丹'],
        ['布拉格'],
        ['波尔图', '里斯本'],
        ['苏黎世'],
        ['斯德哥尔摩'],
        ['雅典'],
        ['莫斯科', '圣彼得堡']
      ],
      [
        ['布宜诺斯艾利斯'],
        ['里约热内卢','圣保罗']
      ],
      [
        ['开普敦','约翰内斯堡'],
        ['开罗']
      ]
  ],
    orgIndex:[0,0,0],
    orgCity:[]
  },
  
  onLoad: function () {
    wx.request({
      url: app.globalData.apiUrl + 'get_banner.php',
      success: res => {
        this.setData({
          imgUrls: res.data.data
        })
      }
    })
    this.getIndexList()
    var cityArray = this.data.cityArray
    this.setData({
      orgCity: cityArray
    })
  },
  getIndexList(){
    wx.request({
      url: app.globalData.apiUrl + 'get_list.php',
      success: res => {
        console.log(res)
        this.setData({
          listData:res.data.data
        })
      }
    })
  },
  swiperChange(e){
    this.setData({
      cateSelected: e.detail.current
    });
  },
  cateChange(e) {
    this.setData({
      cateIndex: e.detail.value
    })
  },
  orderChange(e) {
    this.setData({
      orderIndex: e.detail.value
    })
  },
  callPhone(e){
    lock=true;
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
      complete:res=>{
        lock = false;
      }
    })
    
  },
  cityChange(e){
    var v = e.detail.value;
    var cityArray = this.data.cityArray
    if (this.data.cityIndex != v) {
      this.setData({
        cityIndex: v,
        orgIndex:v,
        orgCity: cityArray
      })
    }
  },
  columnChange(e){
    var column = e.detail.column
    var value = e.detail.value
    if (column == 2) {
      return;
    }
    var cityArray = this.data.cityArray
    var cityIndex = this.data.cityIndex
    if (column==0){
      cityIndex = [value,0,0]
      this.setData({
        cityIndex: cityIndex
      })
      //选择洲
      cityArray[1] = this.data.stateNameArray[value]
      cityArray[2] = this.data.cityNameArray[value][0]
    }else{
      cityIndex[1] = value;
      cityIndex[2] = 0;
      this.setData({
        cityIndex: cityIndex
      })
      cityArray[2] = this.data.cityNameArray[cityIndex[0]][value]
    }
    this.setData({
      cityArray: cityArray
    })
  },
  columnCancel(e){
    var orgIndex = this.data.orgIndex
    var orgCity = this.data.orgCity
    this.setData({
      cityIndex: orgIndex,
      cityArray: orgCity
    })
  },
  showList(){
    wx.navigateTo({
      url: '/pages/view/viewList/viewList',
    })
  },
  viewDetail(e){
    if(lock){
      return
    }
    console.log(e);
    var v = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/view/viewDetail/viewDetail?id='+v,
    })
  }
})

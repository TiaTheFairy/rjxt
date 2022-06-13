function addScript () {
  var url = [
    'data_request.js',
    'WaterPump.js']
  for (var i in url) {
    document.write("<script language=javascript src=" + url[i] + "></script>");
  }
}

app_view = new Vue({
  el: ".div_view",
  data: {
    web_selector_view: '三维视图',
    web_selector_data: '数据视图',
    web_selector_resize: '若页面显示不正确, 请最大化窗口或全屏(点击此处切换全屏)',

    parts: ['电机', '电机支架', '齿轮箱', '齿轮箱支架', '轴承', '基坑里衬', '叶轮', '下支撑环'],
    parts_id: ['PRT0172_1090', 'PRT0161_1036', 'PRT0164_1028', 'PRT0026_159', 'PRT0039_230', 'PRT0043_234', 'PRT0149_912', 'PRT0103_683'],

    view_color_rgb: ["rgb(0, 255, 255)", "rgb(0, 255, 0)", "rgb(0, 0, 255)", "rgb(255, 255, 0)", "rgb(255, 0, 255)", "rgb(255, 0, 0)"],
    view_color_hex: [0x00ffff, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0xff0000],
    view_tip: '点击按钮改变颜色, 右击按钮清除颜色, 点击三维零件打开测点列表',
    view_right_head_no: '序号',
    view_right_head_number: '测点位号',
    view_right_head_name: '被测参数名称',
    view_right_head_next: '操作',
    view_right_detail: '详情',
    view_right_empty: '当前零件没有可用的测点',

    alert_onLoad: '本网页基于Chrome浏览器开发和测试, 如果遇到问题: \n请尝试使用Chrome并最大化或全屏窗口 \n谢谢!',
    alert_failJS: '执行JavaScript时出错了! 请反馈JS函数名称: ',
    alert_failVue: '执行Vue JS时出错了! 请反馈Vue JS函数名称: ',
    alert_unknown: '发生了未知错误 :-:',

    ifShowList: false,
    parts_data_arr: [{ number: '', name: '' }],
    partID_showing: '',
    partName_showing: '',
    partPoint_exist: true
  },
  mounted () {

  },
  methods: {
    clearPartsColor: function (index, e) {
      e.preventDefault()
      e.currentTarget.style.backgroundColor = 'rgb(255, 255, 255)';
      window.frames[0].partColorChanger(this.parts_id[index], 0x696969);
    },
    changePartsColor: function (index, e) {
      for (i in this.view_color_rgb) {
        if (e.currentTarget.style.backgroundColor == this.view_color_rgb[i]) {
          if (i == this.view_color_rgb.length - 1) {
            i = -1;
          }
          i++;
          break;
        }
      }
      e.currentTarget.style.backgroundColor = this.view_color_rgb[i];
      window.frames[0].partColorChanger(this.parts_id[index], this.view_color_hex[i]);
    },
    showList: function (partID) {
      this.parts_data_arr = requestViewList(partID);
      if (this.parts_data_arr.length == 0) {
        this.partPoint_exist = false;
      }
      else {
        this.partPoint_exist = true;
      }
      for (i in this.parts_id) {
        if (this.parts_id[i] == partID) {
          this.partName_showing = this.parts[i];
        }
      }
      this.partID_showing = partID;
      this.ifShowList = true;
      var floatList = document.getElementsByClassName('float_lists')[0];
      var w = 0;
      var id = setInterval(() => {
        floatList.style.width = 2 * w + 'px';
        w = w + 25;
        if (w >= 420) {
          window.clearInterval(id)
        }
      }, 10);
    },
    closeList: function () {
      var floatList = document.getElementsByClassName('float_lists')[0];
      var w = 420;
      var id = setInterval(() => {
        floatList.style.width = w + 'px';
        w = w - 50;
        if (w <= 0) {
          floatList.style.width = '0px';
          this.ifShowList = false;
          window.clearInterval(id)
        }
      }, 10);
      window.frames[0].partColorChanger('fixer', 0);
    },
    showDetail: function (index) {
      sessionStorage.setItem('ifGo', true);
      sessionStorage.setItem('item', this.parts_data_arr[index].number);
      window.location.href = "./data.html";
    }
  }
})
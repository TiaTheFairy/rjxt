function addScript () {
  var url = [
    'data_request.js'
  ]
  for (var i in url) {
    document.write("<script language=javascript src=" + url[i] + "></script>");
  }
}

app_data = new Vue({
  el: ".div_data",
  data: {
    web_selector_view: '三维视图',
    web_selector_data: '数据视图',
    web_selector_resize: '若页面显示不正确, 请最大化窗口或全屏(点击此处切换全屏)',

    parts: ['电机', '电机支架', '齿轮箱', '齿轮箱支架', '轴承', '基坑里衬', '叶轮', '下支撑环'],
    parts_id: ['PRT0172_1090', 'PRT0161_1036', 'PRT0164_1028', 'PRT0026_159', 'PRT0039_230', 'PRT0043_234', 'PRT0149_912', 'PRT0103_683'],

    data_search: '请输入参数ID或名称',
    data_search_notext: '请输入搜索内容',
    data_search_notype: '请使用参数ID或名称搜索',
    data_search_noresult: '没有搜索到相关内容',

    data_table_indexer: '序号',
    data_table_system: '系统',
    data_table_type: '参数类型',
    data_table_id: '参数ID',
    data_table_name: '参数名称',
    data_table_next: '操作',
    data_table_view: '数据可视化',
    data_table_empty: '该测点没有数据记录或数据服务器离线',
    data_table_index: 0,
    data_table_refresh: '在浏览图表时调整了浏览器尺寸, 请重新打开图表',

    alert_onLoad: '本网页基于Chrome浏览器开发和测试, 如果遇到问题: \n请尝试使用Chrome并最大化或全屏窗口 \n谢谢!',
    alert_failJS: '执行JavaScript时出错了! 请反馈JS函数名称: ',
    alert_failVue: '执行Vue JS时出错了! 请反馈Vue JS函数名称: ',
    alert_unknown: '发生了未知错误 :-:',

    ifShowChart: false,
    ifShowData: false,
    popHeight: 500,
    all_data_arr: [{ system: '', type: '', id: '', name: '' }]
  },
  mounted () {
    this.all_data_arr = requestDataList();

    if (sessionStorage.getItem('ifGo')) {
      setTimeout(function () {
        app_data.showCertainData(sessionStorage.getItem('item'));
      }, 100);
    }
  },
  methods: {
    getButtonData: function (e) {
      var id = e.currentTarget.parentElement.previousElementSibling.previousElementSibling.innerText;
      sessionStorage.setItem('ifGo', true);
      sessionStorage.setItem('item', id);
      this.showCertainData(id);
    },
    showCertainData: function (id) {
      for (var i in this.all_data_arr) {
        if (this.all_data_arr[i].id == id) {
          var datas = requestDataDiagram(id);
          if (datas.length == 0) {
            this.ifShowChart = false;
            this.ifShowData = true;
          }
          else {
            chart.source(datas);
            chart.render();
            this.data_table_index = parseInt(i);
            this.ifShowData = true;
          }
          var popup = document.getElementsByClassName('popup')[0];
          var h = 0;
          var intervalFunction = setInterval(() => {
            popup.style.height = 2 * h + 'px';
            h = h + 15;
            if (h > 200) {
              if (datas.length !== 0) {
                this.ifShowChart = true;
              }
              window.clearInterval(intervalFunction)
            }
          }, 10);
          return;
        }
      }
    },
    closeData: function () {
      var popup = document.getElementsByClassName('popup')[0];
      var h = 200;
      var id = setInterval(() => {
        popup.style.height = h + 'px';
        h = h - 30;
        if (h <= 0) {
          popup.style.height = '0px';
          this.ifShowData = false;
          this.ifShowChart = false;
          window.clearInterval(id)
        }
      }, 10);
    },
    searchData: function () {
      var value = document.getElementById("search").value;
      if (value == '' || /^\s+$/.test(value)) {
        alert(this.data_search_notext);
        return;
      }
      else if (/^CW.{0,2}$/.test(value)) {
        alert(this.data_search_notype);
        return;
      }
      for (var i in this.all_data_arr) {
        for (var j in this.all_data_arr[i]) {
          if (this.all_data_arr[i][j] == value) {
            var ele = document.getElementsByTagName('tr')[parseInt(i) + 1];
            ele.style.backgroundColor = 'aqua';
            ele.scrollIntoView();
            setTimeout(function () {
              ele.style.backgroundColor = 'white'
            }, 3000);
            return;
          }
        }
      }
      alert(this.data_search_noresult);
    }
  }
})

window.onresize = function () {
  if (app_data.ifShowData == true) {
    location = location;
  }
}
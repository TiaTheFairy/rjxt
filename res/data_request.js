function addScript () {
  var url = [
    'https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js']
  for (var i in url) {
    document.write("<script src=" + url[i] + "></script>");
  }
}

/*
url = ./viewList
{id: '零件ID'}
[{number: '测点位号', name: '被测参数名称}...]

url = ./dataDiagram
{name: '被测参数名称'}
[{time: '时间', value:'检测值'}...]
(时间中间不能有空格的, 比如2019-05-01/00:00:00这样才可以)
        
url = ./dataList
request: '00'
[{system:'系统', type:'参数类型', id:'参数ID', name:'参数名称'}...]
*/

// var serverAddress = 'http://192.168.0.1:5000';
var serverAddress = 'http://119.91.146.51:8080';

function requestViewList (partID) {
  var resultValue;
  $.ajax({
    url: serverAddress + "/viewList",
    type: "POST",
    data: JSON.stringify({ "request": "viewList", "id": partID }),
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    async: false,
    success: function (result) {
      console.log('成功获取零件测点列表.');
      resultValue = result;
    },
    error: function () {
      console.log('获取零件测点列表失败,使用测试值. 服务器地址: ' + serverAddress);
      resultValue = [];
    }
  })
  return resultValue;
}

function requestDataDiagram (pointID) {
  var resultValue;
  $.ajax({
    url: serverAddress + "/dataDiagram",
    type: "POST",
    data: JSON.stringify({ "id": pointID }),
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    timeout: 60000,
    async: false,
    success: function (result) {
      console.log('成功获取测点数据.');
      resultValue = result;
    },
    error: function () {
      console.log('获取测点数据失败,使用测试值. 服务器地址: ' + serverAddress);
      resultValue = [];
    }
  })
  return resultValue;
}

function requestDataList () {
  $.ajax({
    url: serverAddress + "/dataList",
    type: "POST",
    data: JSON.stringify({ 'request': '00' }),
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    async: false,
    success: function (result) {
      console.log('成功获取测点列表.');
      resultValue = result;
    },
    error: function () {
      console.log('获取测点列表失败,使用测试值. 服务器地址: ' + serverAddress);
      resultValue = [
        { system: 'FAILED', type: 'FAILED', id: 'FAILED', name: 'FAILED' },
        { system: 'system1', type: 'type1', id: 'id1', name: 'name1' },
        { system: 'system2', type: 'type2', id: 'id2', name: 'name2' },
        { system: 'system3', type: 't3ype', id: 'WCW107LP', name: 'WCW101MV_AVALUE' }
      ];
    }
  })
  return resultValue;
}
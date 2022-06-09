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
    data: JSON.stringify({ "id": partID }),
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    timeout: 5000,
    async: false,
    success: function (result) {
      resultValue = result;
    },
    error: function () {
      alert('获取零件测点列表失败,服务器是否在线?\n' + serverAddress);
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
    timeout: 10000,
    async: false,
    success: function (result) {
      resultValue = result;
    },
    error: function () {
      resultValue = [];
    }
  })
  return resultValue;
}

function requestDataList () {
  var resultValue;
  $.ajax({
    url: serverAddress + "/dataList",
    type: "POST",
    data: JSON.stringify({ 'request': '00' }),
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    timeout: 5000,
    async: false,
    success: function (result) {
      resultValue = result;
    },
    error: function () {
      alert('获取测点列表失败,服务器是否在线?\n' + serverAddress);
      resultValue = [];
    }
  })
  return resultValue;
}
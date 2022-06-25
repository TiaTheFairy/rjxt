function addScript () {
  var url = [
    'https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js',
    'server.js']
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

function requestViewList (partID) {
  var resultValue;
  $.ajax({
    url: portViewList,
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
      alert('获取零件测点列表失败,请刷新再试一次\n' + serverAddress);
      resultValue = [];
    }
  })
  return resultValue;
}

function requestDataDiagram (pointID) {
  var resultValue;
  $.ajax({
    url: portDataDiagram,
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
    url: portDataList,
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
      alert('获取测点列表失败,请刷新再试一次\n' + serverAddress);
      resultValue = [];
    }
  })
  return resultValue;
}
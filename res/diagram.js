function addScript () {
  var url = [
    'data_request.js']
  for (var i in url) {
    document.write("<script language=javascript src=" + url[i] + "></script>");
  }
}

var chart = new G2.Chart({
  container: 'container',
  width: document.documentElement.clientWidth,
  height: 500,
  autoFit: true,
});

chart.tooltip({
  crosshairs: {
    type: 'line'
  }
});
chart.line().position('time*value');
chart.point()
  .position('time*value')
  .size(1)
  .shape('circle')
  .style({
    stroke: '#fff',
    lineWidth: 1
  });
chart.scale({
  time: {
    tickCount: 20,
  }
});
chart.render();

//  antv g2 : https://g2.antv.vision/zh/docs/api/general/chart

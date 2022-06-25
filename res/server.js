//This file contains some arguments used to connect with the backend.
//Edit this file if you want to run the project on your device or your server.

//===================================================================================================
//This part refers to the cloud server address of the backend server.
//You may define it on your own with correct form.
//Please note there will be no error output if you mess any of the below.

//The IP address of the cloud server. You can also use local server if you want. Do not forget "http://" if you use remote server.
let serverAdress = 'http://119.91.146.51:8080';
//The path of the moduel file. You can also use local path if you want. Relative path should start in WaterPump.js
let moduelPath = serverAdress + '/WaterPump.obj';
//The port address of the server to listen several request.
let portViewList = serverAdress + '/viewList';
let portDataDiagram = serverAdress + '/dataDiagram';
let portDataList = serverAdress + '/dataList';
//===================================================================================================

//===================================================================================================
//This part refers to the information of the parts of the water pump module.
//You may define it on your own with correct form.
//Please note there will be no error output if you mess any of the below.

//The name of the module parts. You can edit them freely if you want without changing any other things.
let server_partName = ['电机', '电机支架', '齿轮箱', '齿轮箱支架', '轴承', '基坑里衬', '叶轮', '下支撑环'];
//The ID of the module parts. You may need to edit ID both here and in the backend if you want, as this will be used as the key to communicate with backend.
let server_partID = ['PRT0172_1090', 'PRT0161_1036', 'PRT0164_1028', 'PRT0026_159', 'PRT0039_230', 'PRT0043_234', 'PRT0149_912', 'PRT0103_683'];
//The letter references of the module parts. You may need to edit them both here and in the OBJ file if you want, but I strongly recommend you not to change this.
let server_partLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
//The color in RGB which will be shown at the buttons to change module parts color. You may edit them freely if you want without changing any other things.
let server_colorInRGB = ["rgb(0, 255, 255)", "rgb(0, 255, 0)", "rgb(0, 0, 255)", "rgb(255, 255, 0)", "rgb(255, 0, 255)", "rgb(255, 0, 0)"];
//The color in HEX which will be shown on the module parts when clicking color changing buttons. You may edit them freely if you want without changing any other things.
let server_colorInHEX = [0x00ffff, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0xff0000];
//===================================================================================================
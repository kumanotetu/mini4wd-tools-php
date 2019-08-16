
/* Get Cookie. */
var cookieMap = new Array();
if (document.cookie != "") {
    let cookieValue = document.cookie.split('; ');
    for (let i = 0; i < cookieValue.length; i++) {
        let data = cookieValue[i].split('=');
        cookieMap[data[0]] = decodeURIComponent(data[1]);
    }
} else {
    cookieMap['wh-base'] = "0";
    cookieMap['t-size'] = "0";
    cookieMap['f-length'] = "0";
    cookieMap['f-width'] = "0";
    cookieMap['r-length'] = "0";
    cookieMap['r-width'] = "0";
    cookieMap['isCookie'] = "";
}

/* Page OnLoad Event. */
const init = () => {
    /* Set Machine Parameter in Cookie. */
    document.getElementById('wh-base').value = cookieMap['wh-base'];
    document.getElementById('t-size').value = cookieMap['t-size'];
    document.getElementById('f-length').value = cookieMap['f-length'];
    document.getElementById('f-width').value = cookieMap['f-width'];
    document.getElementById('r-length').value = cookieMap['r-length'];
    document.getElementById('r-width').value = cookieMap['r-width'];

    if (cookieMap['isCookie'] == "1") {
        document.getElementById('isCookie').checked = true;
    }

    /* Select Chassis Listbox. */
    let chassisArray = ["80", "82", "83", "84"];
    let wh_base = document.getElementById('wh-base').value;
    if (chassisArray.indexOf(wh_base) > -1) {
        document.getElementById('chassis').value = wh_base;
    }
    /* Select Tire Listbox. */
    let tireArray = ["26", "24", "31", "35"];
    let t_size = document.getElementById('t-size').value;
    if (tireArray.indexOf(t_size) > -1) {
        document.getElementById('tire').value = t_size;
    }
}

/* Calc Button OnClick Event. */
const onClickCalc = () => {
    resetInputParams();
    setCookie();
    openCalcBrakeSettingAPI();
}

/* Set Cookie from Machine Parameter. */
const setCookie = () => {
    let cookieLimit = "";
    let isCookie = document.getElementById('isCookie').value;
    if (isCookie == "1") {
        let now = new Date();
        now.setMonth(now.getMonth() + 1);
        cookieLimit = ";expires=" + now.toUTCString();
    } else {
        cookieLimit = ";max-age=0";
    }

    document.cookie = "wh-base=" + encodeURIComponent(document.getElementById('wh-base').value) + cookieLimit;
    document.cookie = "t-size=" + encodeURIComponent(document.getElementById('t-size').value) + cookieLimit;
    document.cookie = "f-length=" + encodeURIComponent(document.getElementById('f-length').value) + cookieLimit;
    document.cookie = "f-width=" + encodeURIComponent(document.getElementById('f-width').value) + cookieLimit;
    document.cookie = "r-length=" + encodeURIComponent(document.getElementById('r-length').value) + cookieLimit;
    document.cookie = "r-width=" + encodeURIComponent(document.getElementById('r-width').value) + cookieLimit;

    document.cookie = "isCookie=" + encodeURIComponent(document.getElementById('isCookie').value) + cookieLimit;
}

/* Chassis Listbox OnChange Event. */
const changeChassis = () => {
    let wh_base = document.getElementById('chassis').value;
    if (wh_base != "") {
        document.getElementById('wh-base').value = wh_base;
    }
}

/* Tire Listbox OnChange Event. */
const changeTire = () => {
    let t_size = document.getElementById('tire').value;
    if (t_size != "") {
        document.getElementById('t-size').value = t_size;
    }
}

const resetInputParams = () => {
    resetParam('wh-base');
    resetParam('t-size');
    resetParam('f-length');
    resetParam('f-width');
    resetParam('r-length');
    resetParam('r-width');
}
const resetParam = (name) => {
    let param = nullIsZero(document.getElementById(name).value);
    document.getElementById(name).value = param;
};
const nullIsZero = (value) => {
    return "" == value ? "0" : value;
};

/* Open CalcBrakeSetting API */
const openCalcBrakeSettingAPI = () => {
    /* Get Input Parameter */
    let wh_base = parseFloat(document.getElementById('wh-base').value);
    let t_size = parseFloat(document.getElementById('t-size').value);
    let f_length = parseFloat(document.getElementById('f-length').value);
    let f_width = parseFloat(document.getElementById('f-width').value);
    let r_length = parseFloat(document.getElementById('r-length').value);
    let r_width = parseFloat(document.getElementById('r-width').value);
    let check_bank = parseFloat(document.getElementById('check-bank').value);

    let req = new XMLHttpRequest();
    req.onload = () => {
        console.log("readyState:"+req.readyState);
        console.log("status:"+req.status);
        console.log(req.response);
        if (req.readyState == 4 && req.status == 200) {
            let errMessage = document.getElementById('err-message');
            errMessage.innerText = "";
            let data = req.response;
            if (data.status == 'OK') {
                document.getElementById('f-height-out').value = data.result_parameter.f_height_out;
                document.getElementById('f-height-in').value = data.result_parameter.f_height_in;
                document.getElementById('r-height-out').value = data.result_parameter.r_height_out;
                document.getElementById('r-height-in').value = data.result_parameter.r_height_in;
    
                document.getElementById('f-angle').value = data.result_parameter.f_angle;
                document.getElementById('r-angle').value = data.result_parameter.r_angle;
            } else {
                errMessage.innerText = data.message;
            }
            
        }
    }
    let URL = "https://dev.tools.mini4wd-engineer.com/api/api.php";
    URL += "?wh-base="  + wh_base;
    URL += "&t-size="   + t_size;
    URL += "&f-length=" + f_length;
    URL += "&f-width="  + f_width;
    URL += "&r-length=" + r_length;
    URL += "&r-width="  + r_width;
    URL += "&check-bank=" + check_bank;
    console.log(URL);
    req.open('GET', URL, true);
    req.responseType = 'json';
    req.send(null);
}

/* Open Coke Sound. */
const cokeSound = () => {
    let cokeSound = document.getElementById("coke_sound");
    cokeSound.currentTime = 0;
    cokeSound.play();
}
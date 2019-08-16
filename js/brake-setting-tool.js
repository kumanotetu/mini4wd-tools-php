
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
    checkMachineParameter();
    calcBrakeSetting();
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

/* Check Machine Parameter. */
const checkMachineParameter = () => {
    let errMessage = document.getElementById('err-message');
    errMessage.innerText = "";

    let wh_base = parseFloat(document.getElementById('wh-base').value);
    let t_size = parseFloat(document.getElementById('t-size').value);
    let f_length = parseFloat(document.getElementById('f-length').value);
    let f_width = parseFloat(document.getElementById('f-width').value);
    let r_length = parseFloat(document.getElementById('r-length').value);
    let r_width = parseFloat(document.getElementById('r-width').value);

    if (165 < (wh_base + f_length + f_width + r_length + r_width)) {
        errMessage.innerText = "全長が165mmを超えています";
    } else if (wh_base < 0 || t_size < 0 || f_length < 0 || f_width < 0 || r_length < 0 || r_width < 0) {
        errMessage.innerText = "入力値にマイナスが設定されています";
    } else if (wh_base == 0 || t_size == 0 || f_length == 0 || f_width == 0 || r_length == 0 || r_width == 0) {
        errMessage.innerText = "入力値に0が設定されています";
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

/* Calc */
const calcBrakeSetting = () => {
    let errLength = document.getElementById('err-message').innerText.length;
    if (errLength > 0) {
        alert("入力値に異常があるため計算しません。");
        return;
    }
    let wh_base = parseFloat(document.getElementById('wh-base').value);
    let t_size = parseFloat(document.getElementById('t-size').value);
    let f_length = parseFloat(document.getElementById('f-length').value);
    let f_width = parseFloat(document.getElementById('f-width').value);
    let r_length = parseFloat(document.getElementById('r-length').value);
    let r_width = parseFloat(document.getElementById('r-width').value);
    let check_bank = parseFloat(document.getElementById('check-bank').value);

    /* Calc height. */
    let f_height_out = check_bank - Math.sqrt((check_bank) ** 2 - (wh_base / 2 + f_length + f_width) ** 2) - (check_bank - (Math.sqrt((check_bank - 2 / t_size) ** 2 - (wh_base / 2) ** 2) + 2 / t_size));
    let f_height_in = check_bank - Math.sqrt((check_bank) ** 2 - (wh_base / 2 + f_length) ** 2) - (check_bank - (Math.sqrt((check_bank - 2 / t_size) ** 2 - (wh_base / 2) ** 2) + 2 / t_size));
    let r_height_out = check_bank - Math.sqrt((check_bank) ** 2 - (wh_base / 2 + r_length + r_width) ** 2) - (check_bank - (Math.sqrt((check_bank - 2 / t_size) ** 2 - (wh_base / 2) ** 2) + 2 / t_size));
    let r_height_in = check_bank - Math.sqrt((check_bank) ** 2 - (wh_base / 2 + r_length) ** 2) - (check_bank - (Math.sqrt((check_bank - 2 / t_size) ** 2 - (wh_base / 2) ** 2) + 2 / t_size));

    /* Calc angle. */
    var rediansToDegrees = (angle) => angle * 180 / Math.PI;
    let f_angle = rediansToDegrees(Math.asin((f_height_out - f_height_in) / f_width));
    let r_angle = rediansToDegrees(Math.asin((r_height_out - r_height_in) / r_width));

    document.getElementById('f-height-out').value = Math.round(f_height_out * 100) / 100;
    document.getElementById('f-height-in').value = Math.round(f_height_in * 100) / 100;
    document.getElementById('r-height-out').value = Math.round(r_height_out * 100) / 100;
    document.getElementById('r-height-in').value = Math.round(r_height_in * 100) / 100;

    document.getElementById('f-angle').value = Math.round(f_angle * 10) / 10;
    document.getElementById('r-angle').value = Math.round(r_angle * 10) / 10;
}

/* Open Coke Sound. */
const cokeSound = () => {
    let cokeSound = document.getElementById("coke_sound");
    cokeSound.currentTime = 0;
    cokeSound.play();
}
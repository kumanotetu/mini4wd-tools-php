<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Mini4wd Brake Setting Tool</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="auther" content="kumanotetu">
    <link rel='apple-touch-icon' sizes='180x180' href='apple-touch-icon-180x180.png'>
    <link rel="icon" type="image/png" href="icon-192x192.png">
    <link rel='manifest' href='manifest.json'>
    <audio id="coke_sound" preload="auto">
        <source src="audio/coke_sound.wav" type="audio/wav">
    </audio>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" media="screen" href="css/brake-setting-tool.css">
    <script>
        if ("serviceWorker" in navigator) {
            if (navigator.serviceWorker.controller) {
                console.log("[PWA Builder] active service worker found, no need to register");
            } else {
                // Register the service worker
                navigator.serviceWorker
                    .register("sw.js", {
                        scope: "./"
                    })
                    .then(function (reg) {
                        console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
                    });
            }
        }
    </script>  
    <script src="js/brake-setting-tool.js"></script>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script src="js/bootstrap.min.js"></script>

</head>

<body onload="init();">
    <div class="container">
        <div class="panel-group">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title"><a>マシンデータ</a></h3>
                </div>
                <div class="panel-body">
                    <ul>
                        <li>
                            <p>
                                <label for="wh-base" class="param-name">ホイールベース</label>
                                <input id="wh-base" class="machine-param" type="number" step="0.1" name="wh-base"
                                    size="3" value="0" />mm
                                <select id="chassis" name="chassis" onchange="changeChassis();">
                                    <option value=""></option>
                                    <option value="80">MA/MS/VS/S2/S1</option>
                                    <option value="82">AR/TZ/TZ-X</option>
                                    <option value="83">FM-A/SFM/FM</option>
                                    <option value="84">SX/SXX</option>
                                </select>
                            </p>
                        </li>
                        <li>
                            <p>
                                <label for="t-size" class="param-name">タイヤサイズ</label>
                                <input id="t-size" class="machine-param" type="number" step="0.1" name="t-size" size="3"
                                    value="0" />mm
                                <select id="tire" name="tire" onchange="changeTire();">
                                    <option value=""></option>
                                    <option value="26">小径ローハイト</option>
                                    <option value="24">小径</option>
                                    <option value="31">大径</option>
                                    <option value="35">超大型</option>
                                </select>
                            </p>
                        </li>
                        <li>
                            <p>
                                <label for="f-length" class="param-name">F車軸～Fブレーキ内側まで</label>
                                <input id="f-length" class="machine-param" type="number" step="0.1" name="f-length"
                                    size="3" value="0" />mm
                            </p>
                        </li>
                        <li>
                            <p>
                                <label for="f-width" class="param-name">Fブレーキ縦幅</label>
                                <input id="f-width" class="machine-param" type="number" step="0.1" name="f-width"
                                    size="3" value="0" />mm
                            </p>
                        </li>
                        <li>
                            <p>
                                <label for="r-length" class="param-name">R車軸～Rブレーキ内側まで</label>
                                <input id="r-length" class="machine-param" type="number" step="0.1" name="r-length"
                                    size="3" value="0" />mm
                            </p>
                        </li>
                        <li>
                            <p>
                                <label for="r-width" class="param-name">Rブレーキ縦幅</label>
                                <input id="r-width" class="machine-param" type="number" step="0.1" name="r-width"
                                    size="3" value="0" />mm
                            </p>
                        </li>
                        <li>
                            <p>
                                <label id="err-message" style="color: red"></label>
                            </p>
                        </li>
                        <li>
                            <P>
                                <input id="isCookie" type="checkbox" name="isCookie"
                                    value="1">Cookieを使用してブラウザにマシンデータを保存する
                            </P>
                        </li>
                        <li>
                            <select id="check-bank" name="check-bank">
                                <option value="680">JCJC バンク</option>
                                <option value="350" hidden>JCJC スロープ</option>
                                <option value="400" hidden>JCJC LC</option>
                                <option value="1060" hidden>5レーン 30°バンク</option>
                                <option value="750" hidden>5レーン 45°バンク</option>
                                <option value="700">ライジングファントムチェンジャー</option>
                            </select>
                        </li>
                        <li>
                            <p>
                                <div class="btn-toolbar" role="toolbar">
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-success"
                                            onclick="onClickCalc();">計算</button>
                                    </div>
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-warning"
                                            onclick="cokeSound();">プシュ</button>
                                    </div>
                                </div>
                            </p>
                        </li>
                    </ul>

                </div>
            </div>
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title"><a>ブレーキ高の計算結果</a></h3>
                </div>
                <div class="panel-body">
                    <ul aria-disabled="true">
                        <li>
                            <p>
                                <label for="f-height-out" class="param-name">フロントブレーキ高さ(外側)</label>
                                <input id="f-height-out" type="text" name="f-height-out" size="3" value="0" readonly>mm
                            </p>
                        </li>
                        <li>
                            <p>
                                <label for="f-height-in" class="param-name">フロントブレーキ高さ(内側)</label>
                                <input id="f-height-in" type="text" name="f-height-in" size="3" value="0" readonly>mm
                            </p>
                        </li>
                        <li>
                            <p>
                                <label for="f-angle" class="param-name">フロントブレーキ角度</label>
                                <input id="f-angle" type="text" name="f-angle" size="3" value="0" readonly>°
                            </p>
                        </li>
                        <li>
                            <p>
                                <label for="r-height-out" class="param-name">リアブレーキ高さ(外側)</label>
                                <input id="r-height-out" type="text" name="r-height-out" size="3" value="0" readonly>mm
                            </p>
                        </li>
                        <li>
                            <p>
                                <label for="r-height-in" class="param-name">リアブレーキ高さ(内側)</label>
                                <input id="r-height-in" type="text" name="r-height-in" size="3" value="0" readonly>mm
                            </p>
                        </li>
                        <li>
                            <p>
                                <label for="r-angle" class="param-name">リアブレーキ角度</label>
                                <input id="r-angle" type="text" name="r-angle" size="3" value="0" readonly>°
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <span class="label label-default pull-left">v0.2.1</span>
</body>
</html>
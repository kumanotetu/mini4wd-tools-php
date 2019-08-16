<?php

////////////////////////////////////////////////////////

/* json共通情報 */
$json = headDescription();
$message = checkMachineParameter();

if(empty($message)) {
    // numをエスケープ(xss対策)
    $wh_base  = floatval(htmlspecialchars($_GET['wh-base']));
    $t_size   = floatval(htmlspecialchars($_GET['t-size']));
    $f_length = floatval(htmlspecialchars($_GET['f-length']));
    $f_width  = floatval(htmlspecialchars($_GET['f-width']));
    $r_length = floatval(htmlspecialchars($_GET['r-length']));
    $r_width  = floatval(htmlspecialchars($_GET['r-width']));

    $bank_array = [
        1 => 680,  /* JCJCバンク */
        2 => 350,  /* JCJCスロープ */
        3 => 400,  /* JCJC LC */
        4 => 1060, /* 5レーン30°バンク */
        5 => 750,  /* 5レーン45°バンク */
        6 => 700   /* ライジングファントムチェンジャー */
    ];
    $bank_key = intval(htmlspecialchars($_GET['check-bank']));
    $check_bank = $bank_array[$bank_key];

    /* Calc height. */
    $f_height_out = $check_bank - sqrt(($check_bank) ** 2 - ($wh_base / 2 + $f_length + $f_width) ** 2) - ($check_bank - (sqrt(($check_bank - 2 / $t_size) ** 2 - ($wh_base / 2) ** 2) + 2 / $t_size));
    $f_height_in = $check_bank - sqrt(($check_bank) ** 2 - ($wh_base / 2 + $f_length) ** 2) - ($check_bank - (sqrt(($check_bank - 2 / $t_size) ** 2 - ($wh_base / 2) ** 2) + 2 / $t_size));
    $r_height_out = $check_bank - sqrt(($check_bank) ** 2 - ($wh_base / 2 + $r_length + $r_width) ** 2) - ($check_bank - (sqrt(($check_bank - 2 / $t_size) ** 2 - ($wh_base / 2) ** 2) + 2 / $t_size));
    $r_height_in = $check_bank - sqrt(($check_bank) ** 2 - ($wh_base / 2 + $r_length) ** 2) - ($check_bank - (sqrt(($check_bank - 2 / $t_size) ** 2 - ($wh_base / 2) ** 2) + 2 / $t_size));

    /* Calc angle. */
    $rediansToDegrees = function($angle) { return $angle * 180 / M_PI; };
    $f_angle = $rediansToDegrees(asin(($f_height_out - $f_height_in) / $f_width));
    $r_angle = $rediansToDegrees(asin(($r_height_out - $r_height_in) / $r_width));

    $status = ['status' => 'OK'];
    $j_param = [
        'result_parameter' => [
            'f_height_out' => round($f_height_out * 100) / 100,
            'f_height_in'  => round($f_height_in  * 100) / 100,
            'r_height_out' => round($r_height_out * 100) / 100,
            'r_height_in'  => round($r_height_in  * 100) / 100,
            'f_angle' => round($f_angle * 10) / 10,
            'r_angle' => round($r_angle * 10) / 10
        ]
    ];
    $j_value = viewParams($wh_base, $t_size, $f_length, $f_width, $r_length, $r_width, $check_bank);
    $json = array_merge($json, $status, $j_value, $j_param);

} else {
    $status = ['status' => 'NG'];
    $json = array_merge($json, $status, $message);
}

/* jsonファイル作成＆出力 */
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
echo json_encode($json, JSON_UNESCAPED_UNICODE);

////////////////////////////////////////////////////////

/* Check Machine Parameter. */
function checkMachineParameter() {
    if ( 
        !isset($_GET['wh-base'])
     || !isset($_GET['t-size'])
     || !isset($_GET['f-length'])
     || !isset($_GET['f-width'])
     || !isset($_GET['r-length'])
     || !isset($_GET['r-width'])
     || !isset($_GET['check-bank'])
    ) {
        return ['message' => '入力値が未設定です'];
    } else if ( 
          !is_numeric($_GET["wh-base"])
       || !is_numeric($_GET["t-size"])
       || !is_numeric($_GET["f-length"])
       || !is_numeric($_GET["f-width"])
       || !is_numeric($_GET["r-length"])
       || !is_numeric($_GET["r-width"])
       || !is_numeric($_GET["check-bank"])
    ) {
        return ['message' => '入力値に数値以外が設定されています'];
    }
    $wh_base  = doubleval($_GET["wh-base"]);
    $t_size   = doubleval($_GET["t-size"]);
    $f_length = doubleval($_GET["f-length"]);
    $f_width  = doubleval($_GET["f-width"]);
    $r_length = doubleval($_GET["r-length"]);
    $r_width  = doubleval($_GET["r-width"]);
    $check_bank = doubleval($_GET["check-bank"]);

    if (165 < ($wh_base + $t_size + $f_width + $r_length + $r_width)) {
        $message = [ 'message' => '全長が165mmを超えています'];
    } else if ($wh_base < 0 || $t_size < 0 || $f_length < 0 || $f_width < 0 || $r_length < 0 || $r_width < 0) {
        $message = ['message' => '入力値にマイナスが設定されています'];
    } else if ($wh_base == 0 || $t_size == 0 || $f_length == 0 || $f_width == 0 || $r_length == 0 || $r_width == 0) {
        $message = ['message' => '入力値に0が設定されています'];
    }

    if (empty($message)) {
        return [];
    } else {
        return array_merge($message, viewParams($wh_base, $t_size, $f_length, $f_width, $r_length, $r_width, $check_bank));
    }
}
/* Join Parameters. */
function viewParams($wh_base, $t_size, $f_length, $f_width, $r_length, $r_width, $check_bank) {
    $result = [
        'input-parameter' => [
            'wh_base'  => $wh_base,
            't_size'   => $t_size,
            'f_length' => $f_length,
            'f_width'  => $f_width,
            'r_length' => $r_length,
            'r_width'  => $r_width,
            'check_bank' => $check_bank
        ]
    ];
    return  $result;
}
/* 共通json部分 */
function headDescription() {
    return [
        'title' => 'ミニ四駆ブレーキ高セッティングAPI',
        'description' => [
            'comment' => 'マシンパラメータと調べたい傾斜番号を渡すことでギリギリ接触する前後のブレーキ高を計算するAPI',
            'input_parameter' => [
                'wh_base'  => 'ホイールベース(mm)',
                't_size'   => 'タイヤ直径(mm)',
                'f_length' => '前車軸からフロントブレーキ内側までの距離(mm)',
                'f_width'  => 'フロントブレーキ内側から外側までの距離、ブレーキの幅(mm)',
                'r_length' => '後車軸からリアブレーキ内側までの距離(mm)',
                'r_width'  => 'リアブレーキ内側から外側までの距離、ブレーキの幅(mm)',
                'check_bank' => [
                    '1' => 'JCJCバンク',
                    '6' => 'ライジングファントムチェンジャー'
                ]
            ],
            'result_parameter' => [
                'f_height_out' => 'フロントブレーキ外側の高さ(mm)',
                'f_height_in'  => 'フロントブレーキ内側の高さ(mm)',
                'r_height_out' => 'リアブレーキ外側の高さ(mm)',
                'r_height_in'  => 'リアブレーキ内側の高さ(mm)',
                'f_angle' => 'フロントブレーキの角度(°)',
                'r_angle' => 'リアブレーキの角度(°)',
            ]
        ],
        'usage' =>  (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . '/api/api.php?wh-base=80&t-size=24&f-length=20&f-width=6&r-length=30&r-width=6&check-bank=1',
        'api_version' => '1.0.0'
    ];
}
?>

<?php

$token = "7238360214:AAED9R27wBHgJVnU4nCw4LavUxrZ0L9gubA";

$chat_id = "-4288535116";

/*$token = "7405933413:AAHRb-M7T282WvILRR8pkUCzacyxiauaahQ";

$chat_id = "-4273521241";*/

if ($_POST['act'] == 'order') {
    $name = ($_POST['name']);
    $home = ($_POST['home']);
    $product = ($_POST['product']);
    $street = ($_POST['count_pers']);
    $podhome = ($_POST['my-browser']);
    $comment = ($_POST['comment']);
    $kvartira = ($_POST['kvartira']);
    $tel = ($_POST['tel']);
    $price = ($_POST('price'));

    $arr = array(
        'Имя:' => $name,
        'Заказ:' => $product,
        'Телефон:' => $tel,
        'Количество персон:' => $street,
        'Дом:' => $home,
        'Способ оплаты:' => $podhome,
        'Этаж:' => $levelhome,
        'Коментарий к заказу:' => $comment,
        'Цена': => $price
    );

    foreach($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    };

    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

    if ($sendToTelegram) {
        echo($txt);
        alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
    }

    else {
        echo($txt);
        alert('Что-то пошло не так. ПОпробуйте отправить форму ещё раз.');
    }
}

<?php

if((isset($_POST['fio'])&&$_POST['fio']!="")||(isset($_POST['phone'])&&$_POST['phone']!="")||(isset($_POST['email'])&&$_POST['email']!="")){
    $to = 'theoryofsoul1@gmail.com';
    $subject = 'Форма заявки на покупку';
    $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>ФИО: '.$_POST['fio'].'</p>
                        <p>Телефон: '.$_POST['phone'].'</p>
                        <p>Эл. почта: '.$_POST['email'].'</p>
                        <p>Вопрос или комментарий: '.$_POST['question'].'</p>
                    </body>
                </html>';
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: Отправитель <".$_POST['email'].">\r\n";
    if(mail($to, $subject, $message, $headers)) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false));
    }
}
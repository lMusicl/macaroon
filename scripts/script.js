$(document).ready(function () {
    // скрываем лоудер и "Спасибо за заказ"
    let loader = $('.loader');
    let success = $('.success');
    loader.hide();
    success.hide();
    // меню бургер
    let menu = $('#menu');
    // открываем меню
    $('#burger').on('click', function () {
        menu.addClass('open');
    });
    // закрытие при нажатии на любой из элементов
    $.each(menu.find('*'), (index, value) => {
        value.onclick = () => {
            menu.removeClass('open');
        }
    })
    // валидация формы
    let form = $("#basic-form");
    form.validate({
        // правила
        rules: {
            product: {
                required: true
            },
            name: {
                required: true
            },
            phone: {
                required: true,
                digits: true
            }
        },
        // сообщения об ошибках
        messages: {
            product: {
                required: 'Выберете макарун'
            },
            name: {
                required: 'Введите имя'
            },
            phone: {
                required: 'Введите телефон',
                digits: 'Нужно вводить только цифры'
            }
        },
        // функция при отправке валидной формы
        submitHandler: function () {
            loader.show();// показываем loader при отправке формы
            // запрос на сервер
            $.ajax({
                url: 'https://testologia.site/checkout',
                method: 'post',
                dataType: 'html',
                data: $('#basic-form').serialize(),
                success: function(data){
                    loader.hide();// скрываем loader при ответе
                    $('#message').html(data);
                    let result = JSON.parse(data);// из json в объект
                    // проверка ответа
                    if(result.success === 1){
                        form.hide();
                        $('.form__title, .form__info').hide();
                        success.show();
                    } else {
                        alert ('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ!')
                    }
                }
            });
            // не перезагружаем страницу
            return false
        }
    });
})
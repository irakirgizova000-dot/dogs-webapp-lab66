let tg = window.Telegram.WebApp;

tg.expand();
tg.ready();

// Настройка главной кнопки
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";
tg.MainButton.setText("Показать информацию");
tg.MainButton.hide();

const dogs = {
    labrador: "Лабрадор",
    shepherd: "Немецкая овчарка",
    husky: "Хаски",
    pug: "Мопс",
    bulldog: "Бульдог",
    dachshund: "Такса",
    poodle: "Пудель",
    chihuahua: "Чихуахуа"
};

let selectedDog = null;
const status = document.getElementById("status");

// Обработчики кнопок выбора породы
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function () {
        // снимаем выделение со всех
        document.querySelectorAll(".btn").forEach(btn => {
            btn.classList.remove("selected");
        });

        // выделяем текущую
        this.classList.add("selected");
        selectedDog = this.getAttribute("data-dog");

        status.textContent = "Выбрана порода: " + dogs[selectedDog];

        // показываем зелёную кнопку
        tg.MainButton.setText("Показать информацию");
        tg.MainButton.show();
    });
});

// Нажатие на зелёную кнопку (MainButton) — правильный способ
tg.onEvent("mainButtonClicked", function () {
    if (selectedDog) {
        console.log("Отправляем:", selectedDog);
        tg.sendData(selectedDog);   // закрывает WebApp и отправляет данные боту
    } else {
        tg.showAlert("Пожалуйста, выберите породу!");
    }
});

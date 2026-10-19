
const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

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

document.querySelectorAll("[data-dog]").forEach(button => {
    button.addEventListener("click", () => {
        selectedDog = button.dataset.dog;

        document.querySelectorAll("[data-dog]").forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        status.textContent =
            "Выбрана порода: " + dogs[selectedDog];

        tg.MainButton.setText("Показать информацию");
        tg.MainButton.show();
    });
});

tg.MainButton.onClick(() => {
    if (selectedDog !== null) {
        tg.sendData(selectedDog);
    }
});

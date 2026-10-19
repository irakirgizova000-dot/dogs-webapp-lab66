
const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

// После публикации Python-сервера замени адрес ниже на адрес Render.
const API_URL = "https://ТВОЙ-СЕРВЕР.onrender.com";

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
const confirmButton = document.getElementById("confirm-button");
const selectButtons = document.querySelectorAll("[data-dog]");

selectButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedDog = button.dataset.dog;

        selectButtons.forEach(item => {
            item.classList.toggle("selected", item === button);
        });

        status.textContent = `Выбрана порода: ${dogs[selectedDog]}`;
        confirmButton.disabled = false;
    });
});

confirmButton.addEventListener("click", async () => {
    if (!selectedDog) {
        status.textContent = "Сначала выбери породу.";
        return;
    }

    if (!tg.initData) {
        status.textContent =
            "Открой мини-приложение через меню Telegram.";
        return;
    }

    confirmButton.disabled = true;
    status.textContent = "Отправляем запрос боту…";

    try {
        const response = await fetch(`${API_URL}/api/select-dog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                initData: tg.initData,
                dog: selectedDog
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Не удалось отправить запрос.");
        }

        status.textContent =
            `Готово! Информация о породе «${dogs[selectedDog]}» отправлена в чат с ботом.`;

    } catch (error) {
        console.error("Ошибка отправки:", error);

        status.textContent =
            "Не удалось связаться с сервером. Попробуй ещё раз.";
    } finally {
        confirmButton.disabled = false;
    }
});

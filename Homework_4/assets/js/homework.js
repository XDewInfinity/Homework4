/*
Задания

В вёрстку можно вносить любые изменения (добавлять классы, дата-артрибуты, id и так далее) без изменения внешнего вида. Нельзя изменять другие JS файлы, подключаемые к HTML

    1.  На первом экране вы видите 3 блока с class="features-content". Они внутри себя содержат <div class="content-hide" ></div>, который
        содержит необходимую информацию. При наведении курсора на div с class="features-content" сделайте так, чтобы <div class="content-hide" ></div>
        показывался, а когда уводили курор, то блок с class="features-content" становился предыдущих размеров.

        P.S. Нормально, если при наведении на див с class="features-content" он становится оранжевым - это можно не фиксить

    2.  На втором экране вы видите табы:
        а) Best Education
        б) Top Managemen
        в) Quality Meeting
        При нажатии на каждый из этих табов (квадратик или название) сайтик должен показывать соответствующий блок информации
        с нужной фотографией, описанием и заголовком.

        P.S. Сейчас показаны все блоки с описанием

    3. На третьем экране есть отсчёт обратного времени. Сделайте так, чтобы обратный отсчёт был в режиме реального времени (посекундно).
    В качестве дедлайна (крайней даты) возьмите 31.12.2023

    P.S. Подсказка - в 22_js уроке в проекте Food разбирается, как работать со счётчиком

    4.  На 4-ом экране есть 5 карточек, заполненные информацией. Сделайте так, чтобы верстка подтягивалась и вставлялась в HTML документа
        из JS, а именно из массива coursesMass. Это значит, в самом HTML не должно быть верстки (вам нужно будет удалить),
        и она должна вставляться только через JS

*/

// import features from "./modules/features"
// import tab from "./modules/tabs"
// import timer from "./modules/timer"

// Задание 3

document.addEventListener("DOMContentLoaded", () => {

    const deadline = "2024-01-01T00:00:00", // Задаём переменную до которой будет вестись отсчёт
    // находим все необходимые для счетчика элементы в HTML-документе
    counter = document.querySelector(".counter"),
    days = counter.querySelector(".days .value"),
    hours = counter.querySelector(".hours .value"),
    minutes = counter.querySelector(".minutes .value"),
    seconds = counter.querySelector(".seconds .value")

    // создадим функцию, которая будет подсчитывать кол-во дней, часов, минут и секунд от задданого времени до настоящего
    function getTime(time) {
      const t = Date.parse(time) - Date.now(),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60)
      //возвращаем словарь значений
      return {
        time: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      }
    }
    // Функция-декоратор, которая добавляет ноль перед числом, если то меньше 10
    function addZero(num) {
      if (num >= 0 && num < 10) {
        return "0" + num
      } else {
        return num
      }
    }

    // Зададим функцию, которая с интервалом в 1 секунду обновляет счётчик
    function setTime(time) {     
      const timeInterval = setInterval(updateTime, 1000)
      // Зададим функцию обновления значений
      function updateTime() {
        const t = getTime(time)
        days.innerHTML = addZero(t.days)
        hours.innerHTML = addZero(t.hours)
        minutes.innerHTML = addZero(t.minutes)
        seconds.innerHTML = addZero(t.seconds)
      }
    }
    // Добавляем проверку на то, что разница во времени >= 0 для корректной работы таймера
    if (Date.parse(deadline) - Date.now() <= 0) {
      clearInterval(timeInterval)
    } 
    else{
      setTime(deadline)
    }

// Создаем две функции, одна из которых показывает контент, а другая скрывает

  const features = document.querySelectorAll(".features-content"),
  content = document.querySelectorAll(".content-hide")
  function showContent(id) {
      content.forEach((item) => {
      const data = item.getAttribute("data-content")
      if (id === data) 
          item.style.display = "block"
      }
    )
  }
  function hideContent(id) {
      content.forEach((item) => {
      const data = item.getAttribute("data-content")
      if (id === data)
          item.style.display = "none"
      })
  }
  // Для каждого элемента зададим два обработчика событий (при наведении мыши и при отводе)
  features.forEach((item) => {
      item.addEventListener("mouseover", (event) => {
        const itemId = item.getAttribute("data-content")
        showContent(itemId)
      })
      item.addEventListener("mouseout", (event) => {
        const itemId = item.getAttribute("data-content")
        hideContent(itemId)
      })
  })

  // Задание 2

  // Пояснение: к каждому табу были добавлены классы tabs(для кнопок), tab-content(для контента), чтобы удобнее работать с quetySelectorAll
  const tabs = document.querySelectorAll('.tabs')
  var tabsContent = document.querySelectorAll('.tab-content')
    // Создаем функцию, которая скрывает все блоки с информацией
    function hideTabs() {
        tabsContent.forEach((item) => {
          console.log(tabsContent)
        item.style.display = "none"
        })
    }
    // Создаем функцию, которая показывает нужный блок информации
    function showTabs(i) {
      tabsContent[i].style.display = "block"
    }  
    // Скроем все блоки, кроме первого
    hideTabs()
    showTabs(0)
    // Для каждого таба зададим прослушиватель, который при нажатии на него будет отображать нужный блок контента и убирать предыдущий
    tabs.forEach((item, index) => {
        item.addEventListener("click", (e) => {
        hideTabs()
        showTabs(index)
        tabs.forEach((el) => {
            el.parentElement.classList.remove("ui-tabs-active")
        })
            item.parentElement.classList.add("ui-tabs-active")
        })
    })
  // features()

  // // Задание 2

  // tab() 

  // // Задание 3

  // timer()

})

// Задание 4

// Зададим функцию, которая будет выводить все объекты (картинки, описания) из массива в карусель
// Сами блоки в html документе закомментированы
function cardContent(coursesMass) {
  const carousel = document.querySelector(".carousel__wrapper")
  for (let i = 0; i < coursesMass.length; i++) {
    const carouselItem = document.createElement("div")
    carouselItem.classList.add("carousel__item")
    carouselItem.innerHTML = `
    <img src=${coursesMass[i].cardImg.src} alt=${coursesMass[i].cardImg.alt} />
    <div class="carousel__content">
      <h4>${coursesMass[i].header}</h4>
      <p>
      ${coursesMass[i].descr}
      </p>
      <div class="item__last-row">
        <img src=${coursesMass[i].authorImg.src} alt=${coursesMass[i].authorImg.alt} />
        <div class="text-button-pay">
          <a href="#">Pay <i class="fa fa-angle-double-right"></i></a>
        </div>
      </div>
    </div>
    `
    carousel.append(carouselItem)
  }
}

// Зададим асинхронную функцию, которая будет запрашивать нужный нам массив из базы данных
const getResource = async (url) => {
  const response = await fetch(url)
  return response.json()
}

// Запрашиваем и выводим все элементы в карусель
getResource("http://localhost:3000/cards").then((response) => {
  cardContent(response)
})
// form()
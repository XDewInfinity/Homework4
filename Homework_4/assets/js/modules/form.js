const form = () => 
{
    const getResouse = async (url) => {
        const response = await fetch(url)
        return response.json() // возвращаем промис
    }
    
    function cardContent(mass) {
        // Создаем функцию, которая в соответствии с каждым обьектом из входного массива создет внутри carousel__wrapper div'ы
        // с классом carousel__item
        const carousel = document.querySelector(".carousel__wrapper")
    
        for (item of mass) {
        const carouselItem = document.createElement("div")
        carouselItem.classList.add("carousel__item")
        carouselItem.innerHTML = `
        <img src=${item.cardImg.src} alt=${item.cardImg.alt} />
        <div class="carousel__content">
            <h4>${item.header}</h4>
            <p>
            ${item.descr}
            </p>
            <div class="item__last-row">
            <img src=${item.authorImg.src} alt=${item.authorImg.alt} />
            <div class="text-button-pay">
                <a href="#">Pay <i class="fa fa-angle-double-right"></i></a>
            </div>
            </div>
        </div>
        `
        carousel.append(carouselItem)
        }
    }
    
    getResouse("http://localhost:3000/cards").then((response) => {
        cardContent(response)
    })
    
    const form = document.querySelector("#contact")
    const button = document.querySelector("#button")
    
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const objData = {}
        const formData = new FormData(form)
        formData.forEach((value, key) => {
        objData[key] = value
        })
        postRequest("http://localhost:3000/requests", objData)
        .then((obj) => {
            event.preventDefault()
            form.reset()
            const text = document.createElement("div")
            text.innerHTML = "<span>Форма успешно отправлена</span>"
            button.append(text)
        })
        .catch((error) => console.error("Ошибка"))
    })
    
    async function postRequest(url, data) {
        const response = await fetch(url, {
        method: "POST", // GET, POST, PUT, PATCH, DELETE
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        })
        return response.json()
    }
}  
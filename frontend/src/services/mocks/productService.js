export const fetchProducts = async (page, size, q = null) => {
    let products
    if (q) {
        console.log('query: ' + q)
        if (q === 'nothing') products = []
        else products = dummySearchResult
    } else {
        products = dummyCatalog
    }
    return new Promise((resolve, reject) => {
        resolve({
            products: products.slice((page-1)*size, page*size),
            total: products.length
        })
    })
}

const dummyCatalog = [
    {"id":"1","name":"Headset X532","description":"Premium gaming headset for PC and consoles (PS4 and Xbox) exceptional sound quality with high-frequency response and extra bass.","image_url":"https://cdn-icons-png.flaticon.com/512/2503/2503535.png","price":66.61,"rating":4,"number_of_reviews":345},
    {"id":"2","name":"Keyboard X1","description":"Gaming keyboard RGB illumination water resistant.","image_url":"https://cdn-icons-png.flaticon.com/512/2867/2867522.png","price":104.99,"rating":4.5,"number_of_reviews":13792},
    {"id":"3","name":"Headset MF41","description":"Wireless Bluetooth gaming headset for PC PS4 PS5 Playstation.","image_url":"https://cdn-icons-png.flaticon.com/512/2503/2503535.png","price":36.54,"rating":4.5,"number_of_reviews":2972},
    {"id":"4","name":"Mouse AA37","description":"High Performance Wired Gaming Mouse.","image_url":"https://cdn-icons-png.flaticon.com/512/7181/7181156.png","price":39.99,"rating":4.0,"number_of_reviews":28057},
    {"id":"5","name":"Office Chair AG4","description":"Ergonomic office chair with adjustable height and lumbar support.","image_url":"https://cdn-icons-png.flaticon.com/512/2736/2736240.png","price":204.99,"rating":4.5,"number_of_reviews":617},
    {"id":"6","name":"TV KJM7","description":"32 inches 4K UHD Smart TV.","image_url":"https://cdn-icons-png.flaticon.com/512/261/261602.png","price":497,"rating":5.0,"number_of_reviews":34217},
    {"id":"7","name":"Laptop HJ22","description":"Laptop 17.3 inches 11th Gen Intel Core i5 16GB DDR4 RAM 1TB SSD Windows 11.","image_url":"https://cdn-icons-png.flaticon.com/512/7214/7214344.png","price":369,"rating":4.0,"number_of_reviews":837},
    {"id":"8","name":"Keyboard XSM","description":"Basic wireless keyboard US-Layout (QWERTY).","image_url":"https://cdn-icons-png.flaticon.com/512/2867/2867522.png","price":22.38,"rating":3.5,"number_of_reviews":322},
    {"id":"9","name":"Mouse PB327","description":"Wireless Gaming Mouse.","image_url":"https://cdn-icons-png.flaticon.com/512/7181/7181156.png","price":29.99,"rating":5.0,"number_of_reviews":6793},
    {"id":"10","name":"Office Chair RD2D","description":"Ergonomic office chair with adjustable height and lumbar support.","image_url":"https://cdn-icons-png.flaticon.com/512/2736/2736240.png","price":191.66,"rating":4.0,"number_of_reviews":412},
    {"id":"11","name":"TV KJM7","description":"32 inches 4K UHD Smart TV.","image_url":"https://cdn-icons-png.flaticon.com/512/261/261602.png","price":497,"rating":5.0,"number_of_reviews":34217},
    {"id":"12","name":"Headset LMJ7","description":"Premium gaming headset for PC and consoles (PS4 and Xbox) exceptional sound quality with high-frequency response and extra bass.","image_url":"https://cdn-icons-png.flaticon.com/512/2503/2503535.png","price":80.71,"rating":3.5,"number_of_reviews":42},
    {"id":"13","name":"Mouse 82LO","description":"Wireless Mouse.","image_url":"https://cdn-icons-png.flaticon.com/512/7181/7181156.png","price":10.98,"rating":3.0,"number_of_reviews":437},
    {"id":"14","name":"Laptop X977U","description":"Laptop 15.6 inches Full HD AMD Ryzen 3 335OU 4GB RAM DDR4.","image_url":"https://cdn-icons-png.flaticon.com/512/7214/7214344.png","price":799,"rating":5.0,"number_of_reviews":2849},
    {"id":"15","name":"Keyboard ML88","description":"Gaming keyboard RGB illumination water resistant.","image_url":"https://cdn-icons-png.flaticon.com/512/2867/2867522.png","price":70.88,"rating":2.5,"number_of_reviews":13},
    {"id":"16","name":"Laptop ASD4","description":"Laptop 17.3 inches 11th Gen Intel Core i5 16GB DDR4 RAM 1TB SSD Windows 11.","image_url":"https://cdn-icons-png.flaticon.com/512/7214/7214344.png","price":472,"rating":4.5,"number_of_reviews":1205},
    {"id":"17","name":"Keyboard L7M8","description":"Basic wireless keyboard US-Layout (QWERTY).","image_url":"https://cdn-icons-png.flaticon.com/512/2867/2867522.png","price":30.99,"rating":5.0,"number_of_reviews":871},
    {"id":"18","name":"Mouse PLB8","description":"High Performance Wired Gaming Mouse.","image_url":"https://cdn-icons-png.flaticon.com/512/7181/7181156.png","price":62.99,"rating":5.0,"number_of_reviews":17098},
    {"id":"19","name":"Office Chair AG4","description":"Ergonomic office chair with adjustable height and lumbar support.","image_url":"https://cdn-icons-png.flaticon.com/512/2736/2736240.png","price":204.99,"rating":4.5,"number_of_reviews":617},
    {"id":"20","name":"Mouse PB327","description":"Wireless Gaming Mouse.","image_url":"https://cdn-icons-png.flaticon.com/512/7181/7181156.png","price":29.99,"rating":5.0,"number_of_reviews":6793},
    {"id":"21","name":"TV KJM7","description":"32 inches 4K UHD Smart TV.","image_url":"https://cdn-icons-png.flaticon.com/512/261/261602.png","price":497,"rating":5.0,"number_of_reviews":34217},
    {"id":"22","name":"Mouse KL7A","description":"Wireless Mouse.","image_url":"https://cdn-icons-png.flaticon.com/512/7181/7181156.png","price":11.99,"rating":4.0,"number_of_reviews":2104},
    {"id":"23","name":"Laptop XUU9","description":"Laptop 15.6 inches Full HD AMD Ryzen 3 335OU 4GB RAM DDR4.","image_url":"https://cdn-icons-png.flaticon.com/512/7214/7214344.png","price":649,"rating":4.0,"number_of_reviews":987}
]

const dummySearchResult = [
    {"id":"1","name":"Search result 1","description":"Search result","image_url":"https://cdn-icons-png.flaticon.com/512/3077/3077325.png","price":66.61,"rating":4,"number_of_reviews":345},
    {"id":"2","name":"Search result 2","description":"Search result","image_url":"https://cdn-icons-png.flaticon.com/512/3077/3077325.png","price":66.61,"rating":4,"number_of_reviews":345},
    {"id":"3","name":"Search result 3","description":"Search result","image_url":"https://cdn-icons-png.flaticon.com/512/3077/3077325.png","price":66.61,"rating":4,"number_of_reviews":345},
    {"id":"4","name":"Search result 4","description":"Search result","image_url":"https://cdn-icons-png.flaticon.com/512/3077/3077325.png","price":66.61,"rating":4,"number_of_reviews":345},
    {"id":"5","name":"Search result 5","description":"Search result","image_url":"https://cdn-icons-png.flaticon.com/512/3077/3077325.png","price":66.61,"rating":4,"number_of_reviews":345},
    {"id":"6","name":"Search result 6","description":"Search result","image_url":"https://cdn-icons-png.flaticon.com/512/3077/3077325.png","price":66.61,"rating":4,"number_of_reviews":345},
    {"id":"7","name":"Search result 7","description":"Search result","image_url":"https://cdn-icons-png.flaticon.com/512/3077/3077325.png","price":66.61,"rating":4,"number_of_reviews":345}
]

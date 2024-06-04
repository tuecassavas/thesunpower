const arrayProducts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const dataProduct = {
    image: '/assets/img/image4.png',
    title: 'Inverter hoài lưới 1 pha Sofar 6KTLM-G3',
    description1: 'Công suất đầu vào tối đa',
    value1: '9000Wp',
    description2: 'Hiệu suất',
    value2: '98,4%',
    description3: 'Số ngõ MPPT',
    value3: '2',
    description4: 'Kích thước',
    value4: '349x344x164 mm',
    description5: 'Cân nặng',
    value5: '10kg',
    description6: 'IP65',
    value6: '',
    description7: 'Bảo hành',
    value7: '5 năm',
    description8: 'Solar E',
    value8: 'Website',
    description9: 'Giva Solar',
    value9: 'Website',
    description10: 'ECO Solar',
    value10: 'Website',
    price: '10 - 15.000.000VND'
};

let content = (data) => {
    let totalDivCard = '';
    for (let i in arrayProducts) {
        totalDivCard = totalDivCard + `<div class="product-card">
        <div id="ProductDetailInfomation${i}" class="products-detail-information" onmouseover="hoverProductCard(${i})" onmouseout="moveProductCard(${i})">
                            <div class="products-detail-information-form">
                                <div class="products-detail-information-title">
                                    <span>Inverter hoài lưới 1 pha Sofar 6KTLM-G3</span>
                                </div>
                                <div class="products-detail-information-body">
                                <div class="flex justify-between">
                                <span class="products-detail-information-content">${data.description1}</span>
                                <span class="products-detail-information-value">${data.value1}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="products-detail-information-content">${data.description2}</span>
                                <span class="products-detail-information-value">${data.value2}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="products-detail-information-content">${data.description3}</span>
                                <span class="products-detail-information-value">${data.value3}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="products-detail-information-content">${data.description4}</span>
                                <span class="products-detail-information-value">${data.value4}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="products-detail-information-content">${data.description5}</span>
                                <span class="products-detail-information-value">${data.value5}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="products-detail-information-content">${data.description6}</span>
                                <span class="products-detail-information-value">${data.value6}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="products-detail-information-content">${data.description7}</span>
                                <span class="products-detail-information-value">${data.value7}</span>
                            </div>
                                </div>
                                <hr>
                                <div class="products-detail-information-available-company">
                                <div class="flex justify-between">
                                <span class="products-detail-information-content">${data.description8}</span>
                                <a href="https://solare.vn/products/inverter-hoa-luoi-sofar-6ktlm-g3"><span class="products-detail-information-value">${data.value8}</span></a>
                            </div>
                            <div class="flex justify-between">
                                <span class="products-detail-information-content">${data.description9}</span>
                                <a href="https://givasolar.com/san-pham/inverter-hoa-luoi-1-pha-sofar-6ktlm-g3/"><span class="products-detail-information-value">${data.value9}</span></a>
                            </div>
                            <div class="flex justify-between">
                                <span class="products-detail-information-content">${data.description10}</span>
                                <a href="https://ecosolar.vn/inverter-hoa-luoi/inverter-on-grid/sofar-solar/"><span class="products-detail-information-value">${data.value10}</span></a>
                            </div>
                                </div>
                            </div>
                        </div>
        <div>
        <div class="product-card-image">
            <img src="${data.image}" alt="">
        </div>
        <div class="product-card-body">
            <div class="card-title" onmouseover="hoverProductCard(${i})" onmouseout="moveProductCard(${i})">
                <span>${data.title}</span>
            </div>
            <div class="card-decscription">
                <div class="flex justify-between">
                    <span class="card-decscription-content">${data.description1}</span>
                    <span class="card-decscription-value">${data.value1}</span>
                </div>
                <div class="flex justify-between">
                    <span class="card-decscription-content">${data.description2}</span>
                    <span class="card-decscription-value">${data.value2}</span>
                </div>
            </div>
            <hr>
                <div class="card-product-price">
                    <span class="card-product-price-content">Giá dao động</span>
                    <span class="card-product-price-value">${data.price}</span>
                </div>
                <div id="BtnProduct">
                    <button>Tư vấn sản phẩm</button>
                </div>
        </div>
        </div>
    </div>`
    };
    return totalDivCard
};


// const changeModeShow = () => {
//     const element = document.getElementById('productShown');
//     const button = document.querySelector('#BtnProductShowTool');
//     // icon.className = icon.className ? 'fa-solid fa-grip-vertical' : 'fa-solid fa-grip-lines';
//     if (element.style.gridTemplateColumns == '') {
//         console.log(element.style);
//         element.style.gridTemplateColumns = 'auto'
//     } else {
//         console.log(element.style);
//         button.classList.add = 'active';
//         element.style.gridTemplateColumns = 'auto auto'
//     }
// };

let mediaScreen = window.matchMedia("(max-width: 450px)");

mediaScreen.addEventListener("change", () => {
    const element = document.getElementById('productShown');
    if (mediaScreen.matches) {
        ''
    } else {
        element.style.gridTemplateColumns = ''
    };
});

const hoverProductCard = (id) => {
    const elementVisible = document.querySelector(`#ProductDetailInfomation${id}`);
    elementVisible.className = 'products-detail-information-visible'
};

const moveProductCard = (id) => {
    const elementVisible = document.querySelector(`#ProductDetailInfomation${id}`);
    elementVisible.className = 'products-detail-information'
};

// console.log(content());
loadProduct = () => {
    document.querySelector('#productShown').innerHTML = content(dataProduct)
};

window.onload = () => {
    activePage();
    loadProduct();
}
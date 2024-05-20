const arrayProducts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// let content = arrayProducts.map((id) => {
//     return `<div class="product-card">
//         <div class="product-card-image">
//             <img src="/assets/img/image4.png" alt="">
//         </div>
//         <div class="product-card-body">
//             <div class="card-title">
//                 <span>Inverter hoài lưới 1 pha Sofar 6KTLM-G3</span>
//             </div>
//             <div class="card-decscription">
//                 <div class="flex justify-between ">
//                     <span class="card-decscription-content">Công suất đầu vào tối đa</span>
//                     <span class="card-decscription-value">9000Wp</span>
//                 </div>
//                 <div class="flex justify-between">
//                     <span class="card-decscription-content">Hiệu suất</span>
//                     <span class="card-decscription-value">98,4%</span>
//                 </div>
//             </div>
//             <hr>
//                 <div class="card-product-price">
//                     <span class="card-product-price-content">Giá dao động</span>
//                     <span class="card-product-price-value">10 - 15.000.000VND</span>
//                 </div>
//                 <div id="BtnProduct">
//                     <button>Tư vấn sản phẩm</button>
//                 </div>
//         </div>
//     </div>`
// })

let content = () => {
    let divCard = `<div class="product-card">
    <div class="product-card-image">
        <img src="/assets/img/image4.png" alt="">
    </div>
    <div class="product-card-body">
        <div class="card-title">
            <span>Inverter hoài lưới 1 pha Sofar 6KTLM-G3</span>
        </div>
        <div class="card-decscription">
            <div class="flex justify-between ">
                <span class="card-decscription-content">Công suất đầu vào tối đa</span>
                <span class="card-decscription-value">9000Wp</span>
            </div>
            <div class="flex justify-between">
                <span class="card-decscription-content">Hiệu suất</span>
                <span class="card-decscription-value">98,4%</span>
            </div>
        </div>
        <hr>
            <div class="card-product-price">
                <span class="card-product-price-content">Giá dao động</span>
                <span class="card-product-price-value">10 - 15.000.000VND</span>
            </div>
            <div id="BtnProduct">
                <button>Tư vấn sản phẩm</button>
            </div>
    </div>
</div>`;
    let totalDivCard = '';
    for (let i in arrayProducts) {
        totalDivCard = totalDivCard + divCard
    };
    return totalDivCard
};

// console.log(content());

window.onload = () => {
    document.querySelector('#productShown').innerHTML = content()
}
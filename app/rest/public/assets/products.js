let productData = [];
const onloadDataProducts = async () => {
  try {
    let response = await axios({
      url: '/assets/data/productData.json',
      method: 'GET',
    });
    // console.log(response);
    productData = response.data.data;
    // console.log(productData);
    loadProduct(productData);
    showButtonExpandProduct();
  } catch (error) {
    console.log(error);
  }
};

const content = (data) => {
  // console.log(data);
  let totalDivCard = '';
  for (let i of data) {
    let divCompany = '';
    for (let company of i.companies) {
      divCompany =
        divCompany +
        `<div class="flex justify-between" style="gap:10px">
                                <span class="products-detail-information-content">${company.name}</span>
                                <a href="${company.website}"><span class="products-detail-information-value">Website</span></a>
                            </div>`;
    }
    // divCompany = i.companies.map((company)=>(`<div class="flex justify-between">
    //                         <span class="products-detail-information-content">${company.name}</span>
    //                         <a href="${company.website}"><span class="products-detail-information-value">Website</span></a>
    //                     </div>`));
    totalDivCard =
      totalDivCard +
      `<div class="product-card">
        <div id="ProductDetailInfomation${i.id}" class="products-detail-information" onmouseover="hoverProductDetailInformation(${i.id})" onmouseout="moveProductCard(${i.id})">
                            <div class="products-detail-information-form">
                                <div class="products-detail-information-title">
                                    <span class="span">${i.description}</span>
                                </div>
                                <div class="products-detail-information-body">
                                <div class="flex justify-between" style="gap:10px">
                                <span class="products-detail-information-content">Công suất đầu vào tối đa</span>
                                <span class="products-detail-information-value">${i.information.maxInputCapacity}</span>
                            </div>
                            <div class="flex justify-between" style="gap:10px">
                                <span class="products-detail-information-content">Hiệu suất</span>
                                <span class="products-detail-information-value">${i.information.performance}</span>
                            </div>
                            <div class="flex justify-between" style="gap:10px">
                                <span class="products-detail-information-content">Loại pin lưu trữ </span>
                                <span class="products-detail-information-value">${i.information.storageBattery}</span>
                            </div>
                            <div class="flex justify-between" style="gap:10px">
                                <span class="products-detail-information-content">Dải điện áp pin lưu trữ</span>
                                <span class="products-detail-information-value">${i.information.voltage}</span>
                            </div>
                            <div class="flex justify-between" style="gap:10px">
                                <span class="products-detail-information-content">Dòng sạc tối đa</span>
                                <span class="products-detail-information-value">${i.information.maxCharging}</span>
                            </div>
                            <div class="flex justify-between" style="gap:10px">
                                <span class="products-detail-information-content">Dòng xả tối đa</span>
                                <span class="products-detail-information-value">${i.information.maxDischarge}</span>
                            </div>
                            <div class="flex justify-between" style="gap:10px">
                                <span class="products-detail-information-content">Số ngõ MPPT</span>
                                <span class="products-detail-information-value">${i.information.portMPPT}</span>
                            </div>
                            <div class="flex justify-between" style="gap:10px">
                                <span class="products-detail-information-content">Kích thước</span>
                                <span class="products-detail-information-value">${i.information.size}</span>
                            </div>
                            <div class="flex justify-between" style="gap:10px">
                                <span class="products-detail-information-content">Cân nặng</span>
                                <span class="products-detail-information-value">${i.information.weight}</span>
                            </div>
                            <div class="flex justify-between" style="gap:10px">
                                <span class="products-detail-information-content">IP</span>
                                <span class="products-detail-information-value">${i.information.ip}</span>
                            </div>
                            <div class="flex justify-between" style="gap:10px">
                                <span class="products-detail-information-content">Bảo hành</span>
                                <span class="products-detail-information-value">${i.information.warranty}</span>
                            </div>
                                </div>
                                <hr>
                                <div class="products-detail-information-available-company">
                            ${divCompany}
                                </div>
                            </div>
                        </div>
        <div>
        <div class="product-card-image">
            <img class="image-format" src="${i.image}" alt="">
        </div>
        <div class="product-card-body">
            <div class="card-title" onmouseover="hoverProductCard(${i.id}, event)" onmouseout="moveProductCard(${i.id})">
                <span class="span">${i.description}</span>
            </div>
            <div class="card-decscription">
                <div class="flex justify-between" style="gap:10px">
                    <span class="card-decscription-content">Công suất đầu vào tối đa</span>
                    <span class="card-decscription-value">${i.information.maxInputCapacity}</span>
                </div>
                <div class="flex justify-between">
                    <span class="card-decscription-content">Hiệu suất</span>
                    <span class="card-decscription-value">${i.information.performance}</span>
                </div>
            </div>
            <hr>
                <div class="card-product-price">
                    <span class="card-product-price-content">Giá dao động</span>
                    <span class="card-product-price-value">${i.price}</span>
                </div>
                <div id="BtnProduct">
                    <button>Tư vấn sản phẩm</button>
                </div>
        </div>
        </div>
    </div>`;
  }
  return totalDivCard;
};

let mediaScreen = window.matchMedia('(max-width: 450px)');

mediaScreen.addEventListener('change', () => {
  const element = document.getElementById('productShown');
  if (mediaScreen.matches) {
    ('');
  } else {
    element.style.gridTemplateColumns = '';
  }
});

let productDetailInformationClass = '';
const hoverProductCard = (id, event) => {
  let clientWidth = document.getElementById('root').clientWidth;
  let x = event.clientX;
  //   console.log(event.target);
  const elementVisible = document.querySelector(`#ProductDetailInfomation${id}`);
  if (mediaScreen.matches) {
    productDetailInformationClass = 'products-detail-information-visible-mobile';
  } else {
    if (x <= clientWidth / 2) {
      productDetailInformationClass = 'products-detail-information-visible-left';
    } else {
      productDetailInformationClass = 'products-detail-information-visible-right';
    }
  }
  //   hoverProductDetailInformation(id)
  return (elementVisible.className = productDetailInformationClass);
};

const hoverProductDetailInformation = (id) => {
  const elementVisible = document.querySelector(`#ProductDetailInfomation${id}`);
  elementVisible.className = productDetailInformationClass;
};

const moveProductCard = (id) => {
  const elementVisible = document.querySelector(`#ProductDetailInfomation${id}`);
  elementVisible.className = 'products-detail-information';
};

const showButtonExpandProduct = () => {
  const element = document.getElementById('BtnExpandProduct');
  if (productData.length <= 8) {
    element.style.display = 'none';
  }
};

const loadProduct = (data) => {
  document.querySelector('#productShown').innerHTML = content(data);
};

window.onload = () => {
  activePage();
  onloadDataProducts();
  onloadCompaniesData();
  // loadProduct();
};

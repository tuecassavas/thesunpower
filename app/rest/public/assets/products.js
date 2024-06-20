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



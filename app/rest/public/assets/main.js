//header: active title
const activeTitle = (pathname, pageId) => {
  let element = document.querySelectorAll(`#${pageId}`);
  let path = window.location.pathname;
  if (path === pathname) {
    for (let i of element) {
      i.style.color = "rgba(111, 237, 142, 1)";
    }
  }
};

const activePage = () => {
  activeTitle("/", "HomePageActive");
  activeTitle("/products", "ProductPageActive");
  activeTitle("/news", "NewsPageActive");
};

const collapseNavbar = () => {
  const element = document.querySelector("#navbar");
  element.className = element.className ? "" : "hidden";
};

window.onload = () => {
  activePage();
};

// load input when radio is checked
const loadInput = () => {
  const checkedInputMoney = document.querySelector(
    "#selectElectricMoney"
  ).checked;
  const checkedInputKilo = document.querySelector(
    "#selectElectricKilo"
  ).checked;
  const inputMoney = document.getElementById("InputElectricMoney");
  const inputKilo = document.getElementById("InputElectricKilo");
  inputMoney.className = checkedInputMoney ? "form-input" : "form-input hide";
  inputKilo.className = checkedInputKilo ? "form-input" : "form-input hide";
};

// load option when '3 pha' is checked
const loadOption = () => {
  shownOption("threePhasePower", "optionThreePhasePower");
  shownOption("threePhasePowerProduction", "optionThreePhasePowerProduction");
};

const shownOption = (inputId, optionId) => {
  const checkedRadio = document.querySelector(`#${inputId}`).checked;
  const option = document.querySelector(`#${optionId}`);

  // TODO: DO NOT USE == USE === INSTEAD
  if (checkedRadio == true) {
    return (option.style.display = "flex");
  } else {
    return (option.style.display = "none");
  }
};

// collapse when click
const collapseExpend = (elementId, iconId, buttonId) => {
  const element = document.querySelector(`#${elementId}`);
  const icon = document.querySelector(`#${iconId}`);
  const button = document.querySelector(`#${buttonId}`);

  button.innerText = element.className ? "Rút gọn" : "Xem thêm";
  icon.className = element.className
    ? "fa-solid fa-angle-up collapse"
    : "fa-solid fa-angle-up expand";
  element.className = element.className ? "" : "hidden1";
};

const collapseDemand = () => {
  collapseExpend(
    "electricUsageDemand",
    "iconAngleUpDemand",
    "btnCollapseDemand"
  );
};

const collapseHabit = () => {
  collapseExpend("electricUsageHabit", "iconAngleUpHabit", "btnCollapseHabit");
};

const loadItemTable = (input) => {
  let listTable = document.querySelectorAll(`#suggestCompanyTable .table-item`);
  let listTableArea = document.querySelectorAll(`#suggestCompanyTable .table-item #${input}`);
  listTable.forEach((item)=>{
    item.style.display = 'none';
  });
  listTableArea.forEach((item) => {
    item.parentElement.style.display = '';
  });
};

const filterCompaniesByArea = () => {
  const select = document.querySelector('#CompaniesArea').value;
  loadItemTable(select);
};

const search = (event) => {
  event.preventDefault();
  let keyword = document.querySelector("#searchInput").value;
  console.log(keyword);
  loadProductItem(keyword);
};

const loadProductItem = (input) => {
  let listName = document.querySelectorAll(`#productShown .product-card .product-card-body .card-title .span`);
  listName.forEach((item)=>{
    let divCard = item.parentElement.parentElement.parentElement.parentElement;
    let keyword = stringToSlug(input);
    let text = stringToSlug(item.textContent);
    if (text.search(keyword) !== -1) {
      divCard.style.display = 'block';
    } else {
      divCard.style.display = 'none'
    }
  });
};

const stringToSlug = (title) => {

  let slug = '';
  slug = title.toLowerCase();
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
  slug = slug.replace(/ /gi, "-");
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');

  return slug;
};

// const searchNavbar = (event) => {
//   event.preventDefault();
//   window.location.href = '/products';
//   search(event);
// };
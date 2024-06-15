let companiesData = [];

// todo: dont use axios to get data like this
const onloadCompaniesData = async () => {
  try {
    let response = await axios({
      url: '/assets/data/companyData.json',
      method: 'GET',
    });
    // console.log(response.data);
    companiesData = response.data;
    loadContent(companiesData);
  } catch (error) {
    console.log(error);
  }
};

const loadContent = (data) => {
  let optionElement = '';
  for (let i of data) {
    optionElement = optionElement + `<option value="${i.code}">${i.name}</option>`;
  }
  return (document.getElementById('Area').innerHTML = optionElement);
};

//header: active title
const activeTitle = (pathname, pageId) => {
  let element = document.querySelector(`#${pageId}`);
  let path = window.location.pathname;
  if (path === pathname) {
    element.style.color = 'rgba(111, 237, 142, 1)';
  } else {
    (''); // todo: ???
  }
};

const activePage = () => {
  activeTitle('/', 'HomePageActive');
  activeTitle('/products', 'ProductPageActive');
  activeTitle('/news', 'NewsPageActive');
};

const collapseNavbar = () => {
  const element = document.querySelector('#navbar');
  element.className = element.className ? '' : 'hidden';
};

window.onload = () => {
  activePage();
  collapseNavbar();
  onloadCompaniesData();
};

// load input when radio is checked
const loadInput = () => {
  const checkedInputMoney = document.querySelector('#selectElectricMoney').checked;
  const checkedInputKilo = document.querySelector('#selectElectricKilo').checked;
  const inputMoney = document.getElementById('InputElectricMoney');
  const inputKilo = document.getElementById('InputElectricKilo');
  inputMoney.className = checkedInputMoney ? 'form-input' : 'form-input hide';
  inputKilo.className = checkedInputKilo ? 'form-input' : 'form-input hide';
};

// load option when '3 pha' is checked
const loadOption = () => {
  shownOption('threePhasePower', 'optionThreePhasePower');
  shownOption('threePhasePowerProduction', 'optionThreePhasePowerProduction');
};

const shownOption = (inputId, optionId) => {
  const checkedRadio = document.querySelector(`#${inputId}`).checked;
  const option = document.querySelector(`#${optionId}`);

  // TODO: DO NOT USE == USE === INSTEAD
  if (checkedRadio == true) {
    return (option.style.display = 'flex');
  } else {
    return (option.style.display = 'none');
  }

    // EXAMPLE:
    // if (checkedRadio === true) {
    //     return (option.style.display = 'flex');
    // }
    //
    // return (option.style.display = 'none');

};

// collapse when click
const collapseExpend = (elementId, iconId, buttonId) => {
  const element = document.querySelector(`#${elementId}`);
  const icon = document.querySelector(`#${iconId}`);
  const button = document.querySelector(`#${buttonId}`);

  button.innerText = element.className ? 'Rút gọn' : 'Xem thêm';
  icon.className = element.className ? 'fa-solid fa-angle-up collapse' : 'fa-solid fa-angle-up expand';
  element.className = element.className ? '' : 'hidden1';
};

const collapseDemand = () => {
  collapseExpend('electricUsageDemand', 'iconAngleUpDemand', 'btnCollapseDemand');
};

const collapseHabit = () => {
  collapseExpend('electricUsageHabit', 'iconAngleUpHabit', 'btnCollapseHabit');
};

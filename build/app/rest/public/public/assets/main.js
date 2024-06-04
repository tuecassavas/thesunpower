// change header background when scroll
const header = document.getElementById('header');

const scrollHeader = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 || window.location.pathname !== '/') {
        header.style.backgroundColor = 'rgba(9, 22, 89, 1)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.068)';
    }
};

window.onscroll = scrollHeader;

// load input when radio is checked
const loadInput = () => {
    const checkedInputMoney = document.querySelector('#selectElectricMoney').checked;
    const checkedInputKilo = document.querySelector('#selectElectricKilo').checked;
    const inputMoney = document.getElementById('InputElectricMoney');
    const inputKilo = document.getElementById('InputElectricKilo');
    
    inputMoney.className = checkedInputMoney ? 'form-input' : 'form-input hide';
    inputKilo.className = checkedInputKilo ? 'form-input' : 'form-input hide'
};

window.onload = loadInput;

// load option when '3 pha' is checked 
const loadOption = () => {
    const checkedRadio = document.querySelector('#threePhasePower').checked;
    const option = document.querySelector('#optionThreePhasePower');
    if (checkedRadio == true) {
        return option.style.display = 'flex'
    } else {
        return option.style.display = 'none'
    }
};

// collapse when click 
const collapseDemand = () => {
    const element = document.querySelector('#electricUsageDemand');
    const icon = document.querySelector('#iconAngleUpDemand');
    const button =document.querySelector('#btnCollapseDemand');

    button.innerText = element.className ? 'Rút gọn' : 'Xem thêm';
    icon.className = element.className ? 'fa-solid fa-angle-up collapse' : 'fa-solid fa-angle-up expand';
    element.className = element.className ? '' : 'hidden1'
};
const collapseHabit = () => {
    const element = document.querySelector('#electricUsageHabit');
    const icon = document.querySelector('#iconAngleUpHabit');
    const button =document.querySelector('#btnCollapseHabit');

    button.innerText = element.className ? 'Rút gọn' : 'Xem thêm';
    icon.className = element.className ? 'fa-solid fa-angle-up collapse' : 'fa-solid fa-angle-up expand';
    element.className = element.className ? '' : 'hidden1'
};
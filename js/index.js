const dropdownList = document.querySelectorAll('#dropdown');

let currentdropdownItem = null;

dropdownList.forEach((dropdown) => {
	dropdown.addEventListener('click', () => {
		if (currentdropdownItem === dropdown) {
			dropdown.classList.toggle('active');
			return;
		}
		if (currentdropdownItem) {
			currentdropdownItem.classList.remove('active');
		}
		dropdown.classList.add('active');
		currentdropdownItem = dropdown;
	});
});
const custom_select = document.getElementById('custom-select');
const select_toggle = document.getElementById('custom-select-toggle');
const select_options = document.getElementById('custom-select-options');
const options = document.querySelectorAll('.custom-select__option');
const labelText = document.querySelector('.custom-select__label-text');
const addressOutput = document.getElementById('address-output');
const height = select_options.firstElementChild.getBoundingClientRect().height;

select_toggle.addEventListener('click', () => {
	custom_select.classList.toggle('active');
	custom_select.style.setProperty('--height', height + 'px');
	if (custom_select.classList.contains('active')) {
		console.log('hiojkm');
		return (addressOutput.style.display = 'none');
	} else {
		addressOutput.style.display = 'block';
	}
});

options.forEach((option) => {
	option.addEventListener('click', () => {
		custom_select.classList.remove('active');
		addressOutput.style.display = 'block';
		labelText.textContent = option.dataset.city;
		addressOutput.innerHTML = `<div class="contacts__address address ml">
        <p class="address__city">
            <span class="field">City</span>
            <span class="value">${option.dataset.city}</span>
        </p>
        <p class="address__phone">
            <span class="field">Phone:</span>
            <span class="value">${option.dataset.phone}</span>
        </p>
        <p class="address__office">
            <span class="field">Office adress:</span>
            <span class="value">${option.dataset.officeadress}</span>
        </p>
        <div class="address__call">
            <button class="btn-secondary btn-secondary-secondary--small">Call us</button>
        </div>
    </div>`;
	});
});

const filterButtons = document.querySelectorAll('.services__filter-item .btn');
const services = document.querySelectorAll('.service');

let currentButton = null;

filterButtons.forEach((btn) => {
	btn.addEventListener('click', () => {
		if (currentButton === btn) {
			return;
		}
		if (currentButton) {
			currentButton.classList.remove('active');
		}
		btn.classList.add('active');
		services.forEach((service) => {
			if (service.dataset.tag === btn.dataset.target) {
				service.classList.remove('blur');
			} else {
				service.classList.add('blur');
			}
		});
		currentButton = btn;
	});
});

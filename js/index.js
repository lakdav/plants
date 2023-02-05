const view = {
	burger: document.getElementById('burger'),
	navigation: document.getElementById('navigation'),
	showNavigation: false,
};

view.burger.addEventListener('click', () => {
	view.burger.classList.toggle('active');
	view.navigation.classList.toggle('active');
	view.navigation.style.setProperty(
		'--height',
		view.showNavigation ? '0px' : view.navigation.firstElementChild.clientHeight + 'px',
	);

	view.showNavigation = !view.showNavigation;
	document.body.style.overflow = view.showNavigation ? 'hidden' : '';
	view.burger.setAttribute('aria-expanded', view.showNavigation);
});

window.addEventListener('click', (e) => {
	if (!e.target.closest('#burger')) {
		view.burger.classList.remove('active');
		view.navigation.classList.remove('active');
		view.navigation.style.setProperty('--height', 0);
		view.showNavigation = false;
		view.burger.setAttribute('aria-expanded', false);
		document.body.style.overflow = '';
		document.documentElement.style.marginRight = '';
	}
});

//==============================================

const accourdions = document.querySelectorAll('.accourdion');

let currentaccourdion = null;

accourdions.forEach((accourdion) => {
	accourdion.addEventListener('click', (e) => {
		if (e.target.closest('.accourdion__header')) {
			const target = e.target.closest('.accourdion__header');
			if (currentaccourdion === accourdion) {
				target.setAttribute('aria-expanded', e.target.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
				target.nextElementSibling.setAttribute(
					'aria-hidden',
					target.getAttribute('aria-expanded') === 'false' ? 'true' : 'false',
				);
				return;
			}
			if (currentaccourdion) {
				currentaccourdion.firstElementChild.setAttribute('aria-expanded', false);
				currentaccourdion.firstElementChild.nextElementSibling.setAttribute('aria-hidden', true);
			}

			target.setAttribute('aria-expanded', true);
			target.nextElementSibling.setAttribute('aria-hidden', false);
			currentaccourdion = accourdion;
		}
	});
});

//==================================================

const dropdown = document.getElementById('dropdown');
const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdownPanel = document.getElementById('dropdown-panel');
const menuitems = document.querySelectorAll('.dropdown__menuitem');
const labelText = document.querySelector('.dropdown__label-text');
const addressOutput = document.getElementById('address-output');
const height = dropdown.firstElementChild.getBoundingClientRect().height;

dropdownToggle.addEventListener('click', () => {
	addressOutput.style.display = 'none';
	const panel_hidden = dropdownPanel.getAttribute('aria-hidden');
	const height = dropdownPanel.firstElementChild.clientHeight;
	dropdownPanel.setAttribute('aria-hidden', panel_hidden === 'false' ? true : false);
	dropdownToggle.setAttribute('aria-expanded', panel_hidden === 'false' ? false : true);
	dropdown.style.setProperty('--height', panel_hidden === 'false' ? 0 : height + 'px');
});

menuitems.forEach((menuitem) => {
	menuitem.addEventListener('click', () => {
		dropdown.classList.add('active');
		dropdown.parentElement.classList.add('active');
		dropdownPanel.setAttribute('aria-hidden', true);
		dropdownToggle.setAttribute('aria-expanded', false);
		dropdown.style.setProperty('--height', 0);
		addressOutput.style.display = 'block';
		labelText.textContent = menuitem.dataset.city;
		labelText.style.color = '#717171';
		dropdownToggle.style.backgroundColor = '#C1E698';
		addressOutput.innerHTML = `<div class="contacts__address address ml">
        <p class="address__city">
            <span class="field">City</span>
            <span class="value">${menuitem.dataset.city}</span>
        </p>
        <p class="address__phone">
            <span class="field">Phone:</span>
            <span class="value">${menuitem.dataset.phone}</span>
        </p>
        <p class="address__office">
            <span class="field">Office adress:</span>
            <span class="value">${menuitem.dataset.officeadress}</span>
        </p>
        <div class="address__call">
            <a href="tel:${menuitem.dataset.phone}" class="btn-secondary btn-secondary-secondary--small">Call us</a>
        </div>
    </div>`;
	});
});

// ===================================
const filterButtons = document.querySelectorAll('.services__tablist-tab [role="tab"]');
const services = document.querySelectorAll('.service');

let currentButton = [];

filterButtons.forEach((btn) => {
	btn.addEventListener('click', () => {
		const exist = currentButton.indexOf(btn);
		if (exist > -1) {
			btn.classList.remove('active');
			btn.setAttribute('aria-selected', false);
			currentButton = [
				...currentButton.filter((b) => {
					return b.dataset.target != btn.dataset.target;
				}),
			];
		} else {
			if (currentButton.length === 2) return;
			btn.classList.add('active');
			btn.setAttribute('aria-selected', true);
			currentButton.push(btn);
		}
		services.forEach((service) => {
			if (currentButton.length === 0) {
				service.classList.remove('blur');
			} else {
				service.classList.add('blur');
			}
		});
		services.forEach((service) => {
			console.log(currentButton.findIndex((btn) => btn.dataset.target === service.dataset.tag));
			if (currentButton.findIndex((btn) => btn.dataset.target === service.dataset.tag) > -1) {
				service.classList.remove('blur');
			}
		});
	});
});

/*show popup*/
function show(state){
		document.getElementById('popup').style.display = state;			
		document.getElementById('hidden_bg').style.display = state; 			
}

/*toggle social list*/
var menuWrap = document.getElementById('social-list-wrap');
var menuPlus = document.querySelector('.none-circle');
function handler() {
	menuWrap.classList.toggle('open');
	menuPlus.classList.toggle('icon-cross');
};
menuPlus.addEventListener('click', handler);

/*exchange elements for responsive design*/

exchangeElements();
window.onresize = function() {
    exchangeElements();
}

function exchangeElements() {

var	 priceExchange = document.querySelector('.popup__description-price'),
		 popupContainer = document.querySelector('.popup__container--tablet'),
		 popupSize = document.querySelector('.popup__description-size'),
		 popupStars = document.querySelector('.popup__description-stars'),
		 popupText = document.querySelector('.popup__description-text'),
		 popupBtn = document.querySelector('.popup__description-btn'),
		 popupImg = document.querySelector('.popup__img'),
		 popupId = document.querySelector('.popup__description-id'),
		 popupSocial = document.querySelector('.popup__social-list');


//max-width 840px
if (window.innerWidth < 840) {
    popupContainer.insertBefore(priceExchange, popupStars);
    popupContainer.insertBefore(priceExchange, popupSize);
    popupContainer.appendChild(popupText);
}  if (window.innerWidth > 840){
		popupContainer.insertBefore(priceExchange, popupSize);
		popupContainer.insertBefore(priceExchange, popupStars);
		popupContainer.insertBefore(popupText, popupSize);
};
//max-width 645px
if (window.innerWidth < 645) {
		popupContainer.insertBefore(popupId, popupImg);
		popupContainer.insertBefore(popupStars, popupImg);
		popupContainer.appendChild(popupBtn);
		popupContainer.insertBefore(popupSize, popupBtn);
		popupContainer.insertBefore(priceExchange, popupSize);
		popupContainer.insertBefore(popupSocial, priceExchange);
		popupSocial.classList.add('popup__social-list--mob');
}  else if (window.innerWidth < 840) {
		popupContainer.insertBefore(popupId, popupStars);
		popupContainer.insertBefore(popupStars, priceExchange);
		popupContainer.insertBefore(popupBtn, popupText);
		popupSocial.classList.remove('popup__social-list--mob');
};
}

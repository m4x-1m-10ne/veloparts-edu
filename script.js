window.addEventListener('scroll', function() {
    const btn = document.getElementById('scrollTopBtn');
    if(btn) {
        if(window.scrollY > 300) btn.classList.add('show');
        else btn.classList.remove('show');
    }
});

(function() {
        const products = [
            { id: 1, name: "Цепь Shimano HG40", price: 500, category: "Цепи", img: "./img/products/Shimano_HG40.png" },
            { id: 2, name: "Кассета Sunrace M88", price: 1500, category: "Кассеты", img: "./img/products/Sunrace_M88.png" },
            { id: 3, name: "Колодки Avid SD7", price: 350, category: "Тормоза", img: "./img/products/Avid_SD7.png" },
            { id: 4, name: "Shimano Tourney RD", price: 800, category: "Переключатели", img: "./img/products/Shimano_Tourney_RD.png" },
            { id: 5, name: "Цепь KMC X8", price: 650, category: "Цепи", img: "./img/products/KMC_X8.png" },
            { id: 6, name: "Кассета Shimano CS-HG41", price: 1800, category: "Кассеты", img: "./img/products/Shimano_CS-HG41.png" },
            { id: 7, name: "Колодки Shimano B01S", price: 400, category: "Тормоза", img: "./img/products/Shimano_B01S.png" },
            { id: 8, name: "Shimano Altus RD-M310", price: 1200, category: "Переключатели", img: "./img/products/Shimano_Altus_RD-M310.png" },
            { id: 9, name: "Руль Ritchey Comp", price: 1500, category: "Рули", img: "./img/products/Ritchey_Comp.png" },
            { id: 10, name: "Седло Selle Royal", price: 2000, category: "Сёдла", img: "./img/products/Selle_Royal.png" },
            { id: 11, name: "Покрышка Schwalbe", price: 1200, category: "Покрышки", img: "./img/products/Schwalbe.png" },
            { id: 12, name: "Камера CST 26''", price: 300, category: "Камеры", img: "./img/products/CST_26''.png" },
            { id: 13, name: "Смазка Muc-Off", price: 500, category: "Смазки", img: "./img/products/Muc-Off.png" },
            { id: 14, name: "Насос Topeak", price: 800, category: "Насосы", img: "./img/products/Topeak.png" },
            { id: 15, name: "Переключатель передний Tourney", price: 600, category: "Переключатели", img: "./img/products/Tourney.png" }
        ];

        let productsGridElement = null;

        function showNotify(msg) {
            let div = document.createElement('div');
            div.className = 'toast-notify';
            div.innerHTML = `<i class="bi bi-info-circle-fill me-2" style="color:#e67e22;"></i> ${msg}`;
            document.body.appendChild(div);
            setTimeout(() => div.remove(), 3000);
        }

        function showDemoMessage(topic) {
            showNotify(`Информация о "${topic}" временно недоступна.`);
        }

        function showAuthRequired() {
            showNotify('Для использования корзины и профиля необходимо авторизоваться');
        }

        function openModal(modalId) {
            let topic = '';
            switch (modalId) {
                case 'modalAbout':
                    topic = 'О магазине';
                    break;
                case 'modalDelivery':
                    topic = 'Доставка и оплата';
                    break;
                case 'modalPrivacy':
                    topic = 'Политика конфиденциальности';
                    break;
                case 'modalRequisites':
                    topic = 'Реквизиты';
                    break;
                default:
                    topic = 'этом разделе';
            }
            showDemoMessage(topic);
        }

        function updateProductsDisplay() {
            if(!productsGridElement) return;
            let searchValue = document.getElementById('searchInput').value.toLowerCase();
            let filtered = products.filter(p => p.name.toLowerCase().includes(searchValue));
            if(filtered.length === 0) {
                productsGridElement.innerHTML = '<div class="empty-state"><i class="bi bi-search" style="font-size:2rem; display:block; margin-bottom:16px;"></i>Товары не найдены</div>';
                return;
            }
            productsGridElement.innerHTML = filtered.map(p => `
                <div class="product-card">
                    <div class="product-image-wrapper"><div class="product-image"><img src="${p.img}" alt="${p.name}" onerror="this.src='https://placehold.co/600x600/f4f6f9/e67e22?text=${encodeURIComponent(p.name)}'"></div></div>
                    <div class="product-info">
                        <div class="product-name">${p.name}</div>
                        <div class="product-price">${p.price.toLocaleString()} ₽</div>
                        <button class="btn-add-cart" onclick="showAuthRequired()"><i class="bi bi-cart-plus me-2"></i> В корзину</button>
                    </div>
                </div>
            `).join('');
        }

        function searchProducts() {
            updateProductsDisplay();
            const hero = document.getElementById('heroSection');
            if(hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function scrollToHero() {
            const hero = document.getElementById('heroSection');
            if(hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function scrollToCatalog() {
            const el = document.getElementById('catalogSection');
            if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function openMobileMenu() {
            document.getElementById('mobileMenu').classList.add('active');
            document.getElementById('menuOverlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeMobileMenu() {
            document.getElementById('mobileMenu').classList.remove('active');
            document.getElementById('menuOverlay').classList.remove('active');
            document.body.style.overflow = '';
        }

        const searchInput = document.getElementById('searchInput');
        if(searchInput) {
            searchInput.addEventListener('keypress', function(event) {
                if(event.key === 'Enter') {
                    event.preventDefault();
                    searchProducts();
                }
            });
        }

        document.getElementById('burgerBtn')?.addEventListener('click', openMobileMenu);
        document.getElementById('closeMenuBtn')?.addEventListener('click', closeMobileMenu);
        document.getElementById('menuOverlay')?.addEventListener('click', closeMobileMenu);
        document.getElementById('heroCatalogBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToCatalog();
        });
        document.getElementById('mobileSearchBtn')?.addEventListener('click', () => {
            showNotify('Поиск работает в десктопной и планшетной версии');
        });

        window.searchProducts = searchProducts;
        window.scrollToHero = scrollToHero;
        window.scrollToCatalog = scrollToCatalog;
        window.showDemoMessage = showDemoMessage;
        window.showAuthRequired = showAuthRequired;
        window.closeMobileMenu = closeMobileMenu;
        window.openModal = openModal;

        renderCatalogInterface();

        function renderCatalogInterface() {
            const container = document.getElementById('catalogContent');
            if(!container) return;
            container.innerHTML = `
                <div class="auth-banner">
                    <i class="bi bi-person-lock"></i>
                    <h3>Доступ к каталогу</h3>
                    <p>Чтобы просматривать категории товаров и оформлять заказы, необходимо авторизоваться</p>
                    <button class="btn-primary-custom" onclick="showAuthRequired()">Войти в профиль</button>
                </div>
                <div class="products-grid" id="productsGrid"></div>
            `;
            productsGridElement = document.getElementById('productsGrid');
            updateProductsDisplay();
        }
    })();
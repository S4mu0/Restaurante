document.addEventListener('DOMContentLoaded', function() {
let menuItems = [
            {
                id: 1,
                name: "Lomo Saltado",
                description: "Trozos de lomo de res salteados con cebolla, tomate y papas fritas. Acompañado de arroz blanco.",
                price: "$20.000",
                category: "food",
                image: "https://www.gourmet.cl/wp-content/uploads/2016/09/Lomo-saltado.png"
            },
            {
                id: 2,
                name: "Pescado Frito",
                description: "Pescado frito acompañado de arroz y ensalada.",
                price: "$25.000",
                category: "food",
                image: "https://i.ytimg.com/vi/HyBl-Du7OBc/maxresdefault.jpg"
            },
            {
                id: 3,
                name: "Aji de Gallina",
                description: "Pollo desmenuzado en una cremosa salsa de ají amarillo, acompañado de arroz y papas.",
                price: "$16.000",
                category: "food",
                image: "https://recetas.encolombia.com/wp-content/uploads/2022/05/Receta-Aji-de-Gallina-peruano.jpg"
            },
            {
                id: 4,
                name: "Pollo a la Brasa",
                description: "Pollo marinado y asado a la perfección, servido con papas fritas y ensalada fresca.",
                price: "$20.000",
                category: "food",
                image: "https://blog.sanfernando.pe/wp-content/uploads/2023/07/banner_3.jpg"
            },
            {
                id: 5,
                name: "Coca Cola",
                description: "Coca cola de 500ml.",
                price: "$3.000",
                category: "drink",
                image: "https://www.coca-cola.com/content/dam/onexp/co/es/brands/coca-cola/coca-cola-original/ccso_600ml_750x750.png"
            },
            {
                id: 6,
                name: "Jugo de Naranja",
                description: "Bebida refrescante hecho con naranja.",
                price: "$4.000",
                category: "drink",
                image: "https://media.gq.com.mx/photos/5e31d403309f5700081fc82c/master/pass/GettyImages-909604746.jpg"
            },
            {
                id: 7,
                name: "Postobon Anaranjada",
                description: "Bebida anaranjada de postobon 500ml.",
                price: "$3.000",
                category: "drink",
                image: "https://mercaldas.vtexassets.com/arquivos/ids/1325309-800-auto?v=638496628365400000&width=800&height=auto&aspect=true"
            },
            {
                id: 8,
                name: "Jugo de Maracuyá",
                description: "Jugo natural de maracuyá recién exprimido.",
                price: "$5.000",
                category: "drink",
                image: "https://caldoparao.com/wp-content/uploads/2020/06/MG_1084-Maracuya.jpg"
            },
            {
                id: 9,
                name: "Arroz con Pollo",
                description: "Arroz verde con pollo, cilantro y verduras. Plato tradicional peruano.",
                price: "$14.000",
                category: "food",
                image: "https://campollo.com/wp-content/uploads/2023/06/arroz-con-pollo-1.jpg"
            },
            {
                id: 10,
                name: "Corrientazo",
                description: "Arroz blanco con ensalada y carne asada con frijoles y plátano maduro.",
                price: "$15.000",
                category: "food",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQllvRcez_khFja_BsvI0OnM4RSYPllxB2Seg&s"
            }
        ];

        // Elementos del DOM
        const menuContainer = document.getElementById('menu-container');
        const navButtons = document.querySelectorAll('.nav-button');
        const sectionTitle = document.getElementById('section-title');
        const adminToggle = document.getElementById('admin-toggle');
        const addItemBtn = document.getElementById('add-item-btn');
        const productModal = document.getElementById('product-modal');
        const modalTitle = document.getElementById('modal-title');
        const productForm = document.getElementById('product-form');
        const cancelBtn = document.getElementById('cancel-btn');

        // Variables de estado
        let isAdminMode = false;
        let currentCategory = 'all';
        let editingItemId = null;

        // Función para mostrar los elementos del menú
        function displayMenuItems(category = 'all') {
            // Limpiar el contenedor
            menuContainer.innerHTML = '';
            
            // Filtrar elementos según la categoría
            const filteredItems = category === 'all' 
                ? menuItems 
                : menuItems.filter(item => item.category === category);
            
            // Actualizar el título de la sección
            if (category === 'all') {
                sectionTitle.textContent = 'Menú Principal';
            } else if (category === 'food') {
                sectionTitle.textContent = 'Comidas';
            } else if (category === 'drink') {
                sectionTitle.textContent = 'Bebidas';
            }
            
            // Crear y agregar elementos al DOM
            filteredItems.forEach(item => {
                const menuItemElement = document.createElement('div');
                menuItemElement.classList.add('menu-item');
                
                menuItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-content">
                        <h3 class="item-title">${item.name}</h3>
                        <p class="item-description">${item.description}</p>
                        <p class="item-price">${item.price}</p>
                        ${isAdminMode ? `
                            <div class="admin-controls">
                                <button class="admin-btn edit-btn" data-id="${item.id}">Editar</button>
                                <button class="admin-btn delete-btn" data-id="${item.id}">Eliminar</button>
                            </div>
                        ` : ''}
                    </div>
                `;
                
                menuContainer.appendChild(menuItemElement);
            });

            // Agregar event listeners a los botones de admin si estamos en modo admin
            if (isAdminMode) {
                addAdminEventListeners();
            }
        }

        // Función para agregar event listeners a los botones de admin
        function addAdminEventListeners() {
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.getAttribute('data-id'));
                    openEditModal(id);
                });
            });

            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.getAttribute('data-id'));
                    deleteItem(id);
                });
            });
        }

        // Función para alternar el modo admin
        function toggleAdminMode() {
            isAdminMode = !isAdminMode;
            
            if (isAdminMode) {
                adminToggle.textContent = 'Salir del Modo Admin';
                adminToggle.classList.add('active');
                addItemBtn.style.display = 'block';
            } else {
                adminToggle.textContent = 'Modo Admin';
                adminToggle.classList.remove('active');
                addItemBtn.style.display = 'none';
            }
            
            // Volver a mostrar los elementos para actualizar los controles de admin
            displayMenuItems(currentCategory);
        }

        // Función para abrir el modal para agregar/editar productos
        function openAddModal() {
            modalTitle.textContent = 'Agregar Producto';
            productForm.reset();
            editingItemId = null;
            productModal.style.display = 'flex';
        }

        // Función para abrir el modal para editar un producto
        function openEditModal(id) {
            const item = menuItems.find(item => item.id === id);
            if (!item) return;
            
            modalTitle.textContent = 'Editar Producto';
            document.getElementById('product-name').value = item.name;
            document.getElementById('product-description').value = item.description;
            document.getElementById('product-price').value = item.price;
            document.getElementById('product-category').value = item.category;
            document.getElementById('product-image').value = item.image;
            
            editingItemId = id;
            productModal.style.display = 'flex';
        }

        // Función para cerrar el modal
        function closeModal() {
            productModal.style.display = 'none';
        }

        // Función para guardar un producto (agregar o editar)
        function saveProduct(e) {
            e.preventDefault();
            
            const name = document.getElementById('product-name').value;
            const description = document.getElementById('product-description').value;
            const price = document.getElementById('product-price').value;
            const category = document.getElementById('product-category').value;
            const image = document.getElementById('product-image').value;
            
            if (editingItemId) {
                // Editar producto existente
                const index = menuItems.findIndex(item => item.id === editingItemId);
                if (index !== -1) {
                    menuItems[index] = {
                        ...menuItems[index],
                        name,
                        description,
                        price,
                        category,
                        image
                    };
                }
            } else {
                // Agregar nuevo producto
                const newId = menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) + 1 : 1;
                menuItems.push({
                    id: newId,
                    name,
                    description,
                    price,
                    category,
                    image
                });
            }
            
            closeModal();
            displayMenuItems(currentCategory);
        }

        // Función para eliminar un producto - CORREGIDA
        function deleteItem(id) {
            if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                // Filtrar el array para eliminar el producto
                menuItems = menuItems.filter(item => item.id !== id);
                
                // Volver a renderizar el menú completo
                displayMenuItems(currentCategory);
                
                console.log('Producto eliminado. Total de productos:', menuItems.length);
            }
        }

        // Inicializar la página mostrando todos los elementos
        displayMenuItems();

        // Agregar event listeners a los botones de navegación
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover la clase activa de todos los botones
                navButtons.forEach(btn => btn.classList.remove('active'));
                
                // Agregar la clase activa al botón clickeado
                button.classList.add('active');
                
                // Mostrar los elementos de la categoría seleccionada
                currentCategory = button.getAttribute('data-category');
                displayMenuItems(currentCategory);
            });
        });

        // Event listeners para el modo admin (solo si los elementos existen)
        if (adminToggle) adminToggle.addEventListener('click', toggleAdminMode);
        if (addItemBtn) addItemBtn.addEventListener('click', openAddModal);
        if (productForm) productForm.addEventListener('submit', saveProduct);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

        // Cerrar modal al hacer clic fuera del contenido (si existe)
        if (productModal) {
            productModal.addEventListener('click', (e) => {
                if (e.target === productModal) {
                    closeModal();
                }
            });
        }
});

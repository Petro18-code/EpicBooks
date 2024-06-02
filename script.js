// @ts-nocheck
var tuttiLibri = [];
var cartItems = [];
fetch("https://striveschool-api.herokuapp.com/books")
  .then((Response) => {
    //console.log(Response)
    return Response.json();
  })
  .then((pippo) => {
    // console.log(pippo[1].asin)
    tuttiLibri = pippo;
    mostraLibri(tuttiLibri);
  });

  function mostraLibri(books) {
    let libri = document.querySelector(".libri");
    libri.innerHTML = "";
    books.forEach((element) => {
      let contenitore = `
        <div class="col-3 my-4">
          <div class="card h-100 ${cartItems.includes(element) ? 'added-to-cart' : ''}">
            <img src="${element.img}" class="card-img-top" alt="libriImage">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <button class="btn btn-primary add-to-cart-btn" data-book-id="${element.asin}">Aggiungi al carrello</button>
            </div>
          </div>
        </div>
      `;
      libri.innerHTML += contenitore;
    });

    //L'evento click ai pulsanti "Aggiungi al carrello"
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', function() {
        const bookId = this.getAttribute('data-book-id');
        const book = tuttiLibri.find(b => b.asin === bookId);
        aggiungiCart(book);
        this.closest('.card').classList.add('added-to-cart');
      });
    });
  }

  // Funzione per aggiungere un libro al carrello
  function aggiungiCart(book) {
    if (!cartItems.includes(book)) {
      cartItems.push(book);
      mostraCart();
    }
  }

  // Funzione per rimuovere un libro dal carrello
  function rimuoviDaCart(book) {
    const index = cartItems.indexOf(book);
    if (index > -1) {
      cartItems.splice(index, 1);
      mostraCart();
      mostraLibri(tuttiLibri);
    }
  }

  function mostraCart() {
    const cart = document.getElementById('cart');
    cart.innerHTML = '';
    cartItems.forEach(book => {
      const cartItem = document.createElement('li');
      cartItem.className = 'list-group-item d-flex justify-content-between align-items-center';
      cartItem.textContent = book.title;
      const removeButton = document.createElement('button');
      removeButton.className = 'btn btn-danger btn-sm';
      removeButton.textContent = 'Rimuovi';
      removeButton.addEventListener('click', function() {
        rimuoviDaCart(book);
      });
      cartItem.appendChild(removeButton);
      cart.appendChild(cartItem);
    });
    document.getElementById('cart-count').textContent = `(${cartItems.length})`;
  }

  // Funzione per svuotare il carrello
  function svuotaCarrello() {
    cartItems = [];
    mostraCart();
    mostraLibri(tuttiLibri);
  }

  // Funzione per filtrare i libri
  function filtraLibri() {
    let valoreRicerca = document.getElementById("ricerca").value.toUpperCase();
    let libriFiltrati = tuttiLibri.filter(element => element.title.toUpperCase().includes(valoreRicerca));
    mostraLibri(libriFiltrati);
  }

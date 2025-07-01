new Splide('#my-carousel', {
      type: 'loop',
      direction: 'ttb',        // vertikálně
      height: '600px',
      perPage: 5,
      perMove: 1,
      wheel: true,
      pagination: false
    }).mount();

    // Klikání na obrázky
    document.querySelectorAll('.carousel-image').forEach(img => {
      img.addEventListener('click', () => {
        alert("Klikl jsi na obrázek " + img.dataset.id);
        // nebo přesměrování: window.location.href = `detail.html?id=${img.dataset.id}`;
      });
    });
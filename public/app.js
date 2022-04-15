function domqs(selector) {
    return document.querySelector(selector);
}

const links = document.querySelectorAll('.link');
const sections = document.querySelectorAll('section');

let activeLink = 0;

links.forEach((link, i) => {
  link.addEventListener('click', () => {
    if(activeLink != i) {
      links[activeLink].classList.remove('active')
      link.classList.add('active');
      sections[activeLink].classList.remove('active');

      setTimeout(() => {
        activeLink = i;
        sections[i].classList.add('active');
      }, 1000)
    }
  })
})

function getInputsForm() {
    domqs('.contact-form').addEventListener('submit', (ev) => {
        const email = domqs('#email').value.replace(/\s/g, '').slice(0, 200);
        const name = domqs('#name').value.slice(0, 32);
        const msg = domqs('#msg').value.slice(0, 500);
        console.log(msg, name, email);

        const data = {
            email: email,
            name: name,
            msg: msg
        }
        
        const request = new Request("/contact", {
            method: 'POST',
            body: data,
            headers: new Headers()
        })

        console.log(request)

        fetch(request)
    })
}

getInputsForm();

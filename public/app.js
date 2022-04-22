function domqs(selector) {
    return document.querySelector(selector);
}

const links = document.querySelectorAll('.link'); const sections = document.querySelectorAll('section');

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
        ev.preventDefault()
        const email = domqs('#email').value.replace(/\s/g, '').slice(0, 200);
        const name = domqs('#name').value.slice(0, 80);
        const msg = domqs('#msg').value.slice(0, 500);
        const subject = domqs('#subject').value.slice(0, 100);

        const data = {
            email: email,
            name: name,
            msg: msg,
            subject: subject
        }

        fetch("/contact", {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
                },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then((res) => {console.log(res)})
        .catch((res) => {console.log(res)});
    })
}

getInputsForm();

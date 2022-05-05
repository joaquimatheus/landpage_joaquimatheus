function domqs(selector) {
    return document.querySelector(selector);
}

function getInputsForm() {
    domqs('.contact-form').addEventListener('submit', (ev) => {
        ev.preventDefault()
        const email = domqs('#email').value.replace(/\s/g, '').slice(0, 200);
        const name = domqs('#name').value.slice(0, 80);
        const msg = domqs('#msg').value.slice(0, 500);
        const subject = domqs('#subject').value.slice(0, 100);

        let isValid;
        if (!validateEmail(email)) {
            alert("this does not appear a valid email, please retype")
            domqs('#email').focus();

            isValid = false; 
            return isValid;
        };

        console.log('pass', email);

        const data = {
            email: email,
            name: name,
            msg: msg,
            subject: subject
        }

        if (isValid);
            fetch("/contact", {
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                    },
                method: "POST",
                body: JSON.stringify(data)
            })
            .then((res) => {
                if (res.redirected) {
                    return window.location.href = res.url
                }
            })
            .catch((res) => {console.log(res)});
    })
}

const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function validateEmail(email) {
    return regexMail.test(email);
}

function activeLinks() {
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
    });
}

window.onload = function() {
    activeLinks();
    getInputsForm();
}

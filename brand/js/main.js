let header = document.getElementById('top');
let links = document.getElementsByTagName('li');
let scrollBtn = document.getElementById('scrollTop');

let menus = document.getElementById('menus');
let sms = document.getElementById('sms');

scrollBtn.addEventListener('click', () => {
    defaultLoad();
});
let defaultLoad = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
window.onscroll = () => {
    if (window.scrollY > 100) {
        scrollBtn.style.display = 'block';
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        scrollBtn.style.display = 'none';
    }
}
for (const lnk of links) {
    var current = document.getElementsByClassName('active');
    lnk.addEventListener('click', () => {
        current[0].className = current[0].className.replace('active', "");
        lnk.classList.add('active');
    });
}
if (localStorage.getItem('accounts') != null) {
    var accounts = JSON.parse(localStorage.getItem('accounts'));
} else {
    console.log('Data not captured!');
    var accounts = [];
}

let createNewAccount = () => {
    let email = document.getElementById('email').value;
    let pwd = document.getElementById('pass').value;
    let log = document.getElementById('logs');
    if (email == '' || pwd == '') {
        log.innerHTML = "Please fill all fields.";
    } else {
        let newAccount = new Object();
        newAccount.email = email;
        newAccount.pwd = pwd;
        accounts.push(newAccount);
        localStorage.setItem('accounts', JSON.stringify(accounts));
        console.log(`Account for: ${email} has been created!`);
        email.value = '';
        pwd.value = '';
        document.cookie = `user=${email}; expires=Thu, 20 Dec 2022 12:00:00 UTC`;
        setTimeout(() => {
            window.location.href = 'allArticles.html';
        }, 2000);
    }
}
let logIntoYourAccount = () => {
    let email = document.getElementById('email').value;
    let pwd = document.getElementById('pass').value;
    let sms = document.getElementById('msgs');
    if (email == '' || pwd == '') {
        sms.style.color = "#f00;";
        sms.innerHTML = "Please fill all fileds!";
    } else {
        for (const person of accounts) {
            if (person.email == email && person.pwd == pwd) {
                if (person.email == 'alaintresorcyusa683@gmail.com') {
                    document.cookie = `user=${person.email}; expires=Thu, 20 Dec 2022 12:00:00 UTC`;
                    setTimeout(() => {
                        window.location.href = 'admin.html';
                    }, 2000);
                } else {
                    document.cookie = `user=${person.email}; expires=Thu, 20 Dec 2022 12:00:00 UTC`;
                    sms.style.color = 'green';
                    sms.innerHTML = '<i class="fa-solid fa-square-check"></i> Logged';
                    setTimeout(() => {
                        window.location.href = 'allArticles.html';
                    }, 1000);
                }
            } else {
                sms.innerHTML = 'No account found';
            }
        }
    }
}
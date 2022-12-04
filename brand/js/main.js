let header = document.getElementById('top');
let mn = document.getElementById('mn');
let links = document.getElementsByTagName('li');
let loggedUser = document.cookie.slice(5);
let menus = document.getElementById('menus');
let sms = document.getElementById('sms');
let isEmailValid = false;
let logoutUSer = () => {
    document.cookie = `user=${loggedUser}; expires=Thu, 20 Dec 2020 12:00:00 UTC; path="/brand"`;
    window.location.href = 'index.html';
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        isEmailValid = true
    } else {
        isEmailValid = false;
    }
}

let defaultLoad = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
        ValidateEmail(email);
        if (isEmailValid === true) {
            let create = false;
            for (const person of accounts) {
                console.log('heloo');
                if (person.email == email) {
                    log.style.color = "red";
                    log.innerHTML = "Account already exists! <br /> Go to login"
                    break;
                } else {
                    create = true;
                }
            }
            console.log(create);
            if (create === true || accounts.length <= 0) {
                let newAccount = new Object();
                newAccount.email = email;
                newAccount.pwd = pwd;
                newAccount.userID = accounts.length + 1;
                accounts.push(newAccount);
                localStorage.setItem('accounts', JSON.stringify(accounts));
                email = '';
                pwd = '';
                document.cookie = `user=${accounts.length + 1}; expires=Thu, 20 Dec 2022 12:00:00 UTC`;
                setTimeout(() => {
                    window.location.href = 'blog.html';
                }, 2000);
            } else {
                log.innerHTML = "Something went wrong!";
            }
        } else {
            log.style.color = "red";
            log.innerHTML = "Invalid email!";
        }
    }
}
let logIntoYourAccount = () => {
    let email = document.getElementById('email').value;
    let pwd = document.getElementById('pass').value;
    let sms = document.getElementById('msgs');
    if (email == '' || pwd == '') {
        sms.style.color = "red";
        sms.innerHTML = "Please fill all fileds!";
    } else {
        for (const person of accounts) {
            if (person.email == email && person.pwd == pwd) {
                if (person.userID == '1') {
                    sms.innerHTML = '<i class="fa-solid fa-square-check"></i> Being redirected.';
                    document.cookie = `user=${person.userID}; expires=Thu, 20 Dec 2022 12:00:00 UTC`;
                    setTimeout(() => {
                        window.location.href = 'allArticles.html';
                    }, 2000);
                } else {
                    document.cookie = `user=${person.userID}; expires=Thu, 20 Dec 2022 12:00:00 UTC`;
                    sms.style.color = 'green';
                    sms.innerHTML = '<i class="fa-solid fa-square-check"></i> Logged in';
                    setTimeout(() => {
                        window.location.href = 'blog.html';
                    }, 1000);
                }
            } else {
                sms.innerHTML = 'No account found';
            }
        }
    }
}
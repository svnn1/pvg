var formFooter = document.getElementById("form-footer");

formFooter.addEventListener("submit", function (evt) {
    evt.preventDefault();
    formFooter.classList.add("form-submit");

    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var telephone = document.getElementById("telephone");
    var cellphone = document.getElementById("cellphone");
    var message = document.getElementById("message");

    var xhr = new XMLHttpRequest();

    xhr.open('POST', '../../send-email/footer-contact.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onload = function () {
        if (xhr.status !== 200) {
            return alert("Aconteceu algo errado!");
        }

        var response = JSON.parse(xhr.responseText);

        if (response.message === 0) {
            return alert(response.error);
        }

        return alert("Mensagem enviada com sucesso!");
    };

    var data = 'name=' + name.value +
        '&email=' + email.value +
        '&telephone=' + telephone.value +
        '&cellphone=' + cellphone +
        '&message=' + message;

    xhr.send(encodeURI(data));

    formFooter.classList.remove("form-submit");
});
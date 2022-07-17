var loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
    if (!val) {
        return '请输入内容'
    }
})
var txtLoginPwd = new FieldValidator('txtLoginPwd', async function (val) {
    if (!val) {
        return '请输入密码'
    }
})
const biaodan = $('.user-form')
biaodan.addEventListener('submit', async function (e) {
    e.preventDefault();
    var user = await FieldValidator.validate(loginIdValidator, txtLoginPwd)
    if (!user) {
        return;
    }
    const c = await API.login({
        loginId: loginIdValidator.input.value,
        loginPwd: txtLoginPwd.input.value,
    })
    console.log(c)
    if (c.code === 0) {
        alert('登录成功')
        location.href = './index.html';
    } else {
        loginIdValidator.p.innerText = '账号或密码错误';
        txtLoginPwd.input.value = '';
    }
})
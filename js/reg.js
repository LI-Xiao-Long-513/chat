var loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
    if (!val) {
        return '请输入内容'
    }
    const a = await API.exists(val);
    if (a.data) {
        return '该账号已占用'
    }
})
var txtNickname = new FieldValidator('txtNickname', async function (val) {
    if (!val) {
        return '请输入昵称'
    }
})
var txtLoginPwd = new FieldValidator('txtLoginPwd', async function (val) {
    if (!val) {
        return '请输入密码'
    }
})
var txtLoginPwdConfirm = new FieldValidator('txtLoginPwdConfirm', async function (val) {
    if (!val) {
        return '请输入密码'
    }
    if (val !== txtLoginPwd.input.value) {
        return '密码不一致'
    }
})

const biaodan = $('.user-form')
biaodan.addEventListener('submit', async function (e) {
    e.preventDefault();
    var user = await FieldValidator.validate(loginIdValidator, txtNickname, txtLoginPwd, txtLoginPwdConfirm)
    if (!user) {
        return;
    }
    if (user) {
        await API.reg({
            loginId: loginIdValidator.input.value,
            loginPwd: txtLoginPwd.input.value,
            txtNickname: txtNickname.input.value
        })
        alert('注册成功')
        location.href = './login.html';
    }
})



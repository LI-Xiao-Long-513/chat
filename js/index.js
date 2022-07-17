(async function () {

    const result = await API.profile();
    console.log(result);
    const user = result.data;

    //判断是否是登录状态
    if (!user) {
        alert("用户未登录或者登录超时")
        location.href = './login.html'
        return;
    }

    const nickname = $('.aside-name')
    const loginId = $('.aside-account')
    const close = $('.close')
    const chatContainer = $('.chat-container')
    const txtMsg = $('#txtMsg')
    const message = $('.msg-container')

    //获取名称和账号
    nickname.innerText = user.nickname
    loginId.innerText = user.loginId

    //点击❌进行关闭
    close.addEventListener('click', function () {
        API.loginOut();
        location.href = './login.html'
    })
    //添加表单提交函数
    message.addEventListener('submit', async function (e) {
        e.preventDefault()
        sendChat()
    })
    loadHistory();
    //加载历史记录
    async function loadHistory() {
        const resp = await API.getHistory();
        for (const rexp of resp.data) {
            addChat(rexp);
        }
        xiahua()
    }
    //发送信息
    function addChat(chatInfo) {
        const div = document.createElement('div')
        div.className = 'chat-item';
        if (chatInfo.from) {
            div.classList.add('me')
        }

        const content = document.createElement('div')
        content.className = 'chat-content'
        content.innerText = chatInfo.content;

        const img = document.createElement('img')
        img.className = 'chat-avatar'
        img.src = chatInfo.from ? './asset/avatar.png' : './asset/robot-avatar.jpg';

        const date = $$$('div');
        date.className = 'chat-date';
        date.innerText = formatDate(chatInfo.createdAt);
        div.appendChild(img)
        div.appendChild(content)
        div.appendChild(date);

        chatContainer.appendChild(div);


    }
    //计算时间戳
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    //界面下滑事

    function xiahua() {
        chatContainer.scrollTop = chatContainer.scrollHeight
    }
    //和机器人进行对话
    async function sendChat() {
        const a = txtMsg.value.trim();
        if (!a) {
            return;
        }
        addChat({
            from: user.loginId,
            to: null,
            createdAt: new Date(),
            content: a
        })
        txtMsg.value = '';
        xiahua();
        const resp = await API.sendChat(a);
        addChat({
            from: null,
            to: user.loginId,
            createdAt: resp.data.createdAt,
            content: resp.data.content
        });
        xiahua();
    }
})()
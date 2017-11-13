const net = require('net');
const server = net.createServer();
const clients = {};//����ͻ��˵�����
var client = null;//��ǰ�ͻ�����
var uid = 0;
server.on('connection',(socket)=>{
    //������������
    var isOnline = !0;
    var keepAliveTimer = socket.timer = setInterval(()=>{
        if(!isOnline){
            client = socket;
            quit(socket.nick);
            return;
        }
        if(socket.writable){
            isOnline = !1;
            socket.write('::');
        }else{
            client = socket;
            quit(socket.nick);
        }
    },3000);
    socket.on('end',()=>{
        console.log(`client disconnected.\n\r`);
        socket.destroy();
    });
    socket.on('error',(error)=>{
        console.log(error.message);
    });
    socket.on('data',(chunk)=>{
        client = socket;
        var msg = JSON.parse(chunk.toString());
        if(msg.cmd=='keep'){
            isOnline = !0;
            return;
        }
        dealMsg(msg);
    });
});
server.on('error',(err)=>{
    console.log(err);
});
server.on('listening',()=>{
    console.log(`listening on ${server.address().address}:${server.address().port}\n\r`);
});
server.listen(8060);//��������
/**
 * �����û���Ϣ
 */
function dealMsg(msg){
    const cmd = msg.cmd;
    const funs = {
        'login':login,
        'chat':chat,
        'quit':quit,
        'exit':quit
    };
    if(typeof funs[cmd] !== 'function') return !1;
    funs[cmd](msg);
}
/**
 * �ͷ�������Դ
 */
function freeConn(conn){
    conn.end();
    delete clients[conn.uuid];
    conn.timer&&clearInterval(conn.timer);
}
/**
 * �û��״ν���������
 */
function login(msg){
    var uuid = '';
    uuid = getRndStr(15)+(++uid);//�����û�ID
    client.write(`��ӭ�㣬${msg.nick}�������ܹ���${Object.keys(clients).length}��С���������.\r\n`)
    client.nick = msg.nick;
    client.uuid = uuid;
    clients[uuid] = client;
    broadcast(`ϵͳ��${msg.nick}������������.`);

}
/**
 * �㲥��Ϣ
 */
function broadcast(msg){
    Object.keys(clients).forEach((uuid)=>{
        if((clients[uuid]!=client)& clients[uuid].writable){
            clients[uuid].write(msg);
        }
    });
}
/**
 * �˳�������
 */
function quit(nick){
    var message = `С���${nick}�˳���������.`;
    broadcast(message);
    freeConn(client);
}

function chat(msg){
    if(msg.msg.toLowerCase()=='quit'||msg.msg.toLowerCase()=='exit'){
        quit(msg.nick);
        return ;
    }
    var message = `${msg.nick}˵��${msg.msg}`;
    broadcast(message);
}   
/**
 * ���ָ������(len)���ַ���
 */
function getRndStr(len=1){
    var rndStr = '';
    for (; rndStr.length < len; rndStr += Math.random().toString(36).substr(2));
    return rndStr.substr(0, len);
}
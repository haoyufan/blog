const net = require('net');
const cout = process.stdout;
const cin = process.stdin;

var client = null;
var nick = '';

cout.write(`�������ǳƣ�`);
//��������������
cin.on('data',(chunk)=>{
    if(chunk.toString()!='\r\n'){
        if(client === null){
            nick = (chunk+'').replace(/[\r\n]/ig,"");
            createClient();
        }else{
            msg = (chunk+'').replace(/[\r\n]/ig,"");
            client.write(JSON.stringify({
                cmd: 'chat',
                msg: msg,
                nick: nick
            }));
            //���������exit��quit��Ͽ����Ӳ��˳�
            if(msg.toLowerCase() == 'exit' || msg.toLowerCase() == 'quit'){
                client.end();
                cin.end();
                return;
            }
            cout.write(`��˵��${msg}\n\r`);
        }
    }else{
        cout.write(`�������ǳƣ�`);
    }
});

function addListener(client) {
    client.on('connect', () => {
        cout.write(`�����ӵ�������\n\r`);
        client.write(JSON.stringify({
            cmd: 'login',
            msg: 'hello server',
            nick: nick
        }));
    });
    client.on('end', (chunk) => {
        cout.write(`��������Ͽ�����.\n\r`);
    });
    client.on('data', (chunk) => {
        //�����������Ϣ���Ӧkeep����
        if(chunk.toString()=='::'){
            client.write(JSON.stringify({
                cmd: 'keep',
                msg: '',
                nick: nick
            }));
            return ;
        }
        cout.write(`${chunk}\n\r`);
    });
    client.on('error', (err) => {
        cout.write(`an error has occured.\n\r${err}`);
    });
}
/**
 * ����socket�����ӷ�����
 */
function createClient(){
    console.log('\033[2J');//��������
    cout.write(`����'EXIT OR QUIT'�˳�������.\r\n`);
    client = new net.Socket()
    client.connect({port:8060/*,host:'1.1.1.69'*/});
    addListener(client);
}
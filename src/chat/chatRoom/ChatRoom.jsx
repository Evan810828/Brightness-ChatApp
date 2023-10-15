import { List, Avatar, Button, ButtonGroup } from '@douyinfe/semi-ui';


export default function ChatRoom(params) {
    const data = [
        // eslint-disable-next-line react/jsx-key
        [<p
            style={{
                color: 'var(--semi-color-text-2)',
                margin: '4px 0',
                width: 420,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}
        >
            Dummy last chat message.
        </p>,<p>
            Yesterday
        </p>,<p>
            Dummy Chat1
        </p>],
        // eslint-disable-next-line react/jsx-key
        [<p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0', width: 500 }}>
            Dummy last chat message.
        </p>,<p>
            2023/10/12
        </p>,<p>
            Dummy Chat2
        </p>],
        // eslint-disable-next-line react/jsx-key
        [<p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0', width: 500 }}>
            Dummy last chat message.
        </p>,<p>
            2023/10/11
        </p>,<p>
            Dummy Chat3
        </p>],
        // eslint-disable-next-line react/jsx-key
        
    ];

    return(
    <div className="w-3/5" style={{padding: 12, border: '1px solid var(--semi-color-border)', margin: 12 }}>
        
                <List 
                    dataSource={data}
                    renderItem={item => 
                        (
                        <List.Item onClick={()=>console.log("Clicked")}
                            header={<Avatar color="blue">CR</Avatar>}
                            main={
                                <div>
                                    <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item[2]}</span>
                                    {item[0]}
                                </div>
                            }
                            extra={
                                <ButtonGroup theme="borderless">
                                    {item[1]}
                                </ButtonGroup>
                            }
                        />
                    )}
                />
                
            </div>
    )
}
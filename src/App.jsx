import { TimerCount } from './com/counter';
import { NodeDetecter } from './com/nodeDetecter';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
    const [,setRenderSession] = useState(Date.now());
    const NodeLenRef = useRef([])
    useEffect(() => {
        const interval = setInterval(() => {
            const nextTimerList = NodeLenRef.current.concat([Date.now()]);
            NodeLenRef.current = nextTimerList;
            setRenderSession(Date.now())
        }, 2000);
        return () => {
            clearInterval(interval)
        }
    }, []);
    const DepthNode = NodeLenRef.current.reduce((Pre, cur) => {
            return ({children}) => <Pre><div><div><div><div>{children}</div></div></div></div></Pre>
        }, ({children}) => <div className="depth">{children}</div>);
    return (
        <div className="App">
            <div className='node-detector-demo'>
                <NodeDetecter />
            </div>
            <div className='node-detector-demo-hidden'>
                {
                    NodeLenRef.current.map((t) => {
                        return <div className='t-hidden' key={t}>{t}</div>
                    })
                }
                <DepthNode />
            </div>
            <div className="timer-demo">
                <span>最高位: 天</span>
                <TimerCount value={2 * 24 * 60 * 60 + 10 * 60 * 60 + 1 * 60 + 15} />
            </div>
            <div className="timer-demo">
                <span>最高位: 时</span>
                <TimerCount value={10 * 60 * 60 + 1 * 60 + 5} />
            </div>
            <div className="timer-demo">
            <span>最高位: 分</span>
                <TimerCount value={ 1 * 60 + 8} />
            </div>
            <div className="timer-demo">
            <span>最高位: 秒</span>
                <TimerCount value={ 6} />
            </div>
        </div>
    );
}

export default App;

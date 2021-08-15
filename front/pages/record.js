import React, { useEffect, useMemo } from 'react';
import AppLayout from '../components/AppLayout';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Button, Divider, List } from 'antd'; 
import { LOAD_NICKNAMES_REQUEST } from '../reducers/user';

const H1 = styled.h1`
    text-align: center;
    font-family: 'Jua', sans-serif;
`;

const Record = () => {
    const dispatch = useDispatch();
    const { mainUsers } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch({
            type: LOAD_NICKNAMES_REQUEST,
        });
    }, []);

    let nickname_output = [];
    let score_output = [];
    for (let i = 0; i < Object.keys(mainUsers).length; i++ ) {
        nickname_output.push((mainUsers)[Object.keys(mainUsers)[i]].nickname);
        score_output.push((mainUsers)[Object.keys(mainUsers)[i]].score);
    }

    console.log(nickname_output);
    console.log(score_output);

    const data = [];
    for (let i = 0; i < nickname_output.length; i++) {
        data.push(`${i+1}등 : ${nickname_output[i]} - ${score_output[i]}ms`); 
    }
    console.log(data);

    const style = useMemo(() => ({ fontFamily: `'Jua', sans-serif`, textAlign: 'center' }));


    // const data = [`1등 : ${me.nickname} - ${me.score}ms`];

    // const exUser = me.nickname?.me.score;
    // let data = [];
    // if(exUser) {
    //     for(let i=0; i<me.nickname.length; i++){
    //         data.push(`${i+1}등 : ${me.nickname[i]} - ${me.score[i]}`);
    //     }
    // }

    // const data = nickname.length >=10 ? [
    //     `1등 : ${nickname[0]} - ${score[0]}`,
    //     `2등 : ${nickname[1]} - ${score[1]}`,
    //     `3등 : ${nickname[2]} - ${score[2]}`,
    //     `4등 : ${nickname[3]} - ${score[3]}`,
    //     `5등 : ${nickname[4]} - ${score[4]}`,
    //     `6등 : ${nickname[5]} - ${score[5]}`,
    //     `7등 : ${nickname[6]} - ${score[6]}`,
    //     `8등 : ${nickname[7]} - ${score[7]}`,
    //     `9등 : ${nickname[8]} - ${score[8]}`,
    //     `10등 : ${nickname[9]} - ${score[9]}`,
    //   ] : '';

    
    return (
            <AppLayout>
                <div style={style}>
                    <H1>전체 순위</H1>
                    <Divider orientation="center">전체 10등까지!</Divider>
                    <List
                    style={{ textAlign: 'center' }}
                    size="small"
                    bordered
                    dataSource={data}
                    renderItem={item => <List.Item style={{ display: 'flex', justifyContent: 'center' }}>{item}</List.Item>}
                    />
                    <Button type="primary" style={{ display: 'block', margin: 'auto', marginTop: '20px' }}><Link href="/"><a>게임 다시 시작하기!</a></Link></Button>
                </div>
            </AppLayout>
    );
};

export default Record;
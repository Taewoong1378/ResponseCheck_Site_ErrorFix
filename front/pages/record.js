import React, { useMemo } from 'react';
import AppLayout from '../components/AppLayout';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Link from 'next/link';
import { Button, Divider, List } from 'antd'; 
import { LOAD_NICKNAMES_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const H1 = styled.h1`
    text-align: center;
    font-family: 'Jua', sans-serif;
`;

const Record = () => {
    const { mainUsers } = useSelector((state) => state.user);

    let nickname_output = [];
    for (let i = 0; i < Object.keys(mainUsers).length; i++ ) {
        nickname_output.push((mainUsers)[Object.keys(mainUsers)[i]].nickname);
    }
    
    let score_output = [];
    for (let i = 0; i < Object.keys(mainUsers).length; i++ ) {
        score_output.push((mainUsers)[Object.keys(mainUsers)[i]].score);
    }

    const data = [];
    for (let i = 0; i < nickname_output.length; i++) {
        data.push(`${i+1}등 : ${nickname_output[i]} - ${score_output[i]}ms`); 
    }

    const style = useMemo(() => ({ fontFamily: `'Jua', sans-serif`, textAlign: 'center' }));

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

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    context.store.dispatch({
      type: LOAD_NICKNAMES_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Record;
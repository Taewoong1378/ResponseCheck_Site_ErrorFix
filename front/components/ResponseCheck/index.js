import React, { useState, useRef, useCallback } from 'react';
import { Wrapper, Li, Div, ButtonWrapper, MainButton, UnderResetButton, FirstUl, SecondUl } from './styles';
import UnderButton from '../UnderButton/index';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { resetRequestAction } from '../../reducers/user';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  // eslint-disable-next-line react/jsx-key
  const [message, setMessage] = useState(['기회는 5번! 다음 화면에서 배경이 초록색이 되는 순간 클릭하세요.', <br/>, <br/>, '시작하려면 클릭해주세요.']);
  const [result, setResult] = useState([]);

  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const dispatch = useDispatch();

  const onClickScreen = useCallback((e) => {
    if (state === 'waiting') {
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭!');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
      setState('ready');
      setMessage('초록색이 되면 클릭하세요!');
    } else if (state === 'ready') { // 성급하게 클릭
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급하시네요 ㅡ.ㅡ 초록색이 된 후에 클릭하세요!');
    } else if (state === 'now') { // 반응속도 체크
        if(result.length !== 4) {
          endTime.current = new Date();
          setState('waiting');
          // eslint-disable-next-line react/jsx-key
          setMessage(['기회는 5번! 다음 화면에서 배경이 초록색이 되는 순간 클릭하세요.', <br/>, <br/>, '시작하려면 클릭해주세요.']);
          setResult((prevResult) => {
            return [...prevResult, endTime.current - startTime.current];
          });
      } else {
        endTime.current = new Date();
        setResult((prevResult) => {
          return [...prevResult, endTime.current - startTime.current];
        });
        setState('finish');
        setMessage('게임이 종료됐습니다. 게임을 다시하려면 아래 다시 버튼을 눌러주세요!');
        e.preventDefault();
      }
    }
  }, [state]);

  const onReset = useCallback(() => {
    setResult([]);
    setState('waiting');
    // eslint-disable-next-line react/jsx-key
    setMessage(['기회는 5번! 다음 화면에서 배경이 초록색이 되는 순간 클릭하세요.', <br/>, <br/>, '시작하려면 클릭해주세요.']);
    dispatch(resetRequestAction());
  }, []);

  const score = result.length !==0 ? Math.round(result.reduce((a, c) => a + c) / result.length) : null;

  const renderAverage = useCallback(() => {
    return result.length === 0
      ? 
      <Link href="/record">
        <a><div style={{ textAlign: 'center'}}><MainButton type="primary">다른 사람 점수 보러가기</MainButton></div></a>
      </Link>
      : result.length === 5
      ?
      <>
        <FirstUl style={{ position: 'relative' }}>
          <Li>
            평균 : {score}ms
          </Li>
          <Li>
            {score > 250 
            ?
            '연습을 더 하셔야겠네요!' 
            : 
            score > 220 
            ? 
            '이 정도면 전체 평균 정도 수준이네요!' 
            : 
            '정말 빠른 반응 속도를 가지고 있네요!'}
          </Li>
        </FirstUl>
        <Div>
          <ButtonWrapper type="primary" onClick={onReset}>다시!</ButtonWrapper>
            <Link href="/record">
            <a><ButtonWrapper type="primary">다른 사람 점수 보러가기</ButtonWrapper></a>
            </Link>
        </Div>
          <UnderButton setMessage={setMessage} onReset={onReset} score={score} />
      </>
      :
       <>
        <SecondUl>
          <Li key="first">1회차 : {result[0] ? `${result[0]}ms` : null}</Li>
          <Li key="second">2회차 : {result[1] ? `${result[1]}ms` : null}</Li>
          <Li key="third">3회차 : {result[2] ? `${result[2]}ms` : null}</Li>
          <Li key="fourth">4회차 : {result[3] ? `${result[3]}ms` : null}</Li>
          <Li key="fifth">5회차 : {result[4] ? `${result[4]}ms` : null}</Li>
          <Li key="sixth"><UnderResetButton onClick={onReset} type="primary">다시!</UnderResetButton></Li>
        </SecondUl>
      </>
  }, [result]);

  return (
    <>
        <Wrapper
          state={state}
          onMouseDown={onClickScreen}
        >
          {message}
        </Wrapper>
        {renderAverage()}
    </>
  );
};

export default ResponseCheck;
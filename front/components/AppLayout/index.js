import React from 'react';
import PropTypes from 'prop-types';
import { faHandPointUp } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { Header, Wrapper, Center, Style, A, Footer, Github, Instagram, Facebook, Ul, Li } from './styles';

const AppLayout = ({ children }) => (
        <div>
            <div>
                <Header>
                    <Wrapper icon={faHandPointUp} />
                    <Center>
                        <Link href="/"><A>반응속도 테스트</A></Link>
                        <Style> 
                            By Taewoong 
                        </Style>
                    </Center>
                </Header>
                {children}
                <Footer>
                    <Ul>
                        <Li>
                            <a href="https://github.com/Taewoong1378" target="_blank" rel="noreferrer noopener">
                                <Github icon={faGithub} />
                            </a>
                        </Li>
                        <Li>
                            <a href="https://www.instagram.com/tae_coding/" target="_blank" rel="noreferrer noopener">
                                <Instagram icon={faInstagram} />
                            </a>
                        </Li>
                        <Li>
                            <a href="https://www.facebook.com/profile.php?id=100008233455158" target="_blank" rel="noreferrer noopener">
                                <Facebook icon={faFacebook} />
                            </a>
                        </Li>
                    </Ul>
                </Footer>
            </div>
        </div>
    );

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;

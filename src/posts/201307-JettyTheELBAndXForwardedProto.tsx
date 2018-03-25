import React from 'react';
import { withRouteData } from 'react-static';
import { PostDiv, PostArticle, PostTitleH1, JavaCode } from '.';

export default withRouteData(() => (
    <PostDiv>
        <PostArticle>
            <PostTitleH1>Jetty, the ELB and X-Forwarded-Proto</PostTitleH1>
            <div>
                <p>
                    It's quite common to use hand off HTTPS traffic from Amazon's Elastic Load Balancer (ELB) to an HTTP server on EC2. In order to indicate that the original request was on HTTPS, the ELB sets the X-Forwarded-Proto header.
                </p>
                <p>
                    Jetty supports this header if you set the forwarded property of the connector. As in:
                </p>
                <JavaCode>{`
Server server = new Server();

SelectChannelConnector connector0 = new SelectChannelConnector();
connector0.setPort(8080);
connector0.setMaxIdleTime(30000);
connector0.setRequestHeaderSize(8192);
connector0.setForwarded(true);
server.setConnectors(new Connector[]{ connector0 });

// set up handlers

server.start();
server.join();
`.trim()}</JavaCode>
            </div>
        </PostArticle>
    </PostDiv>
))

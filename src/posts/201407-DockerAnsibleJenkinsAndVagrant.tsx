import React from 'react';
import { withRouteData } from 'react-static';
import { PostDiv, PostArticle, PostTitleH1 } from '.';

export default withRouteData(() => (
    <PostDiv>
        <PostArticle>
            <PostTitleH1>Docker, Ansible, Jenkins and Vagrant</PostTitleH1>
            <div>
                <p>
                    On Wednesday last week I put presented some slides at the Docker London Meetup
                    on putting together a self sufficient continuous integration environment using
                    Docker, Ansible, Jenkins and Vagrant. The slides are here:
                </p>
                <p>
                    <a href="http://slides.com/jamiemccrindle/docker-and-ansible#/">
                        slides.com/jamiemccrindle/docker-and-ansible#/
                    </a>
                </p>
                <p>
                    The sample project that goes along with the slides is here:
                </p>
                <p>
                    <a href="https://github.com/jamiemccrindle/docker_ansible_build">
                        github.com/jamiemccrindle/docker_ansible_build
                    </a>
                </p>
                <p>
                    What it does is:
                </p>
                <p>
                    <ul>
                        <li>Installs the latest version of Docker</li>
                        <li>Installs Ansible</li>
                        <li>Installs Java</li>
                        <li>Installs a Private Docker Repository</li>
                        <li>Installs and configures Jenkins</li>
                        <li>Adds Jenkins Job to build our application</li>
                        <li>The Jenkins Job:</li>
                        <ul>
                            <li>Compiles the application</li>
                            <li>Builds a docker image</li>
                            <li>Pushes the docker image to the docker repository</li>
                            <li>Runs and tests the new docker</li>
                        </ul>
                    </ul>
                </p>
            </div>
        </PostArticle>
    </PostDiv>
))

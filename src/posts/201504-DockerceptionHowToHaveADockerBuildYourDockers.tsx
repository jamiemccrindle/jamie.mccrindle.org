import React from 'react';
import { withRouteData } from 'react-static';
import { PostDiv, PostArticle, PostTitleH1, KotlinCode, BashCode } from '.';

export default withRouteData(() => (
    <PostDiv>
        <PostArticle>
            <PostTitleH1>Dockerception</PostTitleH1>
            <div>
                <p>
                    Having an entirely self contained build process within docker is convenient.
                    A downside is that doing this often means that there are build time dependencies
                    that are carried over to your runtime e.g. the official golang builder docker
                    weighs in at 514.8mb before you even add your project in. A better solution would
                    be to be able to build a 'builder' docker image and then use that to construct a
                    'runtime' docker image.
                </p>
                <p>
                    There is a proposal for nested builds:{' '}
                    <a href="https://github.com/docker/docker/issues/7115">
                        Proposal: Nested builds #7115</a>, but it has been open for some time.
                </p>
                <p>
                    I recall seeing the following feature in the <a href="https://docs.docker.com/v1.3/release-notes/#new-features_2">release
                    notes for Docker 1.1.0</a>:
                </p>
                <p>
                    <blockquote>
                        <strong>Allow a tar file as context for docker build</strong>
                        <p>
                            You can now pass a tar archive to docker build as context. This can be used to automate docker builds, for example:
                            cat context.tar | docker build - or docker run builder_image | docker build -
                        </p>
                    </blockquote>
                </p>
                <p>
                    but I hadn't seen an examples of it being used, so I decided to try it out.
                    The test project is here{' '}
                    <a href="https://github.com/jamiemccrindle/dockerception">
                        github.com/jamiemccrindle/dockerception
                    </a>.
                </p>
                <p>
                    Skipping to the end, here is the line that builds our builder docker image and
                    then builds the final runtime docker image:
                </p>
                <BashCode>{`
docker build -t builder .; docker run builder | docker build -t dockerception -
`.trim()}</BashCode>
                <p>
                    which does the following:
                </p>
                <p>
                    <ul>
                        <li>Builds a 'builder' docker image using the Dockerfile in the current directory (docker build -t builder .)</li>
                        <li>Runs the 'builder' docker which builds the sources in the current directory and outputs them as a tar stream
                          (docker run builder)
                        </li>
                        <li>Builds an image called 'dockerception' from the tar stream which contains a Dockerfile and the binary (docker
                          build -t dockerception -)
                        </li>
                    </ul>
                </p>
                <p>
                    The Dockerfile for the builder looks as follows:
                </p>
                <BashCode>{`
FROM golang:1.4.2-onbuild

# Add the runtime dockerfile into the context as Dockerfile
ADD Dockerfile.run /go/bin/Dockerfile

# Set the workdir to be /go/bin which is where the binaries are built
WORKDIR /go/bin

# Export the WORKDIR as a tar stream
CMD tar -cf - .
`.trim()}</BashCode>
                <p>
                    The Dockerfile for the runtime image looks as follows:
                </p>
                <KotlinCode>{`
FROM flynn/busybox

# Add the binary
ADD app /bin/app

EXPOSE 8001

# Run the /bin/app by default
CMD ["/bin/app"]
`.trim()}</KotlinCode>
                <p>
                    Resulting in a 10.53 MB docker image. It should be possible to build the runtime docker image using scratch instead
                    of busybox but I'll leave that as an exercise for the reader.
                </p>
                <p>
                    If this still seems confusing, here's a deeper dive into what's happening:
                </p>
                <p>
                    'docker build' usually points at a directory e.g. 'docker build .'. This is known as the docker build <i>context</i>.
                    The directory typically has a Dockerfile in it and any other resources you want to add via the ADD command e.g. for
                    a golang project your directory / context may look something like this:
                </p>
                <pre>{`
< tree .
.
|-- Dockerfile
|-- main.go
`.trim()}</pre>
                <p>
                    And your docker build command would look as follows:
                </p>
                <BashCode>{`
>  docker build .
`.trim()}</BashCode>
                <p>
                    Now, it turns out that docker can also accept that context via a tar file as in, if you run:
                </p>
                <BashCode>{`
                > tar -cvf /tmp/image.tar .
a .
a ./Dockerfile
a ./main.go
`.trim()}</BashCode>
                <p>
                    You could run docker build as follows:
                </p>
                <BashCode>{`
> cat /tmp/image.tar | docker build . -
`.trim()}</BashCode>
                <p>
                    All that we need to do now is create a 'builder' docker that can construct a context directory and write it to
                    standard out as a tar stream that we can pipe to docker build
                </p>
            </div>
        </PostArticle>
    </PostDiv>
))

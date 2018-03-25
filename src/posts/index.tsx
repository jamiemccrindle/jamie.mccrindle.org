import React from 'react';
import SyntaxHighlighter from "react-syntax-highlighter/light";
import glamorous from 'glamorous';

import docco from 'react-syntax-highlighter/styles/hljs/docco';

export const PostDiv = glamorous.div({
    fontFamily: 'Georgia,Cambria,"Times New Roman",Times,serif',
    fontWeight: 100,
    fontSize: 21,
    lineHeight: 1.58,
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
});

export const PostArticle = glamorous.article({
    maxWidth: 740,
    paddingLeft: 20,
    paddingRight: 20,
});

export const CodeDiv = glamorous.pre({
    fontSize: 15
})

export const PostTitleH1 = glamorous.h1({
    fontFamily: '"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif',
    fontSize: 36,
    lineHeight: 1.04,
})

export const KotlinCode: React.SFC = (props) => (
    <CodeDiv><SyntaxHighlighter language='kotlin' style={docco}>{props.children}</SyntaxHighlighter></CodeDiv>
)

export const BashCode: React.SFC = (props) => (
    <CodeDiv><SyntaxHighlighter language='bash' style={docco}>{props.children}</SyntaxHighlighter></CodeDiv>
)

export const JavaCode: React.SFC = (props) => (
    <CodeDiv><SyntaxHighlighter language='java' style={docco}>{props.children}</SyntaxHighlighter></CodeDiv>
)


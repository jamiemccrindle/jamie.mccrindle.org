import React from 'react';

class RollingTextEffectProps {
    messages: string[];
}

class RollingTextEffectState {
    messageIndex: number;
    message: string;
}

export class RollingTextEffect extends React.Component<RollingTextEffectProps, RollingTextEffectState> {

    codeletters = '01';
    currentLength = 0;
    fadeBuffer: { c: number, l: string }[] = undefined;
    animating = false;
    cancelAnimation: number = undefined;

    state = {
        messageIndex: 0,
        message: ' '
    } as RollingTextEffectState

    generateRandomString = (length: number) => {
        let randomText = '';
        while (randomText.length < length) {
            randomText += this.codeletters.charAt(Math.floor(Math.random() * this.codeletters.length));
        }
        return randomText;
    }

    componentDidMount() {
        this.animating = true;
        this.runIn(this.animateIn, 20);
    }

    componentWillUnmount() {
        this.animating = false;
        if (this.cancelAnimation) {
            clearTimeout(this.cancelAnimation);
        }
    }

    runIn = (func: (...args: any[]) => void, delay: number) => {
        if (this.animating) {
            this.cancelAnimation = window.setTimeout(() => {
                if (this.animating) {
                    func();
                }
            }, delay);
        }
    }

    animateIn = () => {
        const currentMessage = this.props.messages[this.state.messageIndex];
        const currentMessageLength = currentMessage.length;
        if (this.currentLength < currentMessageLength) {
            this.currentLength = this
                .currentLength + 2;
            if (this.currentLength >
                currentMessageLength) {
                this.currentLength = currentMessageLength;
            }

            const message = this.generateRandomString(this.currentLength);

            this.setState(() => ({
                message
            }));

            this.runIn(this.animateIn, 20);
        } else {
            this.runIn(this.animateFadeBuffer, 20);
        }
    };

    animateFadeBuffer = () => {
        if (this.fadeBuffer === undefined) {
            this.fadeBuffer = [];
            for (let i = 0; i < this.props.messages[this.state.messageIndex].length; i++) {
                this.fadeBuffer.push({ c: (Math.floor(Math.random() * 12)) + 1, l: this.props.messages[this.state.messageIndex].charAt(i) });
            }
        }

        let doCycles = false;
        let message = ' ';

        for (let i = 0; i < this.fadeBuffer.length; i++) {
            const fader = this.fadeBuffer[i];
            if (fader.c > 0) {
                doCycles = true;
                fader.c--;
                message += this.codeletters.charAt(Math.floor(Math.random() * this.codeletters.length));
            } else {
                message += fader.l;
            }
        }

        this.setState(() => ({
            message
        }));

        if (doCycles === true) {
            this.runIn(this.animateFadeBuffer, 50);
        } else {
            this.runIn(this.cycleText, 2000);
        }
    };

    cycleText = () => {
        this.currentLength = 0;
        this.fadeBuffer = undefined;

        this.setState(({ messageIndex }) => (
            {
                messageIndex: (messageIndex + 1) % this.props.messages.length,
            }));

        this.runIn(this.animateIn, 200);
    };

    render() {
        const { message } = this.state;
        return (
            <div>{message}</div>
        )
    }
};

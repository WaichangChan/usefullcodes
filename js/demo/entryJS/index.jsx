/**
 * Created by timxuan on 2016/11/8.
 */
'use strict';

import React,{Component} from 'react';
import ReactDOM from "react-dom";
import 'react-fastclick';

import Tab from '../../common/components/Tab';
// import customStyle from '../sass/index.scss';

import Alert from '../../common/components/Alert';

import Toast from 'Toast';
import indexScss from '../../common/components/Toast/index.scss';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const main = document.querySelector('#main');

/**
 * 通用Tab使用示例
 */
/*ReactDOM.render(

    <Tab onChange={(id) => { console.log( `切换到了第${id+1}个标签` ); }} >
        <Tab.TabBtnBar>
            <Tab.TabBtn>按钮1</Tab.TabBtn>
            <Tab.TabBtn>按钮2</Tab.TabBtn>
            <Tab.TabBtn active={true}>按钮3</Tab.TabBtn>
        </Tab.TabBtnBar>
        <Tab.TabPanelWrap>
            <Tab.TabPanel>11111</Tab.TabPanel>
            <Tab.TabPanel>22222</Tab.TabPanel>
            <Tab.TabPanel>33333</Tab.TabPanel>
        </Tab.TabPanelWrap>
    </Tab>,
    main
);*/


class MyComponent extends Component{

    constructor( props ){
        super(props);

        this.state = {
            show:false
        };

        this.painter = null;

        this.pw = 600;

        this.radius = 280;
    }

    componentDidMount(){

    }

    initPainter( e ){
        if( e ){
            this.painter = e.getContext('2d');

            this.drawWheel();
        }
    }

    drawTopWheel( text, gap ){

        //奖品再转盘的上部分和下部分，处理方式不同
        if( gap > 90 && gap < 270 ){

            return text;

        }

        const painter = this.painter;

        const charList = text.split('');

        const fontSize = this.fontSize + 5;

        const halfSize = fontSize/2;

        let textlength = 0;

        //计算所有文字占多少像素
        charList.forEach((e) => {

            if( /[\d\sa-zA-Z]/.test(e) ){
                textlength += halfSize;
            }
            else{
                textlength += fontSize;
            }

        });

        //弧长除以半径 = 圆心角弧度
        let radian = textlength/this.radius;

        let fontRadian = fontSize/this.radius;

        let hfr = halfSize/this.radius;

        //调整开始的角度
        painter.rotate( -radian/2 );

        let lastRadian = ( ( /[\d\sa-zA-Z]/.test( charList[0] ) ? hfr : fontRadian ) )/2;

        charList.forEach((e) => {

            let rd = ( ( /[\d\sa-zA-Z]/.test(e) ? hfr : fontRadian ) )/2; // + lastRadian;

            painter.rotate( rd + lastRadian );

            lastRadian = rd;

            painter.fillText(e, 0, -this.radius);

        });

        //恢复到原来的角度
        painter.rotate( -radian/2 );

    }

    drawBottomWheel( text ){
        const painter = this.painter;

        const charList = text.split('');

        charList.forEach((e) => {
            painter.fillText(e, 0, 250);
        });
    }

    drawWheel(){

        this.fontSize = 30;

        const painter = this.painter;

        painter.font = `${this.fontSize}px Verdana`;
        painter.textAlign = 'center';
        painter.textBaseline="middle";

        painter.translate( this.pw/2, this.pw/2 );

        let prizeList = [
            'vivo X9',
            '玫瑰',
            '酷狗VIP',
            '酷狗潘多拉音响',
            '酷狗小公子',
            '座驾鲸鱼',
            '星卡',
            '酷狗无线耳机'
            // 'v',
            // '玫',
            // '酷',
            // '酷',
            // '酷',
            // '座',
            // '星',
            // '酷'
        ];

        let gap = 360/prizeList.length;//*Math.PI/180;

        const rad = gap*Math.PI/180;

        //奖品再转盘的上部分和下部分，处理方式不同

        let bottomPrize = [];

        prizeList.forEach( ( str, i ) => {

            painter.rotate( i > 0 ? rad : 0 );

            let btm = this.drawTopWheel( str, gap*i );

            if( btm ){
                bottomPrize.push( btm );
            }
        });

        // this.drawBottomWheel();

        /*bottomPrize.forEach( ( str, i ) => {

            painter.rotate( i > 0 ? rad : 0 );

            this.drawBottomWheel( str, gap*i );

        });*/

    }

    render(){
        return <canvas id="cvs" width={this.pw} height={this.pw} ref={( e ) => { this.initPainter(e); }}/>;
    }
}

ReactDOM.render(
    <MyComponent/>,
    main
);

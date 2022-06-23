import {Pose} from '@mediapipe/pose'
import * as cam from '@mediapipe/camera_utils'
import pal from './resource/pal.mp4'
import {useEffect} from 'react'
import drawLine from './Drawing'

export default function Training () {

    function draw(result) {
        const cvEle = document.getElementById('test-canvas')

        const ctx = cvEle.getContext('2d');

        ctx.save();
        ctx.clearRect(0,0,640,480)

        drawLine(result[12].x,result[12].y,result[11].x,result[11].y,ctx,640,480,"20","ff6726")

       

            // 좌측 팔
            drawLine(result[12].x,result[12].y,result[14].x,result[14].y,ctx,640,480,"20","ff6726") // 어깨 -> 팔꿈치
            drawLine(result[14].x,result[14].y,result[16].x,result[16].y,ctx,640,480,"20","ff6726") // 팔꿈치 -> 손목

            // 우측 팔
            drawLine(result[11].x,result[11].y,result[13].x,result[13].y,ctx,640,480,"20","ff6726") // 어깨 -> 팔꿈치
            drawLine(result[13].x,result[13].y,result[15].x,result[15].y,ctx,640,480,"20","ff6726") // 팔꿈치 -> 손목

            // 좌측 상체
            drawLine(result[12].x,result[12].y,result[24].x,result[24].y,ctx,640,480,"20","ff6726")
            // 우측 상체
            drawLine(result[11].x,result[11].y,result[23].x,result[23].y,ctx,640,480,"20","ff6726")
            // 허리
            drawLine(result[24].x,result[24].y,result[23].x,result[23].y,ctx,640,480,"20","ff6726")

            // 좌측 다리
            drawLine(result[24].x,result[24].y,result[26].x,result[26].y,ctx,640,480,"20","ff6726") // 허벅지
            drawLine(result[26].x,result[26].y,result[28].x,result[28].y,ctx,640,480,"20","ff6726") // 종아리

            // 우측 다리
            drawLine(result[23].x,result[23].y,result[25].x,result[25].y,ctx,640,480,"20","ff6726") // 허벅지
            drawLine(result[25].x,result[25].y,result[27].x,result[27].y,ctx,640,480,"20","ff6726")
    }


    function onResults(results) {
       console.log(results.poseLandmarks)
       draw(results.poseLandmarks)
    }

    useEffect(()=> {
        console.log("Training Test");

        const testVideoElement = document.getElementById('testVideo');

        testVideoElement.onloadeddata = (evt) => {
           
            console.log("loaded data")
            onFrame();
           
           
            
        }

        const pose = new Pose({locateFile : (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }})

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            smoothSegmentation: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
          });

          pose.onResults(onResults);

          async function onFrame() {
            await pose.send({image : testVideoElement});
            await new Promise(requestAnimationFrame);
            onFrame();
          }
            
    

        


    },[])

    return (
        <>
            <video width="640" height="480" src={pal} controls autoPlay id="testVideo" muted="muted" loop/>
            <canvas width="640" height="480" id="test-canvas"></canvas>
        </>
    );
    
}
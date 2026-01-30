import { Injectable } from '@angular/core';
import { HandLandmarker, FilesetResolver, Landmark } from '@mediapipe/tasks-vision';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MotionCaptureService
{
    private handLandmarker: HandLandmarker | null = null;
    private video: HTMLVideoElement | null = null;
    private lastVideoTime = -1;

    public handLandmarks$ = new BehaviorSubject<Landmark[][] | null>(null);

    constructor()
    {
        this.initHandDetection();
    }

    async initHandDetection()
    {
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                delegate: "GPU"
            },
            runningMode: "VIDEO",
            numHands: 2
        });
    }

    async startCamera(videoElement: HTMLVideoElement)
    {
        this.video = videoElement;
        try
        {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            this.video.srcObject = stream;
            this.video.addEventListener('loadeddata', () =>
            {
                this.predict();
            });
        } catch (err)
        {
            console.error("Error accessing camera", err);
        }
    }

    private async predict()
    {
        if (!this.handLandmarker || !this.video) return;

        let startTimeMs = performance.now();
        if (this.lastVideoTime !== this.video.currentTime)
        {
            this.lastVideoTime = this.video.currentTime;
            const results = this.handLandmarker.detectForVideo(this.video, startTimeMs);
            if (results.landmarks && results.landmarks.length > 0)
            {
                this.handLandmarks$.next(results.landmarks);
            } else
            {
                this.handLandmarks$.next(null);
            }
        }

        requestAnimationFrame(() => this.predict());
    }
}

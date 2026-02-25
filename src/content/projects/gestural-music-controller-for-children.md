---
title: Gestural music controller for children
slug: gestural-music-controller
draft: false
description: A fun musical controller based on muscle detection for kids.
categories:
  - music
tags:
  - tools
year: 2016
location: Cambridge, UK
featured: false
featuredImage: ''
videoUrl: https://tv.theiet.org/?videoid=8325
technologies:
  - Myo
  - Resolume
links: null
publishedDate: 2026-02-14T10:06:00
---

This system allows you to control music and visuals with simple hand and arm gestures.

I developed a demo for ARM's outreach at STEM events including the Big Bang Fair.

The demo is based around a [Myo](http://www.myo.com) armband, which detects hand gestures through muscle tension in the arm (a method known as electromyography). By performing hand gestures, a user controls a musical sound track and associated visuals displayed on a monitor. As well as showcasing how new technologies can be used for creative applications, the demo also highlights how alternative control interfaces can be useful for people with limited motor functions.

Inside the Myo is a Kinetis K20 MCU from NXP, which includes an ARM Cortex-M4 processor. Using the Myo API, which provides both raw sensor data from the armband and control data from detecting hand gestures, control signals are mapped to audio and visuals by transforming data from Myo using the Open Sound Control (OSC) protocol.

The system has two modes, one for younger children (approximately below 10) and a second for older users. The modes use different methods of interaction and have different levels of complexity, to reflect the age ranges and the difference in their size and muscle development.

The mode for younger children only uses the Myo’s gyroscope and accelerometer and maps movement to strumming chords of a virtual harp. Here, they can emulate playing a harp by holding the Myo in their hand or wearing it on their arm. The speed of movement and the tilt angle control the way in which the virtual harp is played. They can strum slowly or fast, change chords and watch the notes appear as patterns on-screen.

The mode for older children with larger arms, allows for mixing together different instruments (drums, bass, and synth) by performing five specific hand gestures. The mode also applies effects including distortion, filtering, and modulation by using data mapped from the Myo’s accelerometer and gyroscope. Hand gestures control instruments and arm movements control the intensity of the various effects.

Watch a video of the system being explained on the [Institute of Engineering and Technology online TV channel](https://tv.theiet.org/?videoid=8325):

https://tv.theiet.org/?videoid=8325

![photos from the big bang fair](/images/uploads/big_bang_images.jpg "The Big Bang Fair event")

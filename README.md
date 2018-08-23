# UdaciCards

## About

This is a submission of the Udacity React Nanodegree
Program's assignment UdaciCards.

# Tested devices

This project was testes in androd only. 

I tested it on 
* Real device: Samsung NOTE 3. (Android 5.0 ) RAM 4GB ROM 32GB Screen 1920x1080

## How to install and run

* Clone this repository.
* If you have not installed yarn install yarn globally.
* Install [Expo App](https://play.google.com/store/apps/details?id=host.exp.exponent) to your device 
* On the top directory of this project.

```
$ yarn install
$ yarn start
```

After a while, QR code(TM) and the URL `exp://...`  are displayed.
Please scan QR code(TM) or enter the URL on Expo App.


## Development environment

* This project use [expo](https://expo.io/) "^29.0.0" CLI.
* I use WINDOWS 10 Desktop. (May work all enviroment that Expo CLI supported) 
* node v10.6.0.

## Unsolved Warning

Warning: Can't call setState (or forceUpdate) on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    in DeckItem (at SceneView.js:9)


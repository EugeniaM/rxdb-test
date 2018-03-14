## Barcode scanner investigation app

#### Platforms

* Web Browser
* Windows 10 Universal App
* iOS App
* Android App

#### How to build the same app with barcodescanner plugin correctly

* Install Cordova and Ionic CLI `npm install -g cordova ionic`
* Install following plugins:
    * `ionic cordova plugin add phonegap-plugin-barcodescanner`
    * `yarn add @ionic-native/barcode-scanner`

* Install following platforms with strict versions `cordova platform add <name>`:
    * `browser`
    * `windows`
    * `android`
    * `ios`
* Available npm scripts:
  * `yarn start:browser` - run Browser platform with Cordova CLI
  * `yarn start:win` - run Windows 10 platform with Cordova CLI
  * `yarn start:android` - run Android platform with Cordova CLI
  * `yarn start:browser` - run iOS platform with Cordova CLI
  * `yarn build:win` - builds .appx release file for Windows 10 platform
  * `yarn ionic:dev` - run the app in Ionic development mode with HMR without Cordova wrapper
  * `yarn ionic:build` - build the Ionic app
  * `yarn lint` - run TSLint code quality checker

    
#### Caveats for different platforms
* `Web Browser`
    * `phonegap-plugin-barcodescanner` doesn't work with camera on browser platform. We can see fake prompt instead or we can use `Quagga.js` scanner library in browser to scan bar codes
* `Windows 10`
    * Don't forget to activate camera permissions in `Windows Settings -> Privacy -> Camera` for this app
* `Android`
    * Better to use API v25 in Emulator to work with app (install it if needed)
    * You can setup USB webcam in Emulator to scan barcodes during development (open `AVD -> Go to emulated device -> Advanced settings -> set "usb camera" options`)

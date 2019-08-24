
# Networked Outlet and Controller with Omega2 Nodejs and Vue

I originally started this as a way to turn my Christmas lights on/off without having to actually get up and go do it. I could easily buy this at the store for the cost of components or less, but then what would I do  with all that free time I spent not building this?

### purpose
`create a fullstack hardware/software component in entirety`

### requirements

`Provide a series of physical power outlets which are controllable through a digital web interface available on the current network. No data should ever be sent to a server external to the current network and no internet connection should be required for the interface to be accessible. #privateIoTPlease`


#### tools used

Hardware
- omega2 plus with expansion dock / 5v power supply (1 amp is fine for development, will have to have a 2.5 amp for final product) - `https://onion.io/store/omega2/`
- breadboard, led's, 330 ohm resistors
- 2.54mm pitch pin cables
- 2.54mm pitch male pins for pcb board
- soldering iron
- a serial to usb cable can be handy
- a voltmeter
- dual sided pcb - used the arduino 2mm / 2.54mm combo board for the final product. Highly recommend for any socs with 2mm pitch. `https://www.amazon.com/gp/product/B01L4BM2WM/ref=ppx_yo_dt_b_asin_title_o06_s00?ie=UTF8&psc=1`
- 22 guage wire for pcb board
- 5v to 3v buck converter - `https://www.amazon.com/gp/product/B01MQGMOKI/ref=ppx_yo_dt_b_asin_title_o07_s01?ie=UTF8&psc=1`
- pcb female micro-usb - `https://www.amazon.com/gp/product/B0183KF7TM/ref=ppx_yo_dt_b_asin_title_o07_s00?ie=UTF8&psc=1`
- if you want an i/o switch its an easy add. I threw one on my initial power supply prototype and started using it as a breadboard power supply.
- sainsmart 8 channel relay; a six would have been fine. - `https://www.sainsmart.com/products/8-channel-5v-relay-module?variant=45099713492&currency=USD&utm_campaign=gs-2018-08-06&utm_source=google&utm_medium=smart_campaign&gclid=Cj0KCQjwwIPrBRCJARIsAFlVT88U6qSPPntnIPKskXwJTSAl5ekN8sXIp0qZbND2MV1K-g3rQo6MEP0aAgu7EALw_wcB`

- a 4 gang outlet box - `https://www.lowes.com/pd/CARLON-Super-Blue-4-Gang-Blue-Plastic-Interior-New-Work-Standard-Switch-Outlet-Wall-Electrical-Box/50038874`
- a heavy gauge extension cord that will be cut, or you can use some 12 gauge house wire

Software
- Nodejs/express
- mosquitto - need to add this instead of using http
- typescript
- Vue - html/css/js
- linux
- git
- gulp


```
Use the pcb to afix the micro usb power supply input (should always be 5v). 

Wire an outlet of 2.54mm pins with the +/- coming directly from the input. This will be to power your 5v relay board. 
Wire another +/- connection to the input of the buck converter.
The output of the buck converter should power the Omega2.

Mount the relay board into the bottom of the 4 gang box.
Cut the extension cord in half, remove the female end altogether and replace with a new male end. These will plug into a wall socket.
Run the wires from these into the 4 gang box. 

Run a pigtail leech off of the +/-. Use this to power the 5v micro usb power supply which plugs into the omega2 unit. Using the same line that you pigtailed off of for that, and wire it into the relay box with jumpers from relay to relay (do this for the first 4). Run the second set of 4 relay positions in the same way, except using the second input wire as the source.

Run output wires of the relay boxes to their relevant sockets (be sure to use each individual socket. If you bought outlets that have a metal share plate, it will need to be removed).

On the pcb board, attach 2.54mm pins to the board, and wire them to the omega2 gpio pins. Since this is a relay the pull up/down on the gpio's will cause them to trigger. This means that on boot, if any of the pins used manipulated by a boot sequence, it will cause the relays to trigger, which is bad. In order to avoid this, I use 0,2,3,18,19 gpio's from the omega2, as they don't get manipulated at boot. That means that I only have 5 to use for the purpose of a relay :( The real solution here to use all 8 would be to create a mux/demux circuit which would utilize 6 gpio's, but would be immune to boot time antics b/c of a stored state in the circuit. I'm not doing that here, its beyond the scope of my purpose for this project, 5 options will do fine.

```

### dev instructions
`npm install`
`gulp`
`npm start-dev`

if changes are made to the vue application in the public folder:
in public folder use`vue build app.vue`
in o2 folder: `gulp`

sync to omega: `npm run qsync`
the destination will need to be set up in the package.json as the second argument to the save.js call








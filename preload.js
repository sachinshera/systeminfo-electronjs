
const { } = require("electron");
const si = require('systeminformation');

// promises style - new since version 3


window.addEventListener("DOMContentLoaded", () => {
    // get os info 

    si.osInfo().then((os) => {
        let platform = os.platform;
        let release = os.release;
        let hostname = os.hostname;
        let distro = os.distro;
        let kernal = os.kernel;
        document.querySelector(".platform").innerHTML = platform;
        document.querySelector(".hostname").innerHTML = hostname;
        document.querySelector(".distro").innerHTML = distro;
        document.querySelector(".kernal").innerHTML = kernal;
        document.querySelector(".release").innerHTML = release;
    });

    si.cpu().then((cpuinfo) => {
        let processor = cpuinfo.brand;
        let cores = cpuinfo.physicalCores;
        let generation = cpuinfo.family;
        let maxClockSpeed = cpuinfo.speedMax;
        let baseClockSpeed = cpuinfo.speed;
        let manufacturer = cpuinfo.manufacturer;

        document.querySelector(".cpu-processor").innerHTML = processor;
        document.querySelector(".cpu-cores").innerHTML = cores;
        document.querySelector(".cpu-generation").innerHTML = generation;
        document.querySelector(".cpu-brand").innerHTML = manufacturer;
        document.querySelector(".max-clock-speed").innerHTML = maxClockSpeed;
        document.querySelector(".base-clock-speed").innerHTML = baseClockSpeed;
    });

    si.mem().then((memoryinfo) => {
        let totalRam = memoryinfo.total;
        let usedRam = memoryinfo.active;
        let freeRam = memoryinfo.free;
        let swaptotal = memoryinfo.swaptotal;
        let swapused = memoryinfo.swapused;
        let swapfree = memoryinfo.swapfree;

        document.querySelector(".ram-total").innerHTML = bytesToSize(totalRam);

        document.querySelector(".ram-used").innerHTML = bytesToSize(usedRam);
        document.querySelector(".ram-free").innerHTML = bytesToSize(freeRam);
        document.querySelector(".ram-swap-free").innerHTML = bytesToSize(swapfree);

        document.querySelector(".ram-swap-total").innerHTML = bytesToSize(swaptotal);
        document.querySelector(".ram-swap-used").innerHTML = bytesToSize(swapused);
    });

    si.wifiNetworks().then((wifi) => {
        var count = 0;
        wifi.forEach((list) => {
            count++;
            let ssid = list.ssid;
            let channel = list.channel;
            let quality = list.quality;
            let security = "None";
            if (list.security.length !== 0) {
                security = list.security[0];
            }

            let tr = document.createElement("tr");
            document.querySelector(".wifi-list").append(tr);
            let rowtd = document.createElement("th");
            rowtd.innerHTML = count;
            rowtd.setAttribute("scope", "row");
            tr.append(rowtd);

            let ssidtd = document.createElement("td");
            ssidtd.innerHTML = ssid;
            tr.append(ssidtd);

            let channeltd = document.createElement("td");
            channeltd.innerHTML = channel;
            tr.append(channeltd);

            let qualitytd = document.createElement("td");
            qualitytd.innerHTML = quality;
            tr.append(qualitytd);

            let securitytd = document.createElement("td");
            securitytd.innerHTML = security;
            tr.append(securitytd);



            //     document.querySelector(".wifi-list").append(` 
            //     <tr>
            //     <th scope="row"> ${count} </th>
            //     <td>${ssid}</td>
            //     <td>${channel}</td>
            //     <td>${quality}</td>
            //     <td>${security}</td>
            // </tr>`);

        })
    })

    si.wifiConnections().then((connections) => {
        connections.forEach((connected) => {
            let ssid = connected.ssid;
            let security = connected.security;
            let alertBox = document.createElement("div");
            alertBox.className = "alert alert-success";
            alertBox.innerHTML = ssid;

            document.querySelector(".connected-list").append(alertBox);
        })
    })


    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
});
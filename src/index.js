import TinyGesture from "tinygesture";

let gesture;
var commandL, commandR, commandDT, commandLP, thisDate;

export default {
    onload: ({ extensionAPI }) => {
        const config = {
            tabTitle: "Gesture Actions",
            settings: [
                {
                    id: "ga-left",
                    name: "Swipe Left",
                    description: "Action to take on swipe left",
                    action: {
                        type: "select",
                        items: [
                            "None",
                            "Back one day",
                            "Go to Today",
                            "Forward one day",
                            "Refresh",
                            "Undo",
                            "Redo",
                            "Toggle Right Sidebar",
                            "Toggle Left Sidebar",
                            "Open Command Palette",
                            "Keyboard Shortcut"
                        ],
                        onChange: (evt) => {
                            const value = evt?.value ?? evt?.target?.value ?? evt;
                            updateLeft(value);
                        }
                    },
                },
                {
                    id: "ga-right",
                    name: "Swipe Right",
                    description: "Action to take on swipe right",
                    action: {
                        type: "select",
                        items: [
                            "None",
                            "Back one day",
                            "Go to Today",
                            "Forward one day",
                            "Refresh",
                            "Undo",
                            "Redo",
                            "Toggle Right Sidebar",
                            "Toggle Left Sidebar",
                            "Open Command Palette",
                            "Keyboard Shortcut"
                        ],
                        onChange: (evt) => {
                            const value = evt?.value ?? evt?.target?.value ?? evt;
                            updateRight(value);
                        }
                    },
                },
                {
                    id: "ga-dt",
                    name: "Double Tap",
                    description: "Action to take on double tap",
                    action: {
                        type: "select",
                        items: [
                            "None",
                            "Back one day",
                            "Go to Today",
                            "Forward one day",
                            "Refresh",
                            "Undo",
                            "Redo",
                            "Toggle Right Sidebar",
                            "Toggle Left Sidebar",
                            "Open Command Palette",
                            "Keyboard Shortcut"
                        ],
                        onChange: (evt) => {
                            const value = evt?.value ?? evt?.target?.value ?? evt;
                            updateDT(value);
                        }
                    },
                },
                {
                    id: "ga-lp",
                    name: "Long Press",
                    description: "Action to take on long press",
                    action: {
                        type: "select",
                        items: [
                            "None",
                            "Back one day",
                            "Go to Today",
                            "Forward one day",
                            "Refresh",
                            "Undo",
                            "Redo",
                            "Toggle Right Sidebar",
                            "Toggle Left Sidebar",
                            "Open Command Palette",
                            "Keyboard Shortcut"
                        ],
                        onChange: (evt) => {
                            const value = evt?.value ?? evt?.target?.value ?? evt;
                            updateLP(value);
                        }
                    },
                },
                {
                    id: "ga-pinch",
                    name: "Pinch",
                    description: "Action to take on pinch",
                    action: {
                        type: "select",
                        items: [
                            "None",
                            "Back one day",
                            "Go to Today",
                            "Forward one day",
                            "Refresh",
                            "Undo",
                            "Redo",
                            "Toggle Right Sidebar",
                            "Toggle Left Sidebar",
                            "Open Command Palette",
                            "Keyboard Shortcut"
                        ],
                        onChange: (evt) => {
                            const value = evt?.value ?? evt?.target?.value ?? evt;
                            updatePinch(value);
                        }
                    },
                },
                {
                    id: "ga-lp",
                    name: "Rotate",
                    description: "Action to take on rotate",
                    action: {
                        type: "select",
                        items: [
                            "None",
                            "Back one day",
                            "Go to Today",
                            "Forward one day",
                            "Refresh",
                            "Undo",
                            "Redo",
                            "Toggle Right Sidebar",
                            "Toggle Left Sidebar",
                            "Open Command Palette",
                            "Keyboard Shortcut"
                        ],
                        onChange: (evt) => {
                            const value = evt?.value ?? evt?.target?.value ?? evt;
                            updateRotate(value);
                        }
                    },
                },
                {
                    id: "ga-kb-1",
                    name: "Keyboard Shortcut Key (a-z 0-9 ; , . / leftArrow upArrow rightArrow downArrow - =",
                    action: { type: "input", placeholder: "keyboard shortcut key" }
                },
                {
                    id: "ga-kb-2",
                    name: "Keyboard Shortcut Modifier 1",
                    action: { type: "select", items: ["None", "Ctrl/Meta", "Shift", "Alt/Opt"] }
                },
                {
                    id: "ga-kb-3",
                    name: "Keyboard Shortcut Modifier 2",
                    action: { type: "select", items: ["None", "Ctrl/Meta", "Shift", "Alt/Opt"] }
                },
            ]
        };

        extensionAPI.settings.panel.create(config);

        const target = document.getElementsByClassName("roam-body");
        if (!target[0]) {
            console.warn("Gesture Actions: .roam-body not found; gestures not attached.");
            return;
        }
        gesture = new TinyGesture(target[0]);

        // Initialise commands from saved settings
        updateLeft(extensionAPI.settings.get("ga-left"));
        updateRight(extensionAPI.settings.get("ga-right"));
        updateDT(extensionAPI.settings.get("ga-dt"));
        updateLP(extensionAPI.settings.get("ga-lp"));
        updatePinch(extensionAPI.settings.get("ga-pinch"));
        updateRotate(extensionAPI.settings.get("ga-rotate"));

        if (
            window.roamAlphaAPI?.platform &&
            (window.roamAlphaAPI.platform.isMobile ||
                window.roamAlphaAPI.platform.isMobileApp ||
                window.roamAlphaAPI.platform.isTouchDevice ||
                window.roamAlphaAPI.platform.isIOS)
        ) {
            gesture.on("swipeleft", () => {
                action(commandL, { extensionAPI });
            });
            gesture.on("swiperight", () => {
                action(commandR, { extensionAPI });
            });
            gesture.on("doubletap", () => {
                action(commandDT, { extensionAPI });
            });
            gesture.on("longpress", () => {
                action(commandLP, { extensionAPI });
            });
            gesture.on("pinch", () => {
                action(commandPinch, { extensionAPI });
            });
            gesture.on("rotate", () => {
                action(commandRotate, { extensionAPI });
            });
        }
    },
    onunload: () => {
        if (gesture && typeof gesture.destroy === "function") {
            gesture.destroy();
            gesture = null;
        }
    }
};

function updateLeft(swipeL) {
    if (swipeL === "Forward one day") {
        commandL = "forward";
    } else if (swipeL === "Go to Today") {
        commandL = "today";
    } else if (swipeL === "Back one day") {
        commandL = "backward";
    } else if (swipeL === "Refresh") {
        commandL = "refresh";
    } else if (swipeL === "Right Click") {
        commandL = "rightclick";
    } else if (swipeL === "Undo") {
        commandL = "undo";
    } else if (swipeL === "Redo") {
        commandL = "redo";
    } else if (swipeL === "Toggle Right Sidebar") {
        commandL = "RSToggle";
    } else if (swipeL === "Toggle Left Sidebar") {
        commandL = "LSToggle";
    } else if (swipeL === "Open Command Palette") {
        commandL = "CP";
    } else if (swipeL === "Keyboard Shortcut") {
        commandL = "KbS";
    } else {
        commandL = null;
    }
}

function updateRight(swipeR) {
    if (swipeR === "Forward one day") {
        commandR = "forward";
    } else if (swipeR === "Go to Today") {
        commandR = "today";
    } else if (swipeR === "Back one day") {
        commandR = "backward";
    } else if (swipeR === "Refresh") {
        commandR = "refresh";
    } else if (swipeR === "Right Click") {
        commandR = "rightclick";
    } else if (swipeR === "Undo") {
        commandR = "undo";
    } else if (swipeR === "Redo") {
        commandR = "redo";
    } else if (swipeR === "Toggle Right Sidebar") {
        commandR = "RSToggle";
    } else if (swipeR === "Toggle Left Sidebar") {
        commandR = "LSToggle";
    } else if (swipeR === "Open Command Palette") {
        commandR = "CP";
    } else if (swipeR === "Keyboard Shortcut") {
        commandR = "KbS";
    } else {
        commandR = null;
    }
}

function updateDT(gestDT) {
    if (gestDT === "Forward one day") {
        commandDT = "forward";
    } else if (gestDT === "Go to Today") {
        commandDT = "today";
    } else if (gestDT === "Back one day") {
        commandDT = "backward";
    } else if (gestDT === "Refresh") {
        commandDT = "refresh";
    } else if (gestDT === "Right Click") {
        commandDT = "rightclick";
    } else if (gestDT === "Undo") {
        commandDT = "undo";
    } else if (gestDT === "Redo") {
        commandDT = "redo";
    } else if (gestDT === "Toggle Right Sidebar") {
        commandDT = "RSToggle";
    } else if (gestDT === "Toggle Left Sidebar") {
        commandDT = "LSToggle";
    } else if (gestDT === "Open Command Palette") {
        commandDT = "CP";
    } else if (gestDT === "Copy Block Reference") {
        commandDT = "CBR";
    } else if (gestDT === "Keyboard Shortcut") {
        commandDT = "KbS";
    } else {
        commandDT = null;
    }
}

function updateLP(gestLP) {
    if (gestLP === "Forward one day") {
        commandLP = "forward";
    } else if (gestLP === "Go to Today") {
        commandLP = "today";
    } else if (gestLP === "Back one day") {
        commandLP = "backward";
    } else if (gestLP === "Refresh") {
        commandLP = "refresh";
    } else if (gestLP === "Right Click") {
        commandLP = "rightclick";
    } else if (gestLP === "Undo") {
        commandLP = "undo";
    } else if (gestLP === "Redo") {
        commandLP = "redo";
    } else if (gestLP === "Toggle Right Sidebar") {
        commandLP = "RSToggle";
    } else if (gestLP === "Toggle Left Sidebar") {
        commandLP = "LSToggle";
    } else if (gestLP === "Open Command Palette") {
        commandLP = "CP";
    } else if (gestLP === "Keyboard Shortcut") {
        commandLP = "KbS";
    } else {
        commandLP = null;
    }
}

function updatePinch(gestPinch) {
    if (gestPinch === "Forward one day") {
        commandPinch = "forward";
    } else if (gestPinch === "Go to Today") {
        commandPinch = "today";
    } else if (gestPinch === "Back one day") {
        commandPinch = "backward";
    } else if (gestPinch === "Refresh") {
        commandPinch = "refresh";
    } else if (gestPinch === "Undo") {
        commandPinch = "undo";
    } else if (gestPinch === "Redo") {
        commandPinch = "redo";
    } else if (gestPinch === "Toggle Right Sidebar") {
        commandPinch = "RSToggle";
    } else if (gestPinch === "Toggle Left Sidebar") {
        commandPinch = "LSToggle";
    } else if (gestPinch === "Open Command Palette") {
        commandPinch = "CP";
    } else if (gestPinch === "Copy Block Reference") {
        commandPinch = "CBR";
    } else if (gestPinch === "Keyboard Shortcut") {
        commandPinch = "KbS";
    } else {
        commandPinch = null;
    }
}

function updateRotate(gestRotate) {
    if (gestRotate === "Forward one day") {
        commandRotate = "forward";
    } else if (gestRotate === "Go to Today") {
        commandRotate = "today";
    } else if (gestRotate === "Back one day") {
        commandRotate = "backward";
    } else if (gestRotate === "Refresh") {
        commandRotate = "refresh";
    } else if (gestRotate === "Undo") {
        commandRotate = "undo";
    } else if (gestRotate === "Redo") {
        commandRotate = "redo";
    } else if (gestRotate === "Toggle Right Sidebar") {
        commandRotate = "RSToggle";
    } else if (gestRotate === "Toggle Left Sidebar") {
        commandRotate = "LSToggle";
    } else if (gestRotate === "Open Command Palette") {
        commandRotate = "CP";
    } else if (gestRotate === "Keyboard Shortcut") {
        commandRotate = "KbS";
    } else {
        commandRotate = null;
    }
}

async function action(command, { extensionAPI }) {
    if (command === "forward" || command === "backward" || command === "today") {
        await resolveDNP(command);
    } else if (command === "refresh") {
        location.reload();
    } else if (command === "undo") {
        await window.roamAlphaAPI.data.undo();
    } else if (command === "redo") {
        await window.roamAlphaAPI.data.redo();
    } else if (command === "RSToggle") {
        if (document.querySelector("#roam-right-sidebar-content")) {
            await window.roamAlphaAPI.ui.rightSidebar.close();
        } else {
            await window.roamAlphaAPI.ui.rightSidebar.open();
        }
    } else if (command === "LSToggle") {
        if (document.querySelector(".rm-open-left-sidebar-btn")) {
            await window.roamAlphaAPI.ui.leftSidebar.open();
        } else {
            await window.roamAlphaAPI.ui.leftSidebar.close();
        }
    } else if (command === "CP") {
        try {
            const isMac = navigator.platform.toLowerCase().includes("mac");
            const eventInit = {
                key: "p",
                code: "KeyP",
                keyCode: 80,
                which: 80,
                bubbles: true,
                cancelable: true,
                shiftKey: false,
                altKey: false,
                ctrlKey: !isMac,
                metaKey: isMac
            };
            const down = new KeyboardEvent("keydown", eventInit);
            const up = new KeyboardEvent("keyup", eventInit);
            document.dispatchEvent(down);
            document.dispatchEvent(up);
        } catch (e) {
            console.error("Gesture Actions: failed to dispatch Command Palette shortcut", e);
        }
    } /* else if (command === "CBR") {
        if (!window.roamAlphaAPI.platform.isIOS) {
            window.dispatchEvent(new KeyboardEvent("keydown", {
                key: "c",
                keyCode: 67,
                code: "KeyC",
                which: 67,
                shiftKey: true,
                ctrlKey: true,
                altKey: false
            }));
            window.dispatchEvent(new KeyboardEvent("keyup", {
                key: "c",
                keyCode: 67,
                code: "KeyC",
                which: 67,
                shiftKey: true,
                ctrlKey: true,
                altKey: false
            }));
        } else {
            window.dispatchEvent(new KeyboardEvent("keydown", {
                key: "c",
                keyCode: 67,
                code: "KeyC",
                which: 67,
                shiftKey: true,
                altKey: false,
                metaKey: true
            }));
            window.dispatchEvent(new KeyboardEvent("keyup", {
                key: "c",
                keyCode: 67,
                code: "KeyC",
                which: 67,
                shiftKey: true,
                altKey: false,
                metaKey: true
            }));
        }
    } */ else if (command === "KbS") {
        let kb1, kb2, kb3, kb1Code, kb1Which;
        let altKey = false;
        let metaKey = false;
        let ctrlKey = false;
        let shiftKey = false;

        if (extensionAPI.settings.get("ga-kb-1")) {
            kb1 = extensionAPI.settings.get("ga-kb-1");
        }
        if (extensionAPI.settings.get("ga-kb-2") !== "None") {
            kb2 = extensionAPI.settings.get("ga-kb-2");
        }
        if (extensionAPI.settings.get("ga-kb-3") !== "None") {
            kb3 = extensionAPI.settings.get("ga-kb-3");
        }

        // Map key to code/which
        if (kb1 === "0") {
            kb1Code = "Digit0";
            kb1Which = 48;
        } else if (kb1 === "1") {
            kb1Code = "Digit1";
            kb1Which = 49;
        } else if (kb1 === "2") {
            kb1Code = "Digit2";
            kb1Which = 50;
        } else if (kb1 === "3") {
            kb1Code = "Digit3";
            kb1Which = 51;
        } else if (kb1 === "4") {
            kb1Code = "Digit4";
            kb1Which = 52;
        } else if (kb1 === "5") {
            kb1Code = "Digit5";
            kb1Which = 53;
        } else if (kb1 === "6") {
            kb1Code = "Digit6";
            kb1Which = 54;
        } else if (kb1 === "7") {
            kb1Code = "Digit7";
            kb1Which = 55;
        } else if (kb1 === "8") {
            kb1Code = "Digit8";
            kb1Which = 56;
        } else if (kb1 === "9") {
            kb1Code = "Digit9";
            kb1Which = 57;
        } else if (kb1 === "a") {
            kb1Code = "KeyA";
            kb1Which = 65;
        } else if (kb1 === "b") {
            kb1Code = "KeyB";
            kb1Which = 66;
        } else if (kb1 === "c") {
            kb1Code = "KeyC";
            kb1Which = 67;
        } else if (kb1 === "d") {
            kb1Code = "KeyD";
            kb1Which = 68;
        } else if (kb1 === "e") {
            kb1Code = "KeyE";
            kb1Which = 69;
        } else if (kb1 === "f") {
            kb1Code = "KeyF";
            kb1Which = 70;
        } else if (kb1 === "g") {
            kb1Code = "KeyG";
            kb1Which = 71;
        } else if (kb1 === "h") {
            kb1Code = "KeyH";
            kb1Which = 72;
        } else if (kb1 === "i") {
            kb1Code = "KeyI";
            kb1Which = 73;
        } else if (kb1 === "j") {
            kb1Code = "KeyJ";
            kb1Which = 74;
        } else if (kb1 === "k") {
            kb1Code = "KeyK";
            kb1Which = 75;
        } else if (kb1 === "l") {
            kb1Code = "KeyL";
            kb1Which = 76;
        } else if (kb1 === "m") {
            kb1Code = "KeyM";
            kb1Which = 77;
        } else if (kb1 === "n") {
            kb1Code = "KeyN";
            kb1Which = 78;
        } else if (kb1 === "o") {
            kb1Code = "KeyO";
            kb1Which = 79;
        } else if (kb1 === "p") {
            kb1Code = "KeyP";
            kb1Which = 80;
        } else if (kb1 === "q") {
            kb1Code = "KeyQ";
            kb1Which = 81;
        } else if (kb1 === "r") {
            kb1Code = "KeyR";
            kb1Which = 82;
        } else if (kb1 === "s") {
            kb1Code = "KeyS";
            kb1Which = 83;
        } else if (kb1 === "t") {
            kb1Code = "KeyT";
            kb1Which = 84;
        } else if (kb1 === "u") {
            kb1Code = "KeyU";
            kb1Which = 85;
        } else if (kb1 === "v") {
            kb1Code = "KeyV";
            kb1Which = 86;
        } else if (kb1 === "w") {
            kb1Code = "KeyW";
            kb1Which = 87;
        } else if (kb1 === "x") {
            kb1Code = "KeyX";
            kb1Which = 88;
        } else if (kb1 === "y") {
            kb1Code = "KeyY";
            kb1Which = 89;
        } else if (kb1 === "z") {
            kb1Code = "KeyZ";
            kb1Which = 90;
        } else if (kb1 === "leftArrow") {
            kb1Code = "ArrowLeft";
            kb1Which = 37;
        } else if (kb1 === "upArrow") {
            kb1Code = "ArrowUp";
            kb1Which = 38;
        } else if (kb1 === "rightArrow") {
            kb1Code = "ArrowRight";
            kb1Which = 39;
        } else if (kb1 === "downArrow") {
            kb1Code = "ArrowDown";
            kb1Which = 40;
        } else if (kb1 === ";") {
            kb1Code = "Semicolon";
            kb1Which = 59;
        } else if (kb1 === ",") {
            kb1Code = "Comma";
            kb1Which = 44;
        } else if (kb1 === ".") {
            kb1Code = "Period";
            kb1Which = 46;
        } else if (kb1 === "/") {
            kb1Code = "Slash";
            kb1Which = 191;
        } else if (kb1 === "-") {
            kb1Code = "Minus";
            kb1Which = 189;
        } else if (kb1 === "=") {
            kb1Code = "Equal";
            kb1Which = 187;
        }

        // Set modifier keys
        if (kb2 === "Ctrl/Meta") {
            ctrlKey = true;
            metaKey = true;
        } else if (kb2 === "Shift") {
            shiftKey = true;
        } else if (kb2 === "Alt/Opt") {
            altKey = true;
        }
        if (kb3 === "Ctrl/Meta") {
            ctrlKey = true;
            metaKey = true;
        } else if (kb3 === "Shift") {
            shiftKey = true;
        } else if (kb3 === "Alt/Opt") {
            altKey = true;
        }

        if (!window.roamAlphaAPI.platform.isIOS) {
            window.dispatchEvent(new KeyboardEvent("keydown", {
                key: kb1,
                keyCode: kb1Which,
                code: kb1Code,
                which: kb1Which,
                shiftKey,
                ctrlKey,
                altKey
            }));
            window.dispatchEvent(new KeyboardEvent("keyup", {
                key: kb1,
                keyCode: kb1Which,
                code: kb1Code,
                which: kb1Which,
                shiftKey,
                ctrlKey,
                altKey
            }));
        } else {
            window.dispatchEvent(new KeyboardEvent("keydown", {
                key: kb1,
                keyCode: kb1Which,
                code: kb1Code,
                which: kb1Which,
                shiftKey,
                ctrlKey,
                altKey
            }));
            window.dispatchEvent(new KeyboardEvent("keyup", {
                key: kb1,
                keyCode: kb1Which,
                code: kb1Code,
                which: kb1Which,
                shiftKey,
                metaKey,
                altKey
            }));
        }
    }
}

async function resolveDNP(direction) {
    var startBlock = await window.roamAlphaAPI.ui.mainWindow.getOpenPageOrBlockUid();
    if (!startBlock) {
        var uri = window.location.href;
        const regex = /^https:\/\/roamresearch.com\/.+\/(app|offline)\/\w+$/; // today's DNP
        if (regex.test(uri)) { // this is Daily Notes for today
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, "0");
            var mm = String(today.getMonth()).padStart(2, "0");
            var yyyy = today.getFullYear();
            thisDate = new Date(yyyy, mm, dd);
        }
    } else {
        let q = `[:find (pull ?page [:node/title :block/string :block/uid {:block/children ...} ]) :where [?page :block/uid "${startBlock}"]  ]`;
        var info = await window.roamAlphaAPI.q(q);
        const regex = /\d{2}-\d{2}-\d{4}/;
        if (regex.test(info[0][0].uid)) { // dated DNP
            let dateBits = info[0][0].uid.split("-");
            let mm = String(parseInt(dateBits[0]) - 1);
            thisDate = new Date(dateBits[2], mm, dateBits[1]);
        } else { // not a dated DNP
            thisDate = new Date(new Date().setDate(new Date().getDate()));
        }
    }

    if (direction === "backward") {
        thisDate.setDate(thisDate.getDate() - 1);
    } else if (direction === "forward") {
        thisDate.setDate(thisDate.getDate() + 1);
    } else if (direction === "today") {
        thisDate = new Date();
    }

    var newMonth = (thisDate.getMonth() + 1).toString();
    var newDay = thisDate.getDate().toString();
    var newYear = thisDate.getFullYear().toString();
    var newDate = newMonth.padStart(2, "0") + "-" + newDay.padStart(2, "0") + "-" + newYear;
    var titleDate = convertToRoamDate(newDate);
    var page = await window.roamAlphaAPI.q(`
    [:find ?e
        :where [?e :node/title "${titleDate}"]]`);
    if (page.length < 1) { // create new page
        await window.roamAlphaAPI.createPage({ page: { title: titleDate, uid: newDate } });
    }
    var results = window.roamAlphaAPI.data.pull("[:block/children]", [":block/uid", newDate]);
    if (results == null) {
        let newBlockUid = roamAlphaAPI.util.generateUID();
        await window.roamAlphaAPI.createBlock({ location: { "parent-uid": newDate, order: 0 }, block: { string: "", uid: newBlockUid } });
    }
    window.roamAlphaAPI.ui.mainWindow.openBlock({ block: { uid: newDate } });
}

function convertToRoamDate(dateString) {
    var parsedDate = dateString.split("-");
    var year = parsedDate[2];
    var month = Number(parsedDate[0]);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    var monthName = months[month - 1];
    var day = Number(parsedDate[1]);
    let suffix =
        (day >= 4 && day <= 20) || (day >= 24 && day <= 30)
            ? "th"
            : ["st", "nd", "rd"][day % 10 - 1];
    return `${monthName} ${day}${suffix}, ${year}`;
}

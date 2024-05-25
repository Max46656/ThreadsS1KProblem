// ==UserScript==
// @name         脆的千喜問題
// @name:ja      ThreadsS1K問題
// @name:en     ThreadsS1KProblem
// @description  刪除Threads的互動統計數據中超過1K時會出現的".0"，其應是整數而非浮點數。
// @namespace    https://github.com/Max46656
// @version      1.0
// @author       Max
// @description:ja Threads のインタラクション統計データで、1K を超える場合に表示される「.0」を削除し、整數にする必要があります。
// @description:en Delete ".0" in Threads interact stat when it's over 1K, which should be an integer instead of a float.
// @match        https://www.threads.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=threads.net
// @grant        none
// @license MPL2.0
// ==/UserScript==


class InteractStatChanger {
    constructor() {
        this.interactStatObserver = new MutationObserver(this.handleNewPosts.bind(this));
        //空格以搜尋符合條件的父元素下符合條件的子元素
        this.interactStatClassName='.x6ikm8r.x10wlt62 .x1lliihq.x1plvlek.xryxfnj.x1n2onr6.x193iq5w.xeuugli.x1fj9vlw.x13faqbe.x1vvkbs.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x1i0vuye.xmd891q.xo1l8bm.xc82ewx.x1yc453h';
    }

    startObserving() {
        this.interactStatObserver.observe(document.body, { subtree: true, childList: true, attributes: true });
    }

    stopObserving() {
        this.interactStatObserver.disconnect();
    }

    handleNewPosts(mutationsList) {
        const interactStatElements = document.querySelectorAll(this.interactStatClassName);
        interactStatElements.forEach(element => {
            Array.from(element.childNodes).forEach(node => {
                node.nodeValue=this.toInteger(node);
            });
        });
    }

    toInteger(node){
        if (node.nodeType !== Node.TEXT_NODE || !node.nodeValue.match(/\.0/g)) {
            return node.nodeValue
        }else {
            console.log('L1KProblemFound');
            return node.nodeValue.replace(/\.0/g, '');
        }
    }

}


const johnTheMathTeacher = new InteractStatChanger();
johnTheMathTeacher.startObserving();



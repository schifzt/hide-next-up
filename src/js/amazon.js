new function () {
    AMAZON = {};
    AMAZON._hideNextUpPopup = function (elm) {
        for (let className of elm.classList) {
            cond = className.toLowerCase().includes("nextupcard-wrapper");
            if (cond) {
                elm.style.visibility = "hidden";
                elm.style.display = "none";
                return true;
            }
        }
        return false;
    };

    AMAZON._turnOffShading = function (elm) {
        if (elm.parentElement && elm.childElementCount == 0) {
            for (let className of elm.parentElement.classList) {
                cond = className.toLowerCase().includes("overlays-container");
                if (cond) {
                    elm.style.visibility = "hidden";
                    elm.style.display = "none";
                    return true;
                }
            }
        }
        return false;
    };

    AMAZON.main = function () {
        // For a dynamically loaded page, create a MutationObserver to detect changes in the DOM
        const observer = new MutationObserver((mutationsList, observer) => {
            if (!window.location.href.includes("gp/video")) {
                return;
            }
            mutationsList.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(addedNode => {
                        if (addedNode.nodeType === 1 && addedNode.tagName === 'DIV') {
                            addedNode.querySelectorAll('*').forEach(elm => { // iterate through all children of addedNode
                                this._hideNextUpPopup(elm);
                                this._turnOffShading(elm);
                            });
                        }
                    });
                }
            });

        });
        observer.observe(document.body, { childList: true, subtree: true });
    };

}
function hideNextUpPopup(elm) {
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

function turnOffShading(elm) {
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

function main() {
    console.log("Hide Next-up extension loaded");

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
                            hideNextUpPopup(elm);
                            turnOffShading(elm);
                        });
                    }
                });
            }
        });

    });
    observer.observe(document.body, { childList: true, subtree: true });

};

main();

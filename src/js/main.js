function hideNextUpPopup(addedNode) {
    addedNode.querySelectorAll('*').forEach(elm => {
        if (elm.className) {
            cond1 = elm.className.toLowerCase().includes("nextupcard-wrapper");
            if (cond1) {
                // console.log("popup:", elm);
                elm.style.visibility = "hidden";
                elm.style.display = "none";
            }
        }
    });
};

function turnOffShading(addedNode) {
    addedNode.querySelectorAll('*').forEach(elm => {
        if (elm.parentElement && elm.parentElement.className) {
            cond2 = (elm.parentElement.className.toLowerCase().includes("overlays-container") && elm.childElementCount == 0);
            if (cond2) {
                // console.log("shade", elm);
                elm.style.visibility = "hidden";
                elm.style.display = "none";
            }
        }
    });
};

function main() {
    console.log("Hide Next-up extension loaded");

    // For a dynamically loaded page, create a MutationObserver to detect changes in the DOM
    const observer = new MutationObserver((mutationsList, observer) => {
        mutationsList.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(addedNode => {
                    // addedNodeがdiv要素かどうかを確認
                    if (addedNode.nodeType === 1 && addedNode.tagName === 'DIV') {
                        // console.log('新しく追加されたdiv要素:', addedNode);
                        hideNextUpPopup(addedNode);
                        turnOffShading(addedNode);
                    }
                });
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

};

main();

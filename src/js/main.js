function main() {
    console.log("Hide Next-up extension loaded");
    const amazon_regex = new RegExp('www\.amazon\.(com|co\.[a-z]+)\/gp\/video\/');
    const netflix_regex = new RegExp('');

    if (amazon_regex.test(window.location.href)) {
        AMAZON.main();
    } else if (netflix_regex.test(window.location.href)) {
        NETFLIX.main();
    }
};

main();

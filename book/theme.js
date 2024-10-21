document.addEventListener('DOMContentLoaded', function () {
    const navBar = document.querySelector('.right-buttons');

    if (navBar) {
        const githubLink = document.createElement('a');
        githubLink.href = 'https://github.com/webisoftSoftware/zktt';
        githubLink.target = '_blank';
        githubLink.rel = 'noopener noreferrer';
        githubLink.innerHTML = '<svg height="20" class="octicon octicon-mark-github" viewBox="0 0 20 20" width="20" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.2 1.87.85 2.33.65.07-.52.28-.85.51-1.05-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 2.01-.27c.68 0 1.36.09 2.01.27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.47 0 1.06-.01 1.92-.01 2.18 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>';

        githubLink.style.marginLeft = 'auto';
        githubLink.style.marginTop = "auto";
        githubLink.style.marginBottom = "auto";
        githubLink.style.padding = '8px';
        githubLink.style.color = "inherit";
        githubLink.style.textDecoration = "none";

        navBar.appendChild(githubLink);

        const zkttSite = document.createElement('a');
        zkttSite.href = "https://zktable.top";
        zkttSite.target = '_blank';
        zkttSite.innerHTML = 'logo';

        zkttSite.style.marginLeft = 'auto';
        zkttSite.style.marginTop = "auto";
        zkttSite.style.marginBottom = "auto";
        zkttSite.style.padding = '8px';
        zkttSite.style.color = "inherit";
        zkttSite.style.textDecoration = "none";

        navBar.appendChild(zkttSite);
    }
});

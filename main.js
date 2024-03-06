document.addEventListener('DOMContentLoaded', function () {
    let tabCount = 0;
    let activeTab = 0;

    function switchTab(newTab) {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        const activeTabElement = document.getElementById(`tab-${newTab}`);
        activeTabElement.classList.add('active');
        activeTab = newTab;
        const url = document.getElementById(`url-input-${newTab}`).value;
        document.getElementById('content-area').innerHTML = `<iframe src="${url}"></iframe>`;
    }

    function addTab() {
        const tabId = ++tabCount;
        const tabHtml = `<div class="tab" id="tab-${tabId}">Tab<span class="close-tab" id="close-tab-${tabId}">x</span><br><input type="text" id="url-input-${tabId}" placeholder="Enter URL and press Enter"></div>`;
        const tabsContainer = document.getElementById('tabs');
        tabsContainer.insertAdjacentHTML('beforeend', tabHtml);

        const newTabElement = document.getElementById(`tab-${tabId}`);
        newTabElement.addEventListener('click', function () {
            switchTab(tabId);
        });

        const inputElement = document.getElementById(`url-input-${tabId}`);
        inputElement.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                switchTab(tabId);
            }
        });

        const closeTabElement = document.getElementById(`close-tab-${tabId}`);
        closeTabElement.addEventListener('click', function (event) {
            event.stopPropagation();
            newTabElement.remove();
            if (activeTab === tabId) {
                document.getElementById('content-area').innerHTML = '';
            }
        });

        if (tabCount === 1) { 
            switchTab(tabId);
        }
    }

    document.getElementById('add-tab').addEventListener('click', addTab);
});

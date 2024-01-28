// Tab 객체 정의
const Tab = function(menuId) {
    let status = 'notLoaded'; // loaded 여부
    let selected = false; // 선택 여부

    return {
        getStatus: function() {
            return status;
        },
        setStatus: function(value) {
            status = value;
        },
        isSelected: function() {
            return selected;
        },
        setSelected: function(value) {
            selected = value;
        },
        getMenuId: function() {
            return menuId;
        }
    };
};

// TabManager 객체 정의
const TabManager = function() {
    const tabs = [];
    let selectedTab = null; // 현재 선택된 탭

    return {
        addTab: function(menuId) {
            const tab = Tab(menuId);
            tabs.push(tab);
            return tab;
        },
        removeTab: function(tab) {
            const index = tabs.indexOf(tab);
            if (index !== -1) {
                tabs.splice(index, 1);
            }
        },
        openTab: function(tab) {
            // 여기에 tab 열기 로직 추가
            console.log(`Open tab with menuId: ${tab.getMenuId()}`);
        },
        selectTab: function(tab) {
            // 이전에 선택된 탭이 있다면 선택 해제
            if (selectedTab) {
                selectedTab.setSelected(false);
            }

            // 선택된 탭 업데이트
            selectedTab = tab;
            selectedTab.setSelected(true);

            // 여기에 tab 선택 로직 추가
            console.log(`Select tab with menuId: ${tab.getMenuId()}`);
        },
        closeAllTabs: function() {
            tabs.forEach(tab => {
                // 여기에 각 tab 닫기 로직 추가
                console.log(`Close tab with menuId: ${tab.getMenuId()}`);
            });
            tabs.length = 0; // 모든 탭 삭제
            selectedTab = null; // 선택된 탭 초기화
        },
        getTabs: function() {
            return tabs;
        },
        getSelectedTab: function() {
            return selectedTab;
        }
    };
}();

//
    const TabManager2 = function () {
        const tabs = [];

        function addTab(tabId, menuId) {
            const tab = {
                tabId: tabId,
                menuId: menuId,
                status: {
                    selected: false,
                    loaded: false
                }
            };

            tabs.push(tab);
            updateUI();
        }

        function removeTab(tabId) {
            const index = tabs.findIndex(tab => tab.tabId === tabId);
            if (index !== -1) {
                tabs.splice(index, 1);
                updateUI();
            }
        }

        function selectTab(tabId) {
            const tab = tabs.find(tab => tab.tabId === tabId);
            if (tab) {
                tab.status.selected = true;

                if (!tab.status.loaded) {
                    // Simulate AJAX request for demonstration
                    setTimeout(() => {
                        // Assume server response with handlebar template and data
                        const template = "<div>{{menuId}} - Loaded Content</div>";
                        const data = { menuId: tab.menuId };
                        const content = Handlebars.compile(template)(data);

                        // Update UI with loaded content
                        $("#" + tab.tabId).html(content);
                        tab.status.loaded = true;

                        // Additional logic for actual AJAX request can be added here
                    }, 1000);
                }

                updateUI();
            }
        }

        function updateUI() {
            // Clear existing tabs and content
            $("#myTabs li").remove();
            $(".tab-content").empty();

            // Add tabs to UI
            tabs.forEach(tab => {
                const tabHtml = '<li class="nav-item">' +
                    '<a class="nav-link' + (tab.status.selected ? ' active' : '') + '" id="' + tab.tabId + '" data-bs-toggle="tab" href="#content' + tab.tabId.slice(3) + '">' +
                    'Tab ' + tab.tabId.slice(3) +
                    ' <i class="bi bi-x-circle tab-close"></i></a>' +
                    '</li>';
                $("#myTabs").append(tabHtml);

                // Add content to UI
                const contentHtml = '<div class="tab-pane fade' + (tab.status.selected ? ' show active' : '') + '" id="content' + tab.tabId.slice(3) + '">' +
                    'Tab ' + tab.tabId.slice(3) + ' Content' +
                    '</div>';
                $(".tab-content").append(contentHtml);
            });

            // Attach click event for new tab close buttons
            $(".tab-close").on("click", function (e) {
                e.stopPropagation(); // Prevent tab click event
                const tabId = $(this).closest(".nav-link").attr("id");
                removeTab(tabId);
            });

            // Attach click event for tab selection
            $(".nav-link").on("click", function () {
                const tabId = $(this).attr("id");
                selectTab(tabId);
            });
        }

        return {
            addTab: addTab,
            removeTab: removeTab,
            selectTab: selectTab
        };
    }();

    // Example usage
    // TabManager.addTab("tab2", "menuId2");
    // TabManager.addTab("tab3", "menuId3");
    // TabManager.selectTab("tab2");



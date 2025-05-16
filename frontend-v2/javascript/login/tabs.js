// js/tab.js
export function initTabs() {
    const loginTab = document.querySelector('#radix-«r2k»-trigger-login');
    const registerTab = document.querySelector('#radix-«r2k»-trigger-register');
    const loginContent = document.querySelector('#radix-«r2k»-content-login');
    const registerContent = document.querySelector('#radix-«r2k»-content-register');

    if (!registerContent) return; // Previna erro se o HTML ainda não estiver completo

    loginTab.addEventListener('click', () => {
        activateTab(loginTab, registerTab, loginContent, registerContent);
    });

    registerTab.addEventListener('click', () => {
        activateTab(registerTab, loginTab, registerContent, loginContent);
    });
}

function activateTab(activeBtn, inactiveBtn, activeContent, inactiveContent) {
    activeBtn.setAttribute('aria-selected', 'true');
    activeBtn.setAttribute('data-state', 'active');
    inactiveBtn.setAttribute('aria-selected', 'false');
    inactiveBtn.setAttribute('data-state', 'inactive');

    activeContent.setAttribute('data-state', 'active');
    inactiveContent.setAttribute('data-state', 'inactive');

    activeBtn.classList.add('text-white', 'bg-gray-800/50');
    inactiveBtn.classList.remove('text-white', 'bg-gray-800/50');

    activeContent.classList.remove('hidden');
    inactiveContent.classList.add('hidden');
}

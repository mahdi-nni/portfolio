const PageProtection = {
    config: {
        enableRightClickProtection: true,
        enableCopyProtection: true,
        enableDevToolsDetection: true,
        enableKeyboardShortcutsProtection: true,
        enableTextSelectionProtection: true
    },
    
    init() {
        if (this.config.enableRightClickProtection) this.protectRightClick();
        if (this.config.enableCopyProtection) this.protectCopy();
        if (this.config.enableDevToolsDetection) this.detectDevTools();
        if (this.config.enableKeyboardShortcutsProtection) this.protectKeyboardShortcuts();
        if (this.config.enableTextSelectionProtection) this.protectTextSelection();
        this.addDynamicWatermark();
    },
    
    protectRightClick() {
        document.addEventListener('contextmenu', e => e.preventDefault());
    },
    
    protectCopy() {
        document.addEventListener('copy', e => e.preventDefault());
        document.addEventListener('cut', e => e.preventDefault());
    },
    
    detectDevTools() {
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get() {
                document.body.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:black;color:red;display:flex;justify-content:center;align-items:center;font-size:30px;z-index:99999;">Developer Tools Detected</div>';
                throw new Error('DevTools Detected');
            }
        });
        console.log('%c', element);
    },
    
    protectKeyboardShortcuts() {
        document.addEventListener('keydown', e => {
            const blockedCombinations = [
                e.ctrlKey && e.shiftKey && e.key === 'I',
                e.ctrlKey && e.shiftKey && e.key === 'J',
                e.ctrlKey && e.shiftKey && e.key === 'C',
                e.ctrlKey && e.key === 'U',
                e.key === 'F12'
            ];
            
            if (blockedCombinations.includes(true)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
    },
    
    protectTextSelection() {
        document.addEventListener('selectstart', e => e.preventDefault());
        document.addEventListener('dragstart', e => e.preventDefault());
    },
    
    addDynamicWatermark() {
        const watermark = document.createElement('div');
        watermark.innerHTML = `&copy; ${new Date().getFullYear()} - ${document.domain}`;
        watermark.style.cssText = 'position:fixed;bottom:10px;right:10px;opacity:0.3;font-size:12px;color:#666;z-index:9999;pointer-events:none;';
        document.body.appendChild(watermark);
    }
};

window.addEventListener('load', () => PageProtection.init());
// assets/js/proctor.js

const Proctor = {
    strikes: 0,
    isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    initialized: false,
    isLocked: false, // Prevent stacking penalties

    init: function () {
        if (this.initialized) return;
        this.initialized = true;

        console.log("Proctor initialized. Mobile: " + this.isMobile);
        this.preventMobileRefresh();
        this.addListeners();
    },

    preventMobileRefresh: function () {
        document.body.style.overscrollBehaviorY = 'contain';
    },

    addListeners: function () {
        const self = this;

        // 1. Visibility Change ONLY (Tab Switch / Minimize / Mobile Home Screen)
        // This is the most reliable - blur is removed because it causes false positives
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && !self.isLocked) {
                console.log("TAB SWITCH DETECTED!");
                self.logViolation("tab_switch", "Pengguna meninggalkan tab.");
                self.triggerPenalty("Jangan tinggalkan layar ujian!");
            }
        });

        // BLUR REMOVED - causes too many false positives (clicking address bar, DevTools, etc.)

        // 2. Resize detection - Log only, no penalty (info for teacher)
        window.addEventListener('resize', () => {
            if (!self.isMobile) {
                self.logViolation("resize", "Jendela diubah ukurannya: " + window.innerWidth + "x" + window.innerHeight);
                // No penalty for resize, just log
            }
        });

        console.log("Listeners attached - Using visibility change only (most reliable).");
    },

    logViolation: async function (type, details) {
        console.warn("Logging Violation:", type, details);

        const context = window.ProctorContext || {};

        if (!context.studentName || !context.examCode) {
            console.error("ProctorContext missing! Cannot log violation.");
            return;
        }

        try {
            const { error } = await supabase
                .from('cheat_logs')
                .insert({
                    student_name: context.studentName,
                    student_class: context.studentClass,
                    student_absen: context.studentAbsen,
                    exam_access_code: context.examCode,
                    violation_type: type,
                    details: details
                });

            if (error) {
                console.error("Supabase Error:", error);
            } else {
                console.log("Violation logged to Supabase.");
            }
        } catch (e) {
            console.error("Exception:", e);
        }
    },

    triggerPenalty: function (message) {
        if (this.isLocked) return; // Don't stack penalties

        this.strikes++;
        this.isLocked = true;

        console.log("Strike #" + this.strikes);

        const overlay = document.getElementById('overlay');
        if (!overlay) {
            console.error("Overlay element not found!");
            this.isLocked = false;
            return;
        }

        const overlayText = overlay.querySelector('p');
        const overlayTitle = overlay.querySelector('h1');

        // PROGRESSIVE LOCK TIME: More violations = Longer lock
        // Strike 1: 5 seconds
        // Strike 2: 15 seconds
        // Strike 3: 30 seconds
        // Strike 4: 60 seconds
        // Strike 5+: 120 seconds
        let lockTime;
        if (this.strikes === 1) {
            lockTime = 5;
        } else if (this.strikes === 2) {
            lockTime = 15;
        } else if (this.strikes === 3) {
            lockTime = 30;
        } else if (this.strikes === 4) {
            lockTime = 60;
        } else {
            lockTime = 120;
        }

        overlayTitle.textContent = `🔒 LAYAR DIKUNCI (Pelanggaran ke-${this.strikes})`;
        overlayText.textContent = `${message} Layar akan terkunci selama ${lockTime} detik.`;
        overlay.style.display = 'flex';

        // Countdown display
        let remaining = lockTime;
        const countdownInterval = setInterval(() => {
            remaining--;
            if (remaining > 0) {
                overlayText.textContent = `${message} Layar terkunci: ${remaining} detik tersisa.`;
            }
        }, 1000);

        // Unlock after the penalty time
        setTimeout(() => {
            clearInterval(countdownInterval);
            overlay.style.display = 'none';
            this.isLocked = false;
            console.log("Screen unlocked after " + lockTime + " seconds.");
        }, lockTime * 1000);
    }
};

// Expose to window
window.Proctor = Proctor;

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (window.ProctorContext) {
        Proctor.init();
    }
});

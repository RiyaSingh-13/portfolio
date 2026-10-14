/* ==========================================================================
   DEVELOPER TERMINAL (INTERACTIVE CLI) ENGINE
   Riya Singh - Creative Animated Portfolio
   ========================================================================== */

(function () {
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalBody = document.querySelector('.terminal-body');
  const clearBtn = document.getElementById('term-clear-btn');
  const helpBtn = document.getElementById('term-help-btn');

  if (!terminalInput || !terminalOutput) return;

  const commandHistory = [];
  let historyIndex = -1;

  // Initial welcome message
  const welcomeMessage = `
<span style="color: var(--accent-cyan); font-weight: 700;">⚡ Riya Singh System Shell [Version 2.4.0-arm64]</span>
<span style="color: var(--text-muted);">(c) 2026 Riya Singh. All systems operational. Connected to portfolio-mesh.</span>

Type <span style="color: var(--accent-violet); font-weight: bold;">'help'</span> to see all available commands, or click any suggestion chip below.
`;

  terminalOutput.innerHTML = welcomeMessage;

  const commands = {
    help: () => `
<span style="color: var(--accent-cyan); font-weight: 700;">Available Commands:</span>
  <span style="color: var(--accent-violet);">whoami</span>      - Overview & bio of Riya Singh
  <span style="color: var(--accent-violet);">skills</span>      - Technical stack & proficiency metrics
  <span style="color: var(--accent-violet);">projects</span>    - Flagship projects (Sentinel, Pick&Give, ChatNova)
  <span style="color: var(--accent-violet);">experience</span>  - Industry work experience at Syncgaze Pvt. Ltd.
  <span style="color: var(--accent-violet);">achievements</span>- LeetCode 500+ badges & CodeXtreme Rank
  <span style="color: var(--accent-violet);">education</span>   - University & Schooling details
  <span style="color: var(--accent-violet);">contact</span>     - Direct contact channels & social links
  <span style="color: var(--accent-violet);">theme</span>       - Switch site theme (Usage: 'theme oled', 'theme gold', 'theme cyber')
  <span style="color: var(--accent-violet);">cat cv.txt</span>  - Quick ASCII text summary of resume
  <span style="color: var(--accent-violet);">sudo hire</span>   - Unlock hiring celebration & express channel
  <span style="color: var(--accent-violet);">clear</span>       - Clears this terminal screen
`,

    whoami: () => `
<span style="color: var(--accent-cyan); font-weight: 700;">Riya Singh</span>
--------------------------------------------------
<span style="color: var(--accent-emerald);">Role:</span> Full Stack Developer & AI System Architect
<span style="color: var(--accent-emerald);">Education:</span> B.Tech Computer Science & Eng. @ Lovely Professional University (CGPA 7.92/10)
<span style="color: var(--accent-emerald);">Specialization:</span> Scalable MERN Systems, WebSocket Real-Time Protocols, AI Code Auditing & High-Performance REST APIs.
<span style="color: var(--accent-emerald);">Philosophy:</span> "Writing clean, type-safe, resilient code that solves real human problems with sub-second performance."
`,

    bio: function () {
      return this.whoami();
    },

    skills: () => `
<span style="color: var(--accent-cyan); font-weight: 700;">Technical Arsenal:</span>
--------------------------------------------------
<span style="color: var(--accent-emerald);">Languages:</span>   C++, Java, JavaScript (ES6+), TypeScript, HTML5, CSS3
<span style="color: var(--accent-emerald);">Frontend:</span>    React.js, Next.js, Tailwind CSS, Component Architecture, State Management
<span style="color: var(--accent-emerald);">Backend:</span>     Node.js, Express.js, REST APIs, WebSocket, CRUD Architecture
<span style="color: var(--accent-emerald);">Database:</span>    MongoDB, SQL, Mongoose, Prisma ORM, SQLite
<span style="color: var(--accent-emerald);">Core CS:</span>     Data Structures & Algorithms, OOP, DBMS, Software Engineering
<span style="color: var(--accent-emerald);">Tools/Dev:</span>   Git, GitHub, Playwright, VS Code, Vercel, Render, Cloudinary
`,

    projects: () => `
<span style="color: var(--accent-cyan); font-weight: 700;">Featured Engineering Projects:</span>
--------------------------------------------------
1. <span style="color: var(--accent-violet); font-weight: 700;">Sentinel: AI-Powered Security & Code Auditor</span> (Sep 2026)
   - Dual-source analysis: Live web apps & GitHub repos.
   - Playwright + Git context engine (runtime, source code, commits).
   - Automated Gemini-powered testing, WebSocket agent with 4 security layers.
   - Stack: React, Next.js, Node.js, Express, Playwright, WebSocket, Gemini AI, Prisma.

2. <span style="color: var(--accent-violet); font-weight: 700;">Pick&Give: NGO-Connect Donation & Volunteering</span> (Jun 2026)
   - 3 User Roles (Admin, NGO, Member) with OTP handover verification via Nodemailer.
   - Leaflet.js + OpenStreetMap live tracking & volunteer routing.
   - Stack: React.js, Tailwind CSS, Node.js, Express, MongoDB, Leaflet.

3. <span style="color: var(--accent-violet); font-weight: 700;">ChatNova: Full Stack Real-Time Chat System</span> (Oct 2025)
   - Instant 1-on-1 socket messaging, typing indicators, read receipts, online presence.
   - Stateless JWT authentication & Cloudinary media optimization.
   - Stack: React.js, Tailwind, Node.js, Express, MongoDB, Socket.io, JWT.
`,

    experience: () => `
<span style="color: var(--accent-cyan); font-weight: 700;">Professional Experience:</span>
--------------------------------------------------
<span style="color: #fff; font-weight: 700;">Syncgaze Pvt. Ltd.</span> | Full Stack Developer (Remote)
<span style="color: var(--accent-cyan);">Oct 2025 – May 2026</span>
- Delivered full-stack features for 2 client platforms using React.js, Node.js, and Express.js.
- Architected 10+ modules with REST APIs, role-based access, and MongoDB query optimizations.
- Built a demo React-based School Management Website with 3 role-based interfaces for client presentations.
- Coordinated with a 5-member cross-functional team using Git-based workflows.
- Debugged and resolved 20+ production issues (race conditions in booking slot allocation, API response failures).
`,

    achievements: () => `
<span style="color: var(--accent-cyan); font-weight: 700;">Competitive Achievements:</span>
--------------------------------------------------
🏆 <span style="color: var(--accent-amber); font-weight: bold;">LeetCode 500+ Problems Solved</span>: Earned the prestigious LeetCode 100 Days Badge (Mar 2026).
🚀 <span style="color: var(--accent-amber); font-weight: bold;">CodeXtreme 2.0-Neo Codeathon</span>: Ranked in Top 30 out of 2,000+ participants solving complex graph and tree algorithms (May 2025).
📜 <span style="color: var(--accent-amber); font-weight: bold;">Certifications:</span>
   - Introduction to MongoDB (Simplilearn SkillUP - Sep 2026)
   - Privacy and Security in Online Social Media (NPTEL / IIT MOOC - Oct 2025)
   - Basics of DSA using C++ (Summer Training Program - Jul 2025)
`,

    education: () => `
<span style="color: var(--accent-cyan); font-weight: 700;">Academic Background:</span>
--------------------------------------------------
🎓 <span style="color: #fff; font-weight: 700;">Lovely Professional University</span> (Phagwara, Punjab)
   Bachelor of Technology - Computer Science and Engineering
   <span style="color: var(--accent-emerald);">CGPA: 7.92 / 10</span> (Aug 2023 – Present)

🏫 <span style="color: #fff; font-weight: 700;">Jeevandhara Convent School</span> (Lucknow, Uttar Pradesh)
   Intermediate: 74% | Matriculation: 85% (Mar 2019 – May 2023)
`,

    contact: () => `
<span style="color: var(--accent-cyan); font-weight: 700;">Get in Touch:</span>
--------------------------------------------------
📧 Email:    <a href="mailto:riyasingh20071213@gmail.com" style="color: var(--accent-cyan); text-decoration: underline;">riyasingh20071213@gmail.com</a>
📱 Mobile:   <a href="tel:+919151352998" style="color: var(--accent-cyan); text-decoration: underline;">+91-9151352998</a>
💼 LinkedIn: <a href="https://www.linkedin.com/in/riyasingh1213" target="_blank" style="color: var(--accent-cyan); text-decoration: underline;">linkedin.com/in/riyasingh1213</a>
🐙 GitHub:   <a href="https://github.com/RiyaSingh-13" target="_blank" style="color: var(--accent-cyan); text-decoration: underline;">github.com/RiyaSingh-13</a>
📍 Location: Phagwara, Punjab / Lucknow, UP
`,

    'cat cv.txt': () => `
============================================================
              RIYA SINGH - CURRICULUM VITAE
============================================================
Contact: riyasingh20071213@gmail.com | +91-9151352998
Profiles: github.com/RiyaSingh-13 | linkedin.com/in/riyasingh1213
Education: B.Tech CSE @ Lovely Professional Univ (CGPA 7.92)
Experience: Full Stack Dev @ Syncgaze (10+ modules, 20+ fixes)
Key Projects: Sentinel AI, Pick&Give MERN, ChatNova Socket.io
Achievements: 500+ LeetCode, CodeXtreme Top 30 / 2000+
============================================================
`,

    'sudo hire': () => {
      if (window.soundEngine) window.soundEngine.playSuccess();
      if (window.triggerCelebration) window.triggerCelebration();
      return `
<span style="color: #10b981; font-weight: 800; font-size: 1.1rem;">
🎉 [PERMISSION GRANTED] STATUS 200 OK: OFFER ACCEPTED!
</span>
<span style="color: var(--text-primary);">
Thank you for your interest! Riya Singh is excited to build high-impact software with your engineering team.
Dispatching email notification... Direct contact: <b>riyasingh20071213@gmail.com</b>
</span>
`;
    },

    theme: (arg) => {
      const valid = ['cyber', 'oled', 'gold'];
      if (!arg || !valid.includes(arg.toLowerCase())) {
        return `Usage: <span style="color: var(--accent-cyan);">theme [cyber | oled | gold]</span>`;
      }
      const t = arg.toLowerCase();
      document.body.setAttribute('data-theme', t === 'cyber' ? '' : t);
      localStorage.setItem('portfolio_theme', t);
      if (window.soundEngine) window.soundEngine.playSuccess();
      return `Theme switched to <span style="color: var(--accent-cyan); font-weight: 700;">${t.toUpperCase()}</span>.`;
    },

    clear: () => {
      terminalOutput.innerHTML = '';
      return null;
    }
  };

  function executeCommand(inputRaw) {
    const trimmed = inputRaw.trim();
    if (!trimmed) return;

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    // Echo input line
    const echoLine = document.createElement('div');
    echoLine.className = 'terminal-line';
    echoLine.innerHTML = `<span class="prompt-prefix">riya@mesh</span>:<span class="prompt-path">~</span><span class="prompt-symbol">$</span> ${escapeHTML(trimmed)}`;
    terminalOutput.appendChild(echoLine);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    let result = '';

    if (trimmed.toLowerCase() === 'cat cv.txt') {
      result = commands['cat cv.txt']();
    } else if (trimmed.toLowerCase() === 'sudo hire') {
      result = commands['sudo hire']();
    } else if (commands[cmd]) {
      result = commands[cmd](arg);
    } else {
      if (window.soundEngine) window.soundEngine.playKey();
      result = `<span style="color: #ef4444;">Command not found: "${escapeHTML(cmd)}". Type <span style="color: var(--accent-cyan);">'help'</span> for instructions.</span>`;
    }

    if (result !== null) {
      const resultLine = document.createElement('div');
      resultLine.className = 'terminal-line';
      resultLine.innerHTML = result;
      terminalOutput.appendChild(resultLine);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
    terminalInput.value = '';
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Key handlers
  terminalInput.addEventListener('keydown', (e) => {
    if (window.soundEngine) window.soundEngine.playKey();

    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
      e.preventDefault();
    }
  });

  // Suggestion chips
  document.querySelectorAll('.suggestion-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd') || chip.innerText.trim();
      executeCommand(cmd);
      terminalInput.focus();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      commands.clear();
      if (window.soundEngine) window.soundEngine.playClick();
    });
  }

  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      executeCommand('help');
      if (window.soundEngine) window.soundEngine.playClick();
    });
  }

  // Quick Terminal trigger from Hero
  window.launchTerminal = function () {
    const termSec = document.getElementById('terminal');
    if (termSec) {
      termSec.scrollIntoView({ behavior: 'smooth' });
      terminalInput.focus();
    }
  };
})();

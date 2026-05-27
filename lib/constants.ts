export const SITE_CONFIG = {
  name: 'Kai Weng',
  title: 'Tech Blog',
  description:
    'Personal technical blog about digital IC design, computer architecture, FPGA, and AI chips.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://windandfall.me',
  ogImage: '/images/og-image.png',
  author: {
    name: 'Kai Weng',
    email: 'kai@example.com',
    github: 'https://github.com/kaiweng',
    linkedin: 'https://linkedin.com/in/kaiweng',
    twitter: 'https://twitter.com/kaiweng',
  },
  nav: [
    { label: 'Blog', href: '/blog' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
};

export const TECH_STACK = [
  'Verilog', 'SystemVerilog', 'Chisel', 'VHDL',
  'Python', 'C++', 'Tcl', 'Bash',
  'Vivado', 'VCS', 'Verdi', 'ModelSim',
  'Linux', 'Git', 'Docker', 'CI/CD',
  'RISC-V', 'ARM', 'x86',
];

export const SKILLS = [
  { category: 'Digital Design', items: ['RTL Design', 'Verification', 'Synthesis', 'STA', 'CDC', 'Low Power'] },
  { category: 'Architecture', items: ['Cache Design', 'Memory Subsystem', 'NoC', 'Pipeline', 'Out-of-Order'] },
  { category: 'Tools & Flow', items: ['Vivado', 'VCS', 'Verdi', 'SpyGlass', 'DC', 'PrimeTime'] },
  { category: 'Languages', items: ['Verilog', 'SystemVerilog', 'Chisel', 'Python', 'C++', 'Tcl'] },
  { category: 'Research', items: ['NPU Architecture', 'AI Accelerators', 'Near-Memory Computing', 'Chiplet'] },
];

export const EDUCATION = [
  {
    degree: 'M.S. in Electrical Engineering',
    school: 'University of Science and Technology',
    period: '2023 - 2026',
    description: 'Research focus on NPU architecture and AI chip design.',
  },
  {
    degree: 'B.S. in Electronic Engineering',
    school: 'University of Science and Technology',
    period: '2019 - 2023',
    description: 'Major in Electronic Science and Technology. GPA: 3.8/4.0.',
  },
];
